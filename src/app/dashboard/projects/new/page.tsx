"use client";

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { 
  Home, Building, PenTool, Wrench, 
  ArrowRight, ArrowLeft, CheckCircle, Target
} from 'lucide-react';
import Link from 'next/link';

const PROJECT_TYPES = [
  { id: 'Interior Design', icon: PenTool, description: 'Full interior planning & styling' },
  { id: 'Home Interior', icon: Home, description: 'Residential space makeover' },
  { id: 'Office Interior', icon: Building, description: 'Commercial workspace design' },
  { id: 'Construction', icon: Wrench, description: 'Ground-up building projects' },
  { id: 'Renovation', icon: Target, description: 'Remodeling existing spaces' },
  { id: 'Turnkey Project', icon: CheckCircle, description: 'End-to-end execution' },
];

export default function NewProjectWizard() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    projectType: '',
    propertyName: '',
    propertyType: 'Residential',
    location: '',
    area: '',
    budget: '',
    timeline: 'Flexible',
    designPreferences: '',
    requirements: ''
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.projectType) return setError('Please select a project type.');
    if (step === 2 && !formData.propertyName) return setError('Please enter a project name.');
    if (step === 3 && (!formData.location || !formData.area)) return setError('Please fill in all location details.');
    
    setError('');
    setStep(s => Math.min(s + 1, 5));
  };

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const docData = {
        customerId: user.uid,
        projectName: formData.propertyName,
        projectType: formData.projectType,
        propertyType: formData.propertyType,
        location: formData.location,
        area: Number(formData.area),
        budget: Number(formData.budget),
        requirements: formData.requirements,
        description: `Preferences: ${formData.designPreferences}. Timeline: ${formData.timeline}`,
        status: 'Submitted',
        assignedTeam: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'projects'), docData);
      router.push(`/dashboard/projects/${docRef.id}`);
    } catch (err: any) {
      console.error(err);
      setError('Failed to submit project. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header & Progress */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-brand-navy hover:underline text-sm font-bold flex items-center gap-1 mb-4">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Start a New Project</h1>
        <p className="text-gray-500 mt-2">Tell us about your space and requirements.</p>

        {/* Progress Bar */}
        <div className="mt-8 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="flex-1">
              <div className={`h-2 rounded-full ${step >= idx ? 'bg-brand-yellow' : 'bg-gray-200'}`} />
              <p className={`text-xs mt-2 font-bold ${step >= idx ? 'text-brand-navy' : 'text-gray-400'}`}>
                Step {idx}
              </p>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex flex-col justify-between">
        
        {/* STEP 1: Project Type */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-6">What type of project is this?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECT_TYPES.map(pt => (
                <button
                  key={pt.id}
                  onClick={() => updateForm('projectType', pt.id)}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    formData.projectType === pt.id 
                      ? 'border-brand-yellow bg-yellow-50/50 shadow-md' 
                      : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <pt.icon className={formData.projectType === pt.id ? 'text-brand-yellow' : 'text-gray-400'} size={32} />
                  <h3 className="font-bold text-gray-900 mt-4">{pt.id}</h3>
                  <p className="text-xs text-gray-500 mt-1">{pt.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Property Details */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <h2 className="text-2xl font-bold mb-2">Give your project a name</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                value={formData.propertyName}
                onChange={(e) => updateForm('propertyName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                placeholder="e.g., Downtown Apartment Renovation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                value={formData.propertyType}
                onChange={(e) => updateForm('propertyType', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Retail">Retail</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 3: Location & Area */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <h2 className="text-2xl font-bold mb-2">Location & Size</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Location (City/Address)</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateForm('location', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                placeholder="e.g., Bandra West, Mumbai"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Approximate Area (Sq. Ft.)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => updateForm('area', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                placeholder="e.g., 1200"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Requirements */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <h2 className="text-2xl font-bold mb-2">Requirements & Preferences</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What exactly are you looking for?</label>
              <textarea
                value={formData.requirements}
                onChange={(e) => updateForm('requirements', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none resize-none"
                placeholder="e.g., Complete living room makeover, modular kitchen, false ceiling..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Design Style Preferences</label>
              <input
                type="text"
                value={formData.designPreferences}
                onChange={(e) => updateForm('designPreferences', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                placeholder="e.g., Minimalist, Modern, Traditional, Industrial"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Budget & Submit */}
        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <h2 className="text-2xl font-bold mb-2">Budget & Timeline</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget (₹)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => updateForm('budget', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
                placeholder="e.g., 500000"
              />
              <p className="text-xs text-gray-500 mt-1">This helps us recommend the right materials and packages.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Timeline</label>
              <select
                value={formData.timeline}
                onChange={(e) => updateForm('timeline', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none"
              >
                <option value="Flexible">Flexible</option>
                <option value="Immediately (0-1 months)">Immediately (0-1 months)</option>
                <option value="Soon (1-3 months)">Soon (1-3 months)</option>
                <option value="Planning phase (3+ months)">Planning phase (3+ months)</option>
              </select>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(s - 1, 1))}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              step === 1 ? 'invisible' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Back
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="bg-brand-navy hover:bg-brand-navy/90 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
            >
              Next Step <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Project Request'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
