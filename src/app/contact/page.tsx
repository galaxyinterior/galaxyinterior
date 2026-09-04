"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Send, ArrowRight, AlertCircle, Ticket, Search, CheckCircle2, Paperclip, X } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { sendNotification } from '@/lib/notifications';

type Tab = 'general' | 'ticket' | 'track';

export default function ContactPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
          setSettings(snap.data());
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);
  
  // -- General Inquiry State --
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '' // Honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -- Ticket Form State --
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: 'General',
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
    if (formData.website !== '') return;

    const lastSubTime = localStorage.getItem('last_inquiry_time');
    if (lastSubTime && Date.now() - parseInt(lastSubTime) < 10 * 60 * 1000) {
      alert('You can only submit one inquiry every 10 minutes to prevent spam.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const { website, ...dataToSubmit } = formData;
      await addDoc(collection(db, 'inquiries'), {
        ...dataToSubmit,
        type: 'contact',
        createdAt: serverTimestamp()
      });
      localStorage.setItem('last_inquiry_time', Date.now().toString());
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmittingTicket(true);
    setTicketSuccess(null);

    try {
      let attachmentUrl = null;
      if (attachment) {
        if (attachment.size > 5 * 1024 * 1024) {
          alert("File size must be under 5MB");
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
      setTicketData({ subject: '', category: 'General', priority: 'Medium', description: '', projectId: '' });
      setAttachment(null);
    } catch (err) {
      console.error(err);
      alert("Failed to submit ticket.");
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
        setTrackError('Ticket not found. Please verify the Ticket ID.');
      } else {
        const ticket = snap.docs[0].data();
        // Phase 39 rule: Verify user authorization for tracking
        if (user && ticket.customerId === user.uid) {
          setTrackedTicket(ticket);
        } else if (!user) {
          setTrackError('Please log in to view ticket details.');
        } else {
          setTrackError('You are not authorized to view this ticket.');
        }
      }
    } catch (err) {
      console.error(err);
      setTrackError('Error retrieving ticket.');
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-navy pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block bg-brand-yellow/10 border border-brand-yellow/20 px-6 py-2 rounded-full mb-6">
            <span className="text-brand-yellow text-xs font-black tracking-[0.3em] uppercase">Support & Contact</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200">help you?</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
            Reach out to our team for general inquiries or manage your ongoing support requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Contact Information */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-8">Contact Info</h2>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/20 mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Primary Phone</p>
                      <a href={`tel:${settings?.phone || '+919631980881'}`} className="text-white text-lg font-bold hover:text-brand-yellow transition-colors">{settings?.phone || '+91 96319 80881'}</a>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Email Address</p>
                      <a href={`mailto:${settings?.email || 'info@galaxyinteriorindia.com'}`} className="text-white text-sm font-medium hover:text-brand-yellow transition-colors break-all">{settings?.email || 'info@galaxyinteriorindia.com'}</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-gray-400 text-xs leading-relaxed">
                  Available Mon-Sat, 9:00 AM - 7:00 PM. <br/>
                  Our team strives to respond to all inquiries within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Forms Section */}
          <div className="lg:col-span-8">
            
            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-white/5 p-2 rounded-2xl border border-white/10 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('general')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all whitespace-nowrap flex justify-center items-center gap-2 ${activeTab === 'general' ? 'bg-brand-yellow text-brand-navy shadow-lg' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              >
                <Mail size={16} /> General Inquiry
              </button>
              <button 
                onClick={() => setActiveTab('ticket')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all whitespace-nowrap flex justify-center items-center gap-2 ${activeTab === 'ticket' ? 'bg-brand-yellow text-brand-navy shadow-lg' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              >
                <Ticket size={16} /> Raise Support Ticket
              </button>
              <button 
                onClick={() => setActiveTab('track')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold tracking-wide transition-all whitespace-nowrap flex justify-center items-center gap-2 ${activeTab === 'track' ? 'bg-brand-yellow text-brand-navy shadow-lg' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              >
                <Search size={16} /> Check Ticket
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden min-h-[500px]">
              
              {/* TAB: GENERAL INQUIRY */}
              {activeTab === 'general' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-brand-navy mb-2">Send a Message</h2>
                  <p className="text-gray-500 mb-8 font-medium">Fill out the form below and we&apos;ll get back to you shortly.</p>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 text-green-600" />
                      <p className="font-bold text-sm">Message sent successfully!</p>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center">
                      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 text-red-600" />
                      <p className="font-bold text-sm">Failed to send message.</p>
                    </div>
                  )}

                  <form onSubmit={handleGeneralSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium placeholder:text-gray-400" />
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium placeholder:text-gray-400" />
                    </div>
                    <div style={{ display: 'none' }} aria-hidden="true"><input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} /></div>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium placeholder:text-gray-400" />
                    <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium placeholder:text-gray-400 resize-none"></textarea>
                    
                    <button type="submit" disabled={isSubmitting} className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-black text-sm tracking-widest uppercase py-4 rounded-xl transition-all shadow-xl disabled:opacity-70 flex justify-center items-center">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB: RAISE TICKET */}
              {activeTab === 'ticket' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-brand-navy mb-2">Raise Support Ticket</h2>
                  <p className="text-gray-500 mb-8 font-medium">Need help with an existing project? Submit a ticket.</p>
                  
                  {!user ? (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
                      <Ticket className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="font-bold text-brand-navy text-lg mb-2">Authentication Required</h3>
                      <p className="text-gray-500 text-sm mb-6">You must be logged in to your customer account to raise and manage support tickets.</p>
                      <Link href="/login" className="bg-brand-yellow text-brand-navy px-8 py-3 rounded-xl font-bold uppercase tracking-wider inline-block">Login Now</Link>
                    </div>
                  ) : ticketSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                      <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 mb-4" />
                      <h3 className="font-bold text-emerald-900 text-xl mb-2">Ticket Submitted!</h3>
                      <p className="text-emerald-700 text-sm mb-6">Your ticket has been created and assigned to our support team.</p>
                      <div className="bg-white px-6 py-4 rounded-xl border border-emerald-100 inline-block mb-6 shadow-sm">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Ticket ID</p>
                        <p className="text-xl font-black text-brand-navy">{ticketSuccess}</p>
                      </div>
                      <br/>
                      <button onClick={() => setTicketSuccess(null)} className="text-emerald-700 font-bold hover:underline">Submit another ticket</button>
                    </div>
                  ) : (
                    <form onSubmit={handleTicketSubmit} className="space-y-5">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Subject</label>
                        <input type="text" required value={ticketData.subject} onChange={e => setTicketData({...ticketData, subject: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Category</label>
                          <select value={ticketData.category} onChange={e => setTicketData({...ticketData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium">
                            <option>General</option>
                            <option>Design Issue</option>
                            <option>Billing</option>
                            <option>Construction</option>
                            <option>Maintenance</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Priority</label>
                          <select value={ticketData.priority} onChange={e => setTicketData({...ticketData, priority: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Urgent</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Project Reference (Optional)</label>
                        <input type="text" placeholder="e.g. Turnkey Villa Project" value={ticketData.projectId} onChange={e => setTicketData({...ticketData, projectId: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Description</label>
                        <textarea required rows={4} value={ticketData.description} onChange={e => setTicketData({...ticketData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-brand-navy px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-medium resize-none"></textarea>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Attachment (Max 5MB)</label>
                        <label className="flex items-center gap-2 cursor-pointer w-full bg-gray-50 border border-dashed border-gray-300 text-brand-navy px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors">
                          <Paperclip size={18} className="text-gray-400" />
                          <span className="text-sm font-medium">{attachment ? attachment.name : 'Upload file (PDF, JPG, PNG)'}</span>
                          {attachment && (
                            <button type="button" onClick={(e) => { e.preventDefault(); setAttachment(null); }} className="ml-auto text-red-500 hover:text-red-700">
                              <X size={16} />
                            </button>
                          )}
                          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => e.target.files && setAttachment(e.target.files[0])} />
                        </label>
                      </div>
                      
                      <button type="submit" disabled={isSubmittingTicket} className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-black text-sm tracking-widest uppercase py-4 rounded-xl transition-all shadow-xl disabled:opacity-70 flex justify-center items-center">
                        {isSubmittingTicket ? 'Submitting...' : 'Submit Ticket'}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB: TRACK TICKET */}
              {activeTab === 'track' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black text-brand-navy mb-2">Check Ticket Status</h2>
                  <p className="text-gray-500 mb-8 font-medium">Enter your Ticket ID to view real-time progress.</p>
                  
                  <form onSubmit={handleTrack} className="flex gap-3 mb-8">
                    <input type="text" required value={trackId} onChange={e => setTrackId(e.target.value)} placeholder="e.g. GXY-2026-123456" className="flex-1 bg-gray-50 border border-gray-200 text-brand-navy px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow font-bold text-lg tracking-wider uppercase placeholder:normal-case placeholder:font-medium placeholder:text-gray-400" />
                    <button type="submit" disabled={isTracking} className="bg-brand-yellow text-brand-navy px-8 rounded-xl font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors disabled:opacity-70">
                      {isTracking ? 'Searching...' : 'Track'}
                    </button>
                  </form>

                  {trackError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center">
                      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <p className="font-bold text-sm">{trackError}</p>
                    </div>
                  )}

                  {trackedTicket && (
                    <div className="border border-gray-200 rounded-2xl overflow-hidden animate-in fade-in">
                      <div className="bg-gray-50 p-6 border-b border-gray-200 flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ticket ID</p>
                          <h3 className="text-xl font-black text-brand-navy">{trackedTicket.ticketId}</h3>
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          trackedTicket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                          trackedTicket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                          'bg-brand-yellow/20 text-brand-navy'
                        }`}>
                          {trackedTicket.status}
                        </div>
                      </div>
                      <div className="p-6 space-y-4 bg-white">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Subject</p>
                          <p className="font-medium text-gray-900">{trackedTicket.subject}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Category</p>
                            <p className="font-medium text-gray-900">{trackedTicket.category}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Priority</p>
                            <p className="font-medium text-gray-900">{trackedTicket.priority}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                          <Link href={`/dashboard/support/${trackedTicket.ticketId}`} className="text-brand-navy font-bold text-sm hover:text-brand-yellow underline">
                            View Full Conversation in Dashboard
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
