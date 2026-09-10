'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

interface GeneralSettings {
  phone?: string;
  email?: string;
  address?: string;
}

const REGIONAL_HUBS = [
  { state: 'Jharkhand', cities: ['Ranchi', 'Godda', 'Deoghar', 'Hazaribagh', 'Dumka'] },
  { state: 'Bihar', cities: ['Patna', 'Bhagalpur', 'Banka', 'Kishanganj', 'Purnea'] },
  { state: 'West Bengal', cities: ['Kolkata'] }
];

export function Footer() {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          setSettings(snap.data() as GeneralSettings);
        }
      } catch (err) {
        console.error("Error loading footer settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const phone = settings?.phone || '+91 70044 65611';
  const email = settings?.email || 'contact@galaxyinteriorindia.com';

  return (
    <footer className="bg-[#070e1b] text-white/80 border-t border-white/[0.08] relative overflow-hidden font-sans">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-brand-gold/[0.04] rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          
          {/* Column 1: Studio Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block cursor-target" data-cursor-tooltip="nav-home">
              <Logo className="scale-95 origin-left" />
            </Link>
            
            <p className="text-white/70 text-sm leading-relaxed max-w-sm font-normal">
              Full-service architectural planning, luxury interior design, and turnkey civil construction firm. Shaping bespoke living environments across Eastern India with itemised BOQ transparency and engineering precision.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <Phone size={14} />
                </div>
                <a 
                  href={`tel:${phone.replace(/\s+/g, '')}`} 
                  className="text-white font-bold hover:text-brand-gold transition-colors"
                >
                  {phone}
                </a>
              </div>

              <div className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <Mail size={14} />
                </div>
                <a 
                  href={`mailto:${email}`} 
                  className="text-white/90 hover:text-brand-gold transition-colors break-all"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-4 text-xs text-white/50">
              <span className="flex items-center">
                <ShieldCheck size={14} className="text-brand-gold mr-1.5" />
                Verified Contracts
              </span>
              <span className="flex items-center">
                <Clock size={14} className="text-brand-gold mr-1.5" />
                Timely Handover
              </span>
            </div>
          </div>

          {/* Column 2: Architectural Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-black tracking-[0.25em] uppercase text-brand-gold">
              Services & Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wide">
              <li>
                <Link href="/services/design-facilities" className="hover:text-brand-gold transition-colors flex items-center justify-between group">
                  <span>Design Facilities & 3D</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                </Link>
              </li>
              <li>
                <Link href="/services/construction-project" className="hover:text-brand-gold transition-colors flex items-center justify-between group">
                  <span>Civil & Turnkey Construction</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                </Link>
              </li>
              <li>
                <Link href="/services/interior-project" className="hover:text-brand-gold transition-colors flex items-center justify-between group">
                  <span>Bespoke Luxury Interiors</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                </Link>
              </li>
              <li>
                <Link href="/services/turnkey-project" className="hover:text-brand-gold transition-colors flex items-center justify-between group">
                  <span>Turnkey Project Execution</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                </Link>
              </li>
              <li>
                <Link href="/services/renovation-project" className="hover:text-brand-gold transition-colors flex items-center justify-between group">
                  <span>Complete Home Renovation</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold" />
                </Link>
              </li>
              <li>
                <Link href="/pricing/calculator" className="hover:text-brand-gold transition-colors flex items-center justify-between group text-brand-gold">
                  <span>Interactive Cost Calculator</span>
                  <ArrowUpRight size={12} className="opacity-70 group-hover:opacity-100 transition-opacity text-brand-gold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Portfolio (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-xs font-black tracking-[0.25em] uppercase text-brand-gold">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium tracking-wide">
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  Our Story & Leadership
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-gold transition-colors">
                  Selected Projects
                </Link>
              </li>
              <li>
                <Link href="/furniture" className="hover:text-brand-gold transition-colors">
                  Bespoke Furniture
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-gold transition-colors">
                  3D & Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-brand-gold transition-colors">
                  Client Testimonials
                </Link>
              </li>
              <li>
                <Link href="/pricing/packages" className="hover:text-brand-gold transition-colors">
                  Turnkey Packages
                </Link>
              </li>
              <li>
                <Link href="/pricing/supervision" className="hover:text-brand-gold transition-colors">
                  Supervision Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Operational Hubs (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-xs font-black tracking-[0.25em] uppercase text-brand-gold flex items-center">
              <MapPin size={13} className="mr-1.5 text-brand-gold" />
              Regional Presence
            </h4>
            
            <p className="text-xs text-white/60 leading-relaxed">
              Operating with verified regional engineering and design supervisors across Eastern India:
            </p>

            <div className="space-y-3 pt-1">
              {REGIONAL_HUBS.map((region) => (
                <div key={region.state} className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl">
                  <div className="text-[11px] font-bold text-white mb-1 tracking-wider uppercase">
                    {region.state}
                  </div>
                  <div className="text-[10px] text-white/60 tracking-wider">
                    {region.cities.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/50 tracking-wider">
          <div>
            © {new Date().getFullYear()} Galaxy Interior India. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest text-white/40">
            <span>Architecture</span>
            <span>•</span>
            <span>Interior Design</span>
            <span>•</span>
            <span>Turnkey Construction</span>
          </div>

          <div>
            <Link href="/contact" className="hover:text-brand-gold transition-colors">
              Privacy & Inquiries
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
