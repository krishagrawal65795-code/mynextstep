import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ReviewCard from '@/components/ReviewCard';
import { User, Award, ThumbsUp, FileText } from 'lucide-react';
export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { data: user } = await supabase.from('users').select('*').eq('id', params.id).single();
  if (!user) notFound();
  const { data: reviews } = await supabase.from('reviews').select('*').eq('user_id', params.id);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 flex items-center gap-4">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center"><User size={40} className="text-indigo-600" /></div>
        <div><h1 className="text-2xl font-bold">{user.full_name}</h1><p className="text-gray-500">{user.email}</p>{user.is_verified_student && <span className="text-xs bg-green-100 px-2 py-0.5 rounded">Verified Student</span>}</div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center mb-8">
        <div><Award className="inline text-yellow-500" /><p className="text-xl font-bold">{user.reputation_points || 0}</p><p className="text-xs text-gray-500">Reputation</p></div>
        <div><ThumbsUp className="inline text-green-500" /><p className="text-xl font-bold">{user.helpful_votes || 0}</p><p className="text-xs text-gray-500">Helpful Votes</p></div>
        <div><FileText className="inline text-blue-500" /><p className="text-xl font-bold">{reviews?.length || 0}</p><p className="text-xs text-gray-500">Reviews</p></div>
      </div>
      <h2 className="text-xl font-bold mb-4">My Reviews</h2>
      {reviews?.length === 0 ? <div className="bg-gray-50 p-8 text-center">No reviews yet</div> : reviews?.map(r => <ReviewCard key={r.id} review={r} />)}
    </div>
  );
}