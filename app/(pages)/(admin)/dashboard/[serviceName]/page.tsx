'use client';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const tabs = ['food', 'shelter', 'hygiene'];

export default function ServicePage() {
  const { serviceName } = useParams();  // This extracts the dynamic part of the URL
  const pathname = usePathname(); // This gives you the current path

  return (
    <section className={styles.section}>
        <div className={styles.tabs}>
            {tabs.map(tab => (
                <Link key={tab} href={`/dashboard/${tab}`}>
                    <button className={`${styles.tab} ${pathname.includes(tab) ? styles.active : ''}`}>{tab}</button>
                </Link>
            ))}
        </div>
        <div className={styles.content}>
            <h3>Content for {serviceName} tab</h3>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cumque recusandae voluptatem sequi accusantium nostrum adipisci, sit libero commodi incidunt fuga consectetur, enim asperiores totam nobis odio. Ea, voluptas labore.
            </div>
        </div>

    </section>
  );
}