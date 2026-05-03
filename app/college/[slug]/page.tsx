import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import ReviewCard from '@/components/ReviewCard';
import QuestionCard from '@/components/QuestionCard';
import AISummary from '@/components/AISummary';
import { MapPin, DollarSign, Calendar } from 'lucide-react';
export default async function CollegePage({ params }: { params: { slug: string } }) {
  const college = await db.colleges.findBySlug(params.slug);
  if (!college) notFound();
  const reviews = await db.reviews.findByCollegeId(college.id);
  const questions = await db.questions.findByCollegeId(college.id);
  const avg = (f) => (reviews.reduce((a,r)=>a+(r[f]||0),0)/(reviews.length||1)).toFixed(1);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6"><h1 className="text-3xl font-bold">{college.name}</h1><div className="flex flex-wrap gap-4 text-gray-600 mt-2"><span><MapPin size={16}/> {college.city}, {college.state}</span><span><DollarSign size={16}/> ₹{college.fees_min?.toLocaleString()} - ₹{college.fees_max?.toLocaleString()}/yr</span>{college.established_year && <span><Calendar size={16}/> Est. {college.established_year}</span>}</div></div>
      <AISummary collegeName={college.name} reviews={reviews} />
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6"><h2 className="text-xl font-bold mb-4">🎯 Reality Scores (out of 5)</h2><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"><div><div className="text-gray-500">Placement</div><div className="text-2xl font-bold">{avg('rating_placement')}</div></div><div><div className="text-gray-500">Faculty</div><div className="text-2xl font-bold">{avg('rating_faculty')}</div></div><div><div className="text-gray-500">Hostel</div><div className="text-2xl font-bold">{avg('rating_hostel')}</div></div><div><div className="text-gray-500">Mess</div><div className="text-2xl font-bold">{avg('rating_mess')}</div></div></div></div>
      <div className="grid md:grid-cols-2 gap-6"><div><h2 className="text-xl font-bold mb-4">📝 Student Reviews ({reviews.length})</h2>{reviews.map(r=><ReviewCard key={r.id} review={r} />)}</div><div><h2 className="text-xl font-bold mb-4">💬 Questions & Answers</h2>{questions.map(q=><QuestionCard key={q.id} question={q} />)}</div></div>
    </div>
  );
}