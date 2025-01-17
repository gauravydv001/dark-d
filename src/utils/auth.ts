// dd/src/utils/auth.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

const usersCollectionRef = collection(db, 'users');

export const createUser = async (userData: any) => {
  await addDoc(usersCollectionRef, userData);
};

export const fetchUser = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error('User not found');
  }
};