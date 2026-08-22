"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

import { Box, Plus, Edit2, Trash2, GripVertical, Check, X, Upload, PlusCircle, MinusCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  iconName: string;
  startingPrice: number;
  features: string[];
  seoTitle: string;
  seoDescription: string;
  isActive: boolean;
  sortOrder: number;
}

export default function ServicesManagementPage() {
  const { user } = useAuth();
  
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Home');
  const [startingPrice, setStartingPrice] = useState(0);
  const [features, setFeatures] = useState<string[]>(['']);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchServices();
  }, [user]);

  const fetchServices = async () => {
    try {
      const snap = await getDocs(collection(db, 'services'));
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Service));
      data.sort((a, b) => a.sortOrder - b.sortOrder);
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setName(service.name);
      setDescription(service.description);
      setIconName(service.iconName || 'Home');
      setStartingPrice(service.startingPrice || 0);
      setFeatures(service.features?.length > 0 ? service.features : ['']);
      setSeoTitle(service.seoTitle || '');
      setSeoDescription(service.seoDescription || '');
      setImageUrl(service.imageUrl || '');
      setIsActive(service.isActive);
    } else {
      setEditingService(null);
      setName('');
      setDescription('');
      setIconName('Home');
      setStartingPrice(0);
      setFeatures(['']);
      setSeoTitle('');
      setSeoDescription('');
      setImageUrl('');
      setIsActive(true);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => {
    if (features.length === 1) return;
    setFeatures(features.filter((_, i) => i !== index));
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
        const storageRef = ref(storage, `services/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (!finalImageUrl) {
        alert("A cover image is required for services.");
        setUploading(false);
        return;
      }

      const id = editingService ? editingService.id : doc(collection(db, 'services')).id;
      
      const payload: Service = {
        id,
        name,
        description,
        iconName,
        startingPrice,
        features: features.filter(f => f.trim() !== ''),
        seoTitle,
        seoDescription,
        imageUrl: finalImageUrl,
        isActive,
        sortOrder: editingService ? editingService.sortOrder : services.length
      };

      await setDoc(doc(db, 'services', id), payload);
      
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to save service.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service? This may break links on the public site.')) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      await updateDoc(doc(db, 'services', service.id), { isActive: !service.isActive });
      fetchServices();
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
            <h1 className="text-3xl font-black text-brand-navy">Services Management</h1>
            <p className="text-gray-500 mt-1">Manage the core offerings displayed on the website.</p>
          </div>
          
          <button 
            onClick={() => handleOpenModal()}
            className="bg-brand-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Service
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase tracking-wider text-gray-500 font-bold">
                <th className="p-6 w-16"></th>
                <th className="p-6">Cover</th>
                <th className="p-6">Service Details</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading services...</td></tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <Box size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="font-bold text-lg text-brand-navy mb-1">No services defined</p>
                    <p>Add your primary services to display on the public site.</p>
                  </td>
                </tr>
              ) : (
                services.map(service => (
                  <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 text-center cursor-move text-gray-400 hover:text-brand-navy">
                      <GripVertical size={20} />
                    </td>
                    <td className="p-6">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        {service.imageUrl ? (
                          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><Box size={24}/></div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="font-bold text-brand-navy text-lg">{service.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{service.description}</p>
                      <p className="text-xs font-bold text-brand-yellow mt-2">Starts at ₹{service.startingPrice?.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="p-6 text-center">
                      <button 
                        onClick={() => toggleActive(service)}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                          service.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {service.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-6 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => handleOpenModal(service)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-block">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors inline-block">
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
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                <Box className="text-brand-yellow" />
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-2 bg-white rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-8 overflow-y-auto">
              
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Core Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Name</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" placeholder="e.g. Turnkey Interiors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Starting Price (₹)</label>
                    <input type="number" required value={startingPrice} onChange={e => setStartingPrice(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none" placeholder="Detailed description of the service..." />
                </div>
              </div>

              {/* Media & Icon */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Visuals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image (Required)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
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
                            <Upload size={14} /> Upload Image
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
                          </label>
                        </div>
                      )}
                      {imageFile && <p className="text-xs text-brand-navy font-bold mt-2 truncate">{imageFile.name}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Lucide Icon Name</label>
                    <p className="text-xs text-gray-500 mb-2">Used for small icon representations (e.g. Home, Layout, PaintBrush)</p>
                    <input type="text" value={iconName} onChange={e => setIconName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none mb-4" />
                    
                    <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-400 bg-white'}`}>
                        {isActive && <Check size={16} />}
                      </div>
                      <div>
                        <p className="font-bold text-brand-navy">Active Service</p>
                        <p className="text-[10px] text-gray-500">Uncheck to hide from public menus</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <h3 className="font-bold text-gray-900">Key Features List</h3>
                  <button type="button" onClick={addFeature} className="text-sm font-bold text-brand-navy hover:text-brand-yellow flex items-center gap-1">
                    <PlusCircle size={16}/> Add Feature
                  </button>
                </div>
                <div className="space-y-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={feature} 
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder="e.g. 10 Year Warranty"
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none text-sm"
                      />
                      <button type="button" onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-600 p-2">
                        <MinusCircle size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">SEO Settings</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">SEO Title Tag</label>
                    <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none text-sm" placeholder="Leave blank to use Service Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">SEO Meta Description</label>
                    <textarea rows={2} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none text-sm" placeholder="Search engine description..." />
                  </div>
                </div>
              </div>

            </form>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors" disabled={uploading}>Cancel</button>
              <button onClick={handleSave} disabled={uploading} className="bg-brand-navy text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-lg disabled:opacity-70 flex items-center gap-2">
                {uploading ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
