export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { collegeName, reviews } = await req.json();
  const texts = reviews.map(r=>r.detailed_review || r.reality_gap).filter(t=>t).slice(0,30);
  if (!texts.length) return NextResponse.json({ summary: 'No written reviews yet.' });
  const prompt = `Summarize top 3 pros and 3 cons for ${collegeName} from these reviews. Format: Pros:\n- ...\nCons:\n- ...\nReality Score: X/5\n\n${texts.map((t,i)=>i+1+'. '+t).join('\n')}`;
  if (!process.env.GROQ_API_KEY) return NextResponse.json({ summary: 'AI key not configured.' });
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'llama3-8b-8192', messages: [{ role: 'user', content: prompt }], temperature: 0.5 }) });
  const data = await res.json();
  return NextResponse.json({ summary: data.choices?.[0]?.message?.content || 'Unable to summarize.' });
}
