'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  Zap, 
  Home, 
  Sparkles, 
  ArrowUpRight,
  FileCheck2
} from 'lucide-react';

interface PartnerBrand {
  name: string;
  category: string;
  tagline: string;
  src: string;
  width: number;
  height: number;
}

const PARTNER_BRANDS: PartnerBrand[] = [
  {
    name: 'Century Plyboards',
    category: 'Timber & Veneers',
    tagline: 'Club Prime BWP & ViroKill Marine Plywood',
    src: '/partner_logos/Century_Plyboards.svg.png',
    width: 140,
    height: 48,
  },
  {
    name: 'Greenply',
    category: 'Structural Core',
    tagline: 'Calibrated Plywood & Zero-Emission Panels',
    src: '/partner_logos/Greenply_logo.svg.png',
    width: 130,
    height: 44,
  },
  {
    name: 'Havells',
    category: 'Electricals',
    tagline: 'Fire-Retardant HRFR Wiring & Switchgear',
    src: '/partner_logos/Havells_Logo.svg.png',
    width: 120,
    height: 40,
  },
  {
    name: 'Panasonic',
    category: 'Smart Automation',
    tagline: 'IoT Smart Switching & Ventilation Systems',
    src: '/partner_logos/Panasonic_logo.svg.png',
    width: 130,
    height: 36,
  },
  {
    name: 'Pidilite',
    category: 'Waterproofing',
    tagline: 'Dr. Fixit Waterproofing & Marine Adhesives',
    src: '/partner_logos/Pidilite_logo.svg.png',
    width: 110,
    height: 44,
  },
  {
    name: 'UltraTech Cement',
    category: 'Civil Structure',
    tagline: 'High-Performance 53 Grade Concrete & Plaster',
    src: '/partner_logos/Ultratech_Cement_Logo.svg.png',
    width: 130,
    height: 48,
  },
  {
    name: 'Godrej',
    category: 'Architectural Security',
    tagline: 'Biometric Access & Multi-Point Locksets',
    src: '/partner_logos/godrej.png',
    width: 110,
    height: 44,
  },
  {
    name: 'Kajaria',
    category: 'Vitrified Slabs',
    tagline: 'Large Format Glazed Vitrified Tiles',
    src: '/partner_logos/kajaria.png',
    width: 130,
    height: 40,
  },
  {
    name: 'SkyDecor',
    category: 'Laminates',
    tagline: 'High-Pressure Acrylic & Textured Surfaces',
    src: '/partner_logos/skydecor.png',
    width: 120,
    height: 40,
  },
  {
    name: 'Somany',
    category: 'Ceramics & Sanitary',
    tagline: 'Slip-Resistant Flooring & Luxury Sanware',
    src: '/partner_logos/somany.png',
    width: 130,
    height: 40,
  },
];

// Duplicate twice for seamless -50% translateX loop
const MARQUEE_ITEMS = [...PARTNER_BRANDS, ...PARTNER_BRANDS];

const CATEGORY_HIGHLIGHTS = [
  {
    icon: Home,
    title: 'Civil & Foundation',
    brands: 'UltraTech Cement • Pidilite Systems',
    desc: 'High-grade 53-N structural concrete, Dr. Fixit chemical waterproofing barriers, and corrosion-resistant steel.'
  },
  {
    icon: Layers,
    title: 'Woodwork & Surfaces',
    brands: 'CenturyPly • Greenply • SkyDecor',
    desc: 'BWP marine-grade plywood certified against borer and termites, paired with European matte laminates and veneers.'
  },
  {
    icon: Zap,
    title: 'Electrical & Automation',
    brands: 'Havells • Panasonic',
    desc: 'Fire-retardant concealed conduit wiring, modular smart touchplates, and surge-protected distribution panels.'
  },
  {
    icon: ShieldCheck,
    title: 'Tiling & Hardware',
    brands: 'Kajaria • Somany • Godrej',
    desc: 'Stain-resistant vitrified slabs, anti-skid bathroom surfaces, and high-security architectural mortise hardware.'
  }
];

export default function PartnersSection() {
  return (
    <section className="py-24 md:py-32 bg-[#090e17] text-white border-b border-white/10 relative overflow-hidden">
      
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Material Integrity &amp; Tier-1 Procurement</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-white leading-[1.1]">
              Only Certified Brands. <br />
              <span className="text-gold-gradient font-editorial italic">Never A Compromise.</span>
            </h2>
            <p className="mt-5 text-gray-400 font-light text-base md:text-lg leading-relaxed max-w-xl">
              A luxury home is only as enduring as what lies behind its plaster and veneer. We procure directly from India&apos;s leading manufacturers with zero counterfeit risk and transferable factory warranties.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end text-xs text-gray-400 font-mono">
            <FileCheck2 className="w-4 h-4 text-brand-gold" />
            <span>Direct OEM Supply • Transferable Warranties</span>
          </div>
        </div>

        {/* Marquee Ticker Container with gradient fade edges */}
        <div className="relative w-full overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 p-6 md:p-8 mb-20">
          
          {/* Gradient Edge Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#090e17] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#090e17] to-transparent z-20" />

          <div className="flex animate-marquee gap-6 md:gap-10 min-w-max items-center">
            {MARQUEE_ITEMS.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                data-cursor-tooltip={`brand-${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="w-44 md:w-52 h-24 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center p-4 hover:bg-white/[0.08] hover:border-brand-gold/40 transition-all duration-300 group cursor-target shrink-0"
              >
                <div className="relative h-10 w-full flex items-center justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    className="max-h-9 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider mt-2 group-hover:text-brand-gold transition-colors">
                  {brand.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Pillars Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CATEGORY_HIGHLIGHTS.map((col) => {
            const Icon = col.icon;
            return (
              <div 
                key={col.title}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:border-brand-gold/40 transition-all duration-300 group cursor-target flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-editorial font-bold text-white mb-1">
                  {col.title}
                </h4>
                <div className="text-[11px] font-mono text-brand-gold uppercase tracking-wider mb-3">
                  {col.brands}
                </div>
                <p className="text-xs text-gray-400 font-light leading-relaxed flex-grow">
                  {col.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">
                Genuine Invoices &amp; Manufacturer Warranties
              </h5>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                Every client receives an indexed Material Dossier containing batch test certificates and official brand guarantees.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.15em] font-bold text-brand-gold hover:text-white transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Ask About Material Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

