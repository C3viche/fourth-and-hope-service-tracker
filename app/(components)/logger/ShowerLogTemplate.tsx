'use client';
import styles from './showerLog.module.scss';
import LogTable from './LogTable';
import { useState } from 'react';
import AddLogModal from './AddLogModal';

export default function ShowerLogTemplate() {
  const [showModal, setShowModal] = useState(false);
  const [logs, setLogs] = useState([
    { name: 'Lili Daniels', comment: 'Used shower', date: new Date().toLocaleDateString() },
  ]);

  const handleAdd = (newEntry: any) => {
    setLogs(prev => [...prev, { ...newEntry, date: new Date().toLocaleDateString() }]);
    setShowModal(false);
  };

  const handleDelete = (index: number) => {
    setLogs(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = (index: number, updated: any) => {
    setLogs(prev => prev.map((item, i) => (i === index ? { ...item, ...updated } : item)));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Daily Shower Log</h2>
      <div className={styles.actions}>
        <button onClick={() => setShowModal(true)} className={styles.addBtn}>+ Add To Log</button>
        <input className={styles.search} placeholder="Search" />
      </div>
      <div className={styles.tableBox}>
        <p className={styles.usage}>Usage</p>
        <hr className={styles.divider} />
        <LogTable data={logs} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
      {showModal && <AddLogModal onClose={() => setShowModal(false)} onSave={handleAdd} />}
    </div>
  );
}
