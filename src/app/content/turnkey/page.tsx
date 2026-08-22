"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function TurnkeyContentPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [content, setContent] = useState({
    heroTitle: 'Turnkey Project Packages',
    heroSubtitle: 'END-TO-END EXECUTION',
    heroDescription: 'From bare shell to fully furnished. Our turnkey packages provide a completely hassle-free interior execution experience with zero hidden costs.',
    features: [
      'Initial Design & 3D Visualization',
      'Material Selection & Procurement',
      'Civil Work & Flooring',
      'Custom Furniture Manufacturing',
      'Electrical & Plumbing Routing',
      'False Ceiling & Lighting',
      'Painting & Wall Treatments',
      'Final Deep Cleaning & Handover'
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'pageContent', 'turnkey');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setContent(snap.data() as any);
        }
      } catch (err) {
        console.error("Error fetching turnkey content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'pageContent', 'turnkey'), content);
      alert('Content saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save content.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = value;
    setContent(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setContent(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = content.features.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, features: newFeatures }));
  };

  if (loading) {
    return <div className="p-8">Loading content...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">Turnkey Page Content</h1>
          <p className="text-gray-500 font-medium mt-1">Manage the content shown on the /pricing/packages page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-yellow text-brand-navy px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        
        <div>
          <h2 className="text-xl font-bold text-brand-navy mb-4 border-b pb-2">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Badge / Subtitle</label>
              <input 
                type="text" 
                value={content.heroSubtitle}
                onChange={e => updateField('heroSubtitle', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Main Title</label>
              <input 
                type="text" 
                value={content.heroTitle}
                onChange={e => updateField('heroTitle', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
              <textarea 
                rows={3}
                value={content.heroDescription}
                onChange={e => updateField('heroDescription', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-brand-navy">Included Features</h2>
            <button 
              onClick={addFeature}
              className="text-sm font-bold text-brand-navy flex items-center gap-1 hover:text-brand-yellow"
            >
              <Plus size={16} /> Add Feature
            </button>
          </div>
          
          <div className="space-y-3">
            {content.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium"
                  placeholder="e.g. Initial Design & 3D Visualization"
                />
                <button 
                  onClick={() => removeFeature(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
