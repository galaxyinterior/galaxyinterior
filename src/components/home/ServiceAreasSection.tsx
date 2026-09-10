'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Building2, 
  ArrowUpRight, 
  CheckCircle2, 
  Compass, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

interface RegionalHub {
  state: string;
  badge: string;
  tagline: string;
  hubs: {
    city: string;
    description: string;
    isMain?: boolean;
  }[];
}

const REGIONAL_HUBS: RegionalHub[] = [
  {
    state: 'Jharkhand',
    badge: 'State Operations',
    tagline: 'Full Civil, Architectural & Luxury Interior Execution',
    hubs: [
      { city: 'Ranchi', description: 'Central Capital Regional Hub & Experience Studio', isMain: true },
      { city: 'Deoghar', description: 'Bespoke Residential Architecture & Turnkey Builds' },
      { city: 'Dumka', description: 'Civil Construction & Turnkey Bungalows' },
      { city: 'Godda', description: 'Luxury Interiors & Modular Kitchen Execution' },
      { city: 'Hazaribagh', description: 'Villa Architectural Planning & Complete Renovations' }
    ]
  },
  {
    state: 'Bihar',
    badge: 'Founding Territory',
    tagline: 'Heritage of Studio Craftsmanship Since 2021',
    hubs: [
      { city: 'Bhagalpur', description: 'Original Founding Studio & Production Headquarters', isMain: true },
      { city: 'Patna', description: 'Executive Capital Studio & Luxury Penthouse Projects', isMain: true },
      { city: 'Banka', description: 'Residential Civil Construction & Modern Residences' },
      { city: 'Kishanganj', description: 'Custom Woodwork & Architectural Design Studio' },
      { city: 'Purnea', description: 'Complete Turnkey Home Building & Modern Interiors' }
    ]
  },
  {
    state: 'West Bengal',
    badge: 'Metro Studio',
    tagline: 'Contemporary High-End Residences & Design Consultancy',
    hubs: [
      { city: 'Kolkata', description: 'Design Consultancy, Luxury Apartments & Global Sourcing Hub', isMain: true }
    ]
  }
];

export default function ServiceAreasSection() {
  const [activeState, setActiveState] = useState<string>('All');

  const displayedRegions = REGIONAL_HUBS.filter(
    (reg) => activeState === 'All' || reg.state === activeState
  );

  return (
    <section className="py-24 md:py-32 bg-[#faf8f5] text-[#111622] border-b border-[#eee7db] relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#111622 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7db] border border-[#ddd3c1] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              <span>Regional Presence • Eastern India</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Where We Build. <br />
              <span className="italic font-editorial text-brand-charcoal">11 Operational Hubs.</span>
            </h2>
            <p className="mt-5 text-gray-600 font-light text-base md:text-lg leading-relaxed max-w-xl">
              Unlike remote design agencies, Galaxy Interior deploys dedicated in-house resident engineers and site supervisors across 11 key cities in Jharkhand, Bihar, and West Bengal.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#eee7db]/70 p-1.5 rounded-2xl border border-[#ded8cb] self-start lg:self-end">
            {['All', 'Jharkhand', 'Bihar', 'West Bengal'].map((stateName) => (
              <button
                key={stateName}
                onClick={() => setActiveState(stateName)}
                data-cursor-tooltip={`hub-${stateName.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-target ${
                  activeState === stateName
                    ? 'bg-[#111622] text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-charcoal hover:bg-white/60'
                }`}
              >
                {stateName}
              </button>
            ))}
          </div>
        </div>

        {/* State Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {displayedRegions.map((region) => (
            <div
              key={region.state}
              className="bg-white rounded-3xl border border-[#ded8cb] p-8 shadow-sm hover:shadow-luxury-hover transition-all duration-500 flex flex-col"
            >
              {/* State Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-gold font-bold">
                    {region.badge}
                  </span>
                  <h3 className="text-2xl font-editorial font-bold text-brand-charcoal mt-1">
                    {region.state}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">
                {region.tagline}
              </p>

              {/* Hub Cities List */}
              <div className="space-y-3.5 flex-grow">
                {region.hubs.map((hub) => (
                  <div 
                    key={hub.city}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      hub.isMain 
                        ? 'bg-[#faf8f4] border-brand-gold/30' 
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${hub.isMain ? 'text-brand-gold' : 'text-gray-400'}`} />
                        <span className="text-sm font-bold text-brand-charcoal">
                          {hub.city}
                        </span>
                      </div>
                      {hub.isMain && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-charcoal font-semibold">
                          Major Hub
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-500 font-light mt-1 pl-5">
                      {hub.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-gray-100">
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-xl bg-[#faf8f4] hover:bg-[#111622] text-brand-charcoal hover:text-white border border-[#eee7db] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Consult in {region.state}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Supervision & Local Dispatch Banner */}
        <div className="p-8 md:p-10 rounded-3xl bg-[#111622] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0 mt-1">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-brand-gold text-[11px] uppercase tracking-[0.2em] font-semibold mb-1">
                <span>Direct Site Accountability</span>
              </div>
              <h4 className="text-xl md:text-2xl font-editorial font-normal text-white">
                Not in a listed hub? We accept custom commissions across Eastern India.
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed mt-1.5 max-w-2xl">
                For estates above 2,500 sq ft, our team mobilizes dedicated site engineering units anywhere in Bihar, Jharkhand, and West Bengal.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
              <span>+91 70044 65611</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-gold hover:bg-yellow-400 text-brand-charcoal text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Schedule Site Visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
