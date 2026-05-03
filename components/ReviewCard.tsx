'use client';
import { useState } from 'react';
import { ThumbsUp, Flag, User, CheckCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
export default function ReviewCard({ review }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful_count || 0);
  const [helped, setHelped] = useState(false);
  const handleHelpful = async () => { if (helped) return; await fetch(`/api/reviews/${review.id}/helpful`, { method: 'POST' }); setHelpfulCount(helpfulCount+1); setHelped(true); };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 border">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">{review.is_anonymous ? (<><User size={14} className="text-gray-400"/><span className="text-gray-500 text-sm">Anonymous • {review.branch} • Year {review.year}</span></>) : (<span>{review.branch} • Year {review.year}</span>)}{review.is_verified && <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"><CheckCircle size={12}/>Verified</span>}</div>
        <div className="text-xs text-gray-400">{formatDate(review.created_at)}</div>
      </div>
      <div className="grid grid-cols-2 gap-1 text-sm"><span>Placement: {review.rating_placement}/5</span><span>Faculty: {review.rating_faculty}/5</span><span>Hostel: {review.rating_hostel}/5</span><span>Mess: {review.rating_mess}/5</span></div>
      {review.pros?.length > 0 && <div className="mt-2"><span className="font-semibold text-green-600">Pros:</span> {review.pros.join(', ')}</div>}
      {review.cons?.length > 0 && <div><span className="font-semibold text-red-600">Cons:</span> {review.cons.join(', ')}</div>}
      {review.reality_gap && <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/30 text-sm">📢 {review.reality_gap}</div>}
      {review.image_url && <div className="mt-2"><Image src={review.image_url} alt="Review photo" width={200} height={150} className="rounded-lg" /></div>}
      <div className="mt-2 text-sm">{review.would_recommend ? '✅ Recommends' : '❌ Does not recommend'}</div>
      <div className="flex gap-4 mt-2 text-gray-400"><button onClick={handleHelpful} className="flex items-center gap-1 hover:text-green-500"><ThumbsUp size={14}/> Helpful ({helpfulCount})</button><button className="flex items-center gap-1 hover:text-red-500"><Flag size={14}/> Report</button></div>
    </div>
  );
}