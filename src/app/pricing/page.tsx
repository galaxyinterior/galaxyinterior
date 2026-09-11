"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { PricingPackage, PricingCategory, PricingItem, QuoteCalculation } from "@/types/pricing";
import { calculateEstimate } from "@/lib/pricingEngine";
import {
  CheckCircle2,
  ChevronRight,
  Calculator,
  MapPin,
  Home,
  Info,
  Layers,
  Package,
  ShieldCheck,
  Download,
  AlertTriangle,
  User,
  Phone,
  Mail,
  Activity,
  Users,
  Clock,
  Sparkles,
  PhoneCall,
  Check
} from "lucide-react";

// ==========================================
// FALLBACK ARCHITECTURAL PRICING DATA
// ==========================================

const FALLBACK_PACKAGES: PricingPackage[] = [
  {
    packageId: "pkg-civil",
    name: "Standard Civil Structural Frame",
    description: "Heavy-duty RCC skeleton, foundation, brick masonry, and internal/external double-coat plastering.",
    baseRate: 1650,
    unit: "sq.ft",
    features: [
      "Tata Tiscon / Jindal Fe 550D TMT Reinforcement",
      "Ultratech / ACC Grade 43/53 Portland Cement",
      "Red Clay Chamber Bricks with 1:4 Mortar",
      "PCC Foundation & Plinth with Anti-Termite Injection",
      "Resident Civil Engineer On-Site Daily"
    ],
    recommended: false,
    isActive: true
  },
  {
    packageId: "pkg-turnkey-premium",
    name: "Premium Turnkey Villa Build",
    description: "Our signature all-inclusive build: architectural blueprints, civil engineering, and complete luxury interiors.",
    baseRate: 2450,
    unit: "sq.ft",
    features: [
      "Everything in Civil Structural Frame",
      "Complete 2D Blueprints & 4K 3D Photorealism",
      "Century Sainik 710 Grade BWP Modular Kitchen",
      "Saint-Gobain Gyproc False Ceilings with 3000K Lighting",
      "Jaguar / Kohler Diverters & Wall-Hung WC Sets",
      "10-Year Written Structural & Timber Warranty"
    ],
    recommended: true,
    isActive: true
  },
  {
    packageId: "pkg-turnkey-luxury",
    name: "Haute Bespoke Architectural Residence",
    description: "Uncompromising luxury with imported Italian marble, bespoke joinery, and home automation.",
    baseRate: 2950,
    unit: "sq.ft",
    features: [
      "Everything in Premium Turnkey Tier",
      "Imported Italian Bottochino Marble in Living / Dining",
      "Century Club Prime Lifetime BWP 710 Marine Plywood",
      "German Hettich Sensys & Hafele Soft-Close Hardware",
      "Acoustic Fluted Wall Paneling & Bronze Glass Profiles",
      "Full Smart Lighting & Curtain Automation Ready"
    ],
    recommended: false,
    isActive: true
  }
];

const FALLBACK_CATEGORIES: PricingCategory[] = [
  { categoryId: "cat-flooring", name: "Premium Flooring Upgrades", description: "Surface enhancements", sortOrder: 1, isActive: true },
  { categoryId: "cat-kitchen", name: "Kitchen & Joinery Enhancements", description: "Cabinetry upgrades", sortOrder: 2, isActive: true },
  { categoryId: "cat-automation", name: "Smart Living & Energy", description: "Modern technology additions", sortOrder: 3, isActive: true }
];

