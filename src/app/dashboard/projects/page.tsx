"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { 
  FolderKanban, Plus, Clock, MapPin, Search, ArrowRight,
  Filter, IndianRupee, Calendar
} from 'lucide-react';

interface Project {
  id: string;
  projectName: string;
  projectType: string;
  location: string;
  budget: number;
  status: string;
  createdAt: any;
  updatedAt: any;
}

export default function MyProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'projects'),
          where('customerId', '==', user.uid),
          // We would order by createdAt, but requires a composite index in Firestore. 
          // We will fetch and sort locally for now to avoid the index error initially.
        );
        const snapshot = await getDocs(q);
        const projData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        // Sort newest first
        projData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis() || 0;
          const timeB = b.createdAt?.toMillis() || 0;
          return timeB - timeA;
        });

        setProjects(projData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
      case 'draft':
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'planning':
      case 'design':
      case 'quotation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFilterCategory = (status: string) => {
    const s = status.toLowerCase();
    if (['submitted', 'draft', 'pending'].includes(s)) return 'Pending';
    if (['planning', 'design', 'quotation', 'in progress'].includes(s)) return 'Active';
    if (['completed'].includes(s)) return 'Completed';
    if (['cancelled'].includes(s)) return 'Cancelled';
    return 'Other';
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.projectName.toLowerCase().includes(search.toLowerCase()) || 
                          p.location.toLowerCase().includes(search.toLowerCase());
    const category = getFilterCategory(p.status);
    const matchesFilter = filter === 'All' || category === filter;
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    // Firestore timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-IN', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    }
    return 'N/A';
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return 'TBD';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FolderKanban className="text-brand-navy" size={32} />
            My Projects
          </h1>
          <p className="text-gray-500 mt-2">Track the progress of your interior design journey.</p>
        </div>
        <Link 
          href="/dashboard/projects/new"
          className="bg-brand-navy hover:bg-brand-navy/90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-brand-navy/20 shrink-0"
        >
          <Plus size={20} />
          Start New Project
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:bg-white transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Active', 'Pending', 'Completed', 'Cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                filter === f 
                  ? 'bg-brand-yellow text-brand-navy shadow-sm' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl h-64 border border-gray-100 animate-pulse"></div>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="group">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:border-brand-yellow">
                
                {/* Card Header */}
                <div className="p-6 pb-4 border-b border-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border uppercase tracking-wider ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <ArrowRight size={20} className="text-gray-300 group-hover:text-brand-yellow group-hover:-rotate-45 transition-all" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-navy transition-colors line-clamp-1">
                    {project.projectName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{project.projectType}</p>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400 mr-3 shrink-0" />
                    <span className="line-clamp-1">{project.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <IndianRupee size={16} className="text-gray-400 mr-3 shrink-0" />
                    <span>Est. Budget: <strong>{formatCurrency(project.budget)}</strong></span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Started {formatDate(project.createdAt)}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    Updated {formatDate(project.updatedAt)}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <FolderKanban size={40} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            {filter !== 'All' || search 
              ? "We couldn't find any projects matching your current filters. Try adjusting your search."
              : "You haven't started any interior projects yet. Ready to transform your space?"}
          </p>
          {(filter !== 'All' || search) ? (
            <button 
              onClick={() => { setFilter('All'); setSearch(''); }}
              className="text-brand-navy font-bold hover:underline"
            >
              Clear all filters
            </button>
          ) : (
            <Link 
              href="/dashboard/projects/new"
              className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-brand-yellow/20"
            >
              <Plus size={20} />
              Start Your First Project
            </Link>
          )}
        </div>
      )}

    </div>
  );
}
