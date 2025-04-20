import styles from './addClient.module.scss';

interface Props {
  children: React.ReactNode;
  SearchBar: React.ReactNode;
}

export default function AddUsersLayout({ children, SearchBar }: Props) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Add Client</h1>

      <div className={styles.searchBarBubble}>
        {SearchBar}
      </div>

      <div className={styles.gridWrapper}>
        {children}
      </div>
    </main>
  );
}