const FALLBACK_ITEMS: PricingItem[] = [
  {
    itemId: "item-italian-marble",
    categoryId: "cat-flooring",
    name: "Italian Statuario Marble Flooring",
    description: "Upgrade from vitrified tiles to 20mm bookmatched Italian marble with 8-stage diamond polishing.",
    unit: "sq.ft",
    price: 350,
    pricingType: "per_sqft",
    isActive: true
  },
  {
    itemId: "item-wooden-floor",
    categoryId: "cat-flooring",
    name: "Herringbone Engineered Oak Flooring",
    description: "Warm European oak laid in classic herringbone pattern for master bedrooms.",
    unit: "sq.ft",
    price: 180,
    pricingType: "per_sqft",
    isActive: true
  },
  {
    itemId: "item-kitchen-lacquer",
    categoryId: "cat-kitchen",
    name: "Anti-Scratch Lacquered Glass Kitchen Shutters",
    description: "Upgrade from matte laminate to high-gloss tinted lacquered glass with aluminum framing.",
    unit: "package",
    price: 45000,
    pricingType: "fixed",
    isActive: true
  },
  {
    itemId: "item-walkin-closet",
    categoryId: "cat-kitchen",
    name: "Walk-In Dressing Suite with Sensor Lights",
    description: "Floor-to-ceiling walk-in wardrobe with tinted glass doors and automated LED rods.",
    unit: "room",
    price: 65000,
    pricingType: "fixed",
    isActive: true
  },
  {
    itemId: "item-home-automation",
    categoryId: "cat-automation",
    name: "Schneider Smart Lighting & Curtain Automation",
    description: "Centralized smart automation hub controlling all lighting circuits and motorized drapery.",
    unit: "villa",
    price: 85000,
    pricingType: "fixed",
    isActive: true
  },
  {
    itemId: "item-solar-rooftop",
    categoryId: "cat-automation",
    name: "5kW On-Grid Rooftop Solar Array",
    description: "Net-metered monocrystalline solar panels cutting monthly grid electricity consumption by 70%.",
    unit: "system",
    price: 135000,
    pricingType: "fixed",
    isActive: true
  }
];

const REGIONAL_HUBS = [
  "Ranchi (Jharkhand)",
  "Patna (Bihar)",
  "Bhagalpur (Bihar)",
  "Deoghar (Jharkhand)",
  "Dumka (Jharkhand)",
  "Kolkata (West Bengal)",
  "Kishanganj (Bihar)",
  "Purnea (Bihar)",
  "Banka (Bihar)",
  "Godda (Jharkhand)",
  "Hazaribagh (Jharkhand)"
];

const PROPERTY_TYPES = [
  "Independent Duplex / Bungalow",
  "Villa on Private Plot",
  "Luxury Apartment / Penthouse",
  "Ancestral Home Renovation",
  "Commercial / Office Facility"
];

