'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          setSettings(snap.data());
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);
  return (
    <footer className="bg-[#0b162c] text-gray-300 py-16 border-t-4 border-brand-yellow font-medium">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1: LOCATION */}
        <div>
          <h4 className="text-brand-yellow font-black uppercase tracking-widest text-sm mb-4 border-b border-dotted border-brand-yellow pb-2">Location</h4>
          <div className="mb-6 w-48">
            <Logo className="scale-75 origin-left" />
          </div>
          <div className="text-sm leading-relaxed max-w-[250px]">
            <p className="font-bold text-white mb-1">Statewide Operations</p>
            <p className="text-gray-400 text-xs leading-5">We work across Jharkhand, Bihar, and West Bengal.</p>
          </div>
        </div>

        {/* Column 2: SITE MAP */}
        <div>
          <h4 className="text-brand-yellow font-black uppercase tracking-widest text-sm mb-4 border-b border-dotted border-brand-yellow pb-2">Site Map</h4>
          <ul className="space-y-4 text-sm font-bold text-gray-300">
            <li><Link href="/" className="hover:text-brand-yellow transition-colors cursor-target" data-cursor-tooltip="nav-home">Home</Link></li>
            <li><Link href="/about" className="hover:text-brand-yellow transition-colors cursor-target" data-cursor-tooltip="nav-about">Company Profile</Link></li>
            <li><Link href="/services" className="hover:text-brand-yellow transition-colors cursor-target" data-cursor-tooltip="nav-services">Services</Link></li>
            <li><Link href="/projects" className="hover:text-brand-yellow transition-colors cursor-target" data-cursor-tooltip="nav-projects">Projects & Portfolio</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-yellow transition-colors cursor-target" data-cursor-tooltip="nav-pricing">Pricing & Packages</Link></li>
            <li><Link href="/contact" className="hover:text-brand-yellow transition-colors cursor-target" data-cursor-tooltip="nav-contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: SERVICE AREAS & TESTIMONIALS */}
        <div>
          <h4 className="text-brand-yellow font-black uppercase tracking-widest text-sm mb-4 border-b border-dotted border-brand-yellow pb-2">Service Areas</h4>
          <div className="text-sm font-bold leading-8 mb-8 text-white tracking-widest uppercase">
            GODDA <span className="text-brand-yellow mx-2">|</span> 
            RANCHI <span className="text-brand-yellow mx-2">|</span> 
            BHAGALPUR <span className="text-brand-yellow mx-2">|</span> 
            BANKA <span className="text-brand-yellow mx-2">|</span> 
            DEOGHAR <span className="text-brand-yellow mx-2">|</span> 
            HAZARIBAGH <span className="text-brand-yellow mx-2">|</span> 
            DUMKA <span className="text-brand-yellow mx-2">|</span> 
            KISHANGANJ <span className="text-brand-yellow mx-2">|</span> 
            PURNEA <span className="text-brand-yellow mx-2">|</span> 
            KOLKATA <span className="text-brand-yellow mx-2">|</span> 
            PATNA
          </div>

          <h4 className="text-brand-yellow font-black uppercase tracking-widest text-sm mb-4 border-b border-dotted border-brand-yellow pb-2">Testimonials</h4>
          <div>
            <div className="text-brand-yellow text-4xl font-serif leading-none h-6">&quot;</div>
            <p className="text-xs italic text-gray-400">best construction work I have ever seen</p>
          </div>
        </div>

        {/* Column 4: CONTACT & SOCIAL LINKS */}
        <div>
          <h4 className="text-brand-yellow font-black uppercase tracking-widest text-sm mb-4 border-b border-dotted border-brand-yellow pb-2">Contact</h4>
          <div className="space-y-4 mb-8 text-sm font-bold text-white">
            <div className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href={`mailto:${settings?.email || 'info@galaxyinteriorindia.com'}`} className="hover:text-brand-yellow transition-colors break-all">
                {settings?.email || 'info@galaxyinteriorindia.com'}
              </a>
            </div>
            <div className="flex items-start space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-yellow fill-current flex-shrink-0 mt-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div className="flex flex-col space-y-1">
                <a href={`tel:${settings?.phone || '+919631980881'}`} className="hover:text-brand-yellow transition-colors">{settings?.phone || '+91 96319 80881'}</a>
              </div>
            </div>
          </div>

          <h4 className="text-brand-yellow font-black uppercase tracking-widest text-sm mb-4 border-b border-dotted border-brand-yellow pb-2">Social Links</h4>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((item) => {
              const platforms = ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'YouTube'];
              const platform = platforms[item - 1];
              return (
              <a key={item} href={`https://${platform.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${platform}`} className="w-8 h-8 bg-brand-yellow rounded-sm flex items-center justify-center text-white hover:bg-[#d69f10] transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {item === 1 && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                  {item === 2 && <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>}
                  {item === 3 && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></>}
                  {item === 4 && <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>}
                  {item === 5 && <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></>}
                </svg>
              </a>
            )})}
          </div>
        </div>

      </div>
    </footer>
  );
}
