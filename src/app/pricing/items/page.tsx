"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Plus, Edit2, Trash2, Box, Save, X, IndianRupee, Percent
} from 'lucide-react';
import { PricingItem, PricingCategory, PricingType } from '@/types/pricing';

export default function PricingItemsPage() {
  const { user } = useAuth();
  
  const [items, setItems] = useState<PricingItem[]>([]);
  const [categories, setCategories] = useState<PricingCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialFormState: Omit<PricingItem, 'itemId'> = {
    categoryId: '',
    name: '',
    description: '',
    unit: '',
    price: 0,
    pricingType: 'per_sqft',
    isActive: true
  };
  const [formData, setFormData] = useState<Omit<PricingItem, 'itemId'>>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catSnap, itemSnap] = await Promise.all([
        getDocs(collection(db, 'pricingCategories')),
        getDocs(collection(db, 'pricingItems'))
      ]);

      const cats = catSnap.docs.map(d => ({ categoryId: d.id, ...d.data() } as PricingCategory));
      cats.sort((a, b) => a.sortOrder - b.sortOrder);
      setCategories(cats);

      const itemsData = itemSnap.docs.map(d => ({ itemId: d.id, ...d.data() } as PricingItem));
      setItems(itemsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (item?: PricingItem) => {
    if (item) {
      setEditingId(item.itemId);
      const { itemId, ...rest } = item;
      setFormData(rest);
    } else {
      setEditingId(null);
      setFormData({
        ...initialFormState,
        categoryId: categories.length > 0 ? categories[0].categoryId : ''
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.categoryId) return;
    
    setIsSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'pricingItems', editingId), { ...formData, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'pricingItems'), { ...formData, createdAt: serverTimestamp() });
      }
      await fetchData();
      handleCloseForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save item');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item? It will be removed from the public calculator.')) return;
    try {
      await deleteDoc(doc(db, 'pricingItems', id));
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'pricingItems', id), { isActive: !currentStatus });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 font-bold text-gray-500">Loading pricing items...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-navy mb-2">Pricing Items (Add-ons)</h1>
          <p className="text-gray-500">Manage individual components, materials, and services available in the calculator</p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-brand-yellow text-brand-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-yellow/90 transition-colors shadow-lg"
        >
          <Plus size={20} /> New Item
        </button>
      </div>

      {categories.length === 0 && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 font-bold mb-8">
          Warning: You have no active Pricing Categories. You must create at least one category before adding items.
        </div>
      )}

      {isFormOpen && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl mb-8 relative">
          <button onClick={handleCloseForm} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
            <X size={24} />
          </button>
          
          <h2 className="text-xl font-bold text-brand-navy mb-6">
            {editingId ? 'Edit Item' : 'Create New Item'}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Item Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                  placeholder="e.g. Italian Marble Flooring"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  required
                  value={formData.categoryId}
                  onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none bg-white"
                >
                  <option value="" disabled>Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Pricing Type</label>
                <select
                  required
                  value={formData.pricingType}
                  onChange={(e) => setFormData({...formData, pricingType: e.target.value as PricingType})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none bg-white"
                >
                  <option value="per_sqft">Per Sq.Ft (Multiplies by Project Area)</option>
                  <option value="fixed">Fixed Cost (Lumpsum flat fee)</option>
                  <option value="percentage">Percentage (Multiplier on running total)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Rate / Price</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      {formData.pricingType === 'percentage' ? <Percent size={16} /> : <IndianRupee size={16} />}
                    </div>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Unit Display Label</label>
                  <input
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                    placeholder="e.g. sq.ft, lumpsum, %"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none"
                rows={2}
                placeholder="Optional description shown in the calculator tooltip"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="w-5 h-5 rounded border-gray-300 text-brand-navy focus:ring-brand-yellow"
              />
              <label htmlFor="isActive" className="font-bold text-gray-700">Item is active and available in calculator</label>
            </div>

            <button
              type="submit"
              disabled={isSaving || categories.length === 0}
              className="bg-brand-navy text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-navy/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save size={20} /> {isSaving ? 'Saving...' : 'Save Item'}
            </button>
          </form>
        </div>
      )}

      {/* Render grouped by categories */}
      {categories.map(category => {
        const categoryItems = items.filter(item => item.categoryId === category.categoryId);
        
        return (
          <div key={category.categoryId} className="mb-8">
            <h2 className="text-xl font-bold text-brand-navy mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-brand-yellow rounded-full"></span>
              {category.name} <span className="text-sm font-medium text-gray-400">({categoryItems.length} items)</span>
            </h2>
            
            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto shadow-sm">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                    <th className="p-4">Item Name</th>
                    <th className="p-4 w-32">Type</th>
                    <th className="p-4 w-40 text-right">Rate</th>
                    <th className="p-4 w-32 text-center">Status</th>
                    <th className="p-4 w-32 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        <Box size={32} className="mx-auto mb-4 text-gray-300" />
                        No items in this category.
                      </td>
                    </tr>
                  ) : (
                    categoryItems.map((item) => (
                      <tr key={item.itemId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-brand-navy">{item.name}</p>
                          {item.description && <p className="text-xs text-gray-500 mt-1 truncate max-w-xs">{item.description}</p>}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold font-mono">
                            {item.pricingType}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          {item.pricingType === 'percentage' ? (
                            <>{item.price}%</>
                          ) : (
                            <>₹{item.price.toLocaleString('en-IN')}</>
                          )}
                          <span className="block text-xs font-normal text-gray-400">/{item.unit}</span>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => handleToggleActive(item.itemId!, item.isActive)}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${
                              item.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleOpenForm(item)}
                              className="p-2 text-gray-400 hover:text-brand-navy bg-white hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.itemId!)}
                              className="p-2 text-red-400 hover:text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

    </div>
  );
}
