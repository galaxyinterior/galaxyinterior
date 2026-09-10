'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { 
  ArrowUpRight, 
  MapPin, 
  Maximize2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'turnkey' | 'interior' | 'completed';
  categoryLabel: string;
  location: string;
  area: string;
  scope: string;
  image: string;
  highlights: string[];
  status: 'completed' | 'ongoing';
  year?: string;
}

const CURATED_PROJECTS: ProjectItem[] = [
  {
    id: 'curated-1',
    title: 'The Grand Horizon Villa',
    category: 'turnkey',
    categoryLabel: 'Architecture & Turnkey Civil',
    location: 'Morabadi, Ranchi',
    area: '4,800 sq.ft.',
    scope: 'Architectural Design • Civil Construction • Complete Interior',
    image: '/generated/legacy_villa.png',
    highlights: ['Double-Height Living', 'Italian Botticino Marble', 'Teakwood Joinery', 'Climate-Responsive Elevation'],
    status: 'completed',
    year: '2024'
  },
  {
    id: 'curated-2',
    title: 'The Ivory Penthouse',
    category: 'interior',
    categoryLabel: 'Luxury Interior Execution',
    location: 'Bailey Road, Patna',
    area: '3,400 sq.ft.',
    scope: 'Bespoke Interior Turnkey & Smart Lighting',
    image: '/generated/hero_interior_1.png',
    highlights: ['Acoustic Wall Panelling', 'Concealed Magnetic Tracks', 'Modular Kitchen w/ Häfele Hardware', 'Custom Vanity Units'],
    status: 'completed',
    year: '2024'
  },
  {
    id: 'curated-3',
    title: 'Lakeview Duplex Estate',
    category: 'turnkey',
    categoryLabel: 'Contemporary Architecture & Build',
    location: 'New Town, Kolkata',
    area: '5,200 sq.ft.',
    scope: 'Structural Civil Build • 3D Elevation • Modern Facade',
    image: '/generated/3d_elevation_hero.png',
    highlights: ['Cantilevered Balconies', 'Thermal Insulation Glass', 'Landscaped Courtyard', 'Terrace Pergola'],
    status: 'ongoing',
    year: '2025'
  },
  {
    id: 'curated-4',
    title: 'Minimalist Zen Residence',
    category: 'interior',
    categoryLabel: 'Turnkey Residential Interior',
    location: 'Adampur, Bhagalpur',
    area: '2,800 sq.ft.',
    scope: 'Spatial Planning • Custom Millwork • False Ceiling',
    image: '/generated/interior_gallery_1.png',
    highlights: ['Natural Wood Veneer', 'Seamless Micro-topping Floors', 'Fluted Charcoal Accents', 'Integrated Walk-in Closet'],
    status: 'completed',
    year: '2023'
  }
];

