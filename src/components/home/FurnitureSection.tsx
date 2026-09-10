'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Armchair,
  ShieldCheck,
  Factory,
  Wrench,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface FurnitureItem {
  id: string;
  title: string;
  category: string;
  specs: string;
  material: string;
  description: string;
  image: string;
}

const FURNITURE_ITEMS: FurnitureItem[] = [
  {
    id: 'bed-01',
    title: 'Fluted Velvet King Platform Bed',
    category: 'Bedroom',
    specs: 'Custom Headboard • Integrated Floating Nightstands',
    material: 'CenturyPly BWP • D\'Decor Velvet • Warm LED Sconces',
    description: 'Floor-to-ceiling vertical fluted headboard with acoustic back-padding, integrated warm reading sconces, and hydraulic under-bed lift mechanism.',
    image: '/generated/furniture_bed.png',
  },
  {
    id: 'wardrobe-01',
    title: 'Full-Height Glass & Walnut Wardrobe Suite',
    category: 'Wardrobes',
    specs: 'Floor-to-Ceiling • Walk-in or Wall-Mount Layout',
    material: 'Smoked Toughened Glass • American Walnut • Sensor Lighting',
    description: 'Floor-to-ceiling modular wardrobe system with custom pull-out accessory trays, internal hanger sensor illumination, and soft-damped sliding panels.',
    image: '/generated/furniture_wardrobe.png',
  },
  {
    id: 'sofa-01',
    title: 'Emerald Velvet Architectural Sectional',
    category: 'Living Room',
    specs: 'Made to Floor Plan • Deep Seat Ergonomics',
    material: 'Seasoned Teak Frame • D\'Decor Velvet • Fluted Carrera Marble Base',
    description: 'Bespoke contemporary sectional sofa handcrafted with kiln-dried teak wood subframe, brass stiletto feet, and 45D feather-touch foam layers.',
    image: '/generated/furniture_sofa.png',
  },
  {
    id: 'dining-01',
    title: 'Bookmatched Italian Marble Dining Table',
    category: 'Dining',
    specs: '8-Seater Custom • Beveled Edge Detail',
    material: 'Italian Statuario Marble • Sculpted Solid Walnut • Brass Accents',
    description: 'Statuesque dining centrepiece featuring 20mm seamless Italian marble with rounded bullnose edges resting upon hand-carved solid walnut pedestal bases.',
    image: '/generated/furniture_dining_table.png',
  },
  {
    id: 'coffee-01',
    title: 'Cantilevered Glass & Solid Walnut Coffee Table',
    category: 'Living Room',
    specs: 'Multi-Level Display • Integrated Storage Plinth',
    material: '12mm Toughened Crystal Glass • Natural American Walnut',
    description: 'Architectural coffee table with intersecting geometry, brushed champagne brass vertical supports, and dual-level surface for books and objet d\'art.',
    image: '/generated/furniture_coffee_table.png',
  },
  {
    id: 'library-01',
    title: 'Built-In Floor-to-Ceiling Oak Library Unit',
    category: 'Study & Office',
    specs: 'Full Wall Integration • Adjustable Shelving Grid',
    material: 'Natural White Oak Veneer • Century BWP • Satin Brass Dividers',
    description: 'Custom architectural shelving wall designed to match room ceiling height, featuring concealed cable chases, accent display niches, and lower storage credenza.',
    image: '/generated/furniture_bookshelf.png',
  },
  {
    id: 'desk-01',
    title: 'Executive Walnut & Leather Writing Desk',
    category: 'Study & Office',
    specs: 'Concealed Wire Chases • Soft-Close Drawers',
    material: 'Solid Walnut • Italian Saddle Leather Pad • Hettich Hardware',
    description: 'Minimalist executive desk designed for executive suites and private libraries, featuring wireless charging integration and concealed cable management.',
    image: '/generated/fur_desk_1776429583007.png',
  },
  {
    id: 'chair-01',
    title: 'Ergonomic Synchronized Office Armchair',
    category: 'Study & Office',
    specs: '3D Adjustable Arms • Dynamic Lumbar Support',
    material: 'High-Tensile Breathable Mesh • Die-Cast Aluminum Base',
    description: 'Commercial-grade ergonomic seating engineered for posture alignment during long working sessions, with class-4 gas lift and Italian tilt mechanism.',
    image: '/generated/fur_office_chair_1776429602527.png',
  }
];

