// dd/src/pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log('Received signup request with:', { email, password }); // Log request data

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user); // Log created user
      return res.status(200).json({ message: 'Signup successful', user: userCredential.user });
    } catch (error) {
      console.error('Signup error:', error);

      // Handle the error object safely
      if (error instanceof Error) {
        return res.status(400).json({ message: 'Signup failed', error: error.message });
      } else {
        return res.status(400).json({ message: 'Signup failed', error: 'An unknown error occurred' });
      }
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}