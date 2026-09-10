"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
  CalendarDays,
  Sparkles,
  Maximize2,
  SlidersHorizontal,
  PhoneCall,
  ShieldCheck,
  Building,
  Layers
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
    const fetchFirestoreProjects = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "projects"), where("isPublic", "==", true));
        const querySnapshot = await getDocs(q);

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
                "/generated/interior_gallery_1.png",
                "/generated/3d_elevation_hero.png"
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

          // Merge: remote projects prepended, avoid duplicate IDs with catalog
          const catalogFiltered = PROJECTS_CATALOG.filter(
            (cp) => !remoteProjects.some((rp) => rp.id === cp.id)
          );
          setProjects([...remoteProjects, ...catalogFiltered]);
        }
      } catch (err) {
        console.warn("Firestore public projects load error; using authentic catalog fallback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirestoreProjects();
  }, []);

  // Filtered dataset
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchTypology =
        selectedTypology === "all" ? true : project.category === selectedTypology;
      const matchStatus =
        selectedStatus === "all" ? true : project.status === selectedStatus;
      return matchTypology && matchStatus;
    });
  }, [projects, selectedTypology, selectedStatus]);

  return (
    <main className="bg-[#faf8f5] text-[#0c121e] min-h-screen">
      {/* 1. EDITORIAL HEADER */}
      <section className="relative pt-32 pb-20 bg-[#0c121e] text-[#faf8f5] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/legacy_villa.png"
            alt="Galaxy Interior Architecture Portfolio"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf8f5]/10 border border-[#c89d28]/30 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#c89d28]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c89d28]">
              Portfolio &amp; Delivered Residences
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.1] mb-6">
            Architecture Crafted with Rigor. <br />
            <span className="italic font-light text-[#c89d28]">Spaces Built for Life.</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-xl font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Explore our curated archive of private luxury villas, high-rise penthouses, and turnkey residential estates across Jharkhand, Bihar, and West Bengal.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 max-w-4xl mx-auto text-center">
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#faf8f5]">120+</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Residences Delivered</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#faf8f5]">3 States</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Jharkhand &bull; Bihar &bull; Bengal</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#faf8f5]">100%</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">On-Time Handover</p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#faf8f5]">Zero</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Budget Escalation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER CONTROLS BAR */}
      <section className="sticky top-16 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-black/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Typology Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2 shrink-0 hidden sm:inline">
              Discipline:
            </span>
            {(
              [
                { id: "all", label: "All Works" },
                { id: "turnkey", label: "Turnkey Estates" },
                { id: "interior", label: "Luxury Interiors" },
                { id: "architecture", label: "Architecture & 3D" }
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTypology(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shrink-0 cursor-pointer ${
                  selectedTypology === tab.id
                    ? "bg-[#0c121e] text-[#faf8f5] shadow-sm"
                    : "bg-white text-gray-600 hover:text-black border border-black/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 self-end md:self-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2 shrink-0 hidden sm:inline">
              Status:
            </span>
            {(
              [
                { id: "all", label: "All" },
                { id: "completed", label: "Completed" },
                { id: "ongoing", label: "Under Build" }
              ] as const
            ).map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedStatus === status.id
                    ? "bg-[#c89d28] text-[#0c121e] font-semibold"
                    : "bg-black/5 text-gray-600 hover:text-black"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PORTFOLIO GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto min-h-[600px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden border border-black/5 animate-pulse h-[480px]"
              >
                <div className="h-64 bg-gray-200" />
                <div className="p-7 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-black/5 p-8 max-w-xl mx-auto">
            <Building className="w-12 h-12 text-[#c89d28] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#0c121e] mb-2">No Residences Match Selected Filters</h3>
            <p className="text-gray-500 text-sm mb-6">
              Adjust your category or status filters to explore our complete residential archive.
            </p>
            <button
              onClick={() => {
                setSelectedTypology("all");
                setSelectedStatus("all");
              }}
              className="px-6 py-2.5 rounded-full bg-[#0c121e] text-[#faf8f5] text-xs font-semibold tracking-widest uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id || project.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden bg-black/5">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Status Pill */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#0c121e] flex items-center gap-1.5 shadow-sm">
                    {project.status === "completed" && (
                      <CheckCircle2 size={12} className="text-emerald-600" />
                    )}
                    {project.status === "ongoing" && (
                      <Clock size={12} className="text-[#c89d28]" />
                    )}
                    {project.status === "upcoming" && (
                      <CalendarDays size={12} className="text-blue-500" />
                    )}
                    <span>{project.status}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#0c121e]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#c89d28] border border-[#c89d28]/30">
                    {project.categoryLabel}
                  </div>

                  {/* Area Tag */}
                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md text-xs text-white font-light">
                    {project.area}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center text-xs font-semibold text-gray-500 tracking-wider uppercase mb-2">
                      <MapPin size={13} className="text-[#c89d28] mr-1 shrink-0" />
                      <span>{project.location}</span>
                      <span className="mx-2 text-gray-300">&bull;</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-normal text-[#0c121e] mb-3 group-hover:text-[#c89d28] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed mb-6 line-clamp-2">
                      {project.subtitle}
                    </p>

                    {/* Highlights bullet */}
                    <div className="space-y-1.5 mb-6 pt-4 border-t border-black/5">
                      {project.highlights.slice(0, 2).map((h, hIdx) => (
                        <p key={hIdx} className="text-[11px] text-gray-500 flex items-center gap-1.5 font-light">
                          <span className="w-1 h-1 rounded-full bg-[#c89d28]" />
                          <span className="truncate">{h}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold tracking-widest uppercase text-[#0c121e] group-hover:text-[#c89d28] transition-colors">
                    <span>Explore Project Story</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. CONVERSION CTA */}
      <section className="py-24 bg-[#0c121e] text-[#faf8f5] px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#c89d28] mb-4">
            Your Plot &bull; Our Craft
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal mb-8 leading-tight">
            Ready to Build Your <br />
            <span className="italic text-[#c89d28]">Next Success Story?</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are envisioning a multi-level contemporary villa or a high-end penthouse interior, our studio delivers turnkey certainty with zero budget escalation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-[#c89d28] hover:bg-[#b58b20] text-[#0c121e] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase shadow-xl transition-all"
            >
              Discuss Your Project
            </Link>
            <a
              href="tel:+917004465611"
              className="w-full sm:w-auto border border-white/20 hover:border-white/40 text-[#faf8f5] px-10 py-4 rounded-full font-semibold text-xs tracking-widest uppercase transition-all bg-white/5"
            >
              <PhoneCall className="w-4 h-4 inline mr-2 text-[#c89d28]" />
              Call +91 70044 65611
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
