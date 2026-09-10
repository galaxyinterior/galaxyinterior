'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, CheckCircle2, AlertCircle, Phone, MapPin, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';

interface SlideData {
  id: string;
  imageUrl: string;
  mobileImageUrl?: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaUrl?: string;
}

const DEFAULT_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=2400',
    title: 'HOMES DESIGNED AROUND YOU.',
    subtitle: 'From architectural blueprints and photorealistic 3D visualization to turnkey civil construction and bespoke interior execution.',
    ctaText: 'Explore Projects',
    ctaUrl: '/projects'
  },
  {
    id: 'slide-2',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=2400',
    title: 'ENGINEERED WITH UNCOMPROMISING LUXURY.',
    subtitle: 'End-to-end turnkey construction with transparent itemised BOQ, verified material brands, and strict daily site supervision.',
    ctaText: 'Turnkey Packages',
    ctaUrl: '/pricing/packages'
  },
  {
    id: 'slide-3',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=2400',
    title: 'BESPOKE LIVING SPACES CRAFTED FOR GENERATIONS.',
    subtitle: 'Modern layouts, master suites, and modular kitchen architecture tailored to your family’s unique lifestyle.',
    ctaText: 'View Portfolio',
    ctaUrl: '/gallery'
  }
];

const VERIFIED_CITIES = [
  'Ranchi', 'Godda', 'Bhagalpur', 'Patna', 'Kolkata', 
  'Deoghar', 'Banka', 'Hazaribagh', 'Dumka', 'Kishanganj', 'Purnea'
];

