export const dynamic = 'force-dynamic';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, city, state, website, verification_document } = body;

  if (!name) {
    return NextResponse.json({ error: 'College name is required' }, { status: 400 });
  }

  const { error } = await supabase.from('college_requests').insert({
    name,
    city,
    state,
    website,
    requested_by: session.user.id,
    verification_document,
    status: 'pending',
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
