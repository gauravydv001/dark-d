import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Layout from '@/components/Layout';

// Import the extended Session type from next-auth
import { Session } from 'next-auth';

// Define the UserData interface for Firestore data
interface UserData {
  username: string;
  email: string;
  emailVerified: boolean;
  createdAt: {
    toDate: () => Date;
  };
}

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the current session
        const session = await getSession();
        console.log('Session:', session); // Log session data

        if (!session || !session.user) {
          throw new Error('You must be logged in to view this page.');
        }

        // Fetch user data from Firestore using the session user ID
        const userDoc = await getDoc(doc(db, 'users', session.user.id));
        console.log('User Document:', userDoc); // Log Firestore document

        if (!userDoc.exists()) {
          throw new Error('User not found in the database.');
        }

        // Set user data
        setUser(userDoc.data() as UserData);
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle session expiry
  useEffect(() => {
    const handleSessionExpiry = async () => {
      const session = await getSession();
      if (!session) {
        setError('Your session has expired. Please log in again.');
        router.push('/login');
      }
    };

    // Check session expiry every 5 minutes
    const interval = setInterval(handleSessionExpiry, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          {/* Skeleton Loader */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Profile</h1>
        <div className="mb-8">
          <p className="text-gray-200">Username: {user?.username}</p>
          <p className="text-gray-200">Email: {user?.email}</p>
          <p className="text-gray-200">
            Email Verified: {user?.emailVerified ? 'Yes' : 'No'}
          </p>
          <p className="text-gray-200">
            Account Created: {user?.createdAt?.toDate().toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => router.push('/create-post')}
          className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Create New Post
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  console.log('Server-side Session:', session); // Log session data

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};