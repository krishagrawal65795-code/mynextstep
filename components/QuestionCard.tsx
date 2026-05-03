'use client';
import { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, User, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '@/lib/utils';
export default function QuestionCard({ question }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  useEffect(() => { if (showAnswers) fetch(`/api/answers?questionId=${question.id}`).then(r=>r.json()).then(setAnswers); }, [showAnswers, question.id]);
  const handleUpvote = async () => { await fetch(`/api/questions/${question.id}/upvote`, { method: 'POST' }); };
  const handleSubmit = async (e) => { e.preventDefault(); if (!newAnswer.trim()) return; const res = await fetch('/api/answers', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ questionId: question.id, answer: newAnswer, is_anonymous: true }) }); if (res.ok) { const newA = await res.json(); setAnswers([newA, ...answers]); setNewAnswer(''); } };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between"><div><h3 className="font-semibold">{question.title}</h3><p className="text-gray-600 text-sm">{question.question}</p></div><button onClick={handleUpvote} className="flex items-center gap-1 text-gray-500"><ThumbsUp size={14}/>{question.upvotes||0}</button></div>
      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400"><span><User size={12}/>{question.is_anonymous ? 'Anonymous' : 'Student'}</span><span>{formatDate(question.created_at)}</span><button onClick={()=>setShowAnswers(!showAnswers)} className="text-indigo-600 flex items-center gap-1">{question.answer_count||0} answers {showAnswers?<ChevronUp size={14}/>:<ChevronDown size={14}/>}</button></div>
      {showAnswers && (<div className="mt-3 pl-3 border-l-2">
        {answers.map(a=><div key={a.id} className="mb-2 text-sm"><p>{a.answer}</p><div className="text-xs text-gray-400 mt-1">{a.is_anonymous?'Anonymous':'Senior'} • {formatDate(a.created_at)}</div></div>)}
        <form onSubmit={handleSubmit} className="mt-2"><textarea value={newAnswer} onChange={e=>setNewAnswer(e.target.value)} placeholder="Write an answer..." className="w-full p-2 border rounded text-sm" rows={2} /><button type="submit" className="mt-1 bg-indigo-600 text-white px-3 py-1 rounded text-sm">Post Answer</button></form>
      </div>)}
    </div>
  );
}