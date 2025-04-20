'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './addClient.module.scss';
import { User } from './UserCard';
import Image from 'next/image';
import default_profile from "../../../public/default_profile.png";

type AddUserModalProps = {
  onClose: () => void;
  onSave: (user: User) => void;
  onDelete?: () => void;
  userData?: User;
};

export default function AddUserModal({ onClose, onSave, onDelete, userData }: AddUserModalProps) {
  const [formData, setFormData] = useState<User>(
    userData || {
      id: Date.now(),
      name: "",
      pronunciation: "",
      age_group: "",
      sex: "",
      ethnicity: "",
      language: "",
      stay_type: "",
      notes: "",
      date_added: new Date(),
    }
  );

  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);


  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // match fade-out duration
  };


  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (field: keyof User, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className={`${styles.modalOverlay} ${isVisible ? styles.fadeIn : styles.fadeOut}`}>
      <div className={styles.modal}>
      <Image src={default_profile} alt="profile" width={50} height={50} style={{marginBottom: "0.5rem"}}/>
      <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Pronunciation</label>
              <input
                placeholder="Pronunciation"
                value={formData.pronunciation}
                onChange={(e) => handleChange("pronunciation", e.target.value)}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Age Group</label>
              <input
                placeholder="Age Group"
                value={formData.age_group}
                onChange={(e) => handleChange("age_group", e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Sex</label>
              <input
                placeholder="Sex"
                value={formData.sex}
                onChange={(e) => handleChange("sex", e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Ethnicity</label>
            <input
              placeholder="Ethnicity"
              value={formData.ethnicity}
              onChange={(e) => handleChange("ethnicity", e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Language</label>
            <input
              placeholder="Language"
              value={formData.language}
              onChange={(e) => handleChange("language", e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Stay Type</label>
            <select
              value={formData.stay_type}
              onChange={(e) => handleChange("stay_type", e.target.value)}
            >
              <option value="">Select</option>
              <option value="regular">Regular</option>
              <option value="overnight">Overnight</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Notes</label>
            <textarea
              rows={3}
              placeholder="Enter notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>
        </form>
        <div className={styles.modalButtons}>
          <button onClick={handleClose} className={styles.closeButton}>Cancel</button>
          {onDelete && <button onClick={handleClose} className={styles.closeButton}>Delete</button>}
          <button onClick={() => onSave(formData)} className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
}
