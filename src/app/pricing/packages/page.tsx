"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Plus, Edit2, Trash2, Layers, Save, X, IndianRupee, CheckCircle2
} from 'lucide-react';
import { PricingPackage } from '../../../../../Galaxy_Interior/src/types/pricing';

export default function PricingPackagesPage() {
  const { user } = useAuth();
  
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialFormState: Omit<PricingPackage, 'packageId'> = {
    name: '',
    description: '',
    baseRate: 0,
    unit: 'sqft',
    features: [''],
    recommended: false,
    isActive: true
  };
  const [formData, setFormData] = useState<Omit<PricingPackage, 'packageId'>>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const snap = await getDocs(collection(db, 'pricingPackages'));
      const data = snap.docs.map(d => ({ packageId: d.id, ...d.data() } as PricingPackage));
      // Sort by baseRate ascending
      data.sort((a, b) => a.baseRate - b.baseRate);
      setPackages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (pkg?: PricingPackage) => {
    if (pkg) {
      setEditingId(pkg.packageId);
      const { packageId, ...rest } = pkg;
      setFormData({
        ...rest,
        features: rest.features.length > 0 ? rest.features : ['']
      });
    } else {
      setEditingId(null);
      setFormData(initialFormState);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    if (formData.features.length <= 1) return;
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    // Clean up empty features
    const cleanedFeatures = formData.features.filter(f => f.trim() !== '');
    const finalData = { ...formData, features: cleanedFeatures };

    setIsSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'pricingPackages', editingId), { ...finalData, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'pricingPackages'), { ...finalData, createdAt: serverTimestamp() });
      }
      await fetchData();
      handleCloseForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save package');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      await deleteDoc(doc(db, 'pricingPackages', id));
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'pricingPackages', id), { isActive: !currentStatus });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 font-bold text-gray-500">Loading base packages...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-navy mb-2">Base Packages</h1>
          <p className="text-gray-500">Manage the core pricing tiers (e.g. Essential, Premium, Luxury)</p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-brand-yellow text-brand-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-yellow/90 transition-colors shadow-lg"
        >
          <Plus size={20} /> New Package
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl mb-8 relative">
          <button onClick={handleCloseForm} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
            <X size={24} />
          </button>
          
          <h2 className="text-xl font-bold text-brand-navy mb-6">
            {editingId ? 'Edit Package' : 'Create New Package'}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Package Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                  placeholder="e.g. Essential Plan"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Base Rate (Per Sq.Ft)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <IndianRupee size={16} />
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.baseRate}
                      onChange={(e) => setFormData({...formData, baseRate: parseFloat(e.target.value) || 0})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Unit</label>
                  <input
                    type="text"
                    required
                    disabled
                    value={formData.unit}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none"
                rows={2}
                placeholder="Brief summary of who this package is for"
              />
            </div>

            {/* Features Array */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-bold text-brand-navy mb-4">Package Features (Displayed as Bullet Points)</label>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-brand-yellow shrink-0" />
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeFeature(index)}
                      className="text-gray-400 hover:text-red-500 p-2"
                      disabled={formData.features.length === 1}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button 
                type="button"
                onClick={addFeature}
                className="mt-4 text-sm font-bold text-brand-navy hover:text-brand-yellow flex items-center gap-1"
              >
                <Plus size={16} /> Add another feature
              </button>
            </div>

            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-yellow"
                />
                <label htmlFor="isActive" className="font-bold text-gray-700">Active</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="recommended"
                  checked={formData.recommended}
                  onChange={(e) => setFormData({...formData, recommended: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-yellow"
                />
                <label htmlFor="recommended" className="font-bold text-brand-yellow bg-brand-navy px-2 py-0.5 rounded text-sm uppercase">Mark as Recommended</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-brand-navy text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-navy/90 transition-colors disabled:opacity-70"
            >
              <Save size={20} /> {isSaving ? 'Saving...' : 'Save Package'}
            </button>
          </form>
        </div>
      )}

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.packageId} className={`bg-white rounded-2xl border-2 ${pkg.recommended ? 'border-brand-yellow shadow-xl relative' : 'border-gray-200 shadow-sm'} overflow-hidden flex flex-col`}>
            
            {pkg.recommended && (
              <div className="bg-brand-yellow text-brand-navy text-xs font-black uppercase tracking-wider text-center py-1.5 w-full absolute top-0 left-0">
                Most Popular
              </div>
            )}
            
            <div className={`p-6 border-b border-gray-100 flex-1 ${pkg.recommended ? 'pt-10' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-brand-navy">{pkg.name}</h3>
                <div className="flex gap-1">
                  <button onClick={() => handleOpenForm(pkg)} className="p-1.5 text-gray-400 hover:text-brand-navy transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(pkg.packageId)} className="p-1.5 text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-black text-brand-navy">₹{pkg.baseRate.toLocaleString('en-IN')}</span>
                <span className="text-gray-500 font-medium">/{pkg.unit}</span>
              </div>
              
              <p className="text-gray-500 text-sm mb-6">{pkg.description}</p>
              
              <ul className="space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 size={18} className="text-brand-yellow shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
              <button 
                onClick={() => handleToggleActive(pkg.packageId, pkg.isActive)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                  pkg.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {pkg.isActive ? 'Active in Calculator' : 'Hidden from Calculator'}
              </button>
            </div>
          </div>
        ))}

        {packages.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <Layers size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">No base packages defined.</p>
          </div>
        )}
      </div>

    </div>
  );
}
