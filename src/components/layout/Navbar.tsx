"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Phone, ChevronDown, Menu, X, User, LayoutGrid, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

const OPERATIONAL_CITIES = [
  'GODDA', 'RANCHI', 'BHAGALPUR', 'BANKA', 'DEOGHAR', 
  'HAZARIBAGH', 'DUMKA', 'KISHANGANJ', 'PURNEA', 'KOLKATA', 'PATNA'
];

const SERVICE_ITEMS = [
  { 
    title: "Design Facilities", 
    link: "/services/design-facilities", 
    desc: "Architecture, 2D Plans & 3D Walkthroughs", 
    img: "/services/service_design_1787300013035.jpg" 
  },
  { 
    title: "Construction Project", 
    link: "/services/construction-project", 
    desc: "Turnkey Civil & Structural Engineering", 
    img: "/services/service_construction_1787300029220.jpg" 
  },
  { 
    title: "Interior Project", 
    link: "/services/interior-project", 
    desc: "Bespoke Residences & Modular Luxury", 
    img: "/services/service_interior_1787300041689.jpg" 
  },
  { 
    title: "Turnkey Project", 
    link: "/services/turnkey-project", 
    desc: "Concept to Handover Full Ownership", 
    img: "/services/service_turnkey_1787300070398.jpg" 
  },
  { 
    title: "Renovation Project", 
    link: "/services/renovation-project", 
    desc: "Complete Modernization & Redesign", 
    img: "/services/service_renovation_1787300085173.jpg" 
  }
];

