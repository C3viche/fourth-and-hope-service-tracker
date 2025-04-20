'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.scss';
import LoginCard from '@/app/(components)/LoginCard/LoginCard';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Optional: redirect to home if already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/');
      }
    };
    checkSession();
  }, [router, supabase.auth]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className={styles.page}>
      <h1>Sign in</h1>
      <LoginCard handleLogin={handleLogin} />
    </div>
  );
}