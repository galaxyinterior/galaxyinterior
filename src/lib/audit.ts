import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AuditLogParams {
  adminId: string;
  adminName: string;
  action: string;
  resourceId: string;
  oldValue?: any;
  newValue?: any;
}

export const createAuditLog = async (params: AuditLogParams) => {
  try {
    await addDoc(collection(db, 'auditLogs'), {
      ...params,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Failed to write audit log", err);
  }
};
