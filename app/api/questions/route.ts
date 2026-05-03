import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
export async function GET() { const questions = await db.questions.findAll(); return NextResponse.json(questions); }
export async function POST(req: Request) { const session = await getServerSession(); if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await req.json(); const newQ = await db.questions.create({ ...body, userId: session.user.id, upvotes: 0, answer_count: 0 }); return NextResponse.json(newQ, { status: 201 }); }