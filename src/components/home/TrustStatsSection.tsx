'use client';

import { 
  ShieldCheck, 
  FileSpreadsheet, 
  Box, 
  HardHat, 
  Building2, 
  Award, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

interface MetricItem {
  value: string;
  label: string;
  description: string;
  tag: string;
}

const VERIFIED_METRICS: MetricItem[] = [
  {
    value: '120+',
    label: 'Completed Residences',
    description: 'Luxury private villas, duplex homes, and bespoke modern apartments delivered on time.',
    tag: 'Ranchi • Patna • Kolkata'
  },
  {
    value: '5+',
    label: 'Years of Excellence',
    description: 'Founded in 2021 by Shivashish Ranjan, bringing rigorous architectural standards to Eastern India.',
    tag: 'Est. 2021 • Regionally Rooted'
  },
  {
    value: '20+',
    label: 'In-House Specialists',
    description: 'Full-time licensed architects, structural civil engineers, 3D visualizers, and site supervisors.',
    tag: 'Direct Team • No Middlemen'
  },
  {
    value: '11',
    label: 'Operational Hubs',
    description: 'Active project delivery presence across major districts of Jharkhand, Bihar, and West Bengal.',
    tag: '3 States Connected'
  }
];

interface TrustPillar {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  detail: string;
}

const TRUST_PILLARS: TrustPillar[] = [
  {
    icon: FileSpreadsheet,
    title: 'Itemised BOQ Guarantee',
    subtitle: '100% Price Transparency',
    detail: 'Every single square foot, material grade, and hardware brand is detailed in a legally binding BOQ. Zero surprise cost escalations.'
  },
  {
    icon: Box,
    title: 'Photorealistic 3D Before Build',
    subtitle: 'Experience Before Execution',
    detail: 'Tour your future home in 3D walkthroughs and lighting simulations before a single brick is laid or furniture is crafted.'
  },
  {
    icon: HardHat,
    title: 'Daily Site Supervision',
    subtitle: 'Engineer-Led Precision',
    detail: 'Dedicated resident civil engineers oversee every pour, curing cycle, and joinery joint with daily digital photo reporting.'
  },
  {
    icon: ShieldCheck,
    title: 'Certified Tier-1 Materials',
    subtitle: 'Direct Brand Procurement',
    detail: 'Genuine materials sourced directly from CenturyPly, UltraTech, Havells, Godrej, and Kajaria with manufacturer warranties.'
  }
];

export default function TrustStatsSection() {
  return (
    <section className="relative bg-[#0d131f] text-white border-b border-white/10 overflow-hidden">
      {/* Subtle architectural grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Standards • Eastern India</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-normal font-editorial tracking-tight text-white leading-tight">
              Precision in Planning. <br />
              <span className="text-gold-gradient font-editorial italic">Integrity in Every Sq. Ft.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
              We eliminate the stress of hiring fragmented contractors. Galaxy Interior integrates architectural blueprints, 3D simulations, structural civil execution, and turnkey interior craftsmanship under one singular accountability.
            </p>
          </div>
        </div>

        {/* 4 Core Verified Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {VERIFIED_METRICS.map((metric, idx) => (
            <div 
              key={idx}
              data-cursor-tooltip="trust-metric"
              className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-brand-gold/40 rounded-2xl p-6 md:p-8 transition-all duration-300 group cursor-target flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold/80 font-semibold px-2 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20">
                    {metric.tag}
                  </span>
                  <span className="text-xs text-white/30 font-mono">0{idx + 1}</span>
                </div>
                <div className="text-4xl md:text-5xl font-editorial font-bold text-white tracking-tight mb-2 group-hover:text-brand-gold transition-colors">
                  {metric.value}
                </div>
                <h3 className="text-base font-semibold text-white/90 mb-3 tracking-wide">
                  {metric.label}
                </h3>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed border-t border-white/5 pt-3">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* 4 Architectural Trust Pillars */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-brand-gold font-semibold block mb-1">
                The Galaxy Standard
              </span>
              <h3 className="text-2xl md:text-3xl font-editorial text-white">
                How We Protect Your Investment
              </h3>
            </div>
            <Link 
              href="/pricing/packages" 
              className="inline-flex items-center text-xs uppercase tracking-[0.15em] font-semibold text-brand-gold hover:text-white transition-colors gap-1.5 self-start md:self-auto cursor-target"
            >
              <span>View Turnkey Pricing</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">
                    {pillar.title}
                  </h4>
                  <div className="text-[11px] uppercase tracking-wider text-brand-gold/80 font-medium mb-3">
                    {pillar.subtitle}
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {pillar.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Regional coverage verification badge */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-400 font-light">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full compliance with municipal bylaws, structural codes &amp; fire safety guidelines.</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider">Active Sites in Ranchi, Patna &amp; Kolkata</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
