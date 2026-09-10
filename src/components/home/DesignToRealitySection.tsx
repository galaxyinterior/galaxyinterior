'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Ruler, 
  CheckCircle2, 
  Compass, 
  Eye, 
  Maximize2 
} from 'lucide-react';

interface RealityCase {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  blueprintDetails: string;
  executionDetails: string;
  materials: string[];
  tolerance: string;
}

const REALITY_CASES: RealityCase[] = [
  {
    id: 'villa',
    title: 'The Contemporary 2-Story Villa',
    subtitle: 'Structural RCC Blueprint to Finished Elevation',
    category: 'Architecture & Civil Build',
    image: '/generated/3d_split_villa_exterior.png',
    blueprintDetails: '2-Story Indian Residence blueprint, scale 1:100, cantilevered deck calculation, earthquake-resistant RCC frame.',
    executionDetails: 'Completed luxury residence featuring textured stone cladding, exterior IP65 ambient illumination, and private plunge pool.',
    materials: ['UltraTech Super Cement', 'Tata Tiscon 550D Steel', 'Natural Sandstone Cladding', 'Toughened Laminated Glass'],
    tolerance: '< 0.5% structural variance from CAD'
  },
  {
    id: 'living',
    title: 'The Grand Double-Height Living Room',
    subtitle: '3D Wireframe Mesh to Finished Marble Sanctuary',
    category: 'Luxury Interior Architecture',
    image: '/generated/3d_split_living_room.png',
    blueprintDetails: '3D isometric mesh mapping ceiling height, HVAC duct concealment, and 45-degree chandelier anchor points.',
    executionDetails: 'Finished double-height lounge with imported Italian Botticino marble, custom brass-accented credenza, and motorized drapes.',
    materials: ['Book-matched Italian Marble', 'CenturyPly Club Prime BWP', 'Concealed Magnetic COB Tracks', 'Acoustic Wall Substrate'],
    tolerance: '100% lighting & spatial fidelity'
  },
  {
    id: 'kitchen',
    title: 'Precision Island Modular Kitchen',
    subtitle: 'Millimeter CAD Layout to Finished Quartz Waterfall',
    category: 'Modular Joinery & MEP',
    image: '/generated/3d_split_kitchen.png',
    blueprintDetails: '600mm/900mm ergonomic cabinetry layout, dedicated 16A appliance circuits, and under-counter plumbing grade.',
    executionDetails: 'Seamless quartz waterfall island with built-in induction hob, concealed touch-to-open overhead cabinets, and warm pendant drops.',
    materials: ['Anti-scratch Calacatta Quartz', 'Häfele Soft-Close Tandem Boxes', 'Marine-Grade 710 Plywood', 'PU Lacquer Shutter Finish'],
    tolerance: '±1mm joinery reveal accuracy'
  },
  {
    id: 'bedroom',
    title: 'The Master Suite Retreat',
    subtitle: 'Technical Ceiling & Wardrobe Plan to Reality',
    category: 'Bespoke Residential Suite',
    image: '/generated/3d_split_bedroom.png',
    blueprintDetails: 'Cove lighting lux-level simulation, integrated walk-in wardrobe dimensions, and headboard acoustic absorption zoning.',
    executionDetails: 'Finished sanctuary with fluted timber panelling, concealed 3000K warm LED ribbons, and plush custom-upholstered bed platform.',
    materials: ['Natural Walnut Veneer', 'D’Decor Upholstery Velvet', 'Saint-Gobain Mirror Glazing', 'Philips Warm Dimming Profiles'],
    tolerance: 'Flawless shadowline ceiling alignment'
  }
];

export default function DesignToRealitySection() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('villa');
  const currentCase = REALITY_CASES.find(c => c.id === selectedCaseId) || REALITY_CASES[0];

  return (
    <section className="py-24 md:py-32 bg-[#0c121e] text-white border-b border-white/10 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-8 border-b border-white/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Fidelity &amp; Execution • 0% Compromise</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight leading-[1.1] text-white">
              Design to Reality. <br />
              <span className="text-gold-gradient font-editorial italic">What We Render Is What We Hand Over.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed">
              Most contractors show pretty 3D pictures and deliver disappointing deviations. At Galaxy Interior, our 3D renders are engineered structural models linked directly to our procurement and on-site millimeter jigs.
            </p>
          </div>
        </div>

        {/* Room Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {REALITY_CASES.map((item, idx) => {
            const isSelected = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCaseId(item.id)}
                data-cursor-tooltip={`reality-tab-${item.id}`}
                className={`p-4 md:p-5 rounded-2xl border text-left transition-all duration-300 cursor-target ${
                  isSelected
                    ? 'bg-brand-gold/15 border-brand-gold text-white shadow-lg'
                    : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                    {item.category.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs md:text-sm font-semibold text-white truncate">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Main Stage */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Split Render Image Display (7 Columns) */}
            <div className="lg:col-span-7 relative h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-white/15 group">
              <Image
                src={currentCase.image}
                alt={currentCase.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />

              {/* Top Overlay Badges Indicating Blueprint vs Reality */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-blue-950/80 backdrop-blur-md border border-blue-400/30 text-blue-200 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                  <Ruler className="w-3 h-3 text-blue-400" />
                  <span>CAD Blueprint &amp; 3D Wireframe</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Physical Execution</span>
                </div>
              </div>

              {/* Bottom Tolerance Pill */}
              <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Metric: {currentCase.tolerance}</span>
              </div>
            </div>

            {/* Case Study Details Panel (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="inline-block text-[11px] uppercase tracking-[0.2em] font-bold text-brand-gold mb-2">
                  {currentCase.category}
                </div>
                <h3 className="text-2xl md:text-4xl font-editorial font-normal text-white mb-2 leading-tight">
                  {currentCase.title}
                </h3>
                <p className="text-xs font-mono text-gray-400 mb-6">
                  {currentCase.subtitle}
                </p>

                {/* Split Specs Comparison */}
                <div className="space-y-4 mb-6">
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
                      <Ruler className="w-3 h-3" />
                      <span>Phase 1 — 3D Structural Simulation</span>
                    </div>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {currentCase.blueprintDetails}
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-brand-gold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Phase 2 — As-Built Handover</span>
                    </div>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {currentCase.executionDetails}
                    </p>
                  </div>
                </div>

                {/* Materials Schedule */}
                <div className="pt-4 border-t border-white/10">
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-400 block mb-2.5">
                    Specified Procurement Materials:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentCase.materials.map((mat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        <span className="truncate">{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <Link
                  href="/services/design-facilities"
                  data-cursor-tooltip="explore-3d-facilities"
                  className="px-6 py-3 rounded-full bg-brand-gold hover:bg-brand-gold-light text-[#111622] text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-md hover:shadow-lg cursor-target inline-flex items-center gap-2"
                >
                  <span>Explore 3D Facilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  data-cursor-tooltip="book-3d-session"
                  className="px-5 py-3 rounded-full border border-white/20 hover:border-brand-gold text-white text-xs font-semibold uppercase tracking-[0.15em] transition-all cursor-target hover:bg-white/5"
                >
                  Book 3D Design Session
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
