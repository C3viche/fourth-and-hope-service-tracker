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
    console.log("CLICKED DELETE");
    setLogs(logs.filter(entry => entry.id !== id));
    try {
      const res = await fetch('/api/service-log', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
  
      if (!res.ok) {
        console.error('Failed to delete log');
        return;
      }
  
      
    } catch (err) {
      console.error('Error deleting log:', err);
    }
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
