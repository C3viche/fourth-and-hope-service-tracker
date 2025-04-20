import styles from './addClient.module.scss';

export default function AddUserModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalAvatar}></div>
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>First Name</label>
              <input placeholder="First Name" />
            </div>
            <div className={styles.inputGroup}>
              <label>Last Name</label>
              <input placeholder="Last Name" />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Gender</label>
            <input placeholder="Gender" />
          </div>
          <div className={styles.inputGroup}>
            <label>Stay Type</label>
            <select>
              <option value="">Select</option>
              <option value="short">Short Term</option>
              <option value="long">Long Term</option>
            </select>
          </div>
        </form>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </div>
  );
}
