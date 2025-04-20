import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Handle GET requests
export async function GET() {
  const { data, error } = await supabase.from('Client').select('*'); // We'll update this later
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const { name, pronunciation, age_group, sex, ethnicity, language, stay_type, notes } = body;

  const id = uuidv4();
  const date_added = new Date().toISOString();

  const { data, error } = await supabase.from('Client').insert([
    { id, date_added, name, pronunciation, age_group, sex, ethnicity, language, stay_type, notes },
  ]);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
