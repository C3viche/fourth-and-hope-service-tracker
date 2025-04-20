import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request){
    const url = new URL(req.url);
    const clientid = url.searchParams.get('clientid');

    const { data, error } = await supabase
        .from('Log')
        .select('*') 
        .eq('clientid', clientid)
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data, { status: 200 });
    
}

export async function POST(req: Request) {
    const body = await req.json();
    const {service, clientid, date, data} = body;

    const id = uuidv4();

    const { data: instertedRows, error } = await supabase.from('Client').insert([// check the data that is being gotten
        { id, service, clientid, date, data },
    ]);
    
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(instertedRows, { status: 201 }); 

}