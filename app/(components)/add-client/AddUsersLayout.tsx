import styles from './addClient.module.scss';

export default function AddUsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Add Client</h1>
      <div className={styles.gridWrapper}>
        {children}
      </div>
    </main>
  );
}
