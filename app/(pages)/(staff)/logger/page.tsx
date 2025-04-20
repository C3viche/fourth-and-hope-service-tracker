'use client';
import LogTable from './LogTable';
import styles from './page.module.scss';
import { useState } from 'react';

export default function LogsContainer() {
  const [logs, setLogs] = useState([{ id: 1, title: 'Daily Shower Log' }]);
  const [nextId, setNextId] = useState(2);

  const users = ['Alice Smith', 'Bob Jones', 'Charlie Rose'];

  const addNewLog = () => {
    const title = prompt('Enter a title for the new log') || `New Log ${nextId}`;
    setLogs([...logs, { id: nextId, title }]);
    setNextId(nextId + 1);
  };

  const deleteLog = (id: number) => {
    setLogs(logs.filter(entry => entry.id !== id));
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Add Client</h1>

    <div className={styles.logsContainer}>
      {logs.map(log => (
        <LogTable key={log.id} id={log.id} title={log.title} users={users} deleteLog={deleteLog} />
      ))}
      <button onClick={addNewLog} className={styles.addLogBtn}>
        + Add New Log
      </button>
    </div>
    </main>
  );
}
