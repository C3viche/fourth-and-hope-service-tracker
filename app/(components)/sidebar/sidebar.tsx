// app/components/layout/Sidebar.tsx
"use client";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'; // App Router
import default_profile from "../../../public/default_profile.png";
import { createClient } from '@/utils/supabase/client';

interface SidebarProps {
  isAdmin?: boolean;
  fullName?: string;
  avatarUrl?: string;
}

export default function Sidebar({
  isAdmin,
  fullName,
  avatarUrl,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const services = ["food", "shelter", "hygiene"];

  // Define navLinks, only include Dashboard if user is admin
  const navLinks: { name: string; href: string }[] = [
    isAdmin && { name: "Dashboard", href: `/dashboard/${services[0]}` },
    { name: "Log", href: "/logger" },
    { name: "Add Clients", href: "/add-client" },
  ].filter((link): link is { name: string; href: string } => link !== false); // Type guard to filter out false

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  }
  return (
    <nav className={styles.background}>
      <div className={styles.sidebar}>
        <div className={styles.topSection}>
          <Image
            src={avatarUrl || default_profile} // fallback to a default image if avatarUrl is unavailable
            alt="profile"
            width={100}
            height={100}
          />
          <div className={styles.name}>{fullName}</div>
          <div className={styles.role}>{isAdmin ? "Admin" : "Staff"}</div>

          <ul className={styles.navList}>
            {navLinks.map((link: { name: string; href: string }) => (
              <li
                key={link.href}
                className={
                  pathname === link.href ? styles.navItem : styles.navItemActive
                }
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.logout} onClick={handleLogout}>Log Out</div>
      </div>

      {/* <div
        className={styles.logout}
        //onClick={handleLogout}
      >
        Log Out
      </div> */}
    </nav>
  );
}
