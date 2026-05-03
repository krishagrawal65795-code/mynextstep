import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')   // fetch all columns
    .limit(10);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 50000 });
  }

  console.log('Returning', data?.length, 'colleges');
  return NextResponse.json(data || []);
}
