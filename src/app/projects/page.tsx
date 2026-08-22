"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FolderKanban, Search, ChevronRight, Calendar, User, MapPin } from 'lucide-react';

import Link from 'next/link';

interface Project {
  id: string;
  projectName?: string;
  customerId: string;
  status: string;
  propertyType?: string;
  city?: string;
  area?: number;
  createdAt?: any;
  // Resolved customer email
  customerEmail?: string;
}

export default function AdminProjectsPage() {
  const { user } = useAuth();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const snap = await getDocs(collection(db, 'projects'));
      const projectsData = snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
      
      // We also need to fetch customer emails to make the list useful.
      // In a production app with thousands of users, we'd denormalize customerEmail onto the project doc.
      // For this MVP, we will fetch users and map them.
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersMap = new Map();
      usersSnap.docs.forEach(doc => {
        usersMap.set(doc.id, doc.data().email);
      });

      const enrichedProjects = projectsData.map(p => ({
        ...p,
        customerEmail: usersMap.get(p.customerId) || 'Unknown Customer'
      }));

      // Sort newest first
      enrichedProjects.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setProjects(enrichedProjects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const filteredProjects = projects.filter(p => 
    (p.projectName && p.projectName.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (p.customerEmail && p.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.city && p.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'in_progress': return 'bg-brand-yellow/20 text-yellow-700';
      case 'design': return 'bg-purple-100 text-purple-700';
      case 'on_hold': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-brand-navy">Project Operations</h1>
            <p className="text-gray-500 mt-1">Master view of all customer projects and timelines.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
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
              <div className="p-8 text-center text-gray-500">Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FolderKanban size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="font-bold text-lg text-brand-navy mb-1">No projects found</p>
                <p>Try adjusting your search criteria.</p>
              </div>
            ) : (
              filteredProjects.map(project => (
                <div key={project.id} className="p-5 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FolderKanban size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-navy text-lg line-clamp-1">{project.projectName || 'Untitled Project'}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-mono mt-0.5">
                          <Calendar size={12} /> 
                          {project.createdAt ? new Date(project.createdAt.toMillis()).toLocaleDateString() : 'Unknown Date'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <User size={16} className="text-gray-400" /> <span className="truncate">{project.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-gray-400" /> 
                      <span className="truncate">{project.city || 'N/A'} {project.area ? `(${project.area} sqft)` : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(project.status || 'draft')}`}>
                      {(project.status || 'draft').replace('_', ' ')}
                    </span>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors"
                    >
                      Manage <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase tracking-wider text-gray-500 font-bold">
                  <th className="p-6">Project Details</th>
                  <th className="p-6">Customer</th>
                  <th className="p-6">Location</th>
                  <th className="p-6 text-center">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">Loading projects...</td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-500">
                      <FolderKanban size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="font-bold text-lg text-brand-navy mb-1">No projects found</p>
                      <p>Try adjusting your search criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map(project => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <FolderKanban size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-brand-navy">{project.projectName || 'Untitled Project'}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400 font-mono mt-0.5">
                              <Calendar size={12} /> 
                              {project.createdAt ? new Date(project.createdAt.toMillis()).toLocaleDateString() : 'Unknown Date'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <User size={14} className="text-gray-400" /> {project.customerEmail}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={14} className="text-gray-400" /> 
                          {project.city || 'N/A'} {project.area ? `(${project.area} sqft)` : ''}
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(project.status || 'draft')}`}>
                          {(project.status || 'draft').replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <Link
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors"
                        >
                          Manage <ChevronRight size={16} />
                        </Link>
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
