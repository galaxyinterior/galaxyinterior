"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
  Tag,
  LifeBuoy,
  IndianRupee,
  Tags,
  Layers,
  Box,
  ShieldCheck
} from 'lucide-react';
import { NotificationBell } from './NotificationBell';

export function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide sidebar entirely on login page or if not logged in
  if (pathname === '/login' || !user) {
    return <main className="min-h-screen bg-gray-50">{children}</main>;
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Customers', icon: Users, path: '/customers' },
    { name: 'Projects', icon: FolderKanban, path: '/projects' },
    { name: 'Quotations', icon: FileText, path: '/quotes' },
    { name: 'Tickets', icon: LifeBuoy, path: '/tickets' },
    { 
      name: 'Pricing Config', 
      icon: IndianRupee,
      isSubmenu: true,
      items: [
        { name: 'Categories', icon: Tags, path: '/pricing/categories' },
        { name: 'Items (Add-ons)', icon: Box, path: '/pricing/items' },
        { name: 'Base Packages', icon: Layers, path: '/pricing/packages' },
      ]
    },
    { 
      name: 'Content', 
      icon: ImageIcon,
      isSubmenu: true,
      items: [
        { name: 'Hero Slides', icon: ImageIcon, path: '/content/hero' },
        { name: 'Gallery', icon: ImageIcon, path: '/content/gallery' },
        { name: 'Services', icon: Tags, path: '/content/services' },
        { name: 'Testimonials', icon: Users, path: '/content/testimonials' },
        { name: 'Turnkey Page', icon: FileText, path: '/content/turnkey' },
        { name: 'Supervision Page', icon: FileText, path: '/content/supervision' },
      ]
    },
    { name: 'Audit Logs', icon: ShieldCheck, path: '/audit-logs' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const NavLinks = () => (
    <>
      <div className="space-y-2 flex-grow">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.isSubmenu ? (
              <div className="mb-4">
                <div className="flex items-center gap-3 px-4 py-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
                  <item.icon size={16} />
                  {item.name}
                </div>
                <div className="space-y-1 bg-gray-50/80 rounded-2xl p-2 border border-gray-100 shadow-inner ml-2">
                  {item.items?.map((sub) => {
                    const isActive = pathname === sub.path;
                    return (
                      <Link
                        key={sub.name}
                        href={sub.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                          isActive 
                            ? 'bg-white text-brand-navy shadow-sm border border-gray-200/60 font-bold' 
                            : 'text-gray-500 hover:bg-white hover:text-brand-navy'
                        }`}
                      >
                        <sub.icon size={18} className={isActive ? 'text-brand-yellow' : 'text-gray-400'} />
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Link
                href={item.path || '#'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.path 
                    ? 'bg-brand-navy text-white font-bold shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-brand-navy font-medium'
                }`}
              >
                <item.icon size={20} className={pathname === item.path ? 'text-brand-yellow' : 'text-gray-400'} />
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 mb-4">
          <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center text-brand-yellow font-bold shrink-0">
            A
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-gray-900 truncate">Administrator</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <div className="shrink-0">
            <NotificationBell />
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-bold"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
        <span className="font-black text-brand-navy tracking-widest uppercase">Galaxy Admin</span>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 p-2 bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-all duration-300" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col overflow-y-auto animate-in slide-in-from-left duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between font-black text-brand-navy tracking-widest uppercase mb-8 pb-4 border-b border-gray-100">
              Galaxy Admin
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <NavLinks />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 p-6 flex-col min-h-screen sticky top-0">
        <div className="font-black text-2xl text-brand-navy tracking-widest uppercase mb-8 pb-6 border-b border-gray-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-yellow rounded-lg"></div>
          ADMIN
        </div>
        <NavLinks />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0">
        {children}
      </main>
    </div>
  );
}
