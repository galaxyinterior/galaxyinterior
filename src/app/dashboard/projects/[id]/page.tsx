"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, MapPin, IndianRupee, Clock, FileText, 
  Users, AlertCircle, Building, CheckCircle2, ChevronRight, MessageSquare, Download
} from 'lucide-react';
import { ProjectTimeline } from '@/components/dashboard/ProjectTimeline';

export default function ProjectDetailPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const router = useRouter();
  
  const [project, setProject] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !id) return;
      try {
        const docRef = doc(db, 'projects', id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Security check: Only the owner can view this project
          if (data.customerId !== user.uid) {
            setError('Access Denied. You do not have permission to view this project.');
            return;
          }
          setProject({ id: docSnap.id, ...data });

          // Fetch Updates (Phase 13)
          const updatesRef = collection(db, 'projects', id as string, 'updates');
          const updatesSnap = await getDocs(updatesRef);
          const updatesData = updatesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          updatesData.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
          setUpdates(updatesData);
          
          // Fetch Documents (Phase 14)
          const docsRef = collection(db, 'projects', id as string, 'documents');
          const docsSnap = await getDocs(docsRef);
          const docsData = docsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          docsData.sort((a: any, b: any) => (b.uploadedAt?.toMillis() || 0) - (a.uploadedAt?.toMillis() || 0));
          setDocuments(docsData);
          
        } else {
          setError('Project not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [user, id]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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

  const formatCurrency = (amount: number) => {
    if (!amount) return 'TBD';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return 'N/A';
    return timestamp.toDate().toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
        <div className="h-32 bg-white border border-gray-100 rounded-2xl mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-white border border-gray-100 rounded-2xl"></div>
          <div className="h-96 bg-white border border-gray-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
        <p className="text-gray-500 mb-8">{error}</p>
        <Link href="/dashboard/projects" className="text-brand-navy font-bold hover:underline">
          Return to My Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link href="/dashboard/projects" className="text-gray-500 hover:text-brand-navy text-sm font-bold flex items-center gap-1 mb-6 w-fit">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-1.5 text-xs font-bold rounded-full border uppercase tracking-wider ${getStatusColor(project?.status)}`}>
                {project?.status}
              </span>
              <span className="text-sm font-medium text-gray-500">
                Created on {formatDate(project?.createdAt)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-brand-navy mb-2">{project?.projectName}</h1>
            <p className="text-lg text-gray-600">{project?.projectType}</p>
          </div>
          
          <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200">
            <IndianRupee size={24} className="text-brand-yellow shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Est. Budget</p>
              <p className="text-xl font-black text-brand-navy">{formatCurrency(project?.budget)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Details) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Property Details */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
              <Building className="text-brand-yellow" size={24} />
              Property Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Property Type</p>
                <p className="font-medium text-gray-900">{project?.propertyType || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Approximate Area</p>
                <p className="font-medium text-gray-900">{project?.area ? `${project.area} Sq. Ft.` : 'N/A'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <MapPin size={14} /> Location
                </p>
                <p className="font-medium text-gray-900">{project?.location || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
              <FileText className="text-brand-yellow" size={24} />
              Requirements & Preferences
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Specific Requirements</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{project?.requirements || 'No specific requirements provided.'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Design Preferences & Timeline</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{project?.description || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Timeline */}
          <ProjectTimeline currentStatus={project?.status} />

          {/* Project Updates (Phase 13) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mt-8">
            <h2 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
              <MessageSquare className="text-brand-yellow" size={24} />
              Recent Updates
            </h2>
            
            {updates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No updates have been posted yet.
              </div>
            ) : (
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="border-l-2 border-brand-yellow pl-4 py-1 relative">
                    <div className="absolute w-3 h-3 bg-brand-yellow rounded-full -left-[7px] top-2 border-2 border-white"></div>
                    <h3 className="font-bold text-gray-900">{update.title}</h3>
                    <p className="text-xs text-gray-400 mb-2">{formatDate(update.createdAt)}</p>
                    <p className="text-sm text-gray-600">{update.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (Sidebar Actions & Team) */}
        <div className="space-y-8">
          
          {/* Project Documents (Phase 14) */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
              <FileText className="text-brand-yellow" size={20} />
              Project Documents
            </h2>
            
            {documents.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">No documents available yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <a 
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors border border-gray-100 group"
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-gray-900 truncate">{doc.name}</p>
                      <p className="text-xs text-brand-yellow font-bold uppercase mt-0.5">{doc.type}</p>
                    </div>
                    <Download size={16} className="text-gray-400 group-hover:text-brand-navy transition-colors shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Action Center */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/dashboard/support" className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                <span className="flex items-center gap-2 text-sm font-bold"><MessageSquare size={16} /> Contact Support</span>
                <ChevronRight size={16} className="text-brand-yellow group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Assigned Team */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
              <Users className="text-brand-yellow" size={20} />
              Assigned Team
            </h2>
            
            {project?.assignedTeam && project.assignedTeam.length > 0 ? (
              <div className="space-y-4">
                {project.assignedTeam.map((member: any, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold">
                      {member.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{member}</p>
                      <p className="text-xs text-gray-500">Project Manager</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock size={20} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-900">Pending Assignment</p>
                <p className="text-xs text-gray-500 mt-1">Our team is reviewing your project.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