export default function HeroSection() {
  const [slides, setSlides] = useState<SlideData[]>(DEFAULT_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Ranchi'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  // Fetch Firestore slides if available
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const q = query(collection(db, 'heroSlides'), orderBy('sortOrder', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as SlideData & { isActive?: boolean }))
          .filter(slide => slide.isActive !== false);
        
        if (data.length > 0) {
          setSlides(data);
        }
      } catch (err) {
        console.error("Error fetching hero slides from Firebase:", err);
      }
    };
    fetchSlides();
  }, []);

  // Automatic slideshow progression
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        type: 'consultation',
        createdAt: serverTimestamp()
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', city: 'Ranchi' });
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus(null);
      }, 3500);
    } catch (error) {
      console.error('Error submitting consultation inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const active = slides[currentSlide] || DEFAULT_SLIDES[0];

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#070e1b] text-white">
      
      {/* Full-bleed Background Imagery with Smooth Fade */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1), transform 6000ms ease-out' }}
          >
            {/* Optimized Picture Element */}
            <picture>
              {slide.mobileImageUrl && <source media="(max-width: 768px)" srcSet={slide.mobileImageUrl} />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
          </div>
        ))}

        {/* Sophisticated Architectural Dark Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/60 to-[#070e1b]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e1b]/90 via-[#070e1b]/50 to-transparent"></div>
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col justify-between min-h-[85vh]">
        
        {/* Top Spacer / Eyebrow */}
        <div className="pt-4 md:pt-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-brand-gold text-[10px] md:text-xs font-black tracking-[0.25em] uppercase">
            <Sparkles size={13} className="text-brand-gold animate-pulse" />
            <span>Architecture • Interiors • Turnkey Construction</span>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="max-w-4xl space-y-6 my-auto pt-6 pb-12">
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal text-white leading-[1.08] tracking-tight drop-shadow-2xl">
            {active.title}
          </h1>

          <p className="text-white/80 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-md">
            {active.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3.5 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              data-cursor-tooltip="hero-consult"
              className="bg-brand-gold hover:bg-brand-gold-light text-[#0b162c] px-9 py-4 rounded-full font-black text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(201,154,44,0.35)] hover:scale-[1.03] cursor-target flex items-center justify-center group"
            >
              <span>START YOUR PROJECT</span>
              <ArrowRight size={15} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              href="/projects"
              data-cursor-tooltip="hero-projects"
              className="bg-white/[0.06] hover:bg-white/[0.14] text-white border border-white/20 hover:border-white/50 px-8 py-4 rounded-full font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md cursor-target flex items-center justify-center"
            >
              VIEW OUR WORK
            </Link>
          </div>
        </div>

        {/* Bottom Trust & Slide Indicators Bar */}
        <div className="pt-8 border-t border-white/[0.1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-white">
          
          {/* Verified Regional Stats */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-gold font-sans">120+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">Completed Residences</div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/10"></div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-gold font-sans">20+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">In-House Specialists</div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/10"></div>

            <div>
              <div className="text-sm sm:text-base font-bold text-white tracking-wider">JHARKHAND • BIHAR • WEST BENGAL</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">11 Operational Hubs</div>
            </div>
          </div>

          {/* Minimal Slide Progress Indicators */}
          {slides.length > 1 && (
            <div className="flex items-center space-x-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    i === currentSlide ? 'w-8 bg-brand-gold' : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Elegant Consultation Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0d1628] border border-white/[0.12] rounded-3xl p-8 md:p-10 text-white shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white p-2 transition-colors rounded-full hover:bg-white/[0.06]"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-brand-gold text-[10px] font-black tracking-[0.25em] uppercase">DIRECT ARCHITECTURAL CONSULTATION</span>
              <h3 className="text-2xl md:text-3xl font-bold font-editorial text-white mt-1">
                Begin Your Project Journey
              </h3>
              <p className="text-white/60 text-xs mt-2 leading-relaxed">
                Connect directly with our senior architectural & engineering supervisors. We provide concept designs, structural BOQ estimates, and site assessments.
              </p>
            </div>

            {/* Submission Status Alerts */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-2xl flex items-center text-xs">
                <CheckCircle2 size={18} className="mr-2.5 shrink-0 text-green-400" />
                <p className="font-semibold">Consultation requested! Our senior supervisor will connect with you shortly.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl flex items-center text-xs">
                <AlertCircle size={18} className="mr-2.5 shrink-0 text-red-400" />
                <p className="font-semibold">Unable to submit right now. Please call us directly at +91 96319 80881.</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-[11px] font-bold tracking-wider uppercase text-white/70 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rajesh Sharma"
                  className="w-full bg-white/[0.05] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-[11px] font-bold tracking-wider uppercase text-white/70 mb-1.5">
                  Phone Number (Calling / WhatsApp) *
                </label>
                <div className="flex border border-white/[0.12] rounded-xl overflow-hidden focus-within:border-brand-gold focus-within:ring-1 focus-within:ring-brand-gold bg-white/[0.05]">
                  <span className="px-3.5 py-3 text-sm text-brand-gold font-bold bg-white/[0.03] border-r border-white/[0.1]">
                    +91
                  </span>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="98765 43210"
                    className="w-full px-4 py-3 text-sm text-white bg-transparent placeholder:text-white/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-city" className="block text-[11px] font-bold tracking-wider uppercase text-white/70 mb-1.5">
                  Project Location (City) *
                </label>
                <div className="relative">
                  <select
                    id="modal-city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#101b33] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none"
                  >
                    {VERIFIED_CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#0b162c] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <MapPin size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-gold-light text-[#0b162c] font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl mt-4 transition-all shadow-[0_10px_25px_rgba(201,154,44,0.3)] disabled:opacity-50 flex items-center justify-center cursor-target"
              >
                {isSubmitting ? (
                  <span>SUBMITTING INQUIRY...</span>
                ) : (
                  <span>REQUEST ARCHITECTURAL CONSULTATION</span>
                )}
              </button>

              <div className="pt-3 text-center">
                <a 
                  href="tel:+919631980881" 
                  className="inline-flex items-center text-[11px] text-white/60 hover:text-brand-gold transition-colors font-medium"
                >
                  <Phone size={12} className="mr-1.5 text-brand-gold" />
                  Or call directly: +91 96319 80881
                </a>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
}
