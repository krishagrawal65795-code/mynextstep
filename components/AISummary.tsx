'use client';
import { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
export default function AISummary({ collegeName, reviews }: { collegeName: string; reviews: any[] }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!reviews.length) return;
    setLoading(true);
    fetch('/api/ai/summarize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ collegeName, reviews: reviews.slice(0,50) }) })
      .then(res=>res.json()).then(data=>{ setSummary(data.summary); setLoading(false); }).catch(()=>setLoading(false));
  }, [collegeName, reviews]);
  if (!reviews.length) return null;
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow p-6 mb-6">
      <div className="flex items-center gap-2 mb-3"><Sparkles className="text-indigo-600" size={20} /><h2 className="text-xl font-bold text-indigo-800 dark:text-indigo-300">🤖 AI-Powered Summary</h2></div>
      {loading ? <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Analyzing reviews...</div> : <div className="text-gray-700 dark:text-gray-200 whitespace-pre-line">{summary || 'No summaries available yet.'}</div>}
    </div>
  );
}