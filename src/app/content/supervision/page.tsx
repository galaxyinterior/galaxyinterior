"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Save, Plus, Trash2, ShieldCheck, Clock, Activity } from 'lucide-react';

export default function SupervisionContentPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [content, setContent] = useState({
    heroTitle: 'Site Supervision Support',
    heroSubtitle: 'EXPERT OVERSIGHT',
    heroDescription: 'Ensure your project is executed exactly to specification. Our site supervision packages give you expert engineers and project managers on-site to monitor quality, timeline, and budget.',
    cards: [
      { title: 'Quality Control', description: 'Strict adherence to approved materials and design blueprints.' },
      { title: 'Timeline Management', description: 'Daily progress tracking to ensure the project stays on schedule.' },
      { title: 'Cost Optimization', description: 'Preventing material wastage and unauthorized deviations.' }
    ],
    processSteps: [
      'Initial site assessment and measurement validation',
      'Daily/Weekly on-site engineer visits',
      'Detailed progress reports with photographs',
      'Coordination with third-party contractors',
      'Bill verification against actual measurements',
      'Final quality check and handover certification'
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'pageContent', 'supervision');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setContent(snap.data() as any);
        }
      } catch (err) {
        console.error("Error fetching supervision content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'pageContent', 'supervision'), content);
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

  const handleCardChange = (index: number, field: string, value: string) => {
    const newCards = [...content.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setContent(prev => ({ ...prev, cards: newCards }));
  };

  const handleProcessChange = (index: number, value: string) => {
    const newSteps = [...content.processSteps];
    newSteps[index] = value;
    setContent(prev => ({ ...prev, processSteps: newSteps }));
  };

  const addProcessStep = () => {
    setContent(prev => ({ ...prev, processSteps: [...prev.processSteps, ''] }));
  };

  const removeProcessStep = (index: number) => {
    const newSteps = content.processSteps.filter((_, i) => i !== index);
    setContent(prev => ({ ...prev, processSteps: newSteps }));
  };

  if (loading) {
    return <div className="p-8">Loading content...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">Supervision Page Content</h1>
          <p className="text-gray-500 font-medium mt-1">Manage the content shown on the /pricing/supervision page.</p>
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

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-10">
        
        {/* Hero Section */}
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

        {/* Feature Cards */}
        <div>
          <h2 className="text-xl font-bold text-brand-navy mb-4 border-b pb-2">Top Features (Cards)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {content.cards.map((card, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="mb-3">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Card {index + 1} Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                    className="w-full bg-white border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={card.description}
                    onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                    className="w-full bg-white border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium text-sm resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div>
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-brand-navy">Supervision Process Steps</h2>
            <button 
              onClick={addProcessStep}
              className="text-sm font-bold text-brand-navy flex items-center gap-1 hover:text-brand-yellow"
            >
              <Plus size={16} /> Add Step
            </button>
          </div>
          
          <div className="space-y-3">
            {content.processSteps.map((step, index) => (
              <div key={index} className="flex gap-2">
                <div className="w-8 h-10 flex items-center justify-center font-bold text-gray-400 shrink-0">
                  {index + 1}.
                </div>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleProcessChange(index, e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium"
                  placeholder="Describe the process step..."
                />
                <button 
                  onClick={() => removeProcessStep(index)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
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
