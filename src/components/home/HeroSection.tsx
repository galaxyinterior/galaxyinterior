'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';

interface SlideData {
  id: string;
  imageUrl: string;
  mobileImageUrl?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
}

const DEFAULT_SLIDES: SlideData[] = [
  {
    id: 'default-1',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000',
    title: 'Construct Your Dream Home',
    subtitle: 'Turning ideas into concrete reality with itemised BOQ and zero hidden costs.',
    ctaText: 'Explore Packages',
    ctaUrl: '/services'
  },
  {
    id: 'default-2',
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000',
    title: 'Luxury Interiors',
    subtitle: 'Crafting premium spaces tailored to your unique lifestyle.',
    ctaText: 'Explore Packages',
    ctaUrl: '/services'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

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
      setFormData({ name: '', phone: '', city: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loadingSlides, setLoadingSlides] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const q = query(collection(db, 'heroSlides'), orderBy('sortOrder', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as SlideData & { isActive: boolean }))
          .filter(slide => slide.isActive !== false);
        
        if (data.length > 0) {
          setSlides(data);
        } else {
          setSlides(DEFAULT_SLIDES);
        }
      } catch (err) {
        console.error("Error fetching slides:", err);
        setSlides(DEFAULT_SLIDES);
      } finally {
        setLoadingSlides(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const activeSlide = slides[currentSlide] || DEFAULT_SLIDES[0];

  return (
    <div className="relative w-full min-h-[calc(100vh-8rem)] flex items-center mt-[-2rem]">

      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-brand-navy">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture>
              {slide.mobileImageUrl && <source media="(max-width: 768px)" srcSet={slide.mobileImageUrl} />}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        ))}
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Side: Headlines and Stats */}
        <div className="w-full lg:w-3/5 flex flex-col items-start pt-10">

          <h1 className="text-5xl md:text-[5.5rem] font-black text-brand-yellow leading-[1.1] tracking-tight mb-2 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: activeSlide.title.replace(/\n/g, '<br />') }}>
          </h1>

          <div className="bg-brand-navy px-6 py-3 inline-block mt-4 rounded-sm shadow-xl">
            <span className="text-white text-3xl md:text-5xl font-black">
              with GALAXY INTERIOR
            </span>
          </div>

          <div className="bg-brand-navy/80 backdrop-blur-md px-6 py-5 mt-8 rounded-md border border-white/10 max-w-2xl shadow-xl">
            <p className="text-white text-lg font-medium leading-relaxed">
              {activeSlide.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-10">
            <Link data-cursor-tooltip="home-pricing-btn" href="/pricing" className="bg-brand-yellow hover:bg-yellow-400 text-brand-navy px-10 py-4 rounded-full text-lg font-black tracking-wide shadow-lg transition-colors cursor-target flex items-center justify-center">
              Pricing
            </Link>
            <Link data-cursor-tooltip="home-packages-btn" href={activeSlide.ctaUrl || '/services'} className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-bold tracking-wide transition-colors cursor-target flex items-center justify-center">
              {activeSlide.ctaText || 'Explore Packages'}
            </Link>
          </div>

          <div className="bg-brand-navy/80 backdrop-blur-md px-8 py-6 mt-16 rounded-xl border border-white/10 flex flex-wrap gap-10 shadow-xl">
            <div>
              <div className="text-brand-yellow text-4xl font-black mb-1">8+</div>
              <div className="text-white text-xs font-bold tracking-widest uppercase">Years Experience</div>
            </div>
            <div>
              <div className="text-brand-yellow text-4xl font-black mb-1">120+</div>
              <div className="text-white text-xs font-bold tracking-widest uppercase">Homes Built</div>
            </div>
            <div>
              <div className="text-brand-yellow text-4xl font-black mb-1">20+</div>
              <div className="text-white text-xs font-bold tracking-widest uppercase">Expert Team</div>
            </div>
          </div>

        </div>

        {/* Right Side: Consultation Form */}
        <div className="w-full lg:w-1/3 max-w-md shrink-0">
          <div className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-yellow"></div>

            <h3 className="text-2xl font-black text-brand-navy mb-8 text-center">
              Talk to Our Expert
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <p className="font-bold">Consultation requested! We&apos;ll call you soon.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center text-sm">
                <AlertCircle className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
                <p className="font-bold">Failed to submit. Please try again.</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="hero-name" className="sr-only">Your Name</label>
                <input
                  id="hero-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-colors placeholder:text-gray-400"
                />
              </div>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-yellow/50 focus-within:border-brand-yellow transition-colors bg-white">
                <div className="bg-gray-50 px-4 py-3 border-r border-gray-300 flex items-center text-sm font-medium text-gray-600">
                  IN +91
                </div>
                <label htmlFor="hero-phone" className="sr-only">Phone Number</label>
                <input
                  id="hero-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 text-sm focus:outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="relative">
                <label htmlFor="hero-city" className="sr-only">Location of your Plot</label>
                <select 
                  id="hero-city" 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-colors appearance-none bg-white text-gray-600"
                >
                  <option value="" disabled>Location of your Plot - City*</option>
                  <option value="Godda">Godda</option>
                  <option value="Ranchi">Ranchi</option>
                  <option value="Patna">Patna</option>
                  <option value="Bhagalpur">Bhagalpur</option>
                  <option value="Banka">Banka</option>
                  <option value="Deoghar">Deoghar</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor-tooltip="home-consultation-btn"
                className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-navy font-black text-lg py-4 rounded-lg mt-4 transition-colors shadow-md cursor-target disabled:opacity-70 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-navy border-t-transparent rounded-full animate-spin mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  'Book Free Consultation'
                )}
              </button>
            </form>

            <p className="text-[10px] text-gray-400 text-center mt-6 leading-tight">
              By submitting, you agree to our <Link href="/contact" className="text-brand-yellow hover:underline">privacy policy</Link>, allowing us to use your information as outlined.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
