'use client';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
}

export default function SearchBar({ value, onChange, onEnter }: SearchBarProps) {
  return (
    <div className={styles.card}>
      <input
        type="text"
        placeholder="Search clients..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onEnter) {
            onEnter(value);
            console.log("Enter");
          }
        }}
        className={styles.input}
      />
    </div>
  );
}
