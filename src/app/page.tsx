"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Users, Briefcase, FileText, LifeBuoy, TrendingUp, CheckCircle2 } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function DashboardPage() {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingQuotes: 0,
    openTickets: 0,
    pipelineValue: 0
  });

  const [projectStatusData, setProjectStatusData] = useState<any[]>([]);
  const [quotesData, setQuotesData] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersSnap, projectsSnap, quotesSnap, ticketsSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'quoteRequests')),
          getDocs(collection(db, 'supportTickets'))
        ]);

        // Process KPIs
        const projects = projectsSnap.docs.map(d => d.data());
        const quotes = quotesSnap.docs.map(d => d.data());
        
        const activeProjectsCount = projects.filter(p => p.status !== 'completed').length;
        const completedProjectsCount = projects.filter(p => p.status === 'completed').length;
        const pendingQuotesCount = quotes.filter(q => q.status === 'new' || !q.status).length;
        const pipelineValue = quotes
          .filter(q => q.status === 'new' || !q.status)
          .reduce((sum, q) => sum + (q.calculation?.finalTotal || 0), 0);

        setStats({
          totalCustomers: usersSnap.size,
          activeProjects: activeProjectsCount,
          completedProjects: completedProjectsCount,
          pendingQuotes: pendingQuotesCount,
          openTickets: ticketsSnap.size, // Placeholder, assuming all are open for now
          pipelineValue: pipelineValue
        });

        // Process Project Status Chart Data
        const statusCounts = projects.reduce((acc, p) => {
          const status = p.status || 'draft';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setProjectStatusData(Object.entries(statusCounts).map(([name, value]) => ({ name, value })));

        // Process Quotes Chart Data (Dummy mock data for visual demonstration, real data would parse createdAt dates)
        setQuotesData([
          { name: 'Jan', quotes: 4 },
          { name: 'Feb', quotes: 7 },
          { name: 'Mar', quotes: 5 },
          { name: 'Apr', quotes: 12 },
          { name: 'May', quotes: pendingQuotesCount > 0 ? pendingQuotesCount + 10 : 8 }
        ]);

      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) return null;

  const COLORS = ['#FBBF24', '#1E3A8A', '#10B981', '#6366F1', '#EF4444'];

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-brand-navy">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back. Here is what's happening today.</p>
        </header>

        {loading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-24 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-48 bg-gray-200 rounded-2xl col-span-2"></div>
                  <div className="h-48 bg-gray-200 rounded-2xl col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                <div className="w-14 h-14 bg-brand-yellow/10 text-brand-yellow rounded-xl flex items-center justify-center mr-4">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Customers</p>
                  <p className="text-3xl font-black text-brand-navy">{stats.totalCustomers}</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                <div className="w-14 h-14 bg-brand-navy/10 text-brand-navy rounded-xl flex items-center justify-center mr-4">
                  <Briefcase size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Active Projects</p>
                  <p className="text-3xl font-black text-brand-navy">{stats.activeProjects}</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mr-4">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Completed Projects</p>
                  <p className="text-3xl font-black text-brand-navy">{stats.completedProjects}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Pending Quotes</p>
                  <p className="text-3xl font-black text-brand-navy">{stats.pendingQuotes}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mr-4">
                  <LifeBuoy size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Open Tickets</p>
                  <p className="text-3xl font-black text-brand-navy">{stats.openTickets}</p>
                </div>
              </div>

              <div className="bg-brand-navy p-6 rounded-2xl shadow-xl flex items-center">
                <div className="w-14 h-14 bg-white/10 text-brand-yellow rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-bold uppercase tracking-wider">Pipeline Value</p>
                  <p className="text-3xl font-black text-white">₹{(stats.pipelineValue / 100000).toFixed(2)}L</p>
                </div>
              </div>

            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Quotes Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-brand-navy mb-6">Quote Requests Trend</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={quotesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                      <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="quotes" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Project Status Chart */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-brand-navy mb-6">Projects by Status</h3>
                <div className="h-72">
                  {projectStatusData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectStatusData}
                          cx="50%"
                          cy="45%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold', color: '#374151'}} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <Briefcase size={32} className="mb-2 opacity-50" />
                      <p className="font-bold text-sm">No Project Data</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}
