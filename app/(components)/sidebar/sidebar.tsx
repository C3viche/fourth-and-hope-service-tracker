'use client'
// app/components/layout/Sidebar.tsx
import styles from './sidebar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import default_profile from "../../../public/default_profile.png";
//import { supabase } from '@/lib/supabase';
// import { useRouter } from 'next/router';


export default function Sidebar() {

// const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push('/auth/login');
//   };
  const pathname = usePathname();

  const services = ["food", "shelter", "hygiene"];
  const navLinks = [

    { name: 'Dashboard', href: `/dashboard/` },
    { name: 'Log', href: '/logger' },
    { name: 'Users', href: '/add-client' },
  ];

  return (
    <nav className={styles.background}>
      <div className={styles.sidebar}>
        <div className={styles.topSection}>
            <Image src={default_profile} alt="profile" width={100} height={100} />
            <div className={styles.name}>First Last</div>
            <div className={styles.role}>Admin</div>

            <ul className={styles.navList}>
            {navLinks.map((link) => (
                <li key={link.href} className={pathname === link.href ? styles.navItem : styles.navItemActive}>
                    <Link href={link.href}>{link.name}</Link>
                </li>
            ))}
            </ul>
        </div>

        <div className={styles.logout} 
        //onClick={handleLogout}
        >Log Out</div>
      </div>
    </nav>
  );
}
