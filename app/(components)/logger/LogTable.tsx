import styles from './showerLog.module.scss';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function LogTable({ data, onDelete, onUpdate }: any) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Comment</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry: any, i: number) => (
          <tr key={i}>
            <td>{entry.name}</td>
            <td>{entry.comment}</td>
            <td>{entry.date}</td>
            <td>
              <FaEdit className={styles.icon} onClick={() => { /* update logic */ }} />
              <FaTrash className={styles.icon} onClick={() => onDelete(i)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
