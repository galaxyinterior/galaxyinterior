'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Sparkles, 
  Palette 
} from 'lucide-react';

interface InspirationTile {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
  materials: string[];
  span: 'normal' | 'wide' | 'tall';
}

const INSPIRATION_TILES: InspirationTile[] = [
  {
    id: 'false-ceiling',
    title: 'False Ceiling Design',
    subtitle: 'Multi-Layer Gypsum & LED Coves',
    description: 'Coffered, tray, and floating ceiling profiles with concealed warm LED strips, chandeliers, and acoustic substrate integration.',
    image: '/generated/inspiration_false_ceiling.jpg',
    href: '/services/interior-project',
    materials: ['Saint-Gobain Gyproc', 'Philips COB Profiles', 'Acoustic Wool Substrate'],
    span: 'wide'
  },
  {
    id: 'wall-panelling',
    title: 'Wall Panelling',
    subtitle: 'Fluted Wood Veneer & Brass Inlay',
    description: 'Charcoal fluted panels with concealed LED backlight and brass T-profiles for bedrooms, living rooms, and master suites.',
    image: '/generated/inspiration_wall_panelling.jpg',
    href: '/services/interior-project',
    materials: ['Natural Walnut Veneer', 'Brass T-Profile Inlay', 'CenturyPly BWP Core'],
    span: 'normal'
  },
  {
    id: 'modular-kitchen',
    title: 'Modular Kitchen',
    subtitle: 'Handleless Finish & Quartz Island',
    description: 'Ergonomic cabinetry with touch-to-open mechanisms, waterfall quartz countertops, built-in European appliances, and dedicated lighting zones.',
    image: '/generated/inspiration_modular_kitchen.jpg',
    href: '/services/interior-project',
    materials: ['Häfele Tandem Boxes', 'PU Lacquer Shutters', 'Calacatta Quartz Tops'],
    span: 'normal'
  },
  {
    id: 'wooden-flooring',
    title: 'Wooden Flooring',
    subtitle: 'Herringbone Engineered Oak',
    description: 'Premium engineered hardwood in herringbone and chevron patterns with anti-scratch UV lacquer coating, suitable for living rooms and bedrooms.',
    image: '/generated/inspiration_wooden_flooring.jpg',
    href: '/services/interior-project',
    materials: ['European Oak Engineered', 'UV Lacquer Finish', 'Sound-Dampening Underlay'],
    span: 'wide'
  },
  {
    id: 'italian-tiles',
    title: 'Italian Marble & Tiles',
    subtitle: 'Calacatta Gold Veining',
    description: 'Large-format imported porcelain and natural marble surfaces for bathrooms, foyers, and accent walls with book-matched veining alignment.',
    image: '/generated/inspiration_italian_tiles.jpg',
    href: '/services/interior-project',
    materials: ['Kajaria Premium Series', 'Imported Calacatta Marble', 'Anti-Skid Wet-Area Grade'],
    span: 'normal'
  },
  {
    id: 'tv-unit',
    title: 'Custom TV & Entertainment Units',
    subtitle: 'Backlit Walnut Veneer Console',
    description: 'Floating entertainment walls with integrated display niches, concealed cable management, LED strip ambiance, and marble accent backdrops.',
    image: '/generated/inspiration_tv_unit.jpg',
    href: '/services/interior-project',
    materials: ['American Walnut Veneer', 'Italian Marble Backdrop', 'Concealed LED Ribbons'],
    span: 'normal'
  }
];

export default function DesignInspirationSection() {
  return (
    <section className="py-24 md:py-32 bg-[#fbfaf6] text-[#111622] border-b border-[#eeeae2] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee9df] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Palette className="w-3.5 h-3.5 text-brand-gold" />
              <span>Interior Design Library</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Find Your Style. <br />
              <span className="italic font-editorial text-brand-charcoal">Explore What We Craft.</span>
            </h2>
            <p className="mt-5 text-gray-600 font-light text-base md:text-lg leading-relaxed max-w-xl">
              Browse our curated collection of verified interior finishes and architectural elements that we design, procure, and install across residential and commercial projects.
            </p>
          </div>
          <Link 
            href="/gallery"
            data-cursor-tooltip="view-full-gallery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-bold text-brand-gold hover:text-brand-navy transition-colors self-start lg:self-end cursor-target"
          >
            <span>View Full Gallery</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Masonry-Style Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSPIRATION_TILES.map((tile, idx) => {
            const isWide = tile.span === 'wide';
            return (
              <div
                key={tile.id}
                data-cursor-tooltip={`inspiration-${tile.id}`}
                className={`group relative rounded-3xl overflow-hidden border border-[#ded8cb] shadow-sm hover:shadow-luxury-hover transition-all duration-500 cursor-target ${
                  isWide ? 'md:col-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${isWide ? 'h-[340px] md:h-[400px]' : 'h-[340px] md:h-[420px]'}`}>
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes={isWide ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Tag */}
                    <div className="mb-auto self-start">
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        {tile.subtitle}
                      </span>
                    </div>
                    
                    {/* Bottom Details */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-editorial font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">
                        {tile.title}
                      </h3>
                      <p className="text-xs text-white/80 font-light leading-relaxed mb-4 max-w-md">
                        {tile.description}
                      </p>

                      {/* Materials List */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tile.materials.map((mat, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] text-white/90 font-medium">
                            {mat}
                          </span>
                        ))}
                      </div>

                      {/* Explore CTA */}
                      <Link
                        href={tile.href}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-bold text-brand-gold hover:text-white transition-colors"
                      >
                        <span>Explore This Style</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
