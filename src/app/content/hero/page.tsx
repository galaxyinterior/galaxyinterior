"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

import { Image as ImageIcon, Plus, Edit2, Trash2, GripVertical, Check, X, Upload } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  mobileImageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export default function HeroContentPage() {
  const { user } = useAuth();
  
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [ctaText, setCtaText] = useState('Get a Free Quote');
  const [ctaUrl, setCtaUrl] = useState('/contact');
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [mobileImageUrl, setMobileImageUrl] = useState('');

  // Image files to upload
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [mobileImageFile, setMobileImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSlides();
  }, [user]);

  const fetchSlides = async () => {
    try {
      const snap = await getDocs(collection(db, 'heroSlides'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as HeroSlide));
      data.sort((a, b) => a.sortOrder - b.sortOrder);
      setSlides(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (slide?: HeroSlide) => {
    if (slide) {
      setEditingSlide(slide);
      setTitle(slide.title);
      setSubtitle(slide.subtitle);
      setCtaText(slide.ctaText);
      setCtaUrl(slide.ctaUrl);
      setImageUrl(slide.imageUrl);
      setMobileImageUrl(slide.mobileImageUrl || '');
      setIsActive(slide.isActive);
    } else {
      setEditingSlide(null);
      setTitle('');
      setSubtitle('');
      setCtaText('Get a Free Quote');
      setCtaUrl('/contact');
      setImageUrl('');
      setMobileImageUrl('');
      setIsActive(true);
    }
    setImageFile(null);
    setMobileImageFile(null);
    setIsModalOpen(true);
  };

  const validateImage = (file: File) => {
    // Phase 32: Media Optimization Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file format. Please upload a JPG, PNG, or WebP image.');
      return false;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      alert('Image size exceeds 2MB. Please compress your image for faster loading.');
      return false;
    }
    return true;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = imageUrl;
      let finalMobileImageUrl = mobileImageUrl;

      // Upload Desktop Image if changed
      if (imageFile) {
        if (!validateImage(imageFile)) {
          setUploading(false);
          return;
        }
        const storageRef = ref(storage, `hero/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      // Upload Mobile Image if changed
      if (mobileImageFile) {
        if (!validateImage(mobileImageFile)) {
          setUploading(false);
          return;
        }
        const storageRef = ref(storage, `hero/mobile_${Date.now()}_${mobileImageFile.name}`);
        const snapshot = await uploadBytes(storageRef, mobileImageFile);
        finalMobileImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (!finalImageUrl) {
        alert("Desktop image is required.");
        setUploading(false);
        return;
      }

      const id = editingSlide ? editingSlide.id : doc(collection(db, 'heroSlides')).id;
      
      const payload: HeroSlide = {
        id,
        title,
        subtitle,
        ctaText,
        ctaUrl,
        imageUrl: finalImageUrl,
        mobileImageUrl: finalMobileImageUrl,
        isActive,
        sortOrder: editingSlide ? editingSlide.sortOrder : slides.length
      };

      await setDoc(doc(db, 'heroSlides', id), payload);
      
      setIsModalOpen(false);
      fetchSlides();
    } catch (err) {
      console.error(err);
      alert("Failed to save slide.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    try {
      await deleteDoc(doc(db, 'heroSlides', id));
      fetchSlides();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    try {
      await updateDoc(doc(db, 'heroSlides', slide.id), { isActive: !slide.isActive });
      fetchSlides();
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
            <h1 className="text-3xl font-black text-brand-navy">Hero Slideshow</h1>
            <p className="text-gray-500 mt-1">Manage the dynamic carousel on the public homepage.</p>
          </div>
          
          <button 
            onClick={() => handleOpenModal()}
            className="bg-brand-yellow text-brand-navy font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add New Slide
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase tracking-wider text-gray-500 font-bold">
                <th className="p-6 w-16"></th>
                <th className="p-6">Media</th>
                <th className="p-6">Content</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading slides...</td></tr>
              ) : slides.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="font-bold text-lg text-brand-navy mb-1">No slides added</p>
                    <p>Add your first slide to display on the homepage.</p>
                  </td>
                </tr>
              ) : (
                slides.map(slide => (
                  <tr key={slide.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 text-center cursor-move text-gray-400 hover:text-brand-navy">
                      <GripVertical size={20} />
                    </td>
                    <td className="p-6">
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        {slide.imageUrl ? (
                          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={24}/></div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-brand-navy">{slide.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{slide.subtitle}</p>
                    </td>
                    <td className="p-6 text-center">
                      <button 
                        onClick={() => toggleActive(slide)}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                          slide.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {slide.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-6 text-right space-x-2">
                      <button onClick={() => handleOpenModal(slide)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(slide.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                <ImageIcon className="text-brand-yellow" />
                {editingSlide ? 'Edit Slide' : 'Add New Slide'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2 bg-white rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto">
              
              {/* Media Section */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Media Assets</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Desktop Image */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-sm text-gray-700 mb-2">Desktop Image (Required)</p>
                    {imageUrl && !imageFile ? (
                      <div className="relative w-full h-32 mb-2 rounded-lg overflow-hidden group">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="cursor-pointer text-white text-xs font-bold px-3 py-1 bg-brand-navy rounded-full">
                            Change Image
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-32 mb-2 bg-gray-50 flex items-center justify-center rounded-lg">
                        <label className="cursor-pointer text-brand-navy text-xs font-bold px-4 py-2 bg-brand-yellow/20 rounded-full hover:bg-brand-yellow transition-colors flex items-center gap-2">
                          <Upload size={14} /> Upload Desktop
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
                        </label>
                      </div>
                    )}
                    <p className="text-[10px] text-gray-400">1920x1080 (Max 2MB) • WebP/JPG/PNG</p>
                    {imageFile && <p className="text-xs text-brand-navy font-bold mt-2 break-all">{imageFile.name}</p>}
                  </div>

                  {/* Mobile Image */}
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                    <p className="font-bold text-sm text-gray-700 mb-2">Mobile Image (Optional)</p>
                    {mobileImageUrl && !mobileImageFile ? (
                      <div className="relative w-full h-32 mb-2 rounded-lg overflow-hidden group flex justify-center">
                        <img src={mobileImageUrl} alt="Mobile Preview" className="h-full w-auto object-cover max-w-full" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="cursor-pointer text-white text-xs font-bold px-3 py-1 bg-brand-navy rounded-full">
                            Change Image
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && setMobileImageFile(e.target.files[0])} />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-32 mb-2 bg-gray-50 flex items-center justify-center rounded-lg">
                        <label className="cursor-pointer text-brand-navy text-xs font-bold px-4 py-2 bg-brand-yellow/20 rounded-full hover:bg-brand-yellow transition-colors flex items-center gap-2">
                          <Upload size={14} /> Upload Mobile
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && setMobileImageFile(e.target.files[0])} />
                        </label>
                      </div>
                    )}
                    <p className="text-[10px] text-gray-400">1080x1920 (Max 2MB) • Used on phones</p>
                    {mobileImageFile && <p className="text-xs text-brand-navy font-bold mt-2 break-all">{mobileImageFile.name}</p>}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Slide Text</h3>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Headline</label>
                  <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" placeholder="e.g. Turnkey Interior Solutions" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subtitle</label>
                  <textarea required rows={2} value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none" placeholder="e.g. Transform your space with our award-winning designers." />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">CTA Button Text</label>
                    <input type="text" required value={ctaText} onChange={e => setCtaText(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">CTA Destination URL</label>
                    <input type="text" required value={ctaUrl} onChange={e => setCtaUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" />
                  </div>
                </div>
              </div>

              {/* Status */}
              <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-400 bg-white'}`}>
                  {isActive && <Check size={16} />}
                </div>
                <div>
                  <p className="font-bold text-brand-navy">Display on Homepage</p>
                  <p className="text-xs text-gray-500">Uncheck to hide this slide from the public without deleting it.</p>
                </div>
              </label>

            </form>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
                disabled={uploading}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={uploading}
                className="bg-brand-navy text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploading ? (
                  <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Uploading...</>
                ) : 'Save Slide'}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
