// import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, ClipboardList } from "lucide-react"
import styles from "./page.module.scss"

export default function HomePage() {
  return (

    <main className={styles.main}>
        <section className={styles.hero}>
            <h1 className={styles.title}>Welcome to the Admin Portal</h1>
            <p className={styles.subtitle}>
            Manage volunteer services and help those experiencing homelessness and housing insecurity
            </p>
        </section>

        <section className={styles.quickActions}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <Calendar className={styles.cardIcon} />
                    <h3>Schedule Volunteers</h3>
                    <p>Create and manage volunteer shifts for meals, showers, and shelter services</p>
                    <Link href="/schedule/new" className={styles.cardLink}>
                    Schedule Now
                    </Link>
                </div>

                <div className={styles.card}>
                    <Users className={styles.cardIcon} />
                    <h3>Manage Volunteers</h3>
                    <p>Add new volunteers, view profiles, and track volunteer hours</p>
                    <Link href="/volunteers" className={styles.cardLink}>
                    View Volunteers
                    </Link>
                </div>

                <div className={styles.card}>
                    <ClipboardList className={styles.cardIcon} />
                    <h3>Service Reports</h3>
                    <p>Generate reports on services provided and volunteer participation</p>
                    <Link href="/reports" className={styles.cardLink}>
                    View Reports
                    </Link>
                </div>


            </div>
        </section>

        <section className={styles.stats}>
            <h2 className={styles.sectionTitle}>Service Impact</h2>
            <div className={styles.statCards}>
            <div className={styles.statCard}>
                <h3>1,240</h3>
                <p>Meals Served This Month</p>
            </div>
            <div className={styles.statCard}>
                <h3>85</h3>
                <p>Active Volunteers</p>
            </div>
            <div className={styles.statCard}>
                <h3>450</h3>
                <p>Shelter Beds Provided</p>
            </div>
            <div className={styles.statCard}>
                <h3>320</h3>
                <p>Shower Services</p>
            </div>
            </div>
        </section>
    </main>
  );
}
