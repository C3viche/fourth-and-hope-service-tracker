import styles from "./page.module.scss";

export default function HomePage() {
  
    return (

    <main className={styles.main}>
        <section className={styles.hero}>
            <h1 className={styles.title}>Welcome to the Admin Portal</h1>
            <p className={styles.subtitle}>
            Manage volunteer services and help those experiencing housing insecurity
            </p>
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
