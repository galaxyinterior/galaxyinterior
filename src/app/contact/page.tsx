'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  Send, 
  ArrowRight, 
  AlertCircle, 
  Ticket, 
  Search, 
  CheckCircle2, 
  Paperclip, 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare,
  FileText,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/contexts/AuthContext';
import { sendNotification } from '@/lib/notifications';

type Tab = 'consultation' | 'ticket' | 'track';

const REGIONAL_OFFICES = [
  {
    city: 'Bhagalpur (Corporate HQ)',
    state: 'Bihar',
    type: 'Headquarters & Joinery Works',
    address: 'Khanjarpur Main Road, Near Barari Junction, Bhagalpur, Bihar 812001',
    phone: '+91 96319 80881',
    hours: 'Mon - Sat: 9:30 AM - 7:30 PM',
    isHQ: true,
  },
  {
    city: 'Ranchi',
    state: 'Jharkhand',
    type: 'Regional Design Studio',
    address: 'Harmu Housing Colony, Near Argora Bypass, Ranchi, Jharkhand 834002',
    phone: '+91 91227 95726',
    hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
    isHQ: false,
  },
  {
    city: 'Patna',
    state: 'Bihar',
    type: 'Architectural Liaison Office',
    address: 'Bailey Road, Saguna More Corridor, Patna, Bihar 801503',
    phone: '+91 96319 80881',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    isHQ: false,
  },
  {
    city: 'Kolkata',
    state: 'West Bengal',
    type: 'Regional Studio & Material Gallery',
    address: 'Action Area II, New Town / Salt Lake Corridor, Kolkata, WB 700156',
    phone: '+91 91227 95726',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM',
    isHQ: false,
  },
];

const SITE_SUPERVISION_HUBS = [
  'Deoghar', 'Dumka', 'Godda', 'Hazaribagh', 'Banka', 'Kishanganj', 'Purnea'
];

const PROJECT_DISCIPLINES = [
  'Turnkey Villa Construction',
  'Luxury Residential Interior',
  '2D Architectural & 3D Vastu Planning',
  'Bespoke Modular Kitchen & Joinery',
  'Complete Home Structural Renovation',
  'Commercial / Executive Space'
];

const BUDGET_RANGES = [
  '₹10L - ₹25L (Interior / Modular)',
  '₹25L - ₹50L (Premium 3BHK / Villa Interior)',
  '₹50L - ₹1 Crore (Turnkey Build / Duplex)',
  '₹1 Crore - ₹2.5 Crore (Luxury Estate Turnkey)',
  '₹2.5 Crore+ (Haute Bespoke Landmark)'
];

const TIMELINE_OPTIONS = [
  'Immediate (Ready to begin within 15-30 days)',
  'Within 2-3 Months (Finalizing plans & approvals)',
  'Planning Phase (Exploring feasibility & BOQ)',
];

