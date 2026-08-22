"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { FileText, Search, IndianRupee, Clock, CheckCircle2, XCircle, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function QuotesPage() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'quoteRequests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotes(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching quotes:', error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (quoteId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'quoteRequests', quoteId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      
      const quote = quotes.find(q => q.id === quoteId);
      if (quote) {
        // Audit log
        await addDoc(collection(db, 'auditLogs'), {
          action: 'QUOTE_STATUS_UPDATE',
          entityType: 'quote',
          entityId: quoteId,
          actorId: user?.uid,
          actorEmail: user?.email,
          before: quote.status,
          after: newStatus,
          createdAt: serverTimestamp()
        });

        // Notify customer if applicable
        if (quote.userId) {
          await addDoc(collection(db, 'notifications'), {
            userId: quote.userId,
            title: 'Quote Update',
            message: `Your quote request status is now: ${newStatus}`,
            type: 'quote',
            read: false,
            createdAt: serverTimestamp()
          });
        }
      }
      alert('Status updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const filteredQuotes = quotes.filter(q => 
    q.customerDetails?.name?.toLowerCase().includes(search.toLowerCase()) ||
    q.customerDetails?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'quoted': return 'bg-purple-100 text-purple-700';
      case 'accepted': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div></div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
            <FileText className="text-brand-yellow" />
            Quotations
          </h1>
          <p className="text-gray-500 mt-1">Manage and track customer quote requests.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search quotes..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Project Details</th>
                <th className="px-6 py-4">Total Estimate</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{quote.customerDetails?.name || 'Unknown'}</div>
                    <div className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <Mail size={12}/> {quote.customerDetails?.email || 'N/A'}
                    </div>
                    <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                      <Phone size={12}/> {quote.customerDetails?.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{quote.projectDetails?.propertyType || 'N/A'}</div>
                    <div className="text-gray-500 text-xs">{quote.projectDetails?.area} sqft • {quote.projectDetails?.city}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-brand-navy">
                    ₹{(quote.calculation?.totalCost || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status || 'new')}`}>
                      {(quote.status || 'new').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => setSelectedQuote(quote)}
                      className="text-brand-navy hover:text-brand-yellow font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredQuotes.length === 0 && (
            <div className="p-8 text-center text-gray-500">No quotes found.</div>
          )}
        </div>
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-brand-navy">Quote Details</h2>
              <button 
                onClick={() => setSelectedQuote(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Customer Info</h3>
                  <p className="font-medium">{selectedQuote.customerDetails?.name}</p>
                  <p className="text-sm text-gray-600">{selectedQuote.customerDetails?.email}</p>
                  <p className="text-sm text-gray-600">{selectedQuote.customerDetails?.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Project Info</h3>
                  <p className="font-medium">{selectedQuote.projectDetails?.propertyType}</p>
                  <p className="text-sm text-gray-600">{selectedQuote.projectDetails?.area} sq.ft</p>
                  <p className="text-sm text-gray-600">{selectedQuote.projectDetails?.city}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Package Selected</h3>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-bold text-brand-navy">{selectedQuote.selections?.package?.name || 'Custom'}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Calculation Breakdown</h3>
                <div className="space-y-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span>Base Cost</span>
                    <span>₹{(selectedQuote.calculation?.baseCost || 0).toLocaleString()}</span>
                  </div>
                  {(selectedQuote.calculation?.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name}</span>
                      <span>₹{item.cost.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-brand-navy">
                    <span>Total Estimate</span>
                    <span>₹{(selectedQuote.calculation?.totalCost || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['new', 'contacted', 'quoted', 'accepted', 'rejected'].map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        handleStatusChange(selectedQuote.id, status);
                        setSelectedQuote({ ...selectedQuote, status });
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        (selectedQuote.status || 'new') === status
                          ? 'bg-brand-navy text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
