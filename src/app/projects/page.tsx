"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  CalendarDays,
  Sparkles,
  Maximize2,
  Filter,
  Building2,
  PhoneCall,
  Check
} from "lucide-react";
import { PROJECTS_CATALOG, ProjectDetail } from "@/data/projectsCatalog";

type TypologyFilter = "all" | "turnkey" | "interior" | "architecture";
type StatusFilter = "all" | "completed" | "ongoing";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectDetail[]>(PROJECTS_CATALOG);
  const [loading, setLoading] = useState(false);
  const [selectedTypology, setSelectedTypology] = useState<TypologyFilter>("all");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");

  useEffect(() => {
    try {
      setLoading(true);
      const q = query(collection(db, "projects"), where("isPublic", "==", true));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const remoteProjects: ProjectDetail[] = querySnapshot.docs.map((docSnap) => {
            const data = docSnap.data() as any;
            return {
              id: docSnap.id,
              slug: docSnap.id,
              title: data.projectName || data.title || "Landmark Residence",
              subtitle: data.subtitle || data.description || "Architectural execution by Galaxy Interior.",
              category: (data.category as any) || "turnkey",
              categoryLabel: data.categoryLabel || (data.category === "interior" ? "Luxury Interior" : "Architecture & Build"),
              status: (data.status?.toLowerCase() as any) || "completed",
              location: data.location || "Regional Hub",
              city: data.city || data.location?.split(",")[0]?.trim() || "Eastern Region",
              state: data.state || "Jharkhand / Bihar",
              area: data.areaSqft ? `${data.areaSqft} sq.ft.` : data.area || "3,500 sq.ft.",
              plotSize: data.plotSize || "Custom Plot",
              year: data.year || "2024",
              duration: data.duration || "9 Months",
              scope: data.scope || data.requirements || "Comprehensive Turnkey Execution",
              coverImage: data.coverImageUrl || data.image || "/generated/legacy_villa.png",
              galleryImages: data.galleryImages || [
                data.coverImageUrl || data.image || "/generated/legacy_villa.png",
                "/generated/inspiration_modular_kitchen.jpg",
                "/generated/inspiration_false_ceiling.jpg"
              ],
              clientBrief: data.description || data.requirements || "Architectural commission for bespoke residential development.",
              architecturalApproach: data.architecturalApproach || "Conceived with strict adherence to Vastu Shastra, climatic orientation, and seismic structural standards.",
              team: {
                leadArchitect: data.leadArchitect || "Shivashish Ranjan (Principal)",
                structuralEngineer: "Galaxy Senior Structural Bureau",
                siteEngineer: "Resident Civil Engineer In-Charge",
                stylingDirector: "Galaxy Interior Styling Bureau"
              },
              keySpecs: [
                { label: "Structural Rebar", spec: "Primary Fe 550D TMT Reinforcement" },
                { label: "Concrete Grade", spec: "M25 / M30 Tested Design-Mix" },
                { label: "Joinery Core", spec: "Century Club Prime BWP 710 Marine Plywood" },
                { label: "Cabinet Hardware", spec: "German Hettich / Hafele Soft-Close Fittings" }
              ],
              highlights: data.highlights || [
                "Vastu-compliant spatial zoning with natural cross-ventilation",
                "Full turnkey execution with resident civil engineering supervision",
                "10-Year written structural and joinery timber warranty"
              ],
              deliverables: [
                "Sanctioned Architectural Blueprints & 3D Visual Dossier",
                "Master Zero-Escalation Itemized BOQ Contract",
                "10-Year Warranty Certification & Key Handover"
              ]
            };
          });

          const catalogFiltered = PROJECTS_CATALOG.filter(
            (cp) => !remoteProjects.some((rp) => rp.id === cp.id)
          );
          setProjects([...remoteProjects, ...catalogFiltered]);
        }
        setLoading(false);
      }, (err) => {
        console.warn("Firestore public projects load error; using catalog fallback:", err);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn("Using fallback projects catalog");
      setLoading(false);
    }
  }, []);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Typology filter
      const cat = String(project.category).toLowerCase();
      const matchesTypology =
        selectedTypology === "all" ||
        (selectedTypology === "turnkey" && cat.includes("turnkey")) ||
        (selectedTypology === "interior" && cat.includes("interior")) ||
        (selectedTypology === "architecture" && (cat.includes("architect") || cat.includes("design")));

      // Status filter
      const stat = String(project.status || "").toLowerCase();
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "completed" && (stat.includes("complete") || !stat)) ||
        (selectedStatus === "ongoing" && (stat.includes("ongoing") || stat.includes("active") || stat.includes("build")));

      return matchesTypology && matchesStatus;
    });
  }, [projects, selectedTypology, selectedStatus]);

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#111622] pt-28 md:pt-36 pb-24">
      {/* 1. HERO ARCHITECTURAL HEADER */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#eee7db]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7db] border border-[#ded8cb] text-brand-charcoal text-[11px] font-semibold tracking-[0.25em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Architectural Portfolio &amp; Landmarks</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-normal tracking-tight text-brand-charcoal leading-[1.1]">
              Residences Built For Life. <br />
              <span className="italic font-editorial text-brand-charcoal">Shaped By Precision.</span>
            </h1>
            <p className="mt-6 text-gray-600 font-light text-base md:text-lg leading-relaxed">
              Explore selected private villas, luxury duplex interiors, and turnkey estates executed across Ranchi, Patna, Kolkata, Bhagalpur, Deoghar, and 11 regional operational hubs.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#111622] hover:bg-[#1a2336] text-white text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md"
            >
              <span>Initiate Your Landmark</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>

        {/* Portfolio Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-b border-[#eee7db]">
          <div>
            <div className="text-3xl font-editorial font-bold text-brand-charcoal">120+</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-1 font-medium">Delivered Residences</div>
          </div>
          <div>
            <div className="text-3xl font-editorial font-bold text-brand-charcoal">11 Hubs</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-1 font-medium">JH • BR • WB</div>
          </div>
          <div>
            <div className="text-3xl font-editorial font-bold text-brand-charcoal">100%</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-1 font-medium">On-Time Handover</div>
          </div>
          <div>
            <div className="text-3xl font-editorial font-bold text-brand-charcoal">0%</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-1 font-medium">Contract Escalation</div>
          </div>
        </div>
      </section>

      {/* 2. FILTER MATRIX & CATEGORY TABS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-[#ded8cb] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Typology Tabs */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block mb-3">
              Filter By Typology
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Works" },
                { id: "turnkey", label: "Turnkey Estates" },
                { id: "interior", label: "Luxury Interiors" },
                { id: "architecture", label: "Architecture & 3D" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTypology(tab.id as TypologyFilter)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    selectedTypology === tab.id
                      ? "bg-[#111622] text-white shadow-sm"
                      : "bg-[#faf8f5] hover:bg-gray-100 text-gray-600 border border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-bold block mb-3">
              Execution Status
            </span>
            <div className="flex gap-2">
              {[
                { id: "all", label: "All Statuses" },
                { id: "completed", label: "Completed" },
                { id: "ongoing", label: "Under Build" },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatus(st.id as StatusFilter)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedStatus === st.id
                      ? "bg-brand-gold text-[#0b162c] font-bold"
                      : "bg-[#faf8f5] text-gray-600 hover:text-black"
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PORTFOLIO GRID */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs uppercase tracking-widest text-gray-500 font-mono">Loading Architectural Portfolio...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#ded8cb]">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-editorial font-bold text-brand-charcoal mb-2">No projects found for selected filters</h3>
            <p className="text-sm text-gray-500 mb-6">Try resetting filters to explore all completed and active residences.</p>
            <button
              onClick={() => { setSelectedTypology("all"); setSelectedStatus("all"); }}
              className="px-6 py-2.5 bg-[#111622] text-white text-xs font-bold uppercase tracking-wider rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#ded8cb] shadow-sm hover:shadow-luxury-hover transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono uppercase tracking-wider font-bold">
                        {project.categoryLabel || project.category}
                      </span>
                      {project.status === "ongoing" && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/90 text-black text-[10px] font-mono uppercase tracking-wider font-bold">
                          Active Site
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{project.location}</span>
                      </div>
                      <span>{project.area}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    <h3 className="text-2xl font-editorial font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors leading-snug mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed line-clamp-2 mb-6">
                      {project.subtitle}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-gray-100 text-xs text-gray-500 font-mono">
                      <div className="flex items-center justify-between">
                        <span>Handover / Year:</span>
                        <span className="font-bold text-brand-charcoal">{project.year}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Contract Type:</span>
                        <span className="font-bold text-brand-charcoal truncate max-w-[180px]">{project.scope}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-8 pb-8 pt-2">
                  <div className="w-full py-3 rounded-xl bg-[#faf8f5] group-hover:bg-[#111622] text-brand-charcoal group-hover:text-white border border-[#ded8cb] group-hover:border-[#111622] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2">
                    <span>Inspect Residence</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-24">
        <div className="bg-[#111622] rounded-3xl p-10 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-brand-gold text-xs font-mono font-bold tracking-[0.25em] uppercase">Begin Your Residence</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal mt-4 mb-6 leading-tight">
              Ready To Build Your Architectural Landmark?
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              Schedule a private discovery session with Principal Architect Shivashish Ranjan and our senior structural engineering bureau in Ranchi, Patna, or Bhagalpur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-yellow-400 text-[#0b162c] text-xs font-bold tracking-[0.18em] uppercase rounded-full transition-all shadow-lg"
              >
                Schedule Consultation
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
    </main>
  );
}
