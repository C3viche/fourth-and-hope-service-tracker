// client-side supabase 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Client = {
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
  
  export type Log = {
    id: string;
    service: string;
    client_id: string;
    date: Date;
    data: JSON;
  };