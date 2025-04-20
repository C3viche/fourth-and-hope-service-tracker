'use client';
import styles from './page.module.scss';
import { useState } from 'react';
import { IoTrashBinOutline } from "react-icons/io5";

import IconIonTrashBinOutline from 'react';
type LogEntry = {
  id: number;
  name: string;
  comments: string;
  date: string;
};

type LogTableProps = {
  title: string;
  users: string[];
};

export default function LogTable({ title, users }: LogTableProps) {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        id: Date.now(),
        name: users[0],
        comments: '',
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  const updateEntry = (id: number, field: keyof LogEntry, value: string) => {
    setEntries(entries.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };
  const deleteLog = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div className={styles.logTable}>
      <h2>{title}</h2>
      <div className={styles.table}>
        <div className={styles.header}>
          <span>Name</span>
          <span>Comments</span>
          <span>Date</span>
          <span></span>
        </div>
        {entries.map(entry => (
          <div className={styles.row} key={entry.id}>
            <select
              value={entry.name}
              onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
            >
              {users.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            <input
              value={entry.comments}
              onChange={(e) => updateEntry(entry.id, 'comments', e.target.value)}
            />
            <span>{entry.date}</span>
            <button onClick={() => deleteEntry(entry.id)}><IoTrashBinOutline />
            </button>
          </div>
        ))}
        <button className={styles.addEntryBtn} onClick={handleAddEntry}>
          + Add Row
        </button>
      </div>
    </div>
  );
}
