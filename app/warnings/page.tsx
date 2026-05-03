'use client';
import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import LoadingSpinner from '@/components/LoadingSpinner';
export default function WarningsPage() {
  const [warnings, setWarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/reviews?warning=true').then(res=>res.json()).then(data=>{ setWarnings(data.filter(r=>r.rating_placement<3 || r.reality_gap)); setLoading(false); }).catch(()=>setLoading(false));
  }, []);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6"><AlertTriangle className="text-red-600" size={32} /><h1 className="text-2xl font-bold">⚠️ Warning Stories</h1></div>
      <p className="text-gray-600 mb-6">Real experiences shared by students – what colleges don't tell you.</p>
      {warnings.length === 0 && <div className="bg-gray-50 p-8 text-center">No warning stories yet. Be the first to share!</div>}
      <div className="space-y-4">{warnings.map(w => <ReviewCard key={w.id} review={w} />)}</div>
    </div>
  );
}