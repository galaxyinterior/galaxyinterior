"use client";

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl p-10 md:p-14 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
        
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-8">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black text-brand-navy mb-4">
          Structural <span className="text-red-500">Error</span>
        </h2>
        
        <p className="text-gray-500 text-lg mb-10 font-medium">
          We encountered an unexpected issue while assembling this page. Our engineering team has been notified.
        </p>
        
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-3 bg-brand-navy hover:bg-brand-navy/90 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <RefreshCcw className="w-4 h-4" />
          Rebuild Page
        </button>
      </div>
    </div>
  );
}
