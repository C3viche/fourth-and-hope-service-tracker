import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Handle GET requests
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('Client').select('*'); // We'll update this later
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}

// Handle POST requests
export async function POST(req: Request) {
  const supabase = await createClient();
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

// Handle DELETE requests
export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { id } = await req.json();

  const { error } = await supabase.from('Client').delete().eq('id', id);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true }, { status: 200 });
}

// Handle PUT requests
export async function PUT(req: Request) {
  const supabase = await createClient();

  const updatedData = await req.json();
  const id = updatedData.id;

  const { error } = await supabase
    .from('Client')
    .update(updatedData)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Client updated successfully' });
}