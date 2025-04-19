import { supabase } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('Client').select('*');
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { name, pronunciation, age_group, sex, ethnicity, language, notes } = req.body;

    // Generate ID and date
    const id = uuidv4();
    const date_added = new Date().toISOString();

    const { data, error } = await supabase.from('Client').insert([
      { id, date_added, name, pronunciation, age_group, sex, ethnicity, language, notes },
    ]);
    if (error) return res.status(500).json({ error });
    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
