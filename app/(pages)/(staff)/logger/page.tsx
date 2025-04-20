'use client';
import LogTable from './LogTable';
import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import { Client } from '@/lib/supabase';

export default function LogsContainer() {
  const [logs, setLogs] = useState([{ id: "", title: 'Daily Shower Log' }]);
  const [nextId, setNextId] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/client');
        const data = await res.json();
        const names = data.map((client: Client) => `${client.name}`);
        setUsers(names);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };

    fetchClients();
  }, []);

  const addNewLog = () => {
    const title = prompt('Enter a title for the new log') || `New Log ${nextId}`;
    setLogs([...logs, { id: nextId, title }]);
    setNextId(nextId + 1);
  };

  const deleteLog = async (id: string) => {
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
