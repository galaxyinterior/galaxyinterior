'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import Link from 'next/link';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  PenLine, 
  X, 
  Sparkles,
  MapPin,
  ArrowRight
} from 'lucide-react';
import type { Review } from '@/types/review';

const CURATED_REVIEWS: Review[] = [
  {
    id: 'curated-1',
    name: 'Rahul Singhania',
    location: 'Ranchi, Jharkhand',
    review: 'Galaxy Interior transformed our bare plot in Ranchi into an architectural masterpiece. From Vastu-compliant 3D visualization to the final turnkey handover, their itemised BOQ transparency meant zero cost overruns — a rare feat in Indian construction.',
    rating: 5,
  },
  {
    id: 'curated-2',
    name: 'Dr. Ananya Mishra',
    location: 'Patna, Bihar',
    review: 'The fluted wood panelling, Italian marble flooring, and modular kitchen they installed in our duplex exceeded our highest expectations. Their in-house factory joinery eliminated all the typical carpentry chaos on site.',
    rating: 5,
  },
  {
    id: 'curated-3',
    name: 'Vikramaditya Sahay',
    location: 'Bhagalpur, Bihar',
    review: 'Finding a studio in Eastern India that brings contemporary global architecture standards with daily engineering site supervision felt impossible until we met Shivashish and his team. Truly world-class execution.',
    rating: 5,
  },
  {
    id: 'curated-4',
    name: 'Priyanka & Amit Sen',
    location: 'Kolkata, West Bengal',
    review: 'Our 3BHK interior renovation was managed with surgical precision. The 3D photorealistic render was identical down to the lighting temperatures of what was delivered. Unconditional recommendation for luxury homes.',
    rating: 5,
  },
  {
    id: 'curated-5',
    name: 'Alok K. Verma',
    location: 'Deoghar, Jharkhand',
    review: 'Legally binding BOQ guarantee, 10-year warranty on timber works, and polite, highly skilled project engineers. Galaxy Interior sets the gold standard for residential architecture in our region.',
    rating: 5,
  }
];

