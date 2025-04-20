import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

import styles from './layout.module.scss'
import GeminiBox from '@/app/(components)/gemini-box/gemini-box';

import { motion, AnimatePresence } from 'framer-motion';



const Dashboardlayout = async({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient(); // already scoped to the current request

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
console.log("HI");
  if (userError || !user) {
    return redirect('/login');
  }

  const {
    data: roleData,
    error: roleError,
  } = await supabase
    .from('Roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();
  console.log(roleData);
  console.log("HELLO");
  if (roleError || roleData?.role !== 'admin') {
    return redirect('/unauthorized');
  }
  return (
    <main className={styles.page}>
      <h1>Dashboard</h1>

      <div className={styles.spotlight}>
        <h2>Spotlight</h2>
        <div className={styles.spotlightElements}>
          <div className={styles.spotlightElement}>
            <GeminiBox />
          </div>
          <div className={styles.spotlightElement}>
            <h3>Demographic Data</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore porro sint iure
              accusamus numquam maiores...
            </p>
          </div>
        </div>
      </div>

      {/* Let page.tsx handle tabs and content now */}
      <div className={styles.services}>
        <h2>Services</h2>
        <div className={styles.tabs}>
        {children}
        </div>
      </div>
    </main>
  );
}

export default Dashboardlayout;