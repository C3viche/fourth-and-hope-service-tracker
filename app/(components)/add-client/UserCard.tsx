'use client';
import styles from './addClient.module.scss';
import { useState } from 'react';
import AddUserModal from './AddClientPopUp';
import Image from 'next/image';
import default_profile from "../../../public/default_profile.png";

export type User = {
  id: string;
  name: string;
  pronunciation: string;
  age_group: string;
  sex: string;
  ethnicity: string;
  language: string;
  stay_type: string;
  notes: string;
  date_added: Date | string;
};

type UserCardProps = {
  user?: User;
  isAddButton?: boolean;
  onUpdated?: () => void; // <-- Add this
};

export default function UserCard({ user, isAddButton, onUpdated }: UserCardProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSave = async (updatedUser: User) => {
    const isNewClient = isAddButton; // if we are adding, means it's a new client
    console.log(updatedUser.id)
    try {
      const res = await fetch('/api/client', {
        method: isNewClient ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error('Failed to save user:', data);
      } else {
        console.log(isNewClient ? "Created new client!" : "Updated client!", data);
      }
    } catch (err) {
      console.error("Error saving user:", err);
    } finally {
      onUpdated?.(); // refresh
      setOpen(false);
    }
  };
  

  const handleDelete = async () => {
  try {
    const res = await fetch('/api/client', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user?.id }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Failed to delete user:', data);
    } else {
      console.log("Deleted!", data);
    }
  } catch (err) {
    console.error("Error deleting user:", err);
  } finally {
    onUpdated?.();
    setOpen(false);
  }
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
