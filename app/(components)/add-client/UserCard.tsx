'use client';
import styles from './addClient.module.scss';
import { useState } from 'react';
import AddUserModal from './AddClientPopUp';
import Image from 'next/image';
import default_profile from "../../../public/default_profile.png";

export type User = {
  id: number;
  name: string;
  pronunciation: string;
  age_group: string;
  sex: string;
  ethnicity: string;
  language: string;
  stay_type: string;
  notes: string;
  date_added: Date;
};

type UserCardProps = {
  user?: User;
  isAddButton?: boolean;
};

export default function UserCard({ user, isAddButton }: UserCardProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSave = (updatedUser: User) => {
    console.log("Saved:", updatedUser);
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("Deleted:", user?.name);
    setOpen(false);
  };

  return (
    <>
      <div className={styles.card} onClick={() => setOpen(true)}>
        {isAddButton ? (
          <span className={styles.plus}>+</span>
        ) : (
          <>
            <Image src={default_profile} alt="profile" width={50} height={50} style={{marginBottom: "0.5rem"}}/>
            <p className={styles.name}>{user?.name}</p>
          </>
        )}
      </div>
      {open && (
        <AddUserModal
          onClose={handleClose}
          onSave={handleSave}
          onDelete={!isAddButton ? handleDelete : undefined}
          userData={isAddButton ? undefined : user}
        />
      )}
    </>
  );
}
