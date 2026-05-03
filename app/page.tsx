import Link from 'next/link';
import CollegeCard from '@/components/CollegeCard';
import { Search, AlertCircle, TrendingUp, Star, Users, ShieldAlert } from 'lucide-react';
const sampleColleges = [
  { id:"1", name:"VIT Vellore", slug:"vit-vellore", city:"Vellore", state:"TN", fees_min:175000, fees_max:198000, avg_placement_package:8.5, placement_percentage:85, view_count:1240 },
  { id:"2", name:"SRM Chennai", slug:"srm-chennai", city:"Chennai", state:"TN", fees_min:165000, fees_max:185000, avg_placement_package:7.8, placement_percentage:82, view_count:980 },
  { id:"3", name:"Manipal", slug:"manipal", city:"Manipal", state:"KA", fees_min:185000, fees_max:210000, avg_placement_package:9.2, placement_percentage:88, view_count:2100 },
];
export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20"><div className="max-w-4xl mx-auto text-center px-4"><h1 className="text-4xl font-bold mb-4">Where will your next seat be?</h1><p className="text-xl mb-8">AI-powered college reviews, JEE predictor, and honest student insights.</p><div className="relative max-w-2xl mx-auto"><input type="text" placeholder="Search 40,000+ colleges..." className="w-full px-6 py-4 rounded-xl text-gray-900" /><Search className="absolute right-4 top-4 text-gray-400" /></div><div className="flex flex-wrap justify-center gap-3 mt-6"><span className="bg-white/20 px-3 py-1 rounded-full text-sm">🎓 40,000+ Colleges</span><span className="bg-white/20 px-3 py-1 rounded-full text-sm">🤖 AI Review Summaries</span><span className="bg-white/20 px-3 py-1 rounded-full text-sm">📊 JEE Rank Predictor</span><span className="bg-white/20 px-3 py-1 rounded-full text-sm">⚠️ Warning Stories</span></div></div></div>
      <div className="max-w-4xl mx-auto px-4 py-8"><div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded flex gap-2"><AlertCircle className="text-amber-500" /><span className="text-amber-800 text-sm">⚠️ Don't trust brochure promises. Our AI analyzes real student reviews to show you the truth.</span></div></div>
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8 text-center">
        <div><TrendingUp size={40} className="mx-auto text-indigo-600" /><h3 className="font-bold text-lg mt-2">JEE Predictor</h3><p className="text-gray-600">Enter your rank & get dream/moderate/safe colleges</p></div>
        <div><Star size={40} className="mx-auto text-indigo-600" /><h3 className="font-bold text-lg mt-2">AI Reality Score</h3><p className="text-gray-600">Our AI extracts pros/cons from thousands of reviews</p></div>
        <div><ShieldAlert size={40} className="mx-auto text-indigo-600" /><h3 className="font-bold text-lg mt-2">Warning Stories</h3><p className="text-gray-600">See the colleges with broken promises first</p></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8"><h2 className="text-2xl font-bold mb-6">🏆 Top Colleges in India</h2><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{sampleColleges.map(c => <CollegeCard key={c.id} college={c} />)}</div><div className="text-center mt-8"><Link href="/colleges" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">View All 40,000+ Colleges →</Link></div></div>
    </div>
  );
}