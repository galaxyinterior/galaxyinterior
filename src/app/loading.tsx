export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy">
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-t-2 border-brand-yellow rounded-full animate-spin duration-1000"></div>
          <div className="absolute inset-2 border-r-2 border-white/50 rounded-full animate-spin duration-[1500ms] reverse"></div>
          <div className="absolute inset-4 border-b-2 border-brand-yellow/30 rounded-full animate-spin duration-2000"></div>
        </div>
        <div className="text-brand-yellow font-black tracking-[0.3em] uppercase text-xs animate-pulse">
          Constructing Experience
        </div>
      </div>
    </div>
  );
}
