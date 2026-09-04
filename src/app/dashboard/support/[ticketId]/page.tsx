"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db, storage } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Paperclip, Send, User, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { sendNotification } from '@/lib/notifications';

export default function TicketDetailsPage({ params }: { params: { ticketId: string } }) {
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
    if (!user) return;
    fetchTicket();
  }, [user, params.ticketId]);

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
        console.error("Error fetching messages:", error);
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
        where('ticketId', '==', params.ticketId),
        where('customerId', '==', user!.uid)
      );
      const snap = await getDocs(q);
      
      if (snap.empty) {
        alert("Ticket not found or unauthorized.");
        router.push('/dashboard/support');
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
        const storageRef = ref(storage, `tickets/${user!.uid}/${Date.now()}_${attachment.name}`);
        const snap = await uploadBytes(storageRef, attachment);
        attachmentUrl = await getDownloadURL(snap.ref);
      }

      await addDoc(collection(db, 'supportMessages'), {
        ticketId: params.ticketId,
        senderId: user!.uid,
        senderRole: 'customer',
        senderName: user!.displayName || 'Customer',
        message: newMessage,
        attachments: attachmentUrl ? [attachmentUrl] : [],
        createdAt: serverTimestamp()
      });

      // Update ticket lastResponseAt
      await updateDoc(doc(db, 'supportTickets', ticketDocId), {
        lastResponseAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: ticket.status === 'Waiting for Customer' ? 'Open' : ticket.status
      });

      // Notify Admin
      await sendNotification({
        userId: 'ADMIN',
        title: 'New Customer Reply',
        message: `${user!.displayName} replied to ticket ${params.ticketId}`,
        type: 'info',
        link: `/tickets/${params.ticketId}`
      });

      setNewMessage('');
      setAttachment(null);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mb-4"></div>
        <p className="text-gray-500 font-medium">Loading ticket details...</p>
      </div>
    );
  }

  if (!ticket) return null;

  const isClosed = ticket.status === 'Resolved' || ticket.status === 'Closed';

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/support" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand-navy transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Tickets
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)] min-h-[600px]">
        
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
              Started on {ticket.createdAt ? new Date(ticket.createdAt.toMillis()).toLocaleDateString() : 'Just now'}
            </p>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f9fa]">
            
            {/* Original Ticket Description as First Message */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-navy flex-shrink-0 flex items-center justify-center text-white font-bold">
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
              const isCustomer = msg.senderRole === 'customer';
              
              return (
                <div key={msg.id} className={`flex gap-4 ${isCustomer ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold ${isCustomer ? 'bg-brand-navy' : 'bg-brand-yellow text-brand-navy'}`}>
                    {isCustomer ? ticket.customerName.charAt(0).toUpperCase() : <ShieldAlert size={18} />}
                  </div>
                  <div className={`max-w-[80%] flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-sm text-gray-900">{isCustomer ? 'You' : 'Support Team'}</span>
                      <span className="text-xs text-gray-400">
                        {msg.createdAt ? new Date(msg.createdAt.toMillis()).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                    <div className={`border rounded-2xl p-4 shadow-sm ${
                      isCustomer 
                        ? 'bg-brand-navy text-white border-brand-navy rounded-tr-none' 
                        : 'bg-white text-gray-700 border-gray-200 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.message}</p>
                      
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className={`mt-3 pt-3 border-t ${isCustomer ? 'border-white/20' : 'border-gray-100'}`}>
                          {msg.attachments.map((url: string, i: number) => (
                            <a key={i} href={url} target="_blank" rel="noreferrer" className={`inline-flex items-center text-xs font-bold hover:underline ${isCustomer ? 'text-brand-yellow' : 'text-blue-600'}`}>
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
            {isClosed ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <CheckCircle2 className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-600">This ticket has been marked as {ticket.status.toLowerCase()}.</p>
                <p className="text-xs text-gray-500 mt-1">If you need further assistance, please open a new ticket.</p>
              </div>
            ) : (
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
                    placeholder="Type your message here..."
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
                  className="p-3 bg-brand-yellow hover:bg-yellow-400 text-brand-navy rounded-xl font-bold transition-colors disabled:opacity-50 shrink-0"
                >
                  {isSending ? <div className="w-5 h-5 border-2 border-brand-navy border-t-transparent rounded-full animate-spin" /> : <Send size={20} />}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6 h-full overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-black text-brand-navy mb-4 border-b border-gray-100 pb-2">Ticket Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                  ticket.status === 'Resolved' || ticket.status === 'Closed' ? 'bg-green-100 text-green-700' :
                  'bg-brand-yellow/20 text-brand-navy'
                }`}>
                  {ticket.status}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Priority</p>
                <p className={`font-bold text-sm ${ticket.priority === 'Urgent' ? 'text-red-600' : ticket.priority === 'High' ? 'text-orange-500' : 'text-gray-900'}`}>
                  {ticket.priority}
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
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-brand-navy rounded-3xl p-6 text-white shadow-lg">
            <h3 className="font-black mb-2 text-brand-yellow">Need Urgent Help?</h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              If your issue requires immediate attention regarding an active construction site, please call your assigned project manager directly.
            </p>
            <a href="tel:+919631980881" className="block text-center w-full bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 text-sm font-bold transition-colors">
              Call Support Line
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
