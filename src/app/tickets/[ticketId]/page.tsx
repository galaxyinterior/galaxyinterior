"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db, storage } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

import { ArrowLeft, Paperclip, Send, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { sendNotification } from '@/lib/notifications';
import { createAuditLog } from '@/lib/audit';

export default function AdminTicketDetailsPage({ params }: { params: { ticketId: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [ticketDocId, setTicketDocId] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Message Form State
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTicket();
  }, [params.ticketId]);

  useEffect(() => {
    if (!ticketDocId) return;

    // Listen to messages in real-time
    const q = query(
      collection(db, 'supportMessages'), 
      where('ticketId', '==', params.ticketId),
      orderBy('createdAt', 'asc')
    );
    
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const msgs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setMessages(msgs);
        setTimeout(() => scrollToBottom(), 100);
      },
      (error) => {
        console.error("Error fetching admin messages:", error);
      }
    );

    return () => unsubscribe();
  }, [ticketDocId, params.ticketId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchTicket = async () => {
    try {
      const q = query(
        collection(db, 'supportTickets'),
        where('ticketId', '==', params.ticketId)
      );
      const snap = await getDocs(q);
      
      if (snap.empty) {
        alert("Ticket not found.");
        router.push('/tickets');
        return;
      }
      
      setTicketDocId(snap.docs[0].id);
      setTicket(snap.docs[0].data());
    } catch (err) {
      console.error("Error fetching ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachment) return;
    setIsSending(true);

    try {
      let attachmentUrl = null;
      if (attachment) {
        if (attachment.size > 5 * 1024 * 1024) {
          alert("File size must be under 5MB");
          setIsSending(false);
          return;
        }
        const storageRef = ref(storage, `tickets/messages/${Date.now()}_${attachment.name}`);
        const snap = await uploadBytes(storageRef, attachment);
        attachmentUrl = await getDownloadURL(snap.ref);
      }

      await addDoc(collection(db, 'supportMessages'), {
        ticketId: params.ticketId,
        senderId: user!.uid,
        senderRole: 'admin',
        senderName: 'Support Team',
        message: newMessage,
        attachments: attachmentUrl ? [attachmentUrl] : [],
        createdAt: serverTimestamp()
      });

      // Update ticket to Waiting for Customer if it was Open or In Progress
      // Wait, let admin control status manually, but auto-update response time
      await updateDoc(doc(db, 'supportTickets', ticketDocId), {
        lastResponseAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        // If they reply, it's typically waiting for customer, but we'll let them set it explicitly below.
        status: ticket.status === 'Open' ? 'Waiting for Customer' : ticket.status
      });
      
      // Notify Customer
      await sendNotification({
        userId: ticket.customerId,
        title: 'New Reply from Support',
        message: `Our support team has replied to your ticket: ${ticket.subject}`,
        type: 'info',
        link: `/dashboard/support/${params.ticketId}`
      });

      setTicket((prev: any) => ({...prev, status: ticket.status === 'Open' ? 'Waiting for Customer' : ticket.status}));

      setNewMessage('');
      setAttachment(null);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateDoc(doc(db, 'supportTickets', ticketDocId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      setTicket((prev: any) => ({ ...prev, status: newStatus }));
      
      // Notify Customer
      await sendNotification({
        userId: ticket.customerId,
        title: 'Ticket Status Updated',
        message: `Your ticket "${ticket.subject}" is now ${newStatus}.`,
        type: 'ticket',
        link: `/dashboard/support/${params.ticketId}`
      });

      // Audit Log
      await createAuditLog({
        adminId: user?.uid || 'unknown',
        adminName: 'Administrator', // In production, grab real admin name
        action: 'Changed Ticket Status',
        resourceId: params.ticketId,
        oldValue: ticket.status,
        newValue: newStatus
      });

    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    try {
      await updateDoc(doc(db, 'supportTickets', ticketDocId), {
        priority: newPriority,
        updatedAt: serverTimestamp()
      });
      setTicket((prev: any) => ({ ...prev, priority: newPriority }));
      
      // Audit Log
      await createAuditLog({
        adminId: user?.uid || 'unknown',
        adminName: 'Administrator', 
        action: 'Changed Ticket Priority',
        resourceId: params.ticketId,
        oldValue: ticket.priority,
        newValue: newPriority
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update priority");
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div>
        </div>
      </>
    );
  }

  if (!ticket) return null;

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto h-screen flex flex-col">
        <div className="mb-6 flex justify-between items-center shrink-0">
          <Link href="/tickets" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand-navy transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Tickets
          </Link>
          
          <div className="flex gap-4">
            <select 
              value={ticket.priority}
              onChange={e => handlePriorityChange(e.target.value)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border-2 focus:outline-none ${
                ticket.priority === 'Urgent' ? 'border-red-200 text-red-600 bg-red-50' :
                ticket.priority === 'High' ? 'border-orange-200 text-orange-600 bg-orange-50' :
                'border-gray-200 text-brand-navy bg-white'
              }`}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
              <option value="Urgent">Urgent Priority</option>
            </select>
            
            <select 
              value={ticket.status}
              onChange={e => handleStatusChange(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm font-bold border-2 border-brand-yellow focus:outline-none bg-brand-yellow/10 text-brand-navy"
            >
              <option value="Open">Status: Open</option>
              <option value="Under Review">Status: Under Review</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Waiting for Customer">Status: Waiting for Customer</option>
              <option value="Resolved">Status: Resolved</option>
              <option value="Closed">Status: Closed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
          
          {/* Main Conversation Area */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50 shrink-0">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-black text-brand-navy">{ticket.subject}</h2>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-700">
                  {ticket.ticketId}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Customer: <span className="font-bold text-gray-900">{ticket.customerName}</span> ({ticket.customerEmail})
              </p>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f9fa]">
              
              {/* Original Ticket Description as First Message */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white font-bold">
                  {ticket.customerName.charAt(0).toUpperCase()}
                </div>
                <div className="max-w-[80%]">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-sm text-gray-900">{ticket.customerName}</span>
                    <span className="text-xs text-gray-400">Original Request</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                    <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                    
                    {ticket.attachmentUrl && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <a href={ticket.attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-bold text-blue-600 hover:underline">
                          <FileText size={16} className="mr-2" /> View Attached Document
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Thread Messages */}
              {messages.map((msg) => {
                const isAdmin = msg.senderRole === 'admin';
                
                return (
                  <div key={msg.id} className={`flex gap-4 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold ${isAdmin ? 'bg-brand-yellow text-brand-navy' : 'bg-gray-300'}`}>
                      {isAdmin ? <ShieldAlert size={18} /> : ticket.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div className={`max-w-[80%] flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-sm text-gray-900">{isAdmin ? 'Support Team (You)' : ticket.customerName}</span>
                        <span className="text-xs text-gray-400">
                          {msg.createdAt ? new Date(msg.createdAt.toMillis()).toLocaleString() : 'Just now'}
                        </span>
                      </div>
                      <div className={`border rounded-2xl p-4 shadow-sm ${
                        isAdmin 
                          ? 'bg-brand-navy text-white border-brand-navy rounded-tr-none' 
                          : 'bg-white text-gray-700 border-gray-200 rounded-tl-none'
                      }`}>
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                        
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className={`mt-3 pt-3 border-t ${isAdmin ? 'border-white/20' : 'border-gray-100'}`}>
                            {msg.attachments.map((url: string, i: number) => (
                              <a key={i} href={url} target="_blank" rel="noreferrer" className={`inline-flex items-center text-xs font-bold hover:underline ${isAdmin ? 'text-brand-yellow' : 'text-blue-600'}`}>
                                <Paperclip size={14} className="mr-1" /> Attachment {i + 1}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Reply Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                <label className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 hover:text-brand-navy transition-colors shrink-0">
                  <Paperclip size={20} />
                  <input type="file" className="hidden" onChange={e => e.target.files && setAttachment(e.target.files[0])} accept=".pdf,.jpg,.jpeg,.png" />
                </label>
                
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-yellow transition-all flex flex-col">
                  {attachment && (
                    <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 text-xs font-bold text-blue-700 flex justify-between items-center">
                      <span className="truncate">📎 {attachment.name}</span>
                      <button type="button" onClick={() => setAttachment(null)} className="text-red-500 hover:text-red-700 px-2">Remove</button>
                    </div>
                  )}
                  <textarea 
                    rows={1}
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your reply to the customer..."
                    className="w-full px-4 py-3 bg-transparent outline-none resize-none min-h-[50px] max-h-[150px]"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (newMessage.trim() || attachment) handleSendMessage(e);
                      }
                    }}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSending || (!newMessage.trim() && !attachment)}
                  className="p-3 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-bold transition-colors disabled:opacity-50 shrink-0"
                >
                  {isSending ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={20} />}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-black text-brand-navy mb-4 border-b border-gray-100 pb-2">Ticket Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                  <p className="font-bold text-gray-900 text-sm">{ticket.customerName}</p>
                  <a href={`mailto:${ticket.customerEmail}`} className="text-xs text-blue-600 hover:underline">{ticket.customerEmail}</a>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Created</p>
                  <p className="font-medium text-gray-900 text-sm">
                    {ticket.createdAt ? new Date(ticket.createdAt.toMillis()).toLocaleString() : 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Category</p>
                  <p className="font-medium text-gray-900 text-sm">{ticket.category}</p>
                </div>

                {ticket.projectId && (
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Project Reference</p>
                    <p className="font-medium text-gray-900 text-sm">{ticket.projectId}</p>
                    {/* Add link to project if it's a real project ID */}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
