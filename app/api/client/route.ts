import { supabase } from '@/lib/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('Client').select('*');
    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { full_name, age_group, gender, ethnicity, language, pronunciation } = req.body;
    const { data, error } = await supabase.from('Client').insert([
      { full_name, age_group, gender, ethnicity, language, pronunciation },
    ]);
    if (error) return res.status(500).json({ error });
    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
