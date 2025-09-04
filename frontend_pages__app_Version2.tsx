import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);
      setLoading(false);
    });

    return () => {
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <Component {...pageProps} user={user} />
      )}
    </div>
  );
}