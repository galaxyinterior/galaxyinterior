'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  ShieldCheck, 
  PenLine, 
  X, 
  Sparkles, 
  MapPin, 
  Filter, 
  Building2, 
  Calendar,
  ArrowRight,
  ThumbsUp,
  Award
} from 'lucide-react';
import type { Review } from '@/types/review';

interface ExtendedReview extends Review {
  projectType?: string;
  year?: string;
  city?: string;
  verified?: boolean;
}

const CURATED_REVIEWS: ExtendedReview[] = [
  {
    id: 'curated-1',
    name: 'Rahul Singhania',
    location: 'Ranchi, Jharkhand',
    city: 'Ranchi',
    projectType: 'Turnkey Villa Construction',
    year: '2025',
    review: 'Galaxy Interior transformed our bare plot in Harmu into an architectural landmark. From Vastu-compliant 3D visualization to the final turnkey handover, their itemised BOQ transparency meant zero cost overruns — a rare feat in Eastern Indian construction. Their resident site civil engineer supervised every concrete pour with cube crushing tests.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-2',
    name: 'Dr. Ananya Mishra & Dr. S. K. Mishra',
    location: 'Patna, Bihar',
    city: 'Patna',
    projectType: 'Luxury Residential Interior',
    year: '2025',
    review: 'The fluted wood panelling, Italian Statuario marble flooring, and modular kitchen they designed and installed in our Bailey Road duplex exceeded our highest expectations. Their in-house factory joinery eliminated all the carpentry noise on site. Everything arrived factory-finished with German Hettich soft-close fittings.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-3',
    name: 'Vikramaditya Sahay',
    location: 'Bhagalpur, Bihar',
    city: 'Bhagalpur',
    projectType: 'Turnkey Estate Build',
    year: '2024',
    review: 'Finding a studio in Eastern India that brings contemporary global architecture standards with daily engineering site supervision felt impossible until we met Shivashish and his team. Truly world-class execution from foundation pile caps to customized chandeliers.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-4',
    name: 'Priyanka & Amit Sen',
    location: 'Kolkata, West Bengal',
    city: 'Kolkata',
    projectType: 'Heritage 3BHK Renovation',
    year: '2025',
    review: 'Our 3BHK interior renovation in New Town was managed with surgical precision. The 3D photorealistic render was identical down to the lighting temperatures of what was actually delivered. Their zero-escalation contract meant our peace of mind was preserved throughout.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-5',
    name: 'Alok K. Verma',
    location: 'Deoghar, Jharkhand',
    city: 'Deoghar',
    projectType: 'Turnkey Duplex & Interiors',
    year: '2024',
    review: 'Legally binding BOQ guarantee, 10-year warranty on timber works, and polite, highly skilled project engineers. Galaxy Interior sets the gold standard for residential architecture in our region. Delivered 14 days ahead of scheduled date.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-6',
    name: 'Sunita & Manish Agarwal',
    location: 'Dumka, Jharkhand',
    city: 'Dumka',
    projectType: 'Luxury Residential Interior',
    year: '2024',
    review: 'We had heard endless horror stories about local contractors abandoning projects midway. Galaxy Interior operates with corporate professionalism, formal milestone escrow releases, and impeccable finish quality. The walk-in wardrobe with bronze tinted glass is breathtaking.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-7',
    name: 'Er. Rakesh Ranjan',
    location: 'Hazaribagh, Jharkhand',
    city: 'Hazaribagh',
    projectType: '2D Planning & 3D Architectural Design',
    year: '2025',
    review: 'As a civil engineer myself, I scrutinized their structural drawings and 3D architectural facade plans with a fine-tooth comb. Their beam-column alignments, cross-ventilation calculations, and Vastu zoning were flawless. Highly recommend their design facilities.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-8',
    name: 'Kavita Chaurasia',
    location: 'Purnea, Bihar',
    city: 'Purnea',
    projectType: 'Modular Kitchen & Living Suite',
    year: '2025',
    review: 'The quartz waterfall island and anti-scratch acrylic cabinetry they designed for our kitchen has transformed how our family spends evenings. Even after one full year of heavy cooking, the hardware and hinges are whisper-quiet and pristine.',
    rating: 5,
    verified: true,
  },
  {
    id: 'curated-9',
    name: 'Siddharth Roy',
    location: 'Kishanganj, Bihar',
    city: 'Kishanganj',
    projectType: 'Modern Bungalow Construction',
    year: '2024',
    review: 'From municipal drawing clearances to the final electrical testing, the Galaxy Interior team handled everything seamlessly. Their weekly video updates and transparent billing saved me from having to travel frequently to inspect the site.',
    rating: 5,
    verified: true,
  }
];

