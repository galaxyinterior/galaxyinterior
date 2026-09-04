'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { ChevronDown } from 'lucide-react';
import type { Review } from '@/types/review';

const INITIAL_REVIEW: Review = {
  id: 'mock1',
  name: 'Rahul Singhania',
  location: 'Ranchi',
  review: 'Galaxy Interior transformed our bare plot into a modern masterpiece. The attention to detail and itemised transparency was unmatched.',
  rating: 5,
};

const LOCATIONS = [
  'Ranchi', 'Godda', 'Bhagalpur', 'Banka', 'Deoghar',
  'Hazaribagh', 'Dumka', 'Kishanganj', 'Purnea', 'Kolkata', 'Patna',
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([INITIAL_REVIEW]);

  const [reviewName, setReviewName] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time Firebase listener for reviews
  useEffect(() => {
    const q = query(collection(db, 'reviews'), where('status', '==', 'approved'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedReviews: Review[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Review, 'id'> & { createdAt?: any };
        fetchedReviews.push({ id: doc.id, ...data } as Review);
      });
      
      // Sort in JS to avoid needing a composite index
      fetchedReviews.sort((a, b) => {
        const dateA = (a as any).createdAt?.toMillis() || 0;
        const dateB = (b as any).createdAt?.toMillis() || 0;
        return dateB - dateA;
      });

      if (fetchedReviews.length > 0) {
        setReviews(fetchedReviews);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewLocation || !reviewText) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        customerName: reviewName,
        name: reviewName, // keep name for backward compatibility during transition
        location: reviewLocation,
        review: reviewText,
        rating: reviewRating,
        status: 'pending',
        isFeatured: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setReviewName('');
      setReviewLocation('');
      setReviewText('');
      setReviewRating(5);
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#101e38] skew-x-[-15deg] transform origin-bottom hidden lg:block"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="text-white pr-0 lg:pr-12">
          <h4 className="text-brand-yellow text-sm font-bold tracking-widest uppercase mb-4">Client Voices</h4>
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">What Our<br />Clients Say</h2>
          <p className="text-gray-400 text-xl font-medium leading-relaxed mb-12 max-w-md">
            Real testimonials from elite home owners and corporate directors across Jharkhand, Bihar, and beyond.
          </p>

          {reviews.length > 0 && (
            <div className="bg-[#162442] p-8 rounded-2xl border-l-4 border-brand-yellow shadow-2xl relative transition-all">
              <div className="text-brand-yellow text-4xl font-serif absolute top-4 right-6 opacity-30">&quot;</div>
              <p className="text-gray-300 italic mb-6">&quot;{reviews[0].review}&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4 flex items-center justify-center font-bold text-white">
                  {reviews[0].name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-white">{reviews[0].name}</h4>
                  <p className="text-brand-yellow text-xs tracking-widest uppercase font-bold">{reviews[0].location}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-2xl z-10 relative">
          <h3 className="text-3xl font-black text-brand-navy mb-8">Share Your Experience</h3>

          <form className="space-y-6" onSubmit={handleSubmitReview}>
            <div>
              <label htmlFor="review-name" className="sr-only">Your Name</label>
              <input
                id="review-name"
                type="text"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
                placeholder="Your Name"
                className="w-full border-b-2 border-gray-200 px-0 py-4 focus:outline-none focus:border-brand-yellow transition-colors bg-transparent font-medium placeholder:font-normal"
              />
            </div>

            <div className="relative">
              <label htmlFor="review-location" className="sr-only">Select Location</label>
              <select
                id="review-location"
                value={reviewLocation}
                onChange={(e) => setReviewLocation(e.target.value)}
                required
                className="w-full border-b-2 border-gray-200 px-0 py-4 focus:outline-none focus:border-brand-yellow transition-colors bg-transparent appearance-none font-medium text-gray-700"
              >
                <option value="" disabled>Select Location</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-gray-400">
                <ChevronDown size={20} />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <span className="text-gray-500 mr-4 font-medium">Your Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className={`w-8 h-8 ${star <= reviewRating ? 'text-brand-yellow' : 'text-gray-300'} fill-current cursor-pointer hover:scale-110 transition-transform`}
                  viewBox="0 0 24 24"
                  aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <div className="pt-4">
              <label htmlFor="review-text" className="sr-only">Write your review</label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                placeholder="Write your review..."
                rows={4}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:border-brand-yellow transition-colors font-medium resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-navy hover:bg-[#162442] text-white font-black text-lg py-5 rounded-xl transition-colors shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
