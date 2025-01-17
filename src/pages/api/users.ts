// dd/src/pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import type { User } from '@/types/User';

const usersCollection = collection(db, 'users');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const userDoc = await getDoc(doc(usersCollection, session.user.id));

    if (!userDoc.exists()) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user: User = userDoc.data() as User;
    user.id = userDoc.id;

    return res.status(200).json(user);
  }

  if (req.method === 'PUT') {
    const data = req.body;

    const userDocRef = doc(usersCollection, session.user.id);
    await updateDoc(userDocRef, data);

    return res.status(200).json({ message: 'User updated successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}