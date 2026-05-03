import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
export async function GET(req: Request) { const { searchParams } = new URL(req.url); const questionId = searchParams.get('questionId'); if (!questionId) return NextResponse.json([]); const answers = await db.answers.findByQuestionId(questionId); return NextResponse.json(answers); }
export async function POST(req: Request) { const session = await getServerSession(); if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const body = await req.json(); const newAns = await db.answers.create({ ...body, userId: session.user.id, upvotes: 0 }); return NextResponse.json(newAns, { status: 201 }); }