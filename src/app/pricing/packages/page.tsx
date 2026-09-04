"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, CheckCircle2, ChevronRight } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TurnkeyPackagesPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'pageContent', 'turnkey');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setContent(snap.data());
        }
      } catch (err) {
        console.error("Error fetching turnkey content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  // Fallback to default if no doc exists yet
  const displayContent = content || {
    heroSubtitle: 'COMPLETE SOLUTIONS',
    heroTitle: 'Turnkey Project Packages',
    heroDescription: 'From bare shell to fully furnished. Our turnkey packages provide an end-to-end interior design and execution solution, saving you time and avoiding the hassle of managing multiple contractors.',
    features: [
      'Initial Design & 3D Visualization',
      'Material Selection & Procurement',
      'Civil Work & Flooring',
      'False Ceiling & Electricals',
      'Plumbing & Sanitization',
      'Custom Modular Furniture',
      'Painting & Finishing',
      'Final Handover & Deep Cleaning'
    ]
  };

  return (
    <main className="bg-gray-50 min-h-screen pb-20 pt-24">
      {/* Header */}
      <div className="bg-[#0b162c] text-white pt-16 pb-24 px-6 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, #1c2c4d 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-brand-yellow text-brand-navy font-black tracking-widest text-[10px] md:text-[11px] uppercase px-5 py-1.5 rounded-full mb-8">
            {displayContent.heroSubtitle}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
            {displayContent.heroTitle.split(' ').map((word: string, i: number, arr: string[]) => 
              i === arr.length - 1 ? <span key={i} className="text-brand-yellow italic">{word}</span> : word + ' '
            )}
          </h1>
          <p className="text-gray-300 font-medium text-sm md:text-[15px] max-w-3xl mx-auto leading-relaxed">
            {displayContent.heroDescription}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black text-brand-navy mb-6">What's Included?</h2>
              <ul className="space-y-4">
                {displayContent.features.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-yellow shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-navy/5 rounded-2xl p-8 border border-brand-navy/10 flex flex-col justify-center items-center text-center">
              <Package size={48} className="text-brand-yellow mb-6" />
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Ready to get an estimate?</h3>
              <p className="text-gray-600 mb-8">
                Use our interactive rate calculator to configure your exact requirements and instantly generate a preliminary estimate.
              </p>
              <Link href="/pricing" className="bg-brand-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition-colors flex items-center gap-2">
                Launch Calculator <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
