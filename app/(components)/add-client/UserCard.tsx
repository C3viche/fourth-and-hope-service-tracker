'use client'
import styles from './addClient.module.scss';
import { useState } from 'react';
import AddUserModal from './AddClientPopUp';

type UserCardProps = {
  name?: string;
  isAddButton?: boolean;
};

export default function UserCard({ name = "First Name Last Name", isAddButton }: UserCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.card} onClick={() => setOpen(true)}>
        <div className={styles.avatar}>
          {isAddButton ? <span className={styles.plus}>+</span> : null}
        </div>
        {!isAddButton && <p className={styles.name}>{name}</p>}
      </div>
      {open && isAddButton && <AddUserModal onClose={() => setOpen(false)} />}
    </>
  );
}
