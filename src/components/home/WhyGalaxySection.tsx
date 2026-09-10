'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  ShieldCheck, 
  Users, 
  FileText, 
  HardHat, 
  Sparkles, 
  ArrowRight, 
  Scale, 
  Building2 
} from 'lucide-react';

interface ComparisonRow {
  aspect: string;
  traditional: string;
  galaxy: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    aspect: 'Accountability',
    traditional: 'Architect, civil mason, electrician & carpenter blame each other for flaws.',
    galaxy: 'One singular team. Architects, civil engineers, and master carpenters under one contract.'
  },
  {
    aspect: 'Pricing & Budget',
    traditional: 'Vague lump-sum quotes that escalate by 30% to 50% midway through construction.',
    galaxy: 'Legally binding itemised BOQ. Every square foot, tile grade, and switch is cost-locked.'
  },
  {
    aspect: 'Visualization',
    traditional: 'Flat 2D lines. You cannot visualize the real lighting or finish until it is already built.',
    galaxy: 'Photorealistic 360° 3D simulations. You experience your space before a single brick is laid.'
  },
  {
    aspect: 'Site Supervision',
    traditional: 'Contractor drops by occasionally; unskilled labor makes critical structural compromises.',
    galaxy: 'Dedicated resident civil engineer on-site daily with digital photo progress logs.'
  },
  {
    aspect: 'Material Authenticity',
    traditional: 'Local vendor substitutions; counterfeit plywood, sub-standard cement or mixed wire grades.',
    galaxy: 'Direct factory procurement with CenturyPly, UltraTech, Havells, Godrej & Kajaria.'
  },
  {
    aspect: 'Warranty & Handover',
    traditional: 'Contractor disappears after final payment; zero after-sales support or documentation.',
    galaxy: '150-point snagging audit, as-built MEP blueprints, and comprehensive warranty binders.'
  }
];

const PILLARS = [
  {
    icon: Building2,
    title: 'Integrated Studio Model',
    desc: 'Our architects design with direct input from our structural engineers and site leads, ensuring creative designs are structurally sound and cost-feasible from day one.'
  },
  {
    icon: FileText,
    title: 'Zero Escalation Contract',
    desc: 'We invest 2-3 weeks in detailed pre-construction planning so our Bill of Quantities (BOQ) is mathematically complete. No sudden "unforeseen expenses".'
  },
  {
    icon: HardHat,
    title: 'Millimeter Quality Audit',
    desc: 'From concrete slump tests and 21-day curing protocols to laser-aligned tile bevels and flush cabinet reveals, our engineers enforce strict tolerance standards.'
  },
  {
    icon: Users,
    title: 'Client Portal Transparency',
    desc: 'Track your project milestones, view daily site photographs, approve material finishes, and monitor payment schedules directly on your personal digital dashboard.'
  }
];

export default function WhyGalaxySection() {
  const [viewMode, setViewMode] = useState<'comparison' | 'pillars'>('comparison');

  return (
    <section className="py-24 md:py-32 bg-[#f7f5f0] text-[#111622] border-b border-[#eeeae2] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee9df] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Scale className="w-3.5 h-3.5 text-brand-gold" />
              <span>The Galaxy Standard • Uncompromising Quality</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Why Discerning Clients <br />
              <span className="italic font-editorial text-brand-charcoal">Choose One Unified Practice</span>
            </h2>
            <p className="mt-5 text-gray-600 font-light text-base md:text-lg leading-relaxed max-w-xl">
              Building a luxury home should be an inspiring milestone, not months of stressful contractor mediation. Here is how we guarantee your peace of mind.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-[#eee9df]/80 p-1.5 rounded-2xl border border-[#ded8cb] self-start lg:self-end">
            <button
              onClick={() => setViewMode('comparison')}
              data-cursor-tooltip="view-comparison"
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-target ${
                viewMode === 'comparison'
                  ? 'bg-[#111622] text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-charcoal hover:bg-white/60'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setViewMode('pillars')}
              data-cursor-tooltip="view-pillars"
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-target ${
                viewMode === 'pillars'
                  ? 'bg-[#111622] text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-charcoal hover:bg-white/60'
              }`}
            >
              Core Architectural Pillars
            </button>
          </div>
        </div>

        {/* Dynamic Display */}
        {viewMode === 'comparison' ? (
          <div className="bg-white rounded-3xl border border-[#ded8cb] shadow-luxury overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200 bg-[#fbfaf6]">
              <div className="md:col-span-3 p-6 text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
                Critical Project Parameter
              </div>
              <div className="md:col-span-4 p-6 text-xs uppercase tracking-[0.2em] font-bold text-gray-500 bg-rose-50/40 border-l border-r border-gray-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Typical Fragmented Contractors</span>
              </div>
              <div className="md:col-span-5 p-6 text-xs uppercase tracking-[0.2em] font-bold text-[#111622] bg-brand-gold/10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>The Galaxy Interior Standard</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100">
              {COMPARISONS.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 group hover:bg-[#faf9f5] transition-colors">
                  
                  {/* Parameter */}
                  <div className="md:col-span-3 p-6 flex items-center">
                    <span className="text-sm font-semibold text-brand-charcoal tracking-wide">
                      {row.aspect}
                    </span>
                  </div>

                  {/* Traditional */}
                  <div className="md:col-span-4 p-6 bg-rose-50/20 md:border-l md:border-r border-gray-200 flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed">
                      {row.traditional}
                    </p>
                  </div>

                  {/* Galaxy Standard */}
                  <div className="md:col-span-5 p-6 bg-brand-gold/[0.03] flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="text-xs md:text-sm text-brand-charcoal font-medium leading-relaxed">
                      {row.galaxy}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  data-cursor-tooltip="why-pillar"
                  className="bg-white rounded-3xl p-8 border border-[#ded8cb] shadow-luxury hover:shadow-luxury-hover hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between cursor-target"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-editorial font-bold text-brand-charcoal mb-3">
                      {p.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>STANDARD 0{idx + 1}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Assurance Card */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-[#111622] text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-gold font-semibold block mb-2">
              Contractual Assurance
            </span>
            <h4 className="text-2xl md:text-3xl font-editorial font-normal">
              Fixed Timelines. Milestone Escrow Payments.
            </h4>
            <p className="text-gray-400 text-xs md:text-sm font-light mt-2 leading-relaxed">
              You never pay for future promises. Our contracts are strictly bound to verified on-site inspection milestones: plinth, structural slab, masonry, plaster, and finishes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/pricing/packages"
              data-cursor-tooltip="pricing-packages-btn"
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-brand-gold text-xs uppercase tracking-[0.15em] font-semibold text-white transition-all cursor-target hover:bg-white/5"
            >
              Explore Packages
            </Link>
            <Link
              href="/contact"
              data-cursor-tooltip="consultation-architect-btn"
              className="px-7 py-3.5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-[#111622] text-xs uppercase tracking-[0.15em] font-bold transition-all shadow-md hover:shadow-lg cursor-target inline-flex items-center gap-2"
            >
              <span>Speak to an Architect</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
