"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Plus, Edit2, Trash2, Tag, AlertCircle, Save, X, GripVertical
} from 'lucide-react';
import { PricingCategory } from '@/types/pricing'; // Reusing type from main app if possible, or redefine locally.

// Since apps are separate, redefining type locally to avoid tricky relative imports
interface Category {
  id?: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export default function PricingCategoriesPage() {
  const { user } = useAuth();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Category>({
    name: '',
    description: '',
    sortOrder: 0,
    isActive: true
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'pricingCategories'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      data.sort((a, b) => a.sortOrder - b.sortOrder);
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (category?: Category) => {
    if (category) {
      setEditingId(category.id!);
      setFormData(category);
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        sortOrder: categories.length > 0 ? categories[categories.length - 1].sortOrder + 10 : 0,
        isActive: true
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
    if (!formData.name) return;
    
    setIsSaving(true);
    try {
      if (editingId) {
        // Update
        const docRef = doc(db, 'pricingCategories', editingId);
        await updateDoc(docRef, { ...formData, updatedAt: serverTimestamp() });
      } else {
        // Create
        await addDoc(collection(db, 'pricingCategories'), { ...formData, createdAt: serverTimestamp() });
      }
      await fetchCategories();
      handleCloseForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This might affect pricing items linked to it.')) return;
    
    try {
      await deleteDoc(doc(db, 'pricingCategories', id));
      await fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Failed to delete category');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'pricingCategories', id), { isActive: !currentStatus });
      await fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 font-bold text-gray-500">Loading categories...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-navy mb-2">Pricing Categories</h1>
          <p className="text-gray-500">Manage logical groupings for pricing items (e.g. Flooring, Civil Work)</p>
        </div>
        <button 
          onClick={() => handleOpenForm()}
          className="bg-brand-yellow text-brand-navy font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-yellow/90 transition-colors shadow-lg"
        >
          <Plus size={20} /> New Category
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl mb-8 relative">
          <button onClick={handleCloseForm} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
            <X size={24} />
          </button>
          
          <h2 className="text-xl font-bold text-brand-navy mb-6">
            {editingId ? 'Edit Category' : 'Create New Category'}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                  placeholder="e.g. Flooring & Tiling"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sort Order</label>
                <input
                  type="number"
                  required
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none"
                rows={3}
                placeholder="Brief description of what goes in this category"
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
              <label htmlFor="isActive" className="font-bold text-gray-700">Category is active and visible in calculator</label>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="bg-brand-navy text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-navy/90 transition-colors disabled:opacity-70"
            >
              <Save size={20} /> {isSaving ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
              <th className="p-4 w-16 text-center">Order</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Description</th>
              <th className="p-4 w-32 text-center">Status</th>
              <th className="p-4 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  <Tag size={48} className="mx-auto mb-4 text-gray-300" />
                  No categories found. Click "New Category" to create one.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-center font-bold text-gray-400">{cat.sortOrder}</td>
                  <td className="p-4 font-bold text-brand-navy">{cat.name}</td>
                  <td className="p-4 text-gray-500 text-sm truncate max-w-xs">{cat.description}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleToggleActive(cat.id!, cat.isActive)}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors ${
                        cat.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenForm(cat)}
                        className="p-2 text-gray-400 hover:text-brand-navy bg-white hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id!)}
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
}
