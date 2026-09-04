"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  LifeBuoy, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { NotificationBell } from '@/components/dashboard/NotificationBell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, profile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Quotes & Estimates', href: '/dashboard/quotes', icon: FileText },
    { name: 'Support Tickets', href: '/dashboard/support', icon: LifeBuoy },
    { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const NavLinks = () => (
    <>
      <div className="space-y-2 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-brand-yellow text-brand-navy font-bold shadow-md shadow-brand-yellow/20' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy font-medium'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-brand-navy' : 'text-gray-400'} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="pt-8 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 mb-4">
          <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center text-brand-yellow font-bold shrink-0 overflow-hidden">
            {profile?.profilePhoto ? (
              <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              profile?.name?.charAt(0) || 'U'
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-gray-900 truncate">{profile?.name || 'Customer'}</p>
            <p className="text-xs text-gray-500 truncate">{profile?.email || 'Loading...'}</p>
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
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-[100px] z-30">
        <span className="font-bold text-brand-navy">Dashboard Menu</span>
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
            className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col pt-[120px] overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <span className="font-black text-brand-navy tracking-widest uppercase">My Dashboard</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <NavLinks />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 p-6 flex-col min-h-[calc(100vh-100px)] sticky top-[100px]">
        <NavLinks />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto min-w-0">
        {children}
      </main>
    </div>
  );
}
