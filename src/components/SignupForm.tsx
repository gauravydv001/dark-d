// SignupForm.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const generateUsername = (email: string) => {
    // Generate a unique username from the email (e.g., "test@example.com" -> "test123")
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
    return username;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Send email verification
      await sendEmailVerification(user);
      alert('A verification email has been sent to your email address. Please verify your email to log in.');

      // Step 3: Generate a unique username
      const username = generateUsername(email);

      // Step 4: Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        username,
        createdAt: new Date(),
        emailVerified: false,
      });

      // Redirect to login page
      router.push('/login');
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-lg shadow-md bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-200">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-200">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;