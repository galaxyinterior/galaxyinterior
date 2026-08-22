"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

import { MessageSquare, Plus, Edit2, Trash2, Check, X, Upload, Star, User } from 'lucide-react';

interface Testimonial {
  id: string;
  customerName: string;
  name?: string;
  location: string;
  rating: number;
  review: string;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  isFeatured: boolean;
}

export default function TestimonialManagementPage() {
  const { user } = useAuth();
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('approved');
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, [user]);

  const fetchTestimonials = async () => {
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const data = snap.docs.map(d => {
        const docData = d.data();
        return { 
          id: d.id, 
          customerName: docData.customerName || docData.name || '',
          name: docData.name || docData.customerName || '',
          location: docData.location || docData.projectLocation || '',
          rating: docData.rating || 5,
          review: docData.review || docData.reviewText || '',
          imageUrl: docData.imageUrl || '',
          status: docData.status || (docData.isApproved ? 'approved' : 'pending'),
          isFeatured: docData.isFeatured || false
        } as Testimonial;
      });
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: Testimonial) => {
    if (item) {
      setEditingItem(item);
      setCustomerName(item.customerName || item.name || '');
      setLocation(item.location);
      setRating(item.rating);
      setReview(item.review);
      setStatus(item.status);
      setIsFeatured(item.isFeatured || false);
      setImageUrl(item.imageUrl || '');
    } else {
      setEditingItem(null);
      setCustomerName('');
      setLocation('');
      setRating(5);
      setReview('');
      setStatus('approved');
      setIsFeatured(false);
      setImageUrl('');
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        if (imageFile.size > 2 * 1024 * 1024) {
          alert('Image size exceeds 2MB limit.');
          setUploading(false);
          return;
        }
        const storageRef = ref(storage, `reviews/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      const id = editingItem ? editingItem.id : doc(collection(db, 'reviews')).id;
      
      const payload = {
        customerName,
        name: customerName,
        location,
        rating,
        review,
        imageUrl: finalImageUrl,
        status,
        isFeatured,
        updatedAt: serverTimestamp(),
        ...(editingItem ? {} : { createdAt: serverTimestamp() })
      };

      await setDoc(doc(db, 'reviews', id), payload, { merge: true });
      
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert("Failed to save testimonial.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteDoc(doc(db, 'reviews', id));
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const toggleFeatured = async (item: Testimonial) => {
    try {
      await updateDoc(doc(db, 'reviews', item.id), { isFeatured: !item.isFeatured });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (item: Testimonial) => {
    const newStatus = item.status === 'approved' ? 'pending' : 'approved';
    try {
      await updateDoc(doc(db, 'reviews', item.id), { status: newStatus });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-brand-navy">Testimonials & Reviews</h1>
            <p className="text-gray-500 mt-1">Manage customer reviews for the public website.</p>
          </div>
          
          <button 
            onClick={() => handleOpenModal()}
            className="bg-brand-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Review
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-500">Loading reviews...</div>
          ) : testimonials.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="font-bold text-lg text-brand-navy mb-1">No testimonials yet</p>
              <p>Add customer reviews to build trust on your public site.</p>
            </div>
          ) : (
            testimonials.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-1 text-brand-yellow">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} className={i >= item.rating ? "text-gray-300" : ""} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleFeatured(item)} className={item.isFeatured ? 'text-brand-yellow' : 'text-gray-300 hover:text-gray-400'} title="Feature on homepage">
                        <Star size={18} fill={item.isFeatured ? "currentColor" : "none"} />
                      </button>
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 italic text-sm line-clamp-4 mb-6">"{item.review}"</p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.customerName} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center border border-gray-200">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-brand-navy text-sm leading-tight">{item.customerName}</p>
                      <p className="text-xs text-gray-500 leading-tight">{item.location}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                  <button onClick={() => toggleStatus(item)} className={`text-xs font-bold ${item.status === 'approved' ? 'text-gray-500 hover:text-brand-navy' : 'text-emerald-600 hover:text-emerald-700'}`}>
                    {item.status === 'approved' ? 'Hide from public' : 'Approve for public'}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(item)} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                <MessageSquare className="text-brand-yellow" />
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2 bg-white rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Customer Name</label>
                  <input type="text" required value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Project/Location</label>
                  <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" placeholder="e.g. 3BHK, Andheri West" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star size={28} fill={star <= rating ? "#FBBF24" : "none"} className={star <= rating ? "text-brand-yellow" : "text-gray-300 hover:text-gray-400"} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Review Text</label>
                <textarea required rows={4} value={review} onChange={e => setReview(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none" />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                  {imageUrl && !imageFile ? (
                    <img src={imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Customer Photo (Optional)</label>
                  <input type="file" accept="image/*" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-yellow/20 file:text-brand-navy hover:file:bg-brand-yellow/30" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${status === 'approved' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-400 bg-white'}`}>
                    {status === 'approved' && <Check size={16} />}
                  </div>
                  <input type="checkbox" className="hidden" checked={status === 'approved'} onChange={e => setStatus(e.target.checked ? 'approved' : 'pending')} />
                  <span className="font-bold text-sm text-brand-navy">Approved for Public</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${isFeatured ? 'bg-brand-yellow border-brand-yellow text-brand-navy' : 'border-gray-400 bg-white'}`}>
                    {isFeatured && <Check size={16} />}
                  </div>
                  <input type="checkbox" className="hidden" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                  <span className="font-bold text-sm text-brand-navy">Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors" disabled={uploading}>Cancel</button>
                <button type="submit" disabled={uploading} className="bg-brand-navy text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-lg disabled:opacity-70 flex items-center gap-2">
                  {uploading ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
