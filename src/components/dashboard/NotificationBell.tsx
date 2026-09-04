"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, limit } from 'firebase/firestore';
import { Bell, Check, Info, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const notifs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as any));
        setNotifications(notifs);
        setUnreadCount(notifs.filter((n: any) => !n.read).length);
      },
      (error) => {
        console.error("Error fetching notifications:", error);
        // Fallback to empty notifications on permission-denied or other errors
        setNotifications([]);
        setUnreadCount(0);
      }
    );

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.read);
    for (const notif of unread) {
      markAsRead(notif.id);
    }
    setIsOpen(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info size={18} className="text-blue-500" />;
      case 'success': return <CheckCircle2 size={18} className="text-green-500" />;
      case 'warning': return <AlertCircle size={18} className="text-orange-500" />;
      case 'ticket': return <FileText size={18} className="text-brand-yellow" />;
      case 'project': return <FileText size={18} className="text-purple-500" />;
      default: return <Bell size={18} className="text-brand-navy" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-black text-brand-navy">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-bold text-brand-navy hover:text-brand-yellow transition-colors flex items-center"
              >
                <Check size={14} className="mr-1" /> Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell size={32} className="mx-auto mb-3 text-gray-300" />
                <p className="font-medium text-sm">You have no notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 hover:bg-gray-50 transition-colors flex gap-4 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                    onClick={() => {
                      if (!notif.read) markAsRead(notif.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="mt-1 shrink-0 bg-white p-2 rounded-full shadow-sm">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      {notif.link ? (
                        <Link href={notif.link} className="block">
                          <p className={`text-sm ${!notif.read ? 'font-bold text-brand-navy' : 'font-medium text-gray-700'}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notif.message}</p>
                        </Link>
                      ) : (
                        <div>
                          <p className={`text-sm ${!notif.read ? 'font-bold text-brand-navy' : 'font-medium text-gray-700'}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notif.message}</p>
                        </div>
                      )}
                      <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                        {notif.createdAt ? new Date(notif.createdAt.toMillis()).toLocaleString() : 'Just now'}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-brand-yellow shrink-0 mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
