"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, collection, addDoc, serverTimestamp, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Send, Image as ImageIcon, AlertCircle, Clock, UploadCloud, FileText, Trash2, Link as LinkIcon
} from 'lucide-react';

export default function AdminProjectDetail() {
  const { user } = useAuth();
  const { id } = useParams();
  const router = useRouter();
  
  const [project, setProject] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Update State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postingUpdate, setPostingUpdate] = useState(false);

  // Document Upload State
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docType, setDocType] = useState('quotation');
  const [docName, setDocName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProjectAndUpdates = async () => {
      if (!user || !id) return;
      try {
        const docRef = doc(db, 'projects', id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
          
          // Fetch Updates
          const updatesRef = collection(db, 'projects', id as string, 'updates');
          const updatesSnap = await getDocs(updatesRef);
          const updatesData = updatesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          updatesData.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
          setUpdates(updatesData);

          // Fetch Documents
          const docsRef = collection(db, 'projects', id as string, 'documents');
          const docsSnap = await getDocs(docsRef);
          const docsData = docsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          docsData.sort((a: any, b: any) => (b.uploadedAt?.toMillis() || 0) - (a.uploadedAt?.toMillis() || 0));
          setDocuments(docsData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndUpdates();
  }, [user, id]);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !user) return;
    
    setPostingUpdate(true);
    try {
      const updatesRef = collection(db, 'projects', id as string, 'updates');
      const newUpdate = {
        title,
        description,
        images: [], // Placeholder for future file uploads
        postedBy: user.uid,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(updatesRef, newUpdate);
      
      // Optimistic UI update
      setUpdates([{ id: docRef.id, ...newUpdate, createdAt: { toDate: () => new Date() } }, ...updates]);
      
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert("Failed to post update.");
    } finally {
      setPostingUpdate(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;
    try {
      const docRef = doc(db, 'projects', id as string);
      await updateDoc(docRef, { status: newStatus, updatedAt: serverTimestamp() });
      setProject({ ...project, status: newStatus });
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !user || !id) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }

    setUploadingDoc(true);
    try {
      // 1. Upload to Storage
      const storageRef = ref(storage, `projects/${id}/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      // 2. Save Metadata to Firestore
      const docsRef = collection(db, 'projects', id as string, 'documents');
      const newDoc = {
        name: docName || selectedFile.name,
        type: docType,
        url: downloadURL,
        storagePath: storageRef.fullPath,
        uploadedBy: user.uid,
        uploadedAt: serverTimestamp(),
      };
      const docResult = await addDoc(docsRef, newDoc);

      setDocuments([{ id: docResult.id, ...newDoc, uploadedAt: { toDate: () => new Date() } }, ...documents]);
      setDocName('');
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload document.");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDeleteDoc = async (docId: string, storagePath: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    
    try {
      // 1. Delete from Storage
      const fileRef = ref(storage, storagePath);
      await deleteObject(fileRef);

      // 2. Delete from Firestore
      await deleteDoc(doc(db, 'projects', id as string, 'documents', docId));

      setDocuments(documents.filter(d => d.id !== docId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete document.");
    }
  };

  if (loading) return <div className="p-8">Loading project details...</div>;
  if (!project) return <div className="p-8 text-red-500">Project not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Link href="/projects" className="text-gray-500 hover:text-brand-navy text-sm font-bold flex items-center gap-1 mb-6 w-fit">
        <ArrowLeft size={16} /> Back to Projects
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-brand-navy mb-2">{project.projectName}</h1>
          <p className="text-gray-500">{project.propertyType} • {project.location}</p>
        </div>
        
        {/* Admin Status Controller */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Update Status</label>
          <select 
            value={project.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 font-bold text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          >
            <option value="Submitted">Submitted</option>
            <option value="Planning">Planning</option>
            <option value="Design">Design Phase</option>
            <option value="Quotation">Quotation</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Post Update Form */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold text-brand-navy mb-6">Post Project Update</h2>
          
          <form onSubmit={handlePostUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Update Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                placeholder="e.g. Sourcing Materials"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none"
                placeholder="What happened today?"
              />
            </div>

            <button
              type="submit"
              disabled={postingUpdate}
              className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
            >
              <Send size={18} />
              {postingUpdate ? 'Posting...' : 'Publish Update'}
            </button>
          </form>

          {/* Divider */}
          <div className="h-px bg-gray-100 my-8"></div>

          {/* Post Document Form */}
          <h2 className="text-xl font-bold text-brand-navy mb-6">Upload Document</h2>
          
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doc Type</label>
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                >
                  <option value="quotation">Quotation</option>
                  <option value="boq">BOQ</option>
                  <option value="design">Design File</option>
                  <option value="invoice">Invoice</option>
                  <option value="agreement">Agreement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doc Name</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                  placeholder="e.g. Final BOQ"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">File (Max 5MB)</label>
              <input
                type="file"
                required
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-brand-navy hover:file:bg-gray-200"
              />
            </div>

            <button
              type="submit"
              disabled={uploadingDoc || !selectedFile}
              className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
            >
              <UploadCloud size={18} />
              {uploadingDoc ? 'Uploading...' : 'Upload Document'}
            </button>
          </form>
        </div>

        {/* Timeline Updates Log */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-brand-navy mb-6">Update History</h2>
          
          {updates.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <Clock size={32} className="mx-auto mb-3 text-gray-300" />
              <p>No updates posted yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {updates.map((update) => (
                <div key={update.id} className="border-l-2 border-brand-yellow pl-4 py-1 relative">
                  <div className="absolute w-3 h-3 bg-brand-yellow rounded-full -left-[7px] top-2 border-2 border-white"></div>
                  <h3 className="font-bold text-gray-900">{update.title}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {update.createdAt?.toDate ? update.createdAt.toDate().toLocaleString() : 'Just now'}
                  </p>
                  <p className="text-sm text-gray-600">{update.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gray-100 my-8"></div>

          <h2 className="text-xl font-bold text-brand-navy mb-6">Project Documents</h2>
          
          {documents.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <FileText size={32} className="mx-auto mb-3 text-gray-300" />
              <p>No documents uploaded yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-navy shadow-sm">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{doc.name}</h4>
                      <div className="flex gap-2 items-center text-xs text-gray-500">
                        <span className="uppercase font-bold text-brand-yellow">{doc.type}</span>
                        <span>•</span>
                        <span>{doc.uploadedAt?.toDate ? doc.uploadedAt.toDate().toLocaleDateString() : 'Just now'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a 
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-brand-navy bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                      title="View/Download"
                    >
                      <LinkIcon size={16} />
                    </a>
                    <button 
                      onClick={() => handleDeleteDoc(doc.id, doc.storagePath)}
                      className="p-2 text-red-500 hover:text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors border border-red-100"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
