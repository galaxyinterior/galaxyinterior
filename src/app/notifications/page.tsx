"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, where, limit } from 'firebase/firestore';
import { Bell, CheckCircle2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Admins see all notifications targeted at admin or broadcast
    // For simplicity, let's just fetch all notifications for now
    const q = query(
      collection(db, 'notifications'), 
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-navy"></div></div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy flex items-center gap-2">
          <Bell className="text-brand-yellow" />
          System Notifications
        </h1>
        <p className="text-gray-500 mt-1">View alerts and user updates.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No notifications found.</div>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className={`p-6 flex items-start gap-4 transition-colors ${notif.read ? 'bg-white opacity-60' : 'bg-blue-50/30'}`}>
              <div className="flex-1">
                <h3 className="font-bold text-brand-navy">{notif.title}</h3>
                <p className="text-gray-600 mt-1">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {notif.createdAt?.toDate ? formatDistanceToNow(notif.createdAt.toDate(), { addSuffix: true }) : 'Just now'}
                </p>
              </div>
              {!notif.read && (
                <button 
                  onClick={() => markAsRead(notif.id)}
                  className="text-brand-yellow hover:text-brand-navy transition-colors"
                  title="Mark as read"
                >
                  <CheckCircle2 size={20} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
