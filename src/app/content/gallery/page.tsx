"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

import { Image as ImageIcon, Plus, Trash2, Check, X, Upload, Star, Search, Filter } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: any;
}

const CATEGORIES = ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Office', 'Commercial'];

export default function GalleryManagementPage() {
  const { user } = useAuth();
  
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchImages();
  }, [user]);

  const fetchImages = async () => {
    try {
      const snap = await getDocs(collection(db, 'gallery_images'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as GalleryImage));
      data.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setTitle('');
    setDescription('');
    setCategory(CATEGORIES[0]);
    setIsFeatured(false);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("An image file is required.");
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const url = await getDownloadURL(snapshot.ref);

      const id = doc(collection(db, 'gallery_images')).id;
      
      const payload: GalleryImage = {
        id,
        title,
        description,
        category,
        imageUrl: url,
        isActive: true,
        isFeatured,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, 'gallery_images', id), payload);
      
      setIsModalOpen(false);
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      await deleteDoc(doc(db, 'gallery_images', id));
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const toggleStatus = async (id: string, field: 'isActive' | 'isFeatured', currentValue: boolean) => {
    try {
      await updateDoc(doc(db, 'gallery_images', id), { [field]: !currentValue });
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  const filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          img.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || img.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-brand-navy">Gallery Management</h1>
            <p className="text-gray-500 mt-1">Upload and categorize portfolio images for the public site.</p>
          </div>
          
          <button 
            onClick={handleOpenModal}
            className="bg-brand-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Upload Image
          </button>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search images..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-white shadow-sm"
            />
          </div>
          <div className="relative w-full md:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none bg-white shadow-sm appearance-none"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading gallery...</div>
        ) : filteredImages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">
            <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-bold text-lg text-brand-navy mb-1">No images found</p>
            <p>Upload your first portfolio image or adjust your search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map(img => (
              <div key={img.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                <div className="relative h-48 bg-gray-100">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    <span className="bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                      {img.category}
                    </span>
                    {!img.isActive && (
                      <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        Hidden
                      </span>
                    )}
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => toggleStatus(img.id, 'isFeatured', img.isFeatured)}
                      className={`p-2 rounded-full transition-colors ${img.isFeatured ? 'bg-brand-yellow text-brand-navy' : 'bg-white/20 text-white hover:bg-white/40'}`}
                      title={img.isFeatured ? 'Remove Featured' : 'Feature Image'}
                    >
                      <Star size={20} fill={img.isFeatured ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => toggleStatus(img.id, 'isActive', img.isActive)}
                      className={`p-2 rounded-full transition-colors ${img.isActive ? 'bg-white/20 text-white hover:bg-white/40' : 'bg-red-500 text-white hover:bg-red-600'}`}
                      title={img.isActive ? 'Hide from public' : 'Show to public'}
                    >
                      {img.isActive ? <X size={20} /> : <Check size={20} />}
                    </button>
                    <button 
                      onClick={() => handleDelete(img.id)}
                      className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate">{img.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{img.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                <Upload className="text-brand-yellow" /> Upload Image
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2 bg-white rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                {imageFile ? (
                  <div className="text-brand-navy font-bold">
                    <Check size={32} className="mx-auto mb-2 text-emerald-500" />
                    {imageFile.name}
                  </div>
                ) : (
                  <>
                    <ImageIcon size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="font-bold text-sm text-gray-700 mb-2">Select an image to upload</p>
                    <label className="cursor-pointer text-brand-navy text-xs font-bold px-4 py-2 bg-white shadow-sm border border-gray-200 rounded-full hover:border-brand-yellow inline-flex transition-colors">
                      Browse Files
                      <input type="file" accept="image/*" required className="hidden" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
                    </label>
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" placeholder="e.g. Modern Minimalist Kitchen" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none bg-white">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
                <textarea required rows={2} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none" placeholder="Brief details about the project..." />
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${isFeatured ? 'bg-brand-yellow border-brand-yellow text-brand-navy' : 'border-gray-400 bg-white'}`}>
                  {isFeatured && <Check size={16} />}
                </div>
                <div>
                  <p className="font-bold text-brand-navy">Feature on Homepage</p>
                  <p className="text-xs text-gray-500">Show this image in the main highlights section.</p>
                </div>
              </label>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors" disabled={uploading}>Cancel</button>
                <button type="submit" disabled={uploading} className="bg-brand-navy text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
                  {uploading ? 'Uploading...' : 'Save Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
