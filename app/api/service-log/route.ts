import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request){
    const supabase = await createClient();
    const url = new URL(req.url);

    const client_id = url.searchParams.get('clientid');
    const name = url.searchParams.get('name');
  
    let query = supabase.from('Log').select('*');
  
    if (client_id) {
      query = query.eq('user_id', client_id); // make sure this matches your DB column
    }
  
    if (name) {
      query = query.eq('name', name);
    }
  
    const { data, error } = await query;
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json(data, { status: 200 });
  }

export async function POST(req: Request) {
    const supabase = await createClient();
    const body = await req.json();
    const { id, service, clientid, date, comments, data } = body;

    const { data: instertedRows, error } = await supabase.from('Client').insert([// check the data that is being gotten
        { id, service, clientid, date, comments, data },
    ]);
    
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(instertedRows, { status: 201 }); 
}

export async function DELETE(req: Request) {
    const supabase = await createClient();
    try {
      const body = await req.json();
      const id = body.id;
  
      const { error } = await supabase
        .from('logs')
        .delete()
        .eq('id', id);
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      return NextResponse.json({ message: 'Log deleted successfully' }, { status: 200 });
    } catch (err) {
        console.log(err);
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
  }