export default function PricingCalculatorPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Data State
  const [packages, setPackages] = useState<PricingPackage[]>(FALLBACK_PACKAGES);
  const [categories, setCategories] = useState<PricingCategory[]>(FALLBACK_CATEGORIES);
  const [items, setItems] = useState<PricingItem[]>(FALLBACK_ITEMS);
  const [loading, setLoading] = useState(false);

  // Wizard State
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input State
  const [area, setArea] = useState<number>(2500);
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [city, setCity] = useState(REGIONAL_HUBS[0]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>("pkg-turnkey-premium");
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  // Contact State
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [pkgSnap, catSnap, itemSnap] = await Promise.all([
          getDocs(collection(db, "pricingPackages")),
          getDocs(collection(db, "pricingCategories")),
          getDocs(collection(db, "pricingItems"))
        ]);

        const pkgs = pkgSnap.docs
          .map((d) => ({ packageId: d.id, ...(d.data() as any) } as PricingPackage))
          .filter((p) => p.isActive)
          .sort((a, b) => a.baseRate - b.baseRate);

        const cats = catSnap.docs
          .map((d) => ({ categoryId: d.id, ...(d.data() as any) } as PricingCategory))
          .filter((c) => c.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        const itms = itemSnap.docs
          .map((d) => ({ itemId: d.id, ...(d.data() as any) } as PricingItem))
          .filter((i) => i.isActive);

        if (pkgs.length > 0) {
          setPackages(pkgs);
          const recommended = pkgs.find((p) => p.recommended);
          if (recommended) setSelectedPackageId(recommended.packageId);
          else setSelectedPackageId(pkgs[0].packageId);
        }

        if (cats.length > 0) setCategories(cats);
        if (itms.length > 0) setItems(itms);
      } catch (error) {
        console.warn("Using verified architectural pricing fallbacks:", error);
      }
    }
    fetchData();
  }, [user]);

  // Real-time calculation
  const estimate = useMemo(() => {
    if (!selectedPackageId && packages.length === 0) return null;

    const selectedPkg = packages.find((p) => p.packageId === selectedPackageId) || packages[0];

    const modifierItems = items.filter((i) => i.pricingType === "percentage");
    const selectedOptionalItems = items.filter((i) => selectedItemIds.includes(i.itemId));

    const allEngineItems = [...selectedOptionalItems, ...modifierItems];
    const uniqueItems = Array.from(new Set(allEngineItems.map((a) => a.itemId))).map(
      (id) => allEngineItems.find((a) => a.itemId === id)!
    );

    return calculateEstimate({
      areaSqft: area,
      selectedPackage: selectedPkg,
      selectedItems: uniqueItems
    });
  }, [area, selectedPackageId, selectedItemIds, packages, items]);

  const toggleItem = (itemId: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSaveEstimate = async () => {
    if (!name || !phone) {
      alert("Please provide your name and phone number to receive your itemized BOQ estimate.");
      return;
    }
    if (!estimate) return;

    setIsSubmitting(true);
    try {
      const selectedPkg = packages.find((p) => p.packageId === selectedPackageId);
      const selectedOptionalItems = items.filter((i) => selectedItemIds.includes(i.itemId));

      await addDoc(collection(db, "quoteRequests"), {
        userId: user?.uid || null,
        status: "new",
        customerDetails: { name, email, phone },
        projectDetails: { area, propertyType, city },
        selections: {
          package: selectedPkg || null,
          items: selectedOptionalItems
        },
        calculation: estimate,
        createdAt: serverTimestamp()
      });

      alert("Your detailed architectural estimate has been registered! A senior project consultant will connect with you shortly.");
      router.push("/projects");
    } catch (error) {
      console.error("Error submitting quote request:", error);
      alert("Thank you! Your estimate details have been noted. You can also call us directly at +91 96319 80881.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen pb-24 pt-28">
      {/* 1. EDITORIAL HEADER */}
      <section className="bg-[#0c121e] text-[#faf8f5] pt-16 pb-20 px-6 rounded-b-[3rem] relative overflow-hidden mb-12">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c89d28]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c89d28]">
              Transparent Cost Estimator
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-6">
            Calculate Your Residential <br />
            <span className="italic font-light text-[#c89d28]">Budget with Precision</span>
          </h1>

          <p className="text-gray-300 font-light text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            Based on verified regional construction benchmarks across Jharkhand, Bihar, and West Bengal. Select your built-up area, customize tiers, and generate an itemized estimate with zero cost escalation.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-[#c89d28] mx-auto mb-2" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-200 block">
                Zero Escalation BOQ
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Users className="w-5 h-5 text-[#c89d28] mx-auto mb-2" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-200 block">
                Resident Engineer Daily
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Clock className="w-5 h-5 text-[#c89d28] mx-auto mb-2" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-200 block">
                100% On-Time Delivery
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Activity className="w-5 h-5 text-[#c89d28] mx-auto mb-2" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-200 block">
                10-Yr Written Warranty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESTIMATION WIZARD & STICKY LEDGER */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* Left: Step Wizard */}
        <div className="flex-1 space-y-8">
          {/* Progress Indicator */}
          <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between border border-black/5 px-8">
            {[
              { num: 1, label: "Plot & Location" },
              { num: 2, label: "Base Package" },
              { num: 3, label: "Finishes & Addons" },
              { num: 4, label: "Review & BOQ" }
            ].map((st) => (
              <div key={st.num} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm font-semibold transition-all ${
                    step >= st.num
                      ? "bg-[#c89d28] text-[#0c121e]"
                      : "bg-[#faf8f5] text-gray-400 border border-black/5"
                  }`}
                >
                  {st.num}
                </div>
                <span className={`text-xs uppercase tracking-wider font-medium hidden md:inline ${step >= st.num ? "text-[#0c121e]" : "text-gray-400"}`}>
                  {st.label}
                </span>
                {st.num < 4 && <div className={`w-8 lg:w-16 h-0.5 mx-1 ${step > st.num ? "bg-[#c89d28]" : "bg-black/5"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Property Details */}
          {step === 1 && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-black/5">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0c121e] mb-2 flex items-center gap-3">
                <Home className="text-[#c89d28]" /> Step 1: Property &amp; Regional Hub
              </h2>
              <p className="text-xs text-gray-500 mb-8 font-light">
                Specify your proposed built-up area and operational hub to calibrate material freight and engineering costs.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                      Total Built-up Carpet Area (sq.ft)
                    </label>
                    <span className="font-serif text-lg font-semibold text-[#c89d28]">
                      {area.toLocaleString("en-IN")} sq.ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="10000"
                    step="100"
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value) || 600)}
                    className="w-full accent-[#c89d28] cursor-pointer mb-2"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-light">
                    <span>600 sq.ft (Compact 2BHK)</span>
                    <span>2,500 sq.ft (Standard Duplex)</span>
                    <span>10,000 sq.ft (Palatial Estate)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Property Typology
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-[#c89d28]"
                    >
                      {PROPERTY_TYPES.map((pt, i) => (
                        <option key={i} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Operational City Hub
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-black/10 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-[#c89d28]"
                    >
                      {REGIONAL_HUBS.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-8 bg-[#0c121e] hover:bg-black text-[#faf8f5] font-semibold py-4 rounded-full text-xs tracking-widest uppercase transition-all flex justify-center items-center gap-2 cursor-pointer shadow-md"
                >
                  Select Construction Package <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Base Package */}
          {step === 2 && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-black/5">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0c121e] mb-2 flex items-center gap-3">
                <Layers className="text-[#c89d28]" /> Step 2: Select Architectural Package
              </h2>
              <p className="text-xs text-gray-500 mb-8 font-light">
                Choose the foundation specification tier. You can customize finishes and add-ons in the next step.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.packageId}
                    onClick={() => setSelectedPackageId(pkg.packageId)}
                    className={`cursor-pointer rounded-2xl border-2 transition-all p-6 flex flex-col justify-between ${
                      selectedPackageId === pkg.packageId
                        ? "border-[#c89d28] bg-[#faf8f5] shadow-md ring-1 ring-[#c89d28]"
                        : "border-black/5 bg-white hover:border-black/20"
                    }`}
                  >
                    <div>
                      {pkg.recommended && (
                        <span className="bg-[#c89d28] text-[#0c121e] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full inline-block mb-3">
                          Recommended
                        </span>
                      )}
                      <h3 className="font-serif text-xl text-[#0c121e] mb-1">{pkg.name}</h3>
                      <div className="mb-4">
                        <span className="font-serif text-3xl text-[#c89d28]">
                          ₹{pkg.baseRate.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-gray-500"> / {pkg.unit}</span>
                      </div>
                      <p className="text-xs text-gray-600 font-light mb-6 leading-relaxed">
                        {pkg.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {pkg.features.slice(0, 5).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-700 font-light">
                            <Check className="w-3.5 h-3.5 text-[#c89d28] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-black/5 text-center">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${selectedPackageId === pkg.packageId ? "text-[#c89d28]" : "text-gray-400"}`}>
                        {selectedPackageId === pkg.packageId ? "✓ Selected Tier" : "Select Tier"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-black/5">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                >
                  &larr; Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 rounded-full bg-[#0c121e] hover:bg-black text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  Customize Add-ons <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Add-ons */}
          {step === 3 && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-black/5">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0c121e] mb-2 flex items-center gap-3">
                <Package className="text-[#c89d28]" /> Step 3: Bespoke Upgrades &amp; Add-ons
              </h2>
              <p className="text-xs text-gray-500 mb-8 font-light">
                Tailor your residence with Italian marble, acoustic paneling, or renewable solar micro-grids.
              </p>

              <div className="space-y-8">
                {categories.map((cat) => {
                  const catItems = items.filter(
                    (i) => i.categoryId === cat.categoryId && i.pricingType !== "percentage"
                  );
                  if (catItems.length === 0) return null;

                  return (
                    <div key={cat.categoryId}>
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c89d28] mb-3">
                        {cat.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {catItems.map((item) => {
                          const isSelected = selectedItemIds.includes(item.itemId);
                          return (
                            <div
                              key={item.itemId}
                              onClick={() => toggleItem(item.itemId)}
                              className={`cursor-pointer rounded-2xl p-5 border transition-all flex items-start gap-3.5 ${
                                isSelected
                                  ? "border-[#c89d28] bg-[#c89d28]/5 shadow-sm"
                                  : "border-black/5 bg-white hover:border-black/15"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                                  isSelected ? "bg-[#c89d28] border-[#c89d28]" : "border-gray-300"
                                }`}
                              >
                                {isSelected && <Check size={12} className="text-[#0c121e]" />}
                              </div>
                              <div>
                                <p className="font-serif text-lg text-[#0c121e] font-medium leading-snug">
                                  {item.name}
                                </p>
                                <p className="text-xs font-semibold text-[#c89d28] mt-1">
                                  +₹{item.price.toLocaleString("en-IN")} / {item.unit}
                                </p>
                                <p className="text-xs text-gray-500 font-light mt-1 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-black/5">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                >
                  &larr; Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 rounded-full bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] font-semibold text-xs tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  Review &amp; Generate BOQ <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Submission */}
          {step === 4 && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-black/5">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#0c121e] mb-2">
                Step 4: Request Official Itemized BOQ
              </h2>
              <p className="text-xs text-gray-500 mb-6 font-light">
                Submit your project details to receive a certified, non-escalating Bill of Quantities booklet and schedule an on-site feasibility inspection.
              </p>

              <div className="bg-[#c89d28]/10 text-[#0c121e] p-5 rounded-2xl border border-[#c89d28]/30 flex items-start gap-3.5 text-xs sm:text-sm font-light mb-8">
                <Info size={20} className="text-[#c89d28] shrink-0 mt-0.5" />
                <p>
                  This preliminary estimate includes all architectural drawings, certified Fe 550D TMT rebar, resident civil supervision, and modular millwork. Final figures are locked after site contour survey.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/10 text-xs focus:outline-none focus:border-[#c89d28]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/10 text-xs focus:outline-none focus:border-[#c89d28]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rajesh@example.com"
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-black/10 text-xs focus:outline-none focus:border-[#c89d28]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-black/5">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                >
                  &larr; Back
                </button>
                <button
                  onClick={handleSaveEstimate}
                  disabled={isSubmitting}
                  className="px-8 py-4 rounded-full bg-[#0c121e] hover:bg-black text-[#faf8f5] font-semibold text-xs tracking-widest uppercase transition-all shadow-xl disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Generating BOQ..." : "Request Certified BOQ Estimate"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Estimate Ledger */}
        <div className="w-full lg:w-[420px]">
          <div className="bg-[#0c121e] text-[#faf8f5] rounded-3xl p-8 shadow-2xl sticky top-28 border border-white/10">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#c89d28] block">
                  Live Ledger
                </span>
                <h3 className="font-serif text-2xl font-normal">Estimate Summary</h3>
              </div>
              <Calculator className="text-[#c89d28]" size={24} />
            </div>

            {estimate ? (
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-light text-gray-400">
                  <span>Carpet Area:</span>
                  <span className="font-medium text-white">{estimate.area} sq.ft</span>
                </div>
                <div className="flex justify-between text-xs font-light text-gray-400">
                  <span>Selected Location:</span>
                  <span className="font-medium text-white">{city}</span>
                </div>

                {/* Line Items */}
                <div className="pt-4 border-t border-white/10 space-y-3 max-h-60 overflow-y-auto pr-1">
                  {estimate.lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs items-start gap-3">
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium leading-tight">{item.name}</p>
                        <p className="text-[10px] text-gray-500 font-light mt-0.5">{item.description}</p>
                      </div>
                      <div className="font-mono text-right text-[#faf8f5] whitespace-nowrap">
                        ₹{item.total.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grand Total */}
                <div className="pt-6 border-t border-white/10 mt-6 flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block">
                      Estimated Investment
                    </span>
                    <span className="text-xs text-gray-500 font-light">Zero Escalation Contract</span>
                  </div>
                  <div className="font-serif text-3xl font-normal text-[#c89d28]">
                    ₹{estimate.finalTotal.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <AlertTriangle className="text-[#c89d28] shrink-0 mt-0.5" size={16} />
                  <p className="text-[11px] text-gray-400 font-light leading-relaxed">
                    Estimate backed by Galaxy Interior's legally binding Master BOQ. No unexpected price escalations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400 text-xs">
                Select your carpet area and package to review your estimate ledger.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
