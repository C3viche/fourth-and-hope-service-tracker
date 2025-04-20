"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";

type LogEntry = {
  id: number;
  name: string;
  comments: string;
  date: string;
};

type LogTableProps = {
  id: number;
  title: string;
  users: string[];
  deleteLog: (id: number) => void;
};

export default function LogTable({
  id,
  title,
  users,
  deleteLog,
}: LogTableProps) {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  const handleAddEntry = () => {
    setEntries([
      ...entries,
      {
        id: Date.now(),
        name: users[0],
        comments: "",
        date: new Date().toLocaleDateString(),
      },
    ]);
  };

  const updateEntry = (id: number, field: keyof LogEntry, value: string) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className={styles.logTable}>
      <div className={styles.logHeader}>
        <h2>{title}</h2>
        <button onClick={() => deleteLog(id)}>
          <IoTrashBinOutline size={40} />
        </button>
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <span>Name</span>
          <span>Comments</span>
          <span>Date</span>
          <span></span>
        </div>
        {entries.map((entry) => (
          <div className={styles.row} key={entry.id}>
            <select
              value={entry.name}
              onChange={(e) => updateEntry(entry.id, "name", e.target.value)}
            >
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <input
              value={entry.comments}
              onChange={(e) =>
                updateEntry(entry.id, "comments", e.target.value)
              }
            />
            <span>{entry.date}</span>
            <div className={styles.actions}>
              <button
                className={styles.saveBtn}
                onClick={() => console.log("Saved entry", entry)}
              >
                Save
              </button>
              <button onClick={() => deleteEntry(entry.id)}>
                <IoTrashBinOutline />
              </button>
            </div>
          </div>
        ))}
        <button className={styles.addEntryBtn} onClick={handleAddEntry}>
          + Add Row
        </button>
      </div>
    </div>
  );
}
