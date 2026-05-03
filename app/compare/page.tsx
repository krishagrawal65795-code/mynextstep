'use client';
import { useState, useEffect } from 'react';
import CompareTable from '@/components/CompareTable';
import LoadingSpinner from '@/components/LoadingSpinner';
export default function ComparePage() {
  const [allColleges, setAllColleges] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/colleges').then(res=>res.json()).then(data=>{ setAllColleges(data); setLoading(false); }).catch(()=>setLoading(false)); }, []);
  const handleAdd = (id) => { if (selectedIds.length < 4 && !selectedIds.includes(id)) setSelectedIds([...selectedIds, id]); };
  const handleRemove = (id) => setSelectedIds(selectedIds.filter(i=>i!==id));
  const selected = allColleges.filter(c=>selectedIds.includes(c.id));
  if (loading) return <LoadingSpinner />;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Compare Colleges</h1>
      <div className="mb-6"><select onChange={(e)=>handleAdd(e.target.value)} value="" className="p-2 border rounded dark:bg-gray-800"><option value="">Add college (max 4)</option>{allColleges.filter(c=>!selectedIds.includes(c.id)).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      <div className="flex flex-wrap gap-2 mb-4">{selected.map(c=><span key={c.id} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full flex items-center gap-2">{c.name}<button onClick={()=>handleRemove(c.id)} className="text-red-500">✕</button></span>)}</div>
      <CompareTable colleges={selected} />
    </div>
  );
}