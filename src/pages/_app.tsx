// dd/src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import Layout from '@/components/Layout'; // Import your Layout component
import '@/styles/globals.css'; // Import global styles (if you have any)

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // Wrap your app with SessionProvider and pass the session
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}