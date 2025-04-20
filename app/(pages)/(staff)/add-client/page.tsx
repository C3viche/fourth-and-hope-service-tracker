'use client';

import AddUsersLayout from '../../../(components)/add-client/AddUsersLayout';
import UserCard from '../../../(components)/add-client/UserCard';
import SearchBar from '../../../(components)/add-client/SearchBar';
import LoadingCard from '../../../(components)/add-client/LoadingCard';
import { Client } from '@/lib/supabase';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';


export default function AddUsersPage() {

  const [users, setUsers] = useState<Client[]>([]); // of type Client
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchClients = async (query?: string) => {
    try {
      const url = query
        ? `/api/client?q=${encodeURIComponent(query)}`
        : `/api/client`;


      console.log("Requesting:", url); 

      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
      console.log("FETCHED! ", data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchClients();
  }, []);


  const handleSearchEnter = (value: string) => {
    console.log('Enter pressed with search query:', value);
    setLoading(true); // show loading animation again
    fetchClients(value);
    // You can also trigger a filtered fetch here if needed
  };

  return (
    <AddUsersLayout 
    SearchBar={<SearchBar
      value={searchQuery}
      onChange={setSearchQuery}
      onEnter={handleSearchEnter} // ✅ Now it works
    />}
  >
    <UserCard isAddButton onUpdated={fetchClients} />

    {loading ? (
      // Show 6 animated placeholders in grid
      [...Array(6)].map((_, i) => (
        <motion.div
          key={`placeholder-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <LoadingCard />
        </motion.div>
      ))
    ) : (
      users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.07 }}
        >
          <UserCard user={user} onUpdated={fetchClients} />
        </motion.div>
      ))
    )}
  </AddUsersLayout>

  );
}

