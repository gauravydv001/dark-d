import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials!.email,
            credentials!.password
          );
          return { id: userCredential.user.uid, email: userCredential.user.email };
        } catch (error) {
          console.error('Firebase sign-in error:', error);
          return null;
        }
      },
    },
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('Session created:', session);
      if (token.sub) {
        session.user.id = token.sub; // Add user ID to the session
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log('JWT created:', token);
      if (user) {
        token.sub = user.id; // Add user ID to the JWT token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});