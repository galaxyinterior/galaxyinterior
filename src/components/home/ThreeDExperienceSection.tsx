'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Layers, 
  Eye, 
  Home, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';

interface DesignPhase {
  step: number;
  label: string;
  title: string;
  description: string;
  image: string;
  caption: string;
  deliverables: string[];
}

const DESIGN_PHASES: DesignPhase[] = [
  {
    step: 1,
    label: '2D ARCHITECTURAL PLAN',
    title: 'Vastu-Compliant Structural Blueprint',
    description: 'Our licensed architects produce dimensioned floor plans with room annotations, Vastu orientation, door/window schedules, and structural column grid mapping — the engineering DNA of your entire home.',
    image: '/generated/2d_floor_plan.png',
    caption: 'Sheet A101 • Modern 3BHK Residence • Scale 1/4" = 1\'0"',
    deliverables: ['Dimensioned Floor Plan (DWG/PDF)', 'Electrical & Plumbing Layout', 'Vastu Grid Overlay', 'Municipal Approval Set']
  },
  {
    step: 2,
    label: '3D PHOTOREALISTIC RENDER',
    title: 'Immersive Interior & Exterior Visualization',
    description: 'Before construction begins, you walk through your future home in photorealistic 3D. Every material texture, lighting mood, and spatial proportion is simulated so there are zero surprises on handover day.',
    image: '/generated/3d_interior_hero.png',
    caption: 'V-Ray Photorealistic Interior • Warm Evening Lighting Simulation',
    deliverables: ['360° Interior Walkthroughs', 'Day & Night Lighting Studies', 'Material Texture Mapping', 'Furniture Placement Layouts']
  },
  {
    step: 3,
    label: 'BUILT & HANDED OVER',
    title: 'Your Home. Exactly as Designed.',
    description: 'The finished space matches the 3D render with millimeter precision. From the marble grain direction to the cove lighting temperature, what we simulate is what we build and hand over to you.',
    image: '/generated/interior_gallery_1.png',
    caption: 'Completed Luxury Residence • Verified Material Fidelity',
    deliverables: ['150-Point Quality Audit', 'As-Built MEP Drawings', 'Warranty Documentation', 'Digital Handover Package']
  }
];

export default function ThreeDExperienceSection() {
  const [activePhase, setActivePhase] = useState(0);
  const current = DESIGN_PHASES[activePhase];

  return (
    <section className="py-24 md:py-32 bg-white text-[#111622] border-b border-[#eeeae2] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f1ea] border border-[#e5dfd2] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
            <Eye className="w-3.5 h-3.5 text-brand-gold" />
            <span>Design Visualization Pipeline</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1] mb-5">
            Your Home. <span className="italic">Before It Exists.</span>
          </h2>
          <p className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
            Our design pipeline transforms your aspirations into a tangible visual experience across three progressive stages — so you approve every detail before we pour a single foundation.
          </p>
        </div>

        {/* 3-Step Progress Bar */}
        <div className="relative mb-14">
          {/* Connecting Line */}
          <div className="absolute top-6 left-[16.67%] right-[16.67%] h-px bg-gray-200 hidden md:block" />
          <div 
            className="absolute top-6 left-[16.67%] h-px bg-brand-gold transition-all duration-500 hidden md:block"
            style={{ width: `${activePhase * 33.33}%` }}
          />
          
          <div className="grid grid-cols-3 gap-4">
            {DESIGN_PHASES.map((phase, idx) => {
              const isActive = idx === activePhase;
              const isCompleted = idx < activePhase;
              return (
                <button
                  key={phase.step}
                  onClick={() => setActivePhase(idx)}
                  data-cursor-tooltip={`design-phase-${phase.step}`}
                  className="flex flex-col items-center text-center cursor-target group"
                >
                  {/* Step Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-3 transition-all duration-300 relative z-10 ${
                    isActive 
                      ? 'bg-brand-gold text-white shadow-lg shadow-brand-gold/30 scale-110' 
                      : isCompleted 
                        ? 'bg-brand-gold/20 text-brand-gold border-2 border-brand-gold' 
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200 group-hover:border-gray-300'
                  }`}>
                    {isCompleted ? '✓' : `0${phase.step}`}
                  </div>
                  {/* Label */}
                  <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold transition-colors ${
                    isActive ? 'text-brand-charcoal' : 'text-gray-400'
                  }`}>
                    {phase.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Display */}
        <div className="bg-[#fbfaf6] rounded-3xl border border-[#ded8cb] shadow-luxury overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Panel (7 Columns) */}
            <div className="lg:col-span-7 relative h-[360px] sm:h-[440px] lg:h-[560px] overflow-hidden group">
              <Image
                src={current.image}
                alt={current.title}
                fill
                priority
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              
              {/* Phase Badge Top Left */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/40 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal">
                  Stage 0{current.step} of 03
                </span>
              </div>

              {/* Image Caption Bottom */}
              <div className="absolute bottom-5 left-5 right-5 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-[11px] font-mono tracking-wider">
                {current.caption}
              </div>
            </div>

            {/* Details Panel (5 Columns) */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-brand-gold font-mono font-bold text-lg">0{current.step}</span>
                  <span className="h-px flex-grow bg-gray-200" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                    {current.label}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-editorial font-normal text-brand-charcoal mb-4 leading-tight">
                  {current.title}
                </h3>

                <p className="text-sm text-gray-600 font-light leading-relaxed mb-8">
                  {current.description}
                </p>

                {/* Deliverables */}
                <div className="bg-[#fbfaf6] rounded-xl border border-[#eee9df] p-5 mb-6">
                  <span className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-400 block mb-3">
                    You Receive:
                  </span>
                  <div className="space-y-2.5">
                    {current.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-brand-charcoal font-medium">
                        <span className="w-5 h-5 rounded-md bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation + CTA */}
              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                {/* Step Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setActivePhase(p => Math.max(0, p - 1))}
                    disabled={activePhase === 0}
                    className="text-xs uppercase tracking-wider font-semibold text-gray-400 hover:text-brand-charcoal disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-target"
                  >
                    ← Previous Stage
                  </button>
                  <button
                    onClick={() => setActivePhase(p => Math.min(DESIGN_PHASES.length - 1, p + 1))}
                    disabled={activePhase === DESIGN_PHASES.length - 1}
                    className="text-xs uppercase tracking-wider font-semibold text-brand-gold hover:text-brand-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-target"
                  >
                    Next Stage →
                  </button>
                </div>

                {/* Primary CTA */}
                <Link
                  href="/services/design-facilities"
                  data-cursor-tooltip="explore-design-pipeline"
                  className="w-full text-center px-6 py-3.5 rounded-full bg-[#111622] hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-md hover:shadow-lg cursor-target inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Our Design Facilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
