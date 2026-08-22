"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Users, Search, UserX, UserCheck, Mail, Phone, Calendar } from 'lucide-react';


interface Customer {
  id: string;
  email: string;
  displayName?: string;
  phone?: string;
  role: string;
  isDisabled?: boolean;
  createdAt?: any;
}

export default function CustomersPage() {
  const { user } = useAuth();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, [user]);

  const fetchCustomers = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Customer));
      // Sort newest first if timestamp exists
      data.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (customerId: string, currentStatus: boolean) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'enable' : 'disable'} this account?`)) return;
    
    try {
      await updateDoc(doc(db, 'users', customerId), {
        isDisabled: !currentStatus
      });
      await fetchCustomers();
    } catch (err) {
      console.error(err);
      alert("Failed to update customer status.");
    }
  };

  if (!user) return null;

  const filteredCustomers = customers.filter(c => 
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.displayName && c.displayName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.phone && c.phone.includes(searchQuery))
  );

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-brand-navy">Customer Management</h1>
            <p className="text-gray-500 mt-1">View and manage registered portal users.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-white shadow-sm"
            />
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Mobile View (Cards) */}
          <div className="md:hidden divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading customers...</div>
            ) : filteredCustomers.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Users size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="font-bold text-lg text-brand-navy mb-1">No customers found</p>
                <p>Try adjusting your search criteria.</p>
              </div>
            ) : (
              filteredCustomers.map(customer => (
                <div key={customer.id} className="p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-yellow/20 text-brand-navy flex items-center justify-center font-black text-lg">
                      {customer.displayName ? customer.displayName.charAt(0).toUpperCase() : customer.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-brand-navy text-lg">{customer.displayName || 'No Name Provided'}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {customer.id.substring(0, 8)}...</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} className="text-gray-400" /> <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-gray-400" /> <span>{customer.phone || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        customer.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {customer.role}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        customer.isDisabled ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {customer.isDisabled ? 'Deactivated' : 'Active'}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleToggleStatus(customer.id, customer.isDisabled || false)}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                        customer.isDisabled 
                          ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      {customer.isDisabled ? <UserCheck size={18} /> : <UserX size={18} />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase tracking-wider text-gray-500 font-bold">
                  <th className="p-6">Customer Details</th>
                  <th className="p-6">Contact Info</th>
                  <th className="p-6 text-center">Role</th>
                  <th className="p-6 text-center">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">Loading customers...</td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-500">
                      <Users size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="font-bold text-lg text-brand-navy mb-1">No customers found</p>
                      <p>Try adjusting your search criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map(customer => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-yellow/20 text-brand-navy flex items-center justify-center font-black">
                            {customer.displayName ? customer.displayName.charAt(0).toUpperCase() : customer.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-brand-navy">{customer.displayName || 'No Name Provided'}</p>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {customer.id.substring(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-gray-400" /> {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" /> {customer.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          customer.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {customer.role}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          customer.isDisabled ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {customer.isDisabled ? 'Deactivated' : 'Active'}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <button
                          onClick={() => handleToggleStatus(customer.id, customer.isDisabled || false)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                            customer.isDisabled 
                              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                              : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title={customer.isDisabled ? 'Reactivate Account' : 'Deactivate Account'}
                        >
                          {customer.isDisabled ? (
                            <><UserCheck size={16} /> Enable</>
                          ) : (
                            <><UserX size={16} /> Disable</>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
}