export default function FeaturedProjectsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'turnkey' | 'interior'>('all');
  const [projects, setProjects] = useState<ProjectItem[]>(CURATED_PROJECTS);
  const [loading, setLoading] = useState(false);

  // Fetch public projects from Firebase if present
  useEffect(() => {
    const loadFirebaseProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), where('isPublic', '==', true));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const fetched: ProjectItem[] = snapshot.docs.map(doc => {
            const data = doc.data();
            const rawStatus = (data.status || 'completed').toLowerCase();
            const status: 'completed' | 'ongoing' = rawStatus === 'ongoing' ? 'ongoing' : 'completed';
            
            let category: 'turnkey' | 'interior' | 'completed' = 'turnkey';
            if (data.projectType?.toLowerCase().includes('interior')) {
              category = 'interior';
            } else if (status === 'completed') {
              category = 'completed';
            }

            return {
              id: doc.id,
              title: data.projectName || data.title || 'Architectural Commission',
              category,
              categoryLabel: data.projectType || (category === 'interior' ? 'Luxury Interior' : 'Turnkey Construction'),
              location: data.location || 'Eastern India',
              area: data.areaSqft ? `${data.areaSqft} sq.ft.` : (data.area || 'Custom Build'),
              scope: data.scope || data.requirements || 'Architectural Planning & Execution',
              image: data.coverImageUrl || data.image || '/generated/legacy_villa.png',
              highlights: data.highlights || ['Verified Materials', 'Daily Supervision', 'Turnkey Handover'],
              status,
              year: data.completionYear || '2024'
            };
          });

          // Merge fetched projects with curated fallback if less than 3
          if (fetched.length >= 3) {
            setProjects(fetched);
          } else {
            setProjects([...fetched, ...CURATED_PROJECTS.slice(fetched.length)]);
          }
        }
      } catch (err) {
        console.error('Error fetching featured projects from Firestore:', err);
        // Gracefully keep curated fallback
      }
    };

    loadFirebaseProjects();
  }, []);

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return p.status === 'completed';
    return p.category === activeTab;
  });

  return (
    <section className="py-24 md:py-32 bg-[#fbfaf6] text-[#111622] border-b border-[#eeeae2] relative">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee9df] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Selected Portfolio • Built &amp; Handed Over</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight leading-[1.1] text-brand-charcoal">
              Spaces We’ve <br />
              <span className="italic font-editorial text-brand-charcoal">Brought to Life</span>
            </h2>
            <p className="mt-5 text-gray-600 font-light text-base md:text-lg leading-relaxed max-w-xl">
              Each commission represents a tailored synthesis of client aspirations, structural precision, and timeless tactile finishes across Jharkhand, Bihar, and West Bengal.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#eee9df]/60 p-1.5 rounded-2xl border border-[#ded8cb] self-start lg:self-end">
            {[
              { id: 'all', label: 'All Commissions' },
              { id: 'completed', label: 'Delivered Homes' },
              { id: 'turnkey', label: 'Architecture & Build' },
              { id: 'interior', label: 'Luxury Interiors' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                data-cursor-tooltip={`filter-${tab.id}`}
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-target ${
                  activeTab === tab.id
                    ? 'bg-[#111622] text-white shadow-sm'
                    : 'text-gray-600 hover:text-brand-charcoal hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Project Showcase */}
        <div className="space-y-16 md:space-y-24">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={project.id}
                data-cursor-tooltip="view-project-case"
                className="group relative bg-white border border-[#ded8cb] rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-500 cursor-target"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Visual Frame (7 Columns) */}
                  <div className={`relative h-[340px] sm:h-[420px] lg:h-[540px] overflow-hidden lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm">
                      {project.status === 'completed' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-charcoal">
                            Completed • Handed Over
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                          <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-charcoal">
                            Under Construction
                          </span>
                        </>
                      )}
                    </div>

                    {/* Area tag bottom right */}
                    <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono tracking-wider">
                      {project.area}
                    </div>
                  </div>

                  {/* Metadata & Case Study Details (5 Columns) */}
                  <div className={`p-8 md:p-12 lg:p-14 flex flex-col justify-between lg:col-span-5 bg-white ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div>
                      {/* Sub-label & Location */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pb-3 border-b border-gray-100">
                        <span className="font-semibold text-brand-gold uppercase tracking-[0.2em] text-[11px]">
                          {project.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-4xl font-editorial font-normal text-brand-charcoal mb-4 leading-tight group-hover:text-brand-navy transition-colors">
                        {project.title}
                      </h3>

                      {/* Scope description */}
                      <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed mb-6">
                        {project.scope}
                      </p>

                      {/* Highlights bullets */}
                      <div className="space-y-2.5 mb-8">
                        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-400">
                          Execution Highlights:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-700 font-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA to Projects page */}
                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                      <Link 
                        href="/projects"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors"
                      >
                        <span>Explore Full Portfolio</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                      {project.year && (
                        <span className="text-xs font-mono text-gray-400">
                          {project.year}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Direct Link Banner */}
        <div className="mt-16 md:mt-24 p-8 md:p-12 rounded-3xl bg-[#111622] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-brand-gold font-semibold block mb-2">
              Have a Plot or Upcoming Flat Handover?
            </span>
            <h4 className="text-2xl md:text-3xl font-editorial font-normal">
              Schedule a Complimentary Architectural Site Evaluation
            </h4>
            <p className="text-gray-400 text-xs md:text-sm font-light mt-2 max-w-xl">
              Our lead engineers will review your plot layout, local building bylaws, and provide a preliminary structural feasibility breakdown.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 relative z-10 shrink-0">
            <Link
              href="/projects"
              data-cursor-tooltip="all-projects-btn"
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-brand-gold text-xs uppercase tracking-[0.15em] font-semibold text-white transition-all cursor-target hover:bg-white/5"
            >
              All 120+ Projects
            </Link>
            <Link
              href="/contact"
              data-cursor-tooltip="consultation-btn"
              className="px-7 py-3.5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-[#111622] text-xs uppercase tracking-[0.15em] font-bold transition-all shadow-md hover:shadow-lg cursor-target"
            >
              Book Site Visit
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