const LOCATIONS = [
  'Ranchi', 'Godda', 'Bhagalpur', 'Banka', 'Deoghar',
  'Hazaribagh', 'Dumka', 'Kishanganj', 'Purnea', 'Kolkata', 'Patna',
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(CURATED_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Review Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
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
        const fetchedReviews: Review[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<Review, 'id'> & { createdAt?: any };
          fetchedReviews.push({ id: doc.id, ...data } as Review);
        });
        
        // Sort in JS by date descending
        fetchedReviews.sort((a, b) => {
          const dateA = (a as any).createdAt?.toMillis() || 0;
          const dateB = (b as any).createdAt?.toMillis() || 0;
          return dateB - dateA;
        });

        if (fetchedReviews.length > 0) {
          // Merge approved reviews in front of curated defaults
          setReviews([...fetchedReviews, ...CURATED_REVIEWS]);
        }
      }, (error) => {
        console.warn('Firestore reviews fetch issue (using curated fallback):', error);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firebase initialized in fallback mode');
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewLocation || !reviewText) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        customerName: reviewName,
        name: reviewName,
        location: reviewLocation,
        review: reviewText,
        rating: reviewRating,
        status: 'pending',
        isFeatured: false,
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section className="py-24 md:py-32 bg-[#faf8f5] text-[#111622] border-b border-[#eee7db] relative overflow-hidden">
      
      {/* Background radial glow */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/[0.04] rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" 
      />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7db] border border-[#ddd3c1] text-brand-charcoal text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Client Voices &amp; Residential Proof</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Built On Trust. <br />
              <span className="italic font-editorial text-brand-charcoal">Proven In Living.</span>
            </h2>
            <p className="mt-5 text-gray-600 font-light text-base md:text-lg leading-relaxed max-w-xl">
              Authentic stories from homeowners across Jharkhand, Bihar, and West Bengal who trusted Galaxy Interior with their most personal investment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start lg:self-end">
            <button
              onClick={() => setIsModalOpen(true)}
              data-cursor-tooltip="write-review"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-brand-charcoal border border-[#ded8cb] text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-sm hover:shadow-md cursor-target"
            >
              <PenLine className="w-3.5 h-3.5 text-brand-gold" />
              <span>Share Your Experience</span>
            </button>

            {/* Navigation Arrows */}
            <div className="inline-flex items-center gap-2 bg-[#eee7db]/60 p-1 rounded-full border border-[#ddd3c1]">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                data-cursor-tooltip="prev-review"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#111622] text-brand-charcoal hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm cursor-target"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-medium px-2 text-gray-500">
                {String(currentIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
              </span>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                data-cursor-tooltip="next-review"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#111622] text-brand-charcoal hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm cursor-target"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative bg-white rounded-3xl border border-[#ded8cb] p-8 md:p-16 shadow-luxury overflow-hidden mb-16">
          <Quote className="w-24 h-24 text-brand-gold/10 absolute -top-4 -right-4 pointer-events-none" />
          
          <div className="max-w-4xl">
            
            {/* Rating Stars & Verified Pill */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < currentReview.rating ? 'fill-brand-gold text-brand-gold' : 'fill-gray-200 text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="h-4 w-px bg-gray-200" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-semibold tracking-wider uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Homeowner</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-2xl md:text-4xl font-editorial font-normal text-brand-charcoal leading-snug md:leading-relaxed mb-10 italic">
              &ldquo;{currentReview.review}&rdquo;
            </blockquote>

            {/* Author details */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-editorial text-xl font-bold">
                {currentReview.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-charcoal">
                  {currentReview.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{currentReview.location}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2 mt-10 pt-6 border-t border-gray-100">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to review ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-10 bg-brand-charcoal' 
                    : 'w-2 bg-gray-200 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Trust Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#ded8cb] shadow-sm">
            <div className="text-3xl md:text-4xl font-editorial font-bold text-brand-charcoal mb-1">
              4.9 <span className="text-base text-brand-gold">/ 5.0</span>
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Average Client Rating
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#ded8cb] shadow-sm">
            <div className="text-3xl md:text-4xl font-editorial font-bold text-brand-charcoal mb-1">
              120+
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Delivered Residences
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#ded8cb] shadow-sm">
            <div className="text-3xl md:text-4xl font-editorial font-bold text-brand-charcoal mb-1">
              100%
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Itemised BOQ Guarantee
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-[#ded8cb] shadow-sm">
            <div className="text-3xl md:text-4xl font-editorial font-bold text-brand-charcoal mb-1">
              10-Year
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
              Woodwork Warranty
            </div>
          </div>
        </div>

        {/* Link to Full Reviews Archive */}
        <div className="mt-10 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.2em] uppercase text-brand-charcoal hover:text-brand-gold transition-colors group"
          >
            <span>Read All 120+ Verified Homeowner Testimonials Across Eastern India</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-brand-gold" />
          </Link>
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-8 md:p-10 shadow-2xl border border-gray-100 relative animate-scale-up max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close dialog"
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-target"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-editorial font-bold text-brand-charcoal mb-2">
                  Thank You For Your Feedback!
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed max-w-sm mx-auto">
                  Your review has been submitted for verification. It will appear on our homepage once confirmed by our client team.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Review Portal</span>
                  </div>
                  <h3 id="modal-title" className="text-2xl md:text-3xl font-editorial font-bold text-brand-charcoal">
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Help other families across Eastern India make informed architectural decisions.
                  </p>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label htmlFor="modal-review-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="modal-review-name"
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                      placeholder="e.g. Ritesh Agarwal"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-review-location" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Project Location *
                    </label>
                    <div className="relative">
                      <select
                        id="modal-review-location"
                        value={reviewLocation}
                        onChange={(e) => setReviewLocation(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm appearance-none bg-white transition-colors text-gray-800"
                      >
                        <option value="" disabled>Select City / Operational Hub</option>
                        {LOCATIONS.map((loc) => (
                          <option key={loc} value={`${loc}`}>
                            {loc}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          className="p-1 hover:scale-110 transition-transform cursor-target"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              (hoverRating || reviewRating) >= star
                                ? 'fill-brand-gold text-brand-gold'
                                : 'fill-gray-100 text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-xs font-mono font-medium text-gray-500">
                        {hoverRating || reviewRating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="modal-review-text" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Your Experience *
                    </label>
                    <textarea
                      id="modal-review-text"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                      rows={4}
                      placeholder="Describe your design, construction, or interior experience with Galaxy Interior..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-cursor-tooltip="submit-review-action"
                    className="w-full py-4 rounded-xl bg-[#111622] hover:bg-brand-navy text-white text-xs font-bold uppercase tracking-[0.15em] transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-target flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <span>Submitting To Moderation...</span>
                    ) : (
                      <>
                        <span>Submit For Verification</span>
                        <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </section>
  );
}

