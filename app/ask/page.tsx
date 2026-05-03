'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import QuestionCard from '@/components/QuestionCard';
import LoadingSpinner from '@/components/LoadingSpinner';
export default function AskPage() {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [collegeId, setCollegeId] = useState('');
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all([fetch('/api/colleges').then(r=>r.json()), fetch('/api/questions').then(r=>r.json())]).then(([c,q]) => { setColleges(c); setQuestions(q); setLoading(false); });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return alert('Please login');
    const res = await fetch('/api/questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collegeId, title, question, is_anonymous: isAnonymous }) });
    if (res.ok) { const newQ = await res.json(); setQuestions([newQ, ...questions]); setTitle(''); setQuestion(''); setCollegeId(''); alert('Question posted!'); }
  };
  if (loading) return <LoadingSpinner />;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select className="w-full p-2 border rounded dark:bg-gray-700" value={collegeId} onChange={e=>setCollegeId(e.target.value)} required><option value="">Select college</option>{colleges.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
          <input type="text" placeholder="Title" className="w-full p-2 border rounded dark:bg-gray-700" value={title} onChange={e=>setTitle(e.target.value)} required />
          <textarea placeholder="Your question" className="w-full p-2 border rounded dark:bg-gray-700" rows={3} value={question} onChange={e=>setQuestion(e.target.value)} required />
          <label className="flex items-center gap-2"><input type="checkbox" checked={isAnonymous} onChange={e=>setIsAnonymous(e.target.checked)} /> Post anonymously</label>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Post</button>
        </form>
      </div>
      <div className="md:col-span-2"><h2 className="text-xl font-bold mb-4">Recent Questions</h2>{questions.map(q=><QuestionCard key={q.id} question={q} />)}</div>
    </div>
  );
}