const PRICING_ITEMS = [
  { 
    title: "Turnkey Packages", 
    link: "/pricing/packages", 
    desc: "Transparent, itemised BOQ specifications", 
    img: "/services/service_turnkey_1787300070398.jpg" 
  },
  { 
    title: "Cost Calculator", 
    link: "/pricing/calculator", 
    desc: "Instant area-based cost estimation", 
    img: "/services/service_design_1787300013035.jpg" 
  },
  { 
    title: "Supervision Packages", 
    link: "/pricing/supervision", 
    desc: "On-site quality audit & Vastu planning", 
    img: "/services/service_construction_1787300029220.jpg" 
  }
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLinkActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300">
      {/* Top Location & Direct Contact Bar */}
      <div className="bg-[#070e1b] border-b border-white/[0.06] text-white/70 text-[10px] tracking-[0.2em] uppercase py-1.5 hidden lg:block transition-all duration-300">
        <div className="w-full px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center space-x-2.5 overflow-hidden text-white/60">
            <span className="text-brand-gold font-semibold tracking-widest text-[9px] mr-1">OFFICES & SITES:</span>
            {OPERATIONAL_CITIES.map((city, idx) => (
              <span key={city} className="flex items-center space-x-2">
                <span className="hover:text-white transition-colors">{city}</span>
                {idx < OPERATIONAL_CITIES.length - 1 && (
                  <span className="text-white/20 text-[8px]">•</span>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-6 shrink-0">
            <span className="text-white/40 text-[9px]">JHARKHAND • BIHAR • WEST BENGAL</span>
            <a 
              href="tel:+917004465611" 
              className="flex items-center text-brand-gold hover:text-white transition-colors font-bold tracking-wider"
              aria-label="Call Galaxy Interior directly"
            >
              <Phone size={11} className="mr-1.5" />
              +91 70044 65611
            </a>
          </div>
        </div>
      </div>

      {/* Main Studio Navigation */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-[#091122]/95 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] border-b border-white/[0.08]' 
          : 'bg-[#0b162c]/90 backdrop-blur-xl border-b border-white/[0.08]'
      }`}>
        <div className="w-full pl-4 md:pl-8 pr-4 md:pr-8 h-[68px] md:h-[76px] flex items-center justify-between">
          
          {/* Logo Flush to Left */}
          <Link href="/" className="flex items-center group cursor-target" data-cursor-tooltip="nav-home">
            <Logo className="scale-90 md:scale-100 origin-left transition-transform duration-300 group-hover:opacity-95" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[11px] font-bold tracking-[0.18em] uppercase h-full text-white/90">
            <Link 
              data-cursor-tooltip="nav-home" 
              href="/" 
              className={`px-3.5 py-2 rounded-full transition-all cursor-target flex items-center ${
                isLinkActive('/') 
                  ? 'text-brand-gold bg-brand-gold/10 font-black' 
                  : 'hover:text-brand-gold hover:bg-white/[0.04]'
              }`}
            >
              HOME
            </Link>
            
            {/* Mega Menu: SERVICES */}
            <div className="relative group h-full flex items-center">
              <Link 
                data-cursor-tooltip="nav-services" 
                href="/services" 
                className={`px-3.5 py-2 rounded-full transition-all cursor-target flex items-center ${
                  isLinkActive('/services') 
                    ? 'text-brand-gold bg-brand-gold/10 font-black' 
                    : 'hover:text-brand-gold hover:bg-white/[0.04]'
                }`}
              >
                SERVICES 
                <ChevronDown size={13} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              {/* Dropdown Container */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-max max-w-[90vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 z-50">
                <div className="bg-[#0d172b]/95 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/[0.12] grid grid-cols-5 gap-3.5 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

                  {SERVICE_ITEMS.map((service, index) => (
                    <Link 
                      key={index} 
                      data-cursor-tooltip={`services-${service.title.replace(/\s+/g, '-').toLowerCase()}`} 
                      href={service.link} 
                      className="block w-44 group/card relative z-10 cursor-target rounded-xl overflow-hidden border border-white/[0.08] hover:border-brand-gold/60 transition-all duration-300 hover:-translate-y-1 bg-[#131f38]"
                    >
                      <div className="h-28 w-full overflow-hidden relative bg-black/40">
                        <Image 
                          src={service.img} 
                          alt={service.title} 
                          fill 
                          className="object-cover opacity-75 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500" 
                          sizes="180px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131f38] via-transparent to-transparent"></div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-white group-hover/card:text-brand-gold transition-colors leading-tight">
                            {service.title}
                          </span>
                          <ArrowUpRight size={12} className="text-white/40 group-hover/card:text-brand-gold transition-colors" />
                        </div>
                        <p className="text-[9.5px] text-white/60 tracking-normal normal-case mt-1 font-normal line-clamp-1">
                          {service.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              data-cursor-tooltip="nav-projects" 
              href="/projects" 
              className={`px-3.5 py-2 rounded-full transition-all cursor-target flex items-center ${
                isLinkActive('/projects') 
                  ? 'text-brand-gold bg-brand-gold/10 font-black' 
                  : 'hover:text-brand-gold hover:bg-white/[0.04]'
              }`}
            >
              PROJECTS
            </Link>

            <Link 
              data-cursor-tooltip="nav-gallery" 
              href="/gallery" 
              className={`px-3.5 py-2 rounded-full transition-all cursor-target flex items-center ${
                isLinkActive('/gallery') 
                  ? 'text-brand-gold bg-brand-gold/10 font-black' 
                  : 'hover:text-brand-gold hover:bg-white/[0.04]'
              }`}
            >
              GALLERY
            </Link>

            {/* Mega Menu: PRICING */}
            <div className="relative group h-full flex items-center">
              <Link 
                data-cursor-tooltip="nav-pricing" 
                href="/pricing" 
                className={`px-3.5 py-2 rounded-full transition-all cursor-target flex items-center ${
                  isLinkActive('/pricing') 
                    ? 'text-brand-gold bg-brand-gold/10 font-black' 
                    : 'hover:text-brand-gold hover:bg-white/[0.04]'
                }`}
              >
                PRICING 
                <ChevronDown size={13} className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              {/* Pricing Dropdown */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-max opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 z-50">
                <div className="bg-[#0d172b]/95 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-white/[0.12] grid grid-cols-3 gap-3.5 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

                  {PRICING_ITEMS.map((item, index) => (
                    <Link 
                      key={index} 
                      data-cursor-tooltip={`pricing-${item.title.replace(/\s+/g, '-').toLowerCase()}`} 
                      href={item.link} 
                      className="block w-48 group/card relative z-10 cursor-target rounded-xl overflow-hidden border border-white/[0.08] hover:border-brand-gold/60 transition-all duration-300 hover:-translate-y-1 bg-[#131f38]"
                    >
                      <div className="h-28 w-full overflow-hidden relative bg-black/40">
                        <Image 
                          src={item.img} 
                          alt={item.title} 
                          fill 
                          className="object-cover opacity-75 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-500" 
                          sizes="200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131f38] via-transparent to-transparent"></div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black text-white group-hover/card:text-brand-gold transition-colors leading-tight">
                            {item.title}
                          </span>
                          <ArrowUpRight size={12} className="text-white/40 group-hover/card:text-brand-gold transition-colors" />
                        </div>
                        <p className="text-[9.5px] text-white/60 tracking-normal normal-case mt-1 font-normal line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              data-cursor-tooltip="nav-about" 
              href="/about" 
              className={`px-3.5 py-2 rounded-full transition-all cursor-target flex items-center ${
                isLinkActive('/about') 
                  ? 'text-brand-gold bg-brand-gold/10 font-black' 
                  : 'hover:text-brand-gold hover:bg-white/[0.04]'
              }`}
            >
              ABOUT
            </Link>

            <Link 
              data-cursor-tooltip="nav-contact" 
              href="/contact" 
              className={`px-3.5 py-2 rounded-full transition-all cursor-target flex items-center ${
                isLinkActive('/contact') 
                  ? 'text-brand-gold bg-brand-gold/10 font-black' 
                  : 'hover:text-brand-gold hover:bg-white/[0.04]'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Action & Portal Access */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <Link 
                data-cursor-tooltip="nav-dashboard" 
                href="/dashboard" 
                className="bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold border border-brand-gold/40 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase flex items-center transition-all cursor-target"
              >
                <LayoutGrid size={13} className="mr-1.5" />
                PORTAL
              </Link>
            ) : (
              <Link 
                data-cursor-tooltip="nav-login" 
                href="/login" 
                className="text-white/80 hover:text-white hover:bg-white/[0.06] border border-white/[0.12] px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase flex items-center transition-all cursor-target"
              >
                <User size={13} className="mr-1.5 text-brand-gold" />
                LOGIN
              </Link>
            )}

            <Link 
              data-cursor-tooltip="nav-consult" 
              href="/contact" 
              className="bg-brand-gold hover:bg-brand-gold-light text-[#0b162c] px-5 py-2 rounded-full text-[10.5px] font-black tracking-[0.18em] uppercase transition-all shadow-[0_0_20px_rgba(201,154,44,0.3)] hover:scale-[1.02] cursor-target flex items-center"
            >
              START PROJECT
            </Link>
          </div>
          
          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <a 
              href="tel:+919631980881" 
              className="p-2 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30"
              aria-label="Call directly"
            >
              <Phone size={16} />
            </a>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-white hover:text-brand-gold p-2 transition-colors rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1222] border-t border-white/[0.08] text-white shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="p-6 space-y-6 text-xs font-bold tracking-[0.18em] uppercase">
            
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  pathname === '/' ? 'text-brand-gold bg-brand-gold/10' : 'text-white'
                }`}
              >
                HOME
              </Link>

              {/* Mobile Services Accordion */}
              <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                <div className="text-brand-gold text-[10px] tracking-[0.25em] font-black mb-2.5">
                  OUR SERVICES
                </div>
                <div className="space-y-2 pl-2 border-l border-brand-gold/30">
                  {SERVICE_ITEMS.map((service, index) => (
                    <Link 
                      key={index} 
                      href={service.link} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`block py-1 text-[11px] font-medium tracking-wider ${
                        pathname.includes(service.link) ? 'text-brand-gold font-bold' : 'text-white/80'
                      }`}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/projects" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  pathname === '/projects' ? 'text-brand-gold bg-brand-gold/10' : 'text-white'
                }`}
              >
                PROJECTS
              </Link>

              <Link 
                href="/gallery" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  pathname === '/gallery' ? 'text-brand-gold bg-brand-gold/10' : 'text-white'
                }`}
              >
                GALLERY
              </Link>

              <Link 
                href="/furniture" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  pathname === '/furniture' ? 'text-brand-gold bg-brand-gold/10' : 'text-white'
                }`}
              >
                FURNITURE
              </Link>

              {/* Mobile Pricing Accordion */}
              <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                <div className="text-brand-gold text-[10px] tracking-[0.25em] font-black mb-2.5">
                  PRICING & CALCULATOR
                </div>
                <div className="space-y-2 pl-2 border-l border-brand-gold/30">
                  {PRICING_ITEMS.map((item, index) => (
                    <Link 
                      key={index} 
                      href={item.link} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`block py-1 text-[11px] font-medium tracking-wider ${
                        pathname.includes(item.link) ? 'text-brand-gold font-bold' : 'text-white/80'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                href="/reviews" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  pathname === '/reviews' ? 'text-brand-gold bg-brand-gold/10' : 'text-white'
                }`}
              >
                REVIEWS & STORIES
              </Link>

              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  pathname === '/about' ? 'text-brand-gold bg-brand-gold/10' : 'text-white'
                }`}
              >
                ABOUT US
              </Link>

              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`py-2 px-3 rounded-lg flex items-center justify-between ${
                  pathname === '/contact' ? 'text-brand-gold bg-brand-gold/10' : 'text-white'
                }`}
              >
                CONTACT
              </Link>
            </div>

            {/* Quick Actions & Auth */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-full bg-brand-gold text-[#0b162c] py-3 rounded-xl text-center font-black tracking-widest text-[11px] block shadow-lg"
              >
                START YOUR PROJECT
              </Link>

              {user ? (
                <Link 
                  href="/dashboard" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-full bg-white/[0.06] text-white border border-brand-gold/30 py-3 rounded-xl text-center font-bold tracking-widest text-[11px] flex items-center justify-center"
                >
                  <LayoutGrid size={14} className="mr-2 text-brand-gold" />
                  CLIENT PORTAL
                </Link>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="w-full bg-white/[0.06] text-white border border-white/[0.1] py-3 rounded-xl text-center font-bold tracking-widest text-[11px] flex items-center justify-center"
                >
                  <User size={14} className="mr-2 text-brand-gold" />
                  CLIENT LOGIN
                </Link>
              )}

              <a 
                href="tel:+919631980881" 
                className="w-full text-white/70 py-2 text-center text-[10px] tracking-widest flex items-center justify-center"
              >
                <Phone size={12} className="mr-1.5 text-brand-gold" />
                CALL +91 96319 80881
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
