import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { email, password, fullName } = await req.json();
  const { data: existing } = await supabase.from('users').select('id').eq('email', email).single();
  if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  const hashed = await bcrypt.hash(password, 10);
  const { data, error } = await supabase.from('users').insert({ email, password: hashed, full_name: fullName, role: 'user' }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}