const CATEGORIES = ['All', 'Living Room', 'Bedroom', 'Wardrobes', 'Dining', 'Study & Office'];

const CRAFTSMANSHIP_PILLARS = [
  {
    icon: ShieldCheck,
    title: '10-Year Warranty',
    description: 'Certified borer and termite-proof construction using genuine CenturyPly Club Prime & Greenply BWP.'
  },
  {
    icon: Factory,
    title: 'In-House Factory Joinery',
    description: 'Precision German CNC cutting and edge-banding in clean conditions — no messy carpentry dust on your site.'
  },
  {
    icon: Wrench,
    title: 'Tier-1 German Hardware',
    description: 'Fitted exclusively with soft-close hinges and hydraulic slides from Häfele, Hettich, and Blum.'
  },
  {
    icon: Sparkles,
    title: 'Custom Sized To Millimeters',
    description: 'Every wardrobe, console, and dining set is dimensioned exactly to your home floor plan and ceiling height.'
  }
];

export default function FurnitureSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = FURNITURE_ITEMS.filter(
    item => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section className="py-24 md:py-32 bg-[#f7f5f0] text-[#111622] border-b border-[#eeeae2] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee9df] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Armchair className="w-3.5 h-3.5 text-brand-gold" />
              <span>Custom Furniture &amp; Bespoke Woodwork</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Furniture Crafted <br />
              <span className="italic font-editorial text-brand-charcoal">To Fit Your Architecture.</span>
            </h2>
            <p className="mt-5 text-gray-600 font-light text-base md:text-lg leading-relaxed max-w-xl">
              Off-the-shelf furniture rarely fits a custom home. Every piece from our studio is custom engineered in-house to millimetric room measurements using certified marine-grade timbers, Italian marble, and German hardware.
            </p>
          </div>
          <Link 
            href="/contact"
            data-cursor-tooltip="custom-furniture-enquiry"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#111622] hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-md hover:shadow-lg cursor-target self-start lg:self-end"
          >
            <span>Commission Custom Piece</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 bg-[#eee9df]/70 p-1.5 rounded-2xl border border-[#ded8cb] w-fit">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor-tooltip={`furniture-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-target ${
                activeCategory === cat
                  ? 'bg-[#111622] text-white shadow-sm'
                  : 'text-gray-600 hover:text-brand-charcoal hover:bg-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Furniture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filtered.map((item) => (
            <div
              key={item.id}
              data-cursor-tooltip="furniture-piece"
              className="bg-white rounded-3xl border border-[#ded8cb] overflow-hidden shadow-sm hover:shadow-luxury-hover transition-all duration-500 group cursor-target flex flex-col"
            >
              {/* Image Container with aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f3efe8]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                  {item.category}
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-7 flex flex-col flex-grow bg-white">
                <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2">
                  {item.specs}
                </div>
                <h3 className="text-xl font-editorial font-bold text-brand-charcoal mb-3 group-hover:text-brand-navy transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed mb-5 flex-grow">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider line-clamp-1">
                    {item.material}
                  </span>
                  <Link
                    href="/contact"
                    className="text-xs uppercase tracking-[0.15em] font-bold text-brand-charcoal hover:text-brand-gold transition-colors inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Request Custom Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Craftsmanship & Engineering Guarantee Strip */}
        <div className="bg-white rounded-3xl border border-[#ded8cb] p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-bold">
              Factory Precision Standards
            </span>
            <h3 className="text-2xl md:text-3xl font-editorial font-normal text-brand-charcoal mt-2">
              Why Bespoke Joinery Outlasts Readymade
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFTSMANSHIP_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-[#faf8f4] border border-[#eee7db] hover:border-brand-gold/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-charcoal mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              <span>CenturyPly • Greenply • Häfele • Hettich • Blum Certified</span>
            </div>
            <Link
              href="/contact"
              className="text-brand-charcoal hover:text-brand-gold font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
            >
              <span>Schedule Woodwork Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

