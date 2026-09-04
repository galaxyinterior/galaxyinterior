"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { Ticket, Clock, MessageCircle, AlertCircle, Plus } from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  createdAt: any;
  updatedAt: any;
  lastResponseAt: any;
}

export default function SupportDashboardPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchTickets = async () => {
      try {
        const q = query(
          collection(db, 'supportTickets'), 
          where('customerId', '==', user.uid)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as SupportTicket));
        // Sort by newest first client-side since compound indexes might not be created yet
        data.sort((a, b) => (b.updatedAt?.toMillis?.() || 0) - (a.updatedAt?.toMillis?.() || 0));
        
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-700';
      case 'Under Review': return 'bg-purple-100 text-purple-700';
      case 'In Progress': return 'bg-brand-yellow/20 text-brand-navy';
      case 'Waiting for Customer': return 'bg-orange-100 text-orange-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Closed': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'text-red-600 font-black';
      case 'High': return 'text-orange-500 font-bold';
      case 'Medium': return 'text-brand-navy font-medium';
      case 'Low': return 'text-gray-500';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">Support Center</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage your requests and communicate with our support team.</p>
        </div>
        <Link 
          href="/contact" 
          className="bg-brand-navy hover:bg-[#162442] text-white px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
        >
          <Plus size={16} /> New Ticket
        </Link>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mb-4"></div>
          <p className="text-gray-500 font-medium">Loading tickets...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ticket className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-brand-navy mb-4">No Support Tickets Yet</h2>
          <p className="text-gray-500 mb-8 font-medium">If you have any issues with your ongoing projects, or need general assistance, our team is here to help.</p>
          <Link href="/contact" className="inline-block bg-brand-yellow hover:bg-yellow-400 text-brand-navy font-bold px-8 py-4 rounded-xl shadow-md transition-colors">
            Raise a Ticket
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Ticket ID</th>
                  <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Subject</th>
                  <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Status</th>
                  <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Priority</th>
                  <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500 text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-6">
                      <Link href={`/dashboard/support/${ticket.ticketId}`} className="font-black text-brand-navy hover:text-brand-yellow transition-colors underline decoration-2 underline-offset-4">
                        {ticket.ticketId}
                      </Link>
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-gray-900 line-clamp-1">{ticket.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{ticket.category}</p>
                    </td>
                    <td className="p-6">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end text-sm text-gray-500 gap-2">
                        <Clock size={14} />
                        {ticket.updatedAt ? new Date(ticket.updatedAt.toMillis()).toLocaleDateString() : 'Just now'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
