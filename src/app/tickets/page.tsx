"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import Link from 'next/link';
import { Ticket, Search, Filter, AlertCircle, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketId: string;
  customerName: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  createdAt: any;
  updatedAt: any;
  lastResponseAt: any;
}

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'supportTickets'));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as SupportTicket));
      
      // Sort: Open/Waiting first, then by Last Response, then by Priority
      data.sort((a, b) => {
        // Simple sort: most recently updated first
        return (b.updatedAt?.toMillis?.() || 0) - (a.updatedAt?.toMillis?.() || 0);
      });
      
      setTickets(data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-700';
      case 'Under Review': return 'bg-purple-100 text-purple-700';
      case 'In Progress': return 'bg-brand-yellow text-brand-navy';
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

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-brand-navy">Support Tickets</h1>
            <p className="text-gray-500 mt-2 font-medium">Manage customer inquiries and project support.</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 flex-1 md:flex-none">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Urgent</p>
                <p className="text-2xl font-black text-brand-navy">{tickets.filter(t => t.priority === 'Urgent' && t.status !== 'Resolved' && t.status !== 'Closed').length}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 flex-1 md:flex-none">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Open</p>
                <p className="text-2xl font-black text-brand-navy">{tickets.filter(t => t.status === 'Open').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search by ID, Name, or Subject..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium text-brand-navy"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Under Review">Under Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting for Customer">Waiting for Customer</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <select 
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium text-brand-navy"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mb-4"></div>
              <p className="text-gray-500 font-medium">Loading tickets...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-16 text-center">
              <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-brand-navy mb-2">No Tickets Found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <>
              {/* Mobile View (Cards) */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredTickets.map(ticket => (
                  <div key={ticket.id} className="p-5 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link href={`/tickets/${ticket.ticketId}`} className="font-black text-brand-navy hover:text-brand-yellow transition-colors underline decoration-2 underline-offset-4 text-lg">
                          {ticket.ticketId}
                        </Link>
                        <p className="font-bold text-gray-900 mt-1">{ticket.customerName}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                      <p className="font-medium text-gray-900 line-clamp-2">{ticket.subject}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
                          {ticket.category}
                        </span>
                        <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-gray-500">
                        <span className="block text-gray-900 font-medium">{ticket.updatedAt ? new Date(ticket.updatedAt.toMillis()).toLocaleDateString() : 'Just now'}</span>
                        {ticket.updatedAt ? new Date(ticket.updatedAt.toMillis()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                      </div>
                      <Link
                        href={`/tickets/${ticket.ticketId}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors"
                      >
                        View <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View (Table) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Ticket ID</th>
                      <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Customer</th>
                      <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Subject</th>
                      <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Priority</th>
                      <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500">Status</th>
                      <th className="p-6 text-xs font-bold tracking-widest uppercase text-gray-500 text-right">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredTickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-6">
                          <Link href={`/tickets/${ticket.ticketId}`} className="font-black text-brand-navy hover:text-brand-yellow transition-colors underline decoration-2 underline-offset-4">
                            {ticket.ticketId}
                          </Link>
                        </td>
                        <td className="p-6">
                          <p className="font-bold text-gray-900">{ticket.customerName}</p>
                        </td>
                        <td className="p-6">
                          <p className="font-medium text-gray-900 line-clamp-1 max-w-[300px]">{ticket.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">{ticket.category}</p>
                        </td>
                        <td className="p-6">
                          <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="p-6">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {ticket.updatedAt ? new Date(ticket.updatedAt.toMillis()).toLocaleDateString() : 'Just now'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {ticket.updatedAt ? new Date(ticket.updatedAt.toMillis()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
