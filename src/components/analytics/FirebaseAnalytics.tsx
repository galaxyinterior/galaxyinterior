'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { app } from '@/lib/firebase';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if measurementId is provided
    if (!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
      return;
    }

    isSupported().then((supported) => {
      if (supported && app) {
        try {
          const analytics = getAnalytics(app);
          const queryString = searchParams?.toString();
          const url = pathname + (queryString ? `?${queryString}` : '');
          
          logEvent(analytics, 'page_view', {
            page_path: url,
            page_title: typeof document !== 'undefined' ? document.title : '',
          });
        } catch (err) {
          console.warn('[Firebase Analytics] Initialization skipped or failed:', err);
        }
      }
    });
  }, [pathname, searchParams]);

  return null;
}

export function FirebaseAnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}
