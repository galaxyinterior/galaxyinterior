"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { PricingPackage, PricingCategory, PricingItem, QuoteCalculation } from '@/types/pricing';
import { calculateEstimate } from '@/lib/pricingEngine';
import { 
  CheckCircle2, ChevronRight, Calculator, MapPin, Home, Info, 
  Layers, Package, ShieldCheck, Download, AlertTriangle, User, Phone, Mail,
  Activity, Users, Clock, Sparkles
} from 'lucide-react';

export default function PricingCalculatorPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  // Data State
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [categories, setCategories] = useState<PricingCategory[]>([]);
  const [items, setItems] = useState<PricingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Wizard State
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Input State
  const [area, setArea] = useState<number>(1000);
  const [propertyType, setPropertyType] = useState('Apartment');
  const [city, setCity] = useState('Mumbai');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  
  // Contact State
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [pkgSnap, catSnap, itemSnap] = await Promise.all([
          getDocs(collection(db, 'pricingPackages')),
          getDocs(collection(db, 'pricingCategories')),
          getDocs(collection(db, 'pricingItems'))
        ]);

        const pkgs = pkgSnap.docs.map(d => ({ packageId: d.id, ...d.data() } as PricingPackage)).filter(p => p.isActive).sort((a,b) => a.baseRate - b.baseRate);
        const cats = catSnap.docs.map(d => ({ categoryId: d.id, ...d.data() } as PricingCategory)).filter(c => c.isActive).sort((a,b) => a.sortOrder - b.sortOrder);
        const itms = itemSnap.docs.map(d => ({ itemId: d.id, ...d.data() } as PricingItem)).filter(i => i.isActive);

        setPackages(pkgs);
        setCategories(cats);
        setItems(itms);
        
        // Auto-select recommended package or first package
        const recommended = pkgs.find(p => p.recommended);
        if (recommended) setSelectedPackageId(recommended.packageId);
        else if (pkgs.length > 0) setSelectedPackageId(pkgs[0].packageId);
        
      } catch (error) {
        console.error("Failed to load pricing data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  // Real-time calculation
  const estimate = useMemo(() => {
    if (!selectedPackageId && packages.length === 0) return null;
    
    const selectedPkg = packages.find(p => p.packageId === selectedPackageId) || null;
    
    // Auto-include fixed percentage modifiers like taxes if any exist in the items DB
    const modifierItems = items.filter(i => i.pricingType === 'percentage' || (i.pricingType as any) === 'discount');
    const selectedOptionalItems = items.filter(i => selectedItemIds.includes(i.itemId));
    
    const allEngineItems = [...selectedOptionalItems, ...modifierItems];
    
    // Remove duplicates just in case
    const uniqueItems = Array.from(new Set(allEngineItems.map(a => a.itemId)))
      .map(id => allEngineItems.find(a => a.itemId === id)!)

    return calculateEstimate({
      areaSqft: area,
      selectedPackage: selectedPkg,
      selectedItems: uniqueItems
    });
  }, [area, selectedPackageId, selectedItemIds, packages, items]);

  const toggleItem = (itemId: string) => {
    setSelectedItemIds(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSaveEstimate = async () => {
    if (!name || !email || !phone) {
      alert('Please fill out all contact details to receive your quote.');
      return;
    }
    if (!estimate) return;

    setIsSubmitting(true);
    try {
      const selectedPkg = packages.find(p => p.packageId === selectedPackageId);
      const selectedOptionalItems = items.filter(i => selectedItemIds.includes(i.itemId));

      await addDoc(collection(db, 'quoteRequests'), {
        userId: user?.uid || null,
        status: 'new',
        customerDetails: { name, email, phone },
        projectDetails: { area, propertyType, city },
        selections: {
          package: selectedPkg || null,
          items: selectedOptionalItems
        },
        calculation: estimate,
        createdAt: serverTimestamp()
      });

      // Redirect or show success
      alert('Your detailed quote request has been submitted successfully! Our team will contact you shortly.');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mb-4"></div>
          <p className="font-bold text-gray-500 uppercase tracking-widest text-sm">Loading Calculator...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-20 pt-24">
      
      {/* Header */}
      <div className="bg-[#0b162c] text-white pt-16 pb-24 px-6 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, #1c2c4d 2px, transparent 2px)', backgroundSize: '32px 32px' }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-brand-yellow text-brand-navy font-black tracking-widest text-[10px] md:text-[11px] uppercase px-5 py-1.5 rounded-full mb-8">
            Official Rate Calculator
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
            Calculate Your Design<br />
            <span className="text-brand-yellow italic">Budget Instantly!</span>
          </h1>
          
          <p className="text-gray-300 font-medium text-sm md:text-[15px] max-w-3xl mx-auto mb-14 leading-relaxed">
            Use our interactive pricing portal based strictly on the Galaxy Interior official pricing blueprint. Select your architectural needs, customize tiers, and export accurate custom estimates.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Feature Cards */}
            <div className="bg-[#152039] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center w-36 md:w-44 h-28 hover:bg-[#1c2c4d] transition-colors shadow-lg">
              <Activity className="text-gray-400 mb-3" size={22} />
              <span className="text-[10px] font-black tracking-widest uppercase text-center text-white/80 leading-tight">Residential &<br/>Commercial</span>
            </div>
            
            <div className="bg-[#152039] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center w-36 md:w-44 h-28 hover:bg-[#1c2c4d] transition-colors shadow-lg">
              <Users className="text-gray-400 mb-3" size={22} />
              <span className="text-[10px] font-black tracking-widest uppercase text-center text-white/80 leading-tight">Site Supervision<br/>Support</span>
            </div>
            
            <div className="bg-[#152039] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center w-36 md:w-44 h-28 hover:bg-[#1c2c4d] transition-colors shadow-lg">
              <ShieldCheck className="text-gray-400 mb-3" size={22} />
              <span className="text-[10px] font-black tracking-widest uppercase text-center text-white/80 leading-tight">Precise Area<br/>Calculation</span>
            </div>
            
            <div className="bg-[#152039] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center w-36 md:w-44 h-28 hover:bg-[#1c2c4d] transition-colors shadow-lg">
              <Clock className="text-gray-400 mb-3" size={22} />
              <span className="text-[10px] font-black tracking-widest uppercase text-center text-white/80 leading-tight">100%<br/>Transparency<br/>Rates</span>
            </div>
            
            <div className="bg-[#152039] border border-brand-yellow/50 shadow-[0_0_20px_rgba(241,184,33,0.1)] rounded-xl p-4 flex flex-col items-center justify-center w-36 md:w-44 h-28">
              <Sparkles className="text-brand-yellow mb-3" size={22} />
              <span className="text-[10px] font-black tracking-widest uppercase text-center text-brand-yellow leading-tight">Flyer Blueprint<br/>Prices</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Wizard */}
        <div className="flex-1 space-y-8">
          
          {/* Progress Indicator */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-gray-100 px-8">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-brand-yellow text-brand-navy' : 'bg-gray-100 text-gray-400'}`}>
                  {num}
                </div>
                {num < 4 && <div className={`w-12 md:w-24 h-1 mx-2 ${step > num ? 'bg-brand-yellow' : 'bg-gray-100'}`}></div>}
              </div>
            ))}
          </div>

          {/* Step 1: Property Details */}
          {step === 1 && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-brand-navy mb-6 flex items-center gap-3">
                <Home className="text-brand-yellow" /> Property Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Carpet Area (sq.ft)</label>
                  <input 
                    type="number" 
                    value={area}
                    onChange={(e) => setArea(Math.max(100, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none text-lg font-bold"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">Property Type</label>
                    <select 
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none bg-white"
                    >
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>Commercial Office</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">City</label>
                    <select 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none bg-white"
                    >
                      <option>Mumbai</option>
                      <option>Delhi NCR</option>
                      <option>Bangalore</option>
                      <option>Pune</option>
                    </select>
                  </div>
                </div>

                <button onClick={() => setStep(2)} className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-colors flex justify-center items-center gap-2 mt-8">
                  Select Package <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Packages */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-brand-navy mb-2 flex items-center gap-3">
                <Layers className="text-brand-yellow" /> Select Base Package
              </h2>
              <p className="text-gray-500 mb-6">Choose a foundational package. You can customize with add-ons in the next step.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {packages.map(pkg => (
                  <div 
                    key={pkg.packageId}
                    onClick={() => setSelectedPackageId(pkg.packageId)}
                    className={`cursor-pointer rounded-2xl border-2 transition-all p-6 ${selectedPackageId === pkg.packageId ? 'border-brand-navy shadow-xl bg-brand-navy/5' : 'border-gray-200 bg-white hover:border-brand-yellow/50'}`}
                  >
                    {pkg.recommended && (
                      <div className="bg-brand-yellow text-brand-navy text-xs font-black uppercase tracking-wider inline-block px-3 py-1 rounded-full mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-black text-brand-navy mb-1">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-2xl font-black text-gray-900">₹{pkg.baseRate.toLocaleString('en-IN')}</span>
                      <span className="text-gray-500 font-medium">/{pkg.unit}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">{pkg.description}</p>
                    <ul className="space-y-2">
                      {pkg.features.slice(0,4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600 font-medium">
                          <CheckCircle2 size={14} className="text-brand-yellow shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="bg-brand-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-900 transition-colors flex items-center gap-2">
                  Customize Add-ons <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Add-ons */}
          {step === 3 && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-brand-navy mb-2 flex items-center gap-3">
                <Package className="text-brand-yellow" /> Optional Add-ons
              </h2>
              <p className="text-gray-500 mb-8">Customize your quotation with extra premium services and materials.</p>
              
              <div className="space-y-8">
                {categories.map(cat => {
                  const catItems = items.filter(i => i.categoryId === cat.categoryId && i.pricingType !== 'percentage');
                  if (catItems.length === 0) return null;
                  
                  return (
                    <div key={cat.categoryId}>
                      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">{cat.name}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {catItems.map(item => (
                          <div 
                            key={item.itemId}
                            onClick={() => toggleItem(item.itemId)}
                            className={`cursor-pointer border rounded-xl p-4 transition-colors flex items-start gap-3 ${selectedItemIds.includes(item.itemId) ? 'border-brand-navy bg-brand-navy/5' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                          >
                            <div className={`w-5 h-5 mt-0.5 rounded flex items-center justify-center shrink-0 border ${selectedItemIds.includes(item.itemId) ? 'bg-brand-navy border-brand-navy' : 'border-gray-300'}`}>
                              {selectedItemIds.includes(item.itemId) && <CheckCircle2 size={14} className="text-white" />}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                              <p className="text-xs text-brand-navy font-bold mt-1">₹{item.price.toLocaleString('en-IN')} /{item.unit}</p>
                              {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
                <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Back</button>
                <button onClick={() => setStep(4)} className="bg-brand-yellow text-brand-navy font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg">
                  Finalize Quote <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Submission */}
          {step === 4 && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-black text-brand-navy mb-6">Save & Request Detailed Quote</h2>
              
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 text-sm font-medium mb-8">
                <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <p>This is an automated estimate. Submit your details below to save this quote and have our experts contact you for a precise, final BOQ after site inspection.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" placeholder="Enter your full name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" placeholder="Email" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-yellow outline-none" placeholder="Phone" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-8 border-t border-gray-100">
                <button onClick={() => setStep(3)} className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">Back</button>
                <button 
                  onClick={handleSaveEstimate}
                  disabled={isSubmitting}
                  className="bg-brand-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-900 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Sticky Summary Ledger */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-brand-navy text-white rounded-3xl p-6 shadow-2xl sticky top-24">
            <h3 className="text-xl font-black mb-6 flex items-center justify-between border-b border-white/10 pb-4">
              <span>Estimate Summary</span>
              <Calculator className="text-brand-yellow" size={24} />
            </h3>

            {estimate ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-gray-400">
                  <span>Property Area</span>
                  <span className="text-white">{estimate.area} sq.ft</span>
                </div>
                
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {estimate.lineItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm items-start gap-4">
                      <div className="flex-1">
                        <p className={item.isDeduction ? 'text-brand-yellow' : 'text-gray-200'}>{item.name}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <div className="font-mono text-right whitespace-nowrap">
                        {item.isDeduction ? '-' : ''}₹{item.total.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-lg font-black">
                  <span>Estimated Total</span>
                  <span className="text-brand-yellow">₹{estimate.finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Select a package to see estimate.</p>
              </div>
            )}
            
            <div className="mt-8 bg-black/20 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="text-brand-yellow shrink-0 mt-0.5" size={16} />
              <p className="text-xs text-gray-400 font-medium">Final quotation may change after site inspection and detailed BOQ.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
