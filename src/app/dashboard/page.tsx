"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { 
  FolderKanban, 
  FileText, 
  LifeBuoy, 
  CheckSquare, 
  ArrowRight,
  Calculator,
  PlusCircle,
  MessageSquare,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { profile } = useAuth();

  // Temporary mock data for the UI shell (Phase 7)
  const stats = [
    { label: 'Active Projects', value: '1', icon: FolderKanban, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Quotes', value: '2', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Open Tickets', value: '0', icon: LifeBuoy, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'Completed', value: '0', icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* Welcome Section */}
      <section className="bg-brand-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, <span className="text-brand-yellow">{profile?.name?.split(' ')[0] || 'Guest'}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Here's what's happening with your interior projects today.
          </p>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Activity & Updates */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Updates */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="text-brand-yellow" size={24} />
                Upcoming Updates
              </h2>
              <Link href="/dashboard/projects" className="text-sm font-bold text-brand-navy hover:underline">
                View All
              </Link>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 text-brand-navy font-bold">
                  24<br/><span className="text-[10px] text-gray-500 uppercase">Aug</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Design Review Meeting</h3>
                  <p className="text-sm text-gray-500 mt-1">Project: Modern Villa Renovation</p>
                  <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded mt-2">
                    Planning Phase
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-yellow border-4 border-white"></div>
                  <p className="text-sm text-gray-500 mb-1">Yesterday, 2:30 PM</p>
                  <p className="font-medium text-gray-900">New quotation generated for "Kitchen Remodel"</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-gray-300 border-4 border-white"></div>
                  <p className="text-sm text-gray-500 mb-1">Aug 18, 10:15 AM</p>
                  <p className="font-medium text-gray-900">Support ticket #1024 closed by Admin</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-gray-300 border-4 border-white"></div>
                  <p className="text-sm text-gray-500 mb-1">Aug 15, 09:00 AM</p>
                  <p className="font-medium text-gray-900">Account created successfully</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 px-2">Quick Actions</h2>
          
          <Link href="/dashboard/projects/new" className="block group">
            <div className="bg-brand-navy text-white rounded-2xl p-6 transition-transform hover:-translate-y-1 shadow-lg shadow-brand-navy/20">
              <PlusCircle size={32} className="text-brand-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold mb-2">Start a Project</h3>
              <p className="text-white/70 text-sm mb-4">Begin your interior design journey with us today.</p>
              <div className="flex items-center gap-2 text-brand-yellow font-bold text-sm uppercase tracking-wide">
                Initialize <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          <Link href="/pricing" className="block group">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 transition-all hover:border-brand-yellow hover:shadow-lg">
              <Calculator size={32} className="text-brand-navy mb-4 group-hover:text-brand-yellow transition-colors" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Get an Estimate</h3>
              <p className="text-gray-500 text-sm mb-4">Use our smart calculator to plan your budget.</p>
              <div className="flex items-center gap-2 text-brand-navy font-bold text-sm uppercase tracking-wide group-hover:text-brand-yellow transition-colors">
                Calculate <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/support" className="block group">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 transition-all hover:bg-gray-100">
              <MessageSquare size={32} className="text-gray-400 mb-4 group-hover:text-gray-700 transition-colors" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-500 text-sm mb-4">Raise a support ticket for assistance.</p>
              <div className="flex items-center gap-2 text-gray-700 font-bold text-sm uppercase tracking-wide">
                Contact Support <ArrowRight size={16} />
              </div>
            </div>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
