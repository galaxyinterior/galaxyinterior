"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';

import { ShieldAlert, Search, Filter, History } from 'lucide-react';

interface AuditLog {
  id: string;
  adminId?: string;
  adminName?: string;
  actorId?: string;
  actorEmail?: string;
  action: string;
  resourceId?: string;
  entityId?: string;
  oldValue?: string;
  newValue?: string;
  before?: string;
  after?: string;
  timestamp?: any;
  createdAt?: any;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'auditLogs'),
        orderBy('createdAt', 'desc'),
        limit(100)
      );
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as AuditLog));
      setLogs(data);
    } catch (err) {
      console.error("Error fetching audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.action?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (log.resourceId || log.entityId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.adminName || log.actorEmail || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-4">
              <ShieldAlert size={14} /> Security Audit Trail
            </div>
            <h1 className="text-3xl font-black text-brand-navy">Activity Logs</h1>
            <p className="text-gray-500 mt-2 font-medium">Read-only immutable record of all sensitive admin operations.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search by action, resource ID, or admin name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all"
            />
          </div>
        </div>

        {/* Log Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy mb-4"></div>
              <p className="text-gray-500 font-medium">Loading security logs...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-16 text-center">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-black text-brand-navy mb-2">No Logs Found</h3>
              <p className="text-gray-500">The audit trail is currently empty or no results match your search.</p>
            </div>
          ) : (
            <>
              {/* Mobile View (Cards) */}
              <div className="md:hidden divide-y divide-gray-100">
                {filteredLogs.map(log => (
                  <div key={log.id} className="p-5 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-yellow font-bold flex items-center justify-center shrink-0">
                          {((log.adminName || log.actorEmail || 'U')[0]).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 text-sm block">{log.adminName || log.actorEmail || 'Unknown'}</span>
                          <span className="text-xs text-gray-500">
                            {log.createdAt ? new Date(log.createdAt.toMillis()).toLocaleString() : log.timestamp ? new Date(log.timestamp.toMillis()).toLocaleString() : 'N/A'}
                          </span>
                        </div>
                      </div>
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {log.action}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Resource</p>
                        <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200 break-all">
                          {log.resourceId || log.entityId || 'N/A'}
                        </span>
                      </div>
                      
                      {(log.oldValue !== undefined || log.newValue !== undefined || log.before !== undefined || log.after !== undefined) && (
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Changes</p>
                          <div className="text-xs font-mono bg-white p-2 rounded border border-gray-200">
                            {(log.oldValue !== undefined || log.before !== undefined) && (
                              <div className="text-red-500 line-through decoration-red-300 break-all mb-1">
                                {String(log.oldValue ?? log.before)}
                              </div>
                            )}
                            {(log.newValue !== undefined || log.after !== undefined) && (
                              <div className="text-green-600 font-bold break-all">
                                {String(log.newValue ?? log.after)}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View (Table) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 pl-6 text-xs font-bold tracking-widest uppercase text-gray-500">Timestamp</th>
                      <th className="p-4 text-xs font-bold tracking-widest uppercase text-gray-500">Admin</th>
                      <th className="p-4 text-xs font-bold tracking-widest uppercase text-gray-500">Action</th>
                      <th className="p-4 text-xs font-bold tracking-widest uppercase text-gray-500">Resource</th>
                      <th className="p-4 pr-6 text-xs font-bold tracking-widest uppercase text-gray-500 text-right">Change Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredLogs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6 align-top">
                          <p className="font-bold text-gray-900 text-sm">
                            {log.createdAt ? new Date(log.createdAt.toMillis()).toLocaleDateString() : log.timestamp ? new Date(log.timestamp.toMillis()).toLocaleDateString() : 'N/A'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {log.createdAt ? new Date(log.createdAt.toMillis()).toLocaleTimeString() : log.timestamp ? new Date(log.timestamp.toMillis()).toLocaleTimeString() : ''}
                          </p>
                        </td>
                        <td className="p-4 align-top">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-navy text-brand-yellow font-bold flex items-center justify-center shrink-0">
                              {((log.adminName || log.actorEmail || 'U')[0]).toUpperCase()}
                            </div>
                            <span className="font-bold text-gray-900 text-sm">{log.adminName || log.actorEmail || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="p-4 align-top">
                          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-bold">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-4 align-top">
                          <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                            {log.resourceId || log.entityId || 'N/A'}
                          </span>
                        </td>
                        <td className="p-4 pr-6 align-top text-right">
                          {(log.oldValue !== undefined || log.newValue !== undefined || log.before !== undefined || log.after !== undefined) ? (
                            <div className="inline-flex flex-col items-end text-xs font-mono">
                              {(log.oldValue !== undefined || log.before !== undefined) && (
                                <span className="text-red-500 line-through decoration-red-300">
                                  {String(log.oldValue ?? log.before)}
                                </span>
                              )}
                              {(log.newValue !== undefined || log.after !== undefined) && (
                                <span className="text-green-600 font-bold mt-1">
                                  {String(log.newValue ?? log.after)}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
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
