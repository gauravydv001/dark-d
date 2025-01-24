// LoginForm.tsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '@/lib/firebase'; // Import db
import { useRouter } from 'next/router';
import { getDoc, setDoc, doc } from 'firebase/firestore'; // Add these imports
import { generateUsername } from '@/lib/helpers';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        alert('Please verify your email before logging in.');
        await auth.signOut();
        return;
      }
  
      router.push('/profile');
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found. Please sign up.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
      }
      setError(errorMessage);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore if it's a new user
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const username = generateUsername(user.email || 'user');
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          username,
          createdAt: new Date(),
          emailVerified: true,
        });
      }

      router.push('/'); // Redirect to home page after login
    } catch (error: any) {
      console.error('Google login error:', error);
      setError(error.message || 'Google login failed. Please try again.');
    }
  };

  return (
    <div className="p-8 rounded-lg shadow-md bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign In</h2>
      <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
        <div>
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
        <div>
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
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-gray-300">Or</span>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="w-full px-4 py-2 mt-4 text-white bg-red-600 rounded hover:bg-red-700"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginForm;