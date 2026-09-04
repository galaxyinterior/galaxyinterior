import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface NotificationParams {
  userId: string; // 'ADMIN' or actual customer uid
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'ticket' | 'project';
  link?: string;
}

export const sendNotification = async (params: NotificationParams) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      ...params,
      type: params.type || 'info',
      read: false,
      createdAt: serverTimestamp()
    });
  } catch (err) {
    console.error("Failed to send notification", err);
  }
};