export default function ContactPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('consultation');
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          setSettings(snap.data());
        }
      } catch (err) {
        console.error('Settings fetch error:', err);
      }
    };
    fetchSettings();
  }, []);

  // -- Consultation & Inquiry State --
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Ranchi',
    discipline: 'Turnkey Villa Construction',
    area: '',
    budget: '₹50L - ₹1 Crore (Turnkey Build / Duplex)',
    timeline: 'Within 2-3 Months (Finalizing plans & approvals)',
    message: '',
    website: '' // Honeypot anti-spam
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -- Ticket Form State --
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: 'Civil & Structural',
    priority: 'Medium',
    description: '',
    projectId: ''
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  // -- Track Ticket State --
  const [trackId, setTrackId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackedTicket, setTrackedTicket] = useState<any | null>(null);
  const [trackError, setTrackError] = useState('');

  // Generate ID: GXY-2026-000124
  const generateTicketId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `GXY-${year}-${random}`;
  };

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website !== '') return; // Honeypot trap

    const lastSubTime = localStorage.getItem('last_inquiry_time');
    if (lastSubTime && Date.now() - parseInt(lastSubTime) < 10 * 60 * 1000) {
      alert('To prevent duplicate submissions, please wait a few minutes before submitting again. For urgent inquiries, call our direct studio line +91 96319 80881.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const { website, ...dataToSubmit } = formData;
      
      // Submit to inquiries collection
      await addDoc(collection(db, 'inquiries'), {
        ...dataToSubmit,
        type: 'studio_consultation',
        source: 'contact_page',
        createdAt: serverTimestamp(),
      });

      // If area or budget is provided, also record to quoteRequests for client portal syncing
      if (formData.area || formData.budget) {
        await addDoc(collection(db, 'quoteRequests'), {
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          projectType: formData.discipline,
          estimatedArea: formData.area || 'Not specified',
          budgetRange: formData.budget,
          timeline: formData.timeline,
          notes: formData.message,
          status: 'pending',
          createdAt: serverTimestamp(),
        });
      }

      localStorage.setItem('last_inquiry_time', Date.now().toString());
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: 'Ranchi',
        discipline: 'Turnkey Villa Construction',
        area: '',
        budget: '₹50L - ₹1 Crore (Turnkey Build / Duplex)',
        timeline: 'Within 2-3 Months (Finalizing plans & approvals)',
        message: '',
        website: ''
      });
      setTimeout(() => setSubmitStatus(null), 8000);
    } catch (error) {
      console.error('Inquiry submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to your account to raise a project support ticket.');
      return;
    }

    setIsSubmittingTicket(true);
    setTicketSuccess(null);

    try {
      let attachmentUrl = null;
      if (attachment) {
        if (attachment.size > 5 * 1024 * 1024) {
          alert('Attachment file size must be under 5MB.');
          setIsSubmittingTicket(false);
          return;
        }
        const storageRef = ref(storage, `tickets/${user.uid}/${Date.now()}_${attachment.name}`);
        const snap = await uploadBytes(storageRef, attachment);
        attachmentUrl = await getDownloadURL(snap.ref);
      }

      const newTicketId = generateTicketId();

      await addDoc(collection(db, 'supportTickets'), {
        ticketId: newTicketId,
        customerId: user.uid,
        customerName: user.displayName || 'Customer',
        customerEmail: user.email,
        subject: ticketData.subject,
        category: ticketData.category,
        priority: ticketData.priority,
        description: ticketData.description,
        projectId: ticketData.projectId,
        status: 'Open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastResponseAt: serverTimestamp(),
        attachmentUrl
      });

      // Send Notification to Admin
      await sendNotification({
        userId: 'ADMIN',
        title: 'New Support Ticket',
        message: `Ticket ${newTicketId}: ${ticketData.subject} (${ticketData.priority} Priority)`,
        type: 'ticket',
        link: `/tickets/${newTicketId}`
      });

      setTicketSuccess(newTicketId);
      setTicketData({ 
        subject: '', 
        category: 'Civil & Structural', 
        priority: 'Medium', 
        description: '', 
        projectId: '' 
      });
      setAttachment(null);
    } catch (err) {
      console.error('Ticket submission error:', err);
      alert('Failed to submit ticket. Please verify your connection or contact helpline.');
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) return;

    setIsTracking(true);
    setTrackError('');
    setTrackedTicket(null);

    try {
      const q = query(collection(db, 'supportTickets'), where('ticketId', '==', trackId.trim()));
      const snap = await getDocs(q);
      
      if (snap.empty) {
        setTrackError('Ticket not found. Please double-check your Ticket ID (e.g., GXY-2026-XXXXXX).');
      } else {
        const ticket = snap.docs[0].data();
        // Authorization check
        if (user && ticket.customerId === user.uid) {
          setTrackedTicket(ticket);
        } else if (!user) {
          setTrackError('Please sign in to view confidential support ticket updates.');
        } else {
          setTrackError('You are not authorized to view this ticket.');
        }
      }
    } catch (err) {
      console.error('Ticket tracking error:', err);
      setTrackError('Error retrieving ticket. Please try again later.');
    } finally {
      setIsTracking(false);
    }
  };

  const verifiedPhone = settings?.phone || '+91 96319 80881';
  const verifiedAltPhone = '+91 91227 95726';
  const verifiedEmail = settings?.email || 'contact@galaxyinteriorindia.com';

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#0c121e] pt-28 md:pt-36 pb-24 font-sans selection:bg-[#f1b821]/20">
      {/* Page Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold tracking-[0.25em] text-[#c89d28] uppercase mb-4">
            <Building2 size={14} className="text-[#f1b821]" />
            <span>Connect With Our Architecture Studio</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0c121e] leading-[1.1]">
            Let&apos;s Design Your Residence. <br />
            <span className="italic font-light text-[#0c121e]/75">With Contractual Certainty.</span>
          </h1>
          <p className="mt-6 text-[#0c121e]/70 text-base md:text-lg leading-relaxed font-normal">
            Whether you are planning a turnkey estate, luxury duplex interior, or structural modernizing across Jharkhand, Bihar, or West Bengal — our Principal Architects and Civil Engineers are ready to review your blueprints and deliver a transparent, itemised Master BOQ.
          </p>
        </div>
      </section>

      {/* Main Interactive Hub */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Interactive Intake Forms (8 cols) */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl p-2 border border-[#0c121e]/08 shadow-sm mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('consultation')}
                className={`flex-1 min-w-[200px] py-3 px-5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                  activeTab === 'consultation'
                    ? 'bg-[#0c121e] text-white shadow-sm'
                    : 'text-[#0c121e]/70 hover:bg-[#faf8f5]'
                }`}
              >
                <Sparkles size={14} className={activeTab === 'consultation' ? 'text-[#f1b821]' : 'text-[#c89d28]'} />
                <span>Project Consultation &amp; Quote</span>
              </button>

              <button
                onClick={() => setActiveTab('ticket')}
                className={`flex-1 min-w-[170px] py-3 px-5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                  activeTab === 'ticket'
                    ? 'bg-[#0c121e] text-white shadow-sm'
                    : 'text-[#0c121e]/70 hover:bg-[#faf8f5]'
                }`}
              >
                <Ticket size={14} className={activeTab === 'ticket' ? 'text-[#f1b821]' : 'text-[#c89d28]'} />
                <span>Client Support Ticket</span>
              </button>

              <button
                onClick={() => setActiveTab('track')}
                className={`flex-1 min-w-[150px] py-3 px-5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                  activeTab === 'track'
                    ? 'bg-[#0c121e] text-white shadow-sm'
                    : 'text-[#0c121e]/70 hover:bg-[#faf8f5]'
                }`}
              >
                <Search size={14} className={activeTab === 'track' ? 'text-[#f1b821]' : 'text-[#c89d28]'} />
                <span>Track Ticket</span>
              </button>
            </div>

            {/* TAB 1: STUDIO CONSULTATION & QUOTE INTAKE */}
            {activeTab === 'consultation' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0c121e]/08 shadow-sm">
                <div className="mb-8 pb-6 border-b border-[#0c121e]/08">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#c89d28] uppercase">Studio Intake</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-[#0c121e] font-normal mt-1">
                    Book An Architectural Discovery Session
                  </h2>
                  <p className="text-sm text-[#0c121e]/60 mt-2 font-normal">
                    Receive a preliminary space assessment, architectural layout advice, and zero-escalation Master BOQ estimate from our team within 24 hours.
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start space-x-4">
                    <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-emerald-900">Inquiry Received Successfully</h4>
                      <p className="text-sm text-emerald-800/80 mt-1">
                        Thank you for reaching out! Our Senior Design Associate will call you at your preferred number to discuss your site specifications and schedule your studio visit.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-4">
                    <AlertCircle size={24} className="text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-red-900">Submission Error</h4>
                      <p className="text-sm text-red-800/80 mt-1">
                        We could not process your submission right now. Please call our direct helpline at <a href="tel:+919631980881" className="underline font-bold">+91 96319 80881</a> or WhatsApp us.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleGeneralSubmit} className="space-y-6">
                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  {/* Client Basics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Singhania"
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Phone Number (WhatsApp Preferred) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Project Location / Operational Hub <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      >
                        <option value="Ranchi">Ranchi, Jharkhand</option>
                        <option value="Bhagalpur">Bhagalpur HQ, Bihar</option>
                        <option value="Patna">Patna, Bihar</option>
                        <option value="Kolkata">Kolkata, West Bengal</option>
                        <option value="Deoghar">Deoghar, Jharkhand</option>
                        <option value="Dumka">Dumka, Jharkhand</option>
                        <option value="Godda">Godda, Jharkhand</option>
                        <option value="Hazaribagh">Hazaribagh, Jharkhand</option>
                        <option value="Banka">Banka, Bihar</option>
                        <option value="Kishanganj">Kishanganj, Bihar</option>
                        <option value="Purnea">Purnea, Bihar</option>
                        <option value="Other Regional Site">Other Eastern India Location</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Specifics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Project Discipline <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="discipline"
                        value={formData.discipline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      >
                        {PROJECT_DISCIPLINES.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Approximate Plot / Carpet Area (sq. ft.)
                      </label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        placeholder="e.g. 2,400 sq.ft."
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Estimated Budget Envelope
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Expected Start Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                      >
                        {TIMELINE_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                      Tell Us About Your Vision &amp; Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share details such as number of floors, Vastu orientation, modular kitchen layout, preferred finishes, or existing structure status..."
                      className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-[#0c121e] hover:bg-[#18243c] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-full transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shadow-md"
                    >
                      <Send size={14} className="text-[#f1b821]" />
                      <span>{isSubmitting ? 'Transmitting To Studio...' : 'Request Project Consultation'}</span>
                    </button>

                    <div className="flex items-center space-x-2 text-xs text-[#0c121e]/50">
                      <ShieldCheck size={14} className="text-[#c89d28]" />
                      <span>Strictly Confidential • Zero Spam Guarantee</span>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: RAISE SUPPORT TICKET */}
            {activeTab === 'ticket' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0c121e]/08 shadow-sm">
                <div className="mb-8 pb-6 border-b border-[#0c121e]/08">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#c89d28] uppercase">Client Services</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-[#0c121e] font-normal mt-1">
                    Raise A Project Support Ticket
                  </h2>
                  <p className="text-sm text-[#0c121e]/60 mt-2 font-normal">
                    For ongoing site engineering queries, design revision requests, or milestone BOQ reviews.
                  </p>
                </div>

                {!user && (
                  <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-amber-900">Client Sign-In Required</h4>
                      <p className="text-xs text-amber-800/80 mt-1">
                        To tie your support request to your contract and resident site engineer, please sign in.
                      </p>
                    </div>
                    <Link
                      href="/login?redirect=/contact"
                      className="px-6 py-2.5 bg-[#0c121e] text-white text-xs font-bold tracking-wider uppercase rounded-full shrink-0"
                    >
                      Sign In Now
                    </Link>
                  </div>
                )}

                {ticketSuccess && (
                  <div className="mb-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <div className="flex items-center space-x-3 text-emerald-700 mb-2">
                      <CheckCircle2 size={22} />
                      <h4 className="font-serif text-lg font-bold text-emerald-900">Support Ticket Created</h4>
                    </div>
                    <p className="text-sm text-emerald-800">
                      Your ticket reference ID is <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">{ticketSuccess}</strong>.
                      Our project engineering desk has been notified and will respond within 4 hours.
                    </p>
                  </div>
                )}

                <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Ticket Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={!user}
                        value={ticketData.subject}
                        onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                        placeholder="e.g. Site electrical conduit elevation revision"
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Project Reference / Contract ID
                      </label>
                      <input
                        type="text"
                        disabled={!user}
                        value={ticketData.projectId}
                        onChange={(e) => setTicketData({ ...ticketData, projectId: e.target.value })}
                        placeholder="e.g. GXY-RNC-2025-04"
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Category
                      </label>
                      <select
                        disabled={!user}
                        value={ticketData.category}
                        onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium disabled:opacity-50"
                      >
                        <option value="Civil & Structural">Civil &amp; Structural Engineering</option>
                        <option value="Factory Joinery & Woodwork">Factory Joinery &amp; Woodwork</option>
                        <option value="3D Design & CAD Revisions">3D Design &amp; CAD Revisions</option>
                        <option value="Billing & Milestone BOQ">Billing &amp; Milestone BOQ</option>
                        <option value="Site Engineer Assistance">Site Engineer Assistance</option>
                        <option value="Post-Handover Warranty">Post-Handover Warranty (10-Year)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                        Priority Level
                      </label>
                      <select
                        disabled={!user}
                        value={ticketData.priority}
                        onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                        className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium disabled:opacity-50"
                      >
                        <option value="Low">Low (General Query)</option>
                        <option value="Medium">Medium (Regular Project Action)</option>
                        <option value="High">High (Needs 24h Site Action)</option>
                        <option value="Urgent">Urgent (Immediate Concrete / Pour Hold)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                      Detailed Issue Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      disabled={!user}
                      value={ticketData.description}
                      onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                      placeholder="Describe the milestone, site location, or specific drawing section requiring resolution..."
                      className="w-full px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-medium disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0c121e]/70 mb-2">
                      Attach Site Photo / Drawing (Max 5MB)
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2.5 bg-[#faf8f5] border border-[#0c121e]/15 hover:border-[#c89d28] rounded-xl text-xs font-bold text-[#0c121e]">
                        <Paperclip size={14} className="text-[#c89d28]" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          disabled={!user}
                          className="hidden"
                          onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                        />
                      </label>
                      {attachment && (
                        <div className="flex items-center space-x-2 text-xs text-[#0c121e]/80">
                          <span className="font-mono truncate max-w-[200px]">{attachment.name}</span>
                          <button
                            type="button"
                            onClick={() => setAttachment(null)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={!user || isSubmittingTicket}
                      className="px-8 py-4 bg-[#0c121e] hover:bg-[#18243c] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-full transition-all disabled:opacity-50 flex items-center space-x-2 shadow-md"
                    >
                      <Ticket size={14} className="text-[#f1b821]" />
                      <span>{isSubmittingTicket ? 'Lodging Ticket...' : 'Submit Support Ticket'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: TRACK SUPPORT TICKET */}
            {activeTab === 'track' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#0c121e]/08 shadow-sm">
                <div className="mb-8 pb-6 border-b border-[#0c121e]/08">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[#c89d28] uppercase">Ticket Status</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-[#0c121e] font-normal mt-1">
                    Track Existing Project Ticket
                  </h2>
                  <p className="text-sm text-[#0c121e]/60 mt-2 font-normal">
                    Enter your Ticket ID (e.g. GXY-2026-XXXXXX) to view live engineering notes and resolution status.
                  </p>
                </div>

                <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-8">
                  <input
                    type="text"
                    required
                    value={trackId}
                    onChange={(e) => setTrackId(e.target.value)}
                    placeholder="Enter Ticket ID (GXY-2026-XXXXXX)"
                    className="flex-1 px-4 py-3.5 bg-[#faf8f5] border border-[#0c121e]/15 rounded-xl text-sm focus:outline-none focus:border-[#c89d28] font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isTracking}
                    className="px-8 py-3.5 bg-[#0c121e] hover:bg-[#18243c] text-white text-xs font-bold tracking-[0.18em] uppercase rounded-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 shrink-0 shadow-md"
                  >
                    <Search size={14} className="text-[#f1b821]" />
                    <span>{isTracking ? 'Searching...' : 'Check Status'}</span>
                  </button>
                </form>

                {trackError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 text-red-700 text-sm">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{trackError}</span>
                  </div>
                )}

                {trackedTicket && (
                  <div className="bg-[#faf8f5] border border-[#0c121e]/10 rounded-2xl p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0c121e]/10">
                      <div>
                        <span className="text-[10px] font-mono text-[#0c121e]/50 uppercase">Ticket Reference</span>
                        <h3 className="font-mono text-xl font-bold text-[#0c121e]">{trackedTicket.ticketId}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-[#0c121e]/60 font-medium">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          trackedTicket.status === 'Open'
                            ? 'bg-amber-100 text-amber-800'
                            : trackedTicket.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {trackedTicket.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-[#0c121e]/50 uppercase font-bold block mb-1">Subject</span>
                        <span className="text-[#0c121e] font-semibold">{trackedTicket.subject}</span>
                      </div>
                      <div>
                        <span className="text-[#0c121e]/50 uppercase font-bold block mb-1">Category</span>
                        <span className="text-[#0c121e]">{trackedTicket.category}</span>
                      </div>
                      <div>
                        <span className="text-[#0c121e]/50 uppercase font-bold block mb-1">Priority</span>
                        <span className="text-[#0c121e] font-bold">{trackedTicket.priority}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-[#0c121e]/50 uppercase font-bold block mb-1">Description</span>
                      <p className="text-sm text-[#0c121e]/80 leading-relaxed bg-white p-4 rounded-xl border border-[#0c121e]/08">
                        {trackedTicket.description}
                      </p>
                    </div>

                    {trackedTicket.attachmentUrl && (
                      <div className="pt-2">
                        <a
                          href={trackedTicket.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-xs font-bold text-[#c89d28] hover:underline"
                        >
                          <Paperclip size={13} />
                          <span>View Uploaded Site File / Photo &rarr;</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Studio Contact & Regional Footprint (4 cols) */}
          <div className="lg:col-span-4 order-1 lg:order-2 space-y-8">
            {/* Primary Direct Helpline Card */}
            <div className="bg-[#0c121e] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#f1b821]/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <span className="text-[#f1b821] text-[10px] font-black tracking-[0.25em] uppercase">Direct Studio Line</span>
              <h3 className="font-serif text-2xl font-normal mt-2 mb-4">Talk To An Architect</h3>
              <p className="text-white/70 text-xs leading-relaxed mb-6 font-normal">
                Direct phone consultation with our Senior Architects and Project Leads for ongoing and upcoming residences.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${verifiedPhone.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-3 text-white hover:text-[#f1b821] transition-colors group p-3 bg-white/05 rounded-2xl border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f1b821]/15 border border-[#f1b821]/30 flex items-center justify-center text-[#f1b821] shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-white/50 tracking-wider font-bold block">Main Studio Helpline</span>
                    <span className="text-sm font-bold">{verifiedPhone}</span>
                  </div>
                </a>

                <a
                  href={`tel:${verifiedAltPhone.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-3 text-white hover:text-[#f1b821] transition-colors group p-3 bg-white/05 rounded-2xl border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-white/50 tracking-wider font-bold block">Sales & Project Desk</span>
                    <span className="text-sm font-bold">{verifiedAltPhone}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${verifiedEmail}`}
                  className="flex items-center space-x-3 text-white hover:text-[#f1b821] transition-colors group p-3 bg-white/05 rounded-2xl border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-white/50 tracking-wider font-bold block">Official Inquiries</span>
                    <span className="text-xs font-semibold break-all">{verifiedEmail}</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919631980881?text=Hello%20Galaxy%20Interior%2C%20I%20would%20like%20to%20discuss%20a%20turnkey%20residential%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <MessageSquare size={14} />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center space-x-2 text-[11px] text-white/50">
                <Clock size={13} className="text-[#f1b821]" />
                <span>Mon - Sat: 9:30 AM - 7:30 PM IST</span>
              </div>
            </div>

            {/* Quick Guarantees Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#0c121e]/08 shadow-sm space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#0c121e]">Studio Contract Guarantees</h4>
              <ul className="space-y-3 text-xs text-[#0c121e]/80">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Cost Escalation:</strong> Legally binding Master BOQ signed before civil mobilization.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Resident Site Civil Engineer:</strong> Daily supervision, slump tests &amp; cube testing.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>10-Year Timber Warranty:</strong> 100% Century Club Prime BWP 710 marine ply.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Regional Studio Directory */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-10">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#c89d28] uppercase">Studio Footprint</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0c121e] font-normal mt-2">
            Regional Studios &amp; Experience Centers
          </h2>
          <p className="text-sm text-[#0c121e]/60 mt-2 font-normal">
            Visit our regional architectural studios in Bhagalpur, Ranchi, Patna, and Kolkata to inspect material samples, 3D VR walkthroughs, and wood joinery finishes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REGIONAL_OFFICES.map((office) => (
            <div
              key={office.city}
              className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                office.isHQ
                  ? 'bg-white border-[#c89d28]/40 shadow-[0_4px_25px_rgba(200,157,40,0.08)]'
                  : 'bg-white border-[#0c121e]/08 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#c89d28] uppercase tracking-wider">{office.state}</span>
                  {office.isHQ && (
                    <span className="px-2 py-0.5 bg-[#f1b821]/15 text-[#0c121e] text-[9px] font-bold tracking-wider uppercase rounded">
                      Corporate HQ
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0c121e] mb-1">
                  {office.city}
                </h3>
                <span className="text-xs text-[#0c121e]/60 font-medium block mb-4">
                  {office.type}
                </span>

                <div className="space-y-3 text-xs text-[#0c121e]/80">
                  <div className="flex items-start space-x-2">
                    <MapPin size={14} className="text-[#c89d28] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-[#c89d28] shrink-0" />
                    <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:underline font-semibold">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-[#0c121e]/60">
                    <Clock size={14} className="shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0c121e]/08">
                <a
                  href={`https://wa.me/919631980881?text=Hello%20Galaxy%20Interior%20Team%2C%20I%20would%20like%20to%20visit%20the%20${encodeURIComponent(office.city)}%20studio.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold tracking-wider uppercase text-[#0c121e] hover:text-[#c89d28] flex items-center justify-between group"
                >
                  <span>Schedule Studio Visit</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Site Supervision Hubs Pill Bar */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-[#0c121e]/08 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0c121e]/50 block mb-1">
              Active Project Site Supervision Hubs
            </span>
            <p className="text-xs text-[#0c121e]/70">
              Our mobile civil engineering teams are actively supervising residential builds in:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {SITE_SUPERVISION_HUBS.map((hub) => (
              <span
                key={hub}
                className="px-3 py-1 bg-[#faf8f5] border border-[#0c121e]/10 rounded-full text-xs font-semibold text-[#0c121e]/80"
              >
                {hub}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