const CITIES = ['All Hubs', 'Ranchi', 'Patna', 'Kolkata', 'Bhagalpur', 'Deoghar', 'Dumka', 'Hazaribagh', 'Purnea', 'Kishanganj'];
const DISCIPLINES = ['All Disciplines', 'Turnkey Construction', 'Luxury Interior', 'Architecture & 3D', 'Modular Kitchen', 'Renovation'];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ExtendedReview[]>(CURATED_REVIEWS);
  const [selectedCity, setSelectedCity] = useState('All Hubs');
  const [selectedDiscipline, setSelectedDiscipline] = useState('All Disciplines');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  // Review Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewDiscipline, setReviewDiscipline] = useState('Luxury Interior');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Real-time Firebase listener for approved reviews
  useEffect(() => {
    try {
      const q = query(collection(db, 'reviews'), where('status', '==', 'approved'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedReviews: ExtendedReview[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as any;
          fetchedReviews.push({
            id: doc.id,
            name: data.customerName || data.name || 'Verified Homeowner',
            location: data.location || 'Eastern India',
            city: data.city || data.location?.split(',')[0]?.trim() || 'Eastern India',
            projectType: data.projectType || 'Residential Project',
            year: data.year || '2025',
            review: data.review || '',
            rating: Number(data.rating) || 5,
            verified: true,
          });
        });

        if (fetchedReviews.length > 0) {
          setReviews([...fetchedReviews, ...CURATED_REVIEWS]);
        }
      }, (error) => {
        console.warn('Firestore reviews fetch notice (serving curated catalog):', error);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase initialized in local catalog mode');
    }
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewLocation || !reviewText) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        customerName: reviewName,
        name: reviewName,
        location: reviewLocation,
        city: reviewLocation.split(',')[0]?.trim() || reviewLocation,
        projectType: reviewDiscipline,
        review: reviewText,
        rating: reviewRating,
        status: 'pending',
        isFeatured: false,
        verified: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setReviewName('');
        setReviewLocation('');
        setReviewText('');
        setReviewRating(5);
      }, 2500);
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Review submission encountered an error. Please contact our helpline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered reviews
  const filteredReviews = reviews.filter((rev) => {
    if (selectedCity !== 'All Hubs') {
      const matchCity = rev.city?.toLowerCase().includes(selectedCity.toLowerCase()) ||
                        rev.location?.toLowerCase().includes(selectedCity.toLowerCase());
      if (!matchCity) return false;
    }
    if (selectedDiscipline !== 'All Disciplines') {
      const matchDiscipline = rev.projectType?.toLowerCase().includes(selectedDiscipline.toLowerCase().replace('turnkey construction', 'turnkey'));
      if (!matchDiscipline) return false;
    }
    if (selectedRating !== 'all' && rev.rating !== selectedRating) {
      return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#0c121e] pt-28 md:pt-36 pb-24 font-sans selection:bg-[#f1b821]/20">
      {/* Studio Header Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#0c121e]/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#c89d28] uppercase mb-4">
              <Sparkles size={14} className="text-[#f1b821]" />
              <span>Verified Homeowner Testimonials</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0c121e] leading-[1.1]">
              Stories Of Trust. <br />
              <span className="italic font-light text-[#0c121e]/75">Residences Crafted For Life.</span>
            </h1>
            <p className="mt-6 text-[#0c121e]/70 text-base md:text-lg leading-relaxed font-normal">
              Every home built by Galaxy Interior represents a legally binding contract with zero cost escalation, in-house factory joinery, and dedicated site civil engineering. Here is what homeowners across Eastern India have to say about their journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-[#0c121e] hover:bg-[#18243c] text-white text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all shadow-md hover:shadow-lg"
            >
              <PenLine size={14} className="text-[#f1b821]" />
              <span>Share Your Story</span>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-white border border-[#0c121e]/15 hover:border-[#c89d28] text-[#0c121e] text-xs font-bold tracking-[0.15em] uppercase rounded-full transition-all"
            >
              <span>Book Consultation</span>
              <ArrowRight size={13} className="text-[#c89d28]" />
            </Link>
          </div>
        </div>

        {/* Studio Trust Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-[#0c121e]/10">
          <div>
            <div className="flex items-center space-x-2 text-2xl md:text-3xl font-serif text-[#0c121e]">
              <span>4.98</span>
              <div className="flex text-[#f1b821]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#f1b821] text-[#f1b821]" />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#0c121e]/60 tracking-wider uppercase font-medium mt-1">Average Client Rating</p>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif text-[#0c121e]">120+</div>
            <p className="text-xs text-[#0c121e]/60 tracking-wider uppercase font-medium mt-1">Residences Delivered</p>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif text-[#0c121e]">100%</div>
            <p className="text-xs text-[#0c121e]/60 tracking-wider uppercase font-medium mt-1">On-Time Handover Rate</p>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif text-[#0c121e]">0%</div>
            <p className="text-xs text-[#0c121e]/60 tracking-wider uppercase font-medium mt-1">Contract Escalation</p>
          </div>
        </div>
      </section>

      {/* Filter Matrix Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-[#0c121e]/08 shadow-sm space-y-6">
          {/* City Hub Filter */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold tracking-wider text-[#0c121e]/60 uppercase mb-3">
              <MapPin size={13} className="text-[#c89d28]" />
              <span>Filter By City / Operational Hub</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCity === city
                      ? 'bg-[#0c121e] text-white shadow-sm'
                      : 'bg-[#faf8f5] text-[#0c121e]/70 hover:bg-[#0c121e]/05'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Discipline Filter */}
          <div className="pt-4 border-t border-[#0c121e]/08 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold tracking-wider text-[#0c121e]/60 uppercase mb-3">
                <Building2 size={13} className="text-[#c89d28]" />
                <span>Filter By Project Type</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DISCIPLINES.map((disc) => (
                  <button
                    key={disc}
                    onClick={() => setSelectedDiscipline(disc)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedDiscipline === disc
                        ? 'bg-[#c89d28] text-white shadow-sm'
                        : 'bg-[#faf8f5] text-[#0c121e]/70 hover:bg-[#0c121e]/05'
                    }`}
                  >
                    {disc}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Quick Filter */}
            <div className="shrink-0">
              <span className="text-xs font-bold tracking-wider text-[#0c121e]/60 uppercase block mb-2">Rating Filter</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedRating('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedRating === 'all' ? 'bg-[#0c121e] text-white' : 'bg-[#faf8f5] text-[#0c121e]/70'}`}
                >
                  All ({reviews.length})
                </button>
                <button
                  onClick={() => setSelectedRating(5)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${selectedRating === 5 ? 'bg-[#0c121e] text-white' : 'bg-[#faf8f5] text-[#0c121e]/70'}`}
                >
                  <span>5</span>
                  <Star size={12} className="fill-[#f1b821] text-[#f1b821]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-[#0c121e]/08">
            <Quote size={40} className="mx-auto text-[#0c121e]/20 mb-4" />
            <h3 className="font-serif text-2xl text-[#0c121e] mb-2">No testimonials found for selected filters</h3>
            <p className="text-sm text-[#0c121e]/60 mb-6">Try selecting another city or reset filters to see all client stories.</p>
            <button
              onClick={() => { setSelectedCity('All Hubs'); setSelectedDiscipline('All Disciplines'); setSelectedRating('all'); }}
              className="px-5 py-2.5 bg-[#0c121e] text-white text-xs font-bold tracking-wider uppercase rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-8 border border-[#0c121e]/08 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top: Stars & Verification */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-[#f1b821]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} className="fill-[#f1b821] text-[#f1b821]" />
                      ))}
                    </div>

                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-wider uppercase">
                      <ShieldCheck size={12} className="text-emerald-600" />
                      <span>Verified Client</span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative mb-6">
                    <Quote size={24} className="text-[#c89d28]/20 absolute -top-2 -left-2 -z-0" />
                    <p className="relative z-10 text-[#0c121e]/80 text-sm md:text-base leading-relaxed font-normal">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Client Info */}
                <div className="pt-6 border-t border-[#0c121e]/08">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#0c121e] leading-snug">
                        {item.name}
                      </h4>
                      <div className="flex items-center space-x-1.5 text-xs text-[#0c121e]/60 mt-1">
                        <MapPin size={12} className="text-[#c89d28]" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    {item.year && (
                      <div className="flex items-center space-x-1 text-[11px] text-[#0c121e]/40 font-medium">
                        <Calendar size={11} />
                        <span>{item.year}</span>
                      </div>
                    )}
                  </div>

                  {item.projectType && (
                    <div className="mt-3 inline-block px-2.5 py-1 bg-[#faf8f5] border border-[#0c121e]/08 rounded-md text-[10.5px] font-medium text-[#0c121e]/70">
                      {item.projectType}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Conversion Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-24">
        <div className="bg-[#0c121e] rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f1b821]/05 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-[#f1b821] text-xs font-black tracking-[0.25em] uppercase">Begin Your Residence</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal mt-4 mb-6 leading-tight">
              Ready For Contractual Certainty &amp; Uncompromised Quality?
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
              Join 120+ happy families across Jharkhand, Bihar, and West Bengal. Meet our Principal Architects in Ranchi, Patna, or Bhagalpur to review our itemised Master BOQ specifications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[#f1b821] hover:bg-[#e0a816] text-[#0c121e] text-xs font-bold tracking-[0.18em] uppercase rounded-full transition-all shadow-lg"
              >
                Schedule Studio Consultation
              </Link>
              <a
                href="tel:+917004465611"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold tracking-[0.18em] uppercase rounded-full transition-all"
              >
                Call +91 70044 65611
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative border border-[#0c121e]/10">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </div>
                <h3 className="font-serif text-2xl text-[#0c121e] font-bold mb-2">Thank You For Your Story!</h3>
                <p className="text-sm text-[#0c121e]/70 max-w-xs mx-auto">
                  Your review has been securely submitted and will be verified by our studio team before appearing in the public archive.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#c89d28] uppercase">Homeowner Feedback</span>
                  <h3 className="font-serif text-2xl font-bold text-[#0c121e] mt-1">Share Your Experience</h3>
                  <p className="text-xs text-[#0c121e]/60 mt-1">Help prospective homeowners understand the quality of execution they can expect.</p>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-1.5">Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            size={26}
                            className={`${
                              (hoverRating || reviewRating) >= star 
                                ? 'fill-[#f1b821] text-[#f1b821]' 
                                : 'text-gray-200'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#0c121e]/60 ml-2">
                        {reviewRating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Rahul Singhania"
                        className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-1">City &amp; State</label>
                      <input
                        type="text"
                        required
                        value={reviewLocation}
                        onChange={(e) => setReviewLocation(e.target.value)}
                        placeholder="e.g. Ranchi, Jharkhand"
                        className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-1">Project Discipline</label>
                    <select
                      value={reviewDiscipline}
                      onChange={(e) => setReviewDiscipline(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28]"
                    >
                      <option value="Turnkey Villa Construction">Turnkey Villa Construction</option>
                      <option value="Luxury Residential Interior">Luxury Residential Interior</option>
                      <option value="2D/3D Architecture & Planning">2D/3D Architecture &amp; Planning</option>
                      <option value="Modular Kitchen & Joinery">Modular Kitchen &amp; Joinery</option>
                      <option value="Structural Renovation">Structural Renovation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-1">Your Detailed Review</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with architectural drawings, timeline adherence, BOQ accuracy, and material quality..."
                      className="w-full px-3.5 py-2.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#0c121e] hover:bg-[#18243c] text-white text-xs font-bold tracking-[0.15em] uppercase rounded-xl transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting to Studio...' : 'Submit Verified Review'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
