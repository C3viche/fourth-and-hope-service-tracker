'use client';

import AddUsersLayout from '../../../(components)/add-client/AddUsersLayout';
import UserCard from '../../../(components)/add-client/UserCard';
import { Client } from '@/lib/supabase';

import { useEffect, useState } from 'react';


export default function AddUsersPage() {

  const [users, setUsers] = useState<Client[]>([]); // of type Client
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/client');
        const data = await res.json();
        setUsers(data);
        console.log("FETCHED! ", data);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <AddUsersLayout>
      <UserCard isAddButton />
      {loading ? (
        <p>Loading clients...</p>
      ) : (
        users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))
      )}
    </AddUsersLayout>
  );
}

