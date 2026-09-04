"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Phone, LayoutGrid, ChevronDown, Menu, X, User } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const getLinkStyle = (path: string) => {
    // Basic match or starts with for services
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);
    
    if (isActive) {
      return "bg-brand-yellow/20 text-brand-yellow px-4 py-2 rounded-full border border-brand-yellow/30 h-max flex items-center";
    }
    return "hover:text-brand-yellow transition-colors h-full flex items-center px-4";
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/5 backdrop-blur-md">
      {/* Top Bar */}
      <div className="bg-brand-navy text-white/80 text-[10px] font-medium tracking-widest uppercase py-2 hidden md:block">
        <div className="w-full px-4 md:px-8 flex justify-end items-center">
          <div className="flex space-x-3 items-center">
            <span>GODDA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>RANCHI</span>
            <span className="text-brand-yellow/50">|</span>
            <span>BHAGALPUR</span>
            <span className="text-brand-yellow/50">|</span>
            <span>BANKA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>DEOGHAR</span>
            <span className="text-brand-yellow/50">|</span>
            <span>HAZARIBAGH</span>
            <span className="text-brand-yellow/50">|</span>
            <span>DUMKA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>KISHANGANJ</span>
            <span className="text-brand-yellow/50">|</span>
            <span>PURNEA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>KOLKATA</span>
            <span className="text-brand-yellow/50">|</span>
            <span>PATNA</span>
            
            <a href="tel:+919631980881" className="flex items-center text-brand-yellow ml-8 hover:text-white transition-colors">
              <Phone size={12} className="mr-2" />
              +91 96319 80881
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-brand-navy/90 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl">
        <div className="w-full pl-0 pr-4 md:pr-8 h-16 flex items-center justify-between">
          
          {/* Logo overlapping space */}
          <div className="w-48 md:w-64 h-full relative">
            <div className="absolute top-0 md:top-[-40px] left-0 bg-[#0b162c] md:border-r-4 md:border-b-4 border-[#1c2c4d] p-3 md:p-6 md:pr-8 md:rounded-br-2xl shadow-xl flex flex-col items-center justify-center h-16 md:h-28 w-48 md:w-64">
               <Link href="/" className="w-full h-full flex items-center justify-center">
                 <Logo className="scale-75 md:scale-90" />
               </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4 text-xs font-bold tracking-widest uppercase h-full">
            <Link data-cursor-tooltip="nav-home" href="/" className={`${getLinkStyle('/')} cursor-target`}>
              HOME
            </Link>
            
            <div className="relative group h-full flex items-center">
              <Link data-cursor-tooltip="nav-services" href="/services" className={`${getLinkStyle('/services')} cursor-target`}>
                OUR SERVICES <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex gap-4 relative overflow-hidden">
                  
                  {/* Subtle decorative background element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl"></div>
                  
                  {[
                    { title: "Design Facilities", img: "/services/service_design_1787300013035.jpg" },
                    { title: "Construction Project", img: "/services/service_construction_1787300029220.jpg" },
                    { title: "Interior Project", img: "/services/service_interior_1787300041689.jpg" },
                    { title: "Turnkey Project", img: "/services/service_turnkey_1787300070398.jpg" },
                    { title: "Renovation Project", img: "/services/service_renovation_1787300085173.jpg" }
                  ].map((service, index) => (
                    <Link data-cursor-tooltip={`services-${service.title.replace(/\s+/g, '-').toLowerCase()}`} href={`/services/${service.title.replace(/\s+/g, '-').toLowerCase()}`} key={index} className="block w-40 group/card relative z-10 cursor-target">
                      <div className="bg-[#1c2c4d] rounded-xl overflow-hidden shadow-md h-full border border-gray-800 hover:border-brand-yellow/50 transition-colors flex flex-col">
                        <div className="h-28 w-full overflow-hidden relative bg-gray-900">
                          <Image src={service.img} alt={service.title} fill className="object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-500" />
                        </div>
                        <div className="p-3 text-center flex-grow flex items-center justify-center">
                          <span className="text-[10px] font-black text-white group-hover/card:text-brand-yellow transition-colors leading-tight">{service.title}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                </div>
              </div>
            </div>

            <Link data-cursor-tooltip="nav-projects" href="/projects" className={`${getLinkStyle('/projects')} cursor-target`}>
              PROJECTS
            </Link>
            <Link data-cursor-tooltip="nav-gallery" href="/gallery" className={`${getLinkStyle('/gallery')} cursor-target`}>
              GALLERY
            </Link>
            <div className="relative group h-full flex items-center">
              <Link data-cursor-tooltip="nav-pricing" href="/pricing" className={`${getLinkStyle('/pricing')} cursor-target`}>
                PRICING <ChevronDown size={14} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2">
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex gap-4 relative overflow-hidden">
                  
                  {/* Subtle decorative background element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl"></div>
                  
                  {[
                    { title: "Turnkey Project Package", link: "/pricing/packages", img: "/services/service_turnkey_1787300070398.jpg" },
                    { title: "Cost Calculator", link: "/pricing/calculator", img: "/services/service_design_1787300013035.jpg" },
                    { title: "Supervision Packages", link: "/pricing/supervision", img: "/services/service_construction_1787300029220.jpg" }
                  ].map((service, index) => (
                    <Link data-cursor-tooltip={`pricing-${service.title.replace(/\s+/g, '-').toLowerCase()}`} href={service.link} key={index} className="block w-40 group/card relative z-10 cursor-target">
                      <div className="bg-[#1c2c4d] rounded-xl overflow-hidden shadow-md h-full border border-gray-800 hover:border-brand-yellow/50 transition-colors flex flex-col">
                        <div className="h-28 w-full overflow-hidden relative bg-gray-900">
                          <Image src={service.img} alt={service.title} fill className="object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-500" />
                        </div>
                        <div className="p-3 text-center flex-grow flex items-center justify-center">
                          <span className="text-[10px] font-black text-white group-hover/card:text-brand-yellow transition-colors leading-tight">{service.title}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                </div>
              </div>
            </div>
            <Link data-cursor-tooltip="nav-about" href="/about" className={`${getLinkStyle('/about')} cursor-target`}>
              ABOUT US
            </Link>
            
            <Link data-cursor-tooltip="nav-contact" href="/contact" className="ml-4 bg-brand-yellow text-brand-navy hover:bg-yellow-400 px-6 py-2.5 rounded-full border-none transition-colors h-max flex items-center shadow-lg shadow-black/20 cursor-target">
              CONTACT
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            {user ? (
              <Link data-cursor-tooltip="nav-dashboard" href="/dashboard" className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center transition-all shadow-[0_0_15px_rgba(241,184,33,0.4)] cursor-target">
                <LayoutGrid size={14} className="mr-2" />
                DASHBOARD
              </Link>
            ) : (
              <Link data-cursor-tooltip="nav-login" href="/login" className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center transition-all shadow-[0_0_15px_rgba(241,184,33,0.4)] cursor-target">
                <User size={14} className="mr-2" />
                LOGIN
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-yellow transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1c2c4d] border-t border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-6 space-y-6 text-sm font-bold tracking-widest uppercase">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/' ? 'text-brand-yellow' : 'text-white'}`}>
              HOME
            </Link>
            
            <div className="flex flex-col space-y-4 border-l-2 border-brand-yellow/30 pl-4">
              <span className="text-gray-400 text-xs">OUR SERVICES</span>
              {[
                { title: "Design Facilities", link: "design-facilities" },
                { title: "Construction Project", link: "construction-project" },
                { title: "Interior Project", link: "interior-project" },
                { title: "Turnkey Project", link: "turnkey-project" },
                { title: "Renovation Project", link: "renovation-project" }
              ].map((service, index) => (
                <Link 
                  key={index} 
                  href={`/services/${service.link}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center text-xs ${pathname.includes(service.link) ? 'text-brand-yellow' : 'text-white'}`}
                >
                  {service.title}
                </Link>
              ))}
            </div>

            <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/gallery' ? 'text-brand-yellow' : 'text-white'}`}>GALLERY</Link>
            <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/projects' ? 'text-brand-yellow' : 'text-white'}`}>PROJECTS</Link>
            <div className="flex flex-col space-y-4 border-l-2 border-brand-yellow/30 pl-4 mt-4">
              <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={`text-xs ${pathname === '/pricing' ? 'text-brand-yellow' : 'text-gray-400'}`}>PRICING OVERVIEW</Link>
              {[
                { title: "Turnkey Project Package", link: "packages" },
                { title: "Cost Calculator", link: "calculator" },
                { title: "Supervision Packages", link: "supervision" }
              ].map((service, index) => (
                <Link 
                  key={index} 
                  href={`/pricing/${service.link}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center text-xs ${pathname.includes(service.link) ? 'text-brand-yellow' : 'text-white'}`}
                >
                  {service.title}
                </Link>
              ))}
            </div>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center ${pathname === '/about' ? 'text-brand-yellow' : 'text-white'}`}>ABOUT</Link>
            
            <a href="tel:+919631980881" className="bg-brand-yellow text-brand-navy px-4 py-3 rounded-xl flex items-center justify-center mt-4">
              <Phone size={16} className="mr-2" /> CALL +91 96319 80881
            </a>
            
            {user ? (
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-navy text-white border border-brand-yellow/30 px-4 py-3 rounded-xl flex items-center justify-center mt-2">
                <LayoutGrid size={16} className="mr-2" />
                DASHBOARD
              </Link>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-navy text-white border border-brand-yellow/30 px-4 py-3 rounded-xl flex items-center justify-center mt-2">
                <User size={16} className="mr-2" />
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
