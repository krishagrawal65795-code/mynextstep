'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const branches = ['CSE','IT','ECE','MECH','CIVIL','EEE','AERO','CHEM','BIOTECH'];
export default function AdvancedSearch() {
  const [filters, setFilters] = useState({ q: '', city: '', minFees: '', maxFees: '', minPlacement: '', branch: '' });
  const router = useRouter();
  const handleSubmit = (e) => { e.preventDefault(); const params = new URLSearchParams(); Object.entries(filters).forEach(([k,v]) => v && params.set(k,v)); router.push(`/colleges?${params.toString()}`); };
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">🔍 Find Your College</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-3">
        <input type="text" placeholder="College name" className="p-2 border rounded dark:bg-gray-700" onChange={e=>setFilters({...filters, q:e.target.value})} />
        <input type="text" placeholder="City" className="p-2 border rounded dark:bg-gray-700" onChange={e=>setFilters({...filters, city:e.target.value})} />
        <input type="number" placeholder="Min Fees (₹)" className="p-2 border rounded dark:bg-gray-700" onChange={e=>setFilters({...filters, minFees:e.target.value})} />
        <input type="number" placeholder="Max Fees (₹)" className="p-2 border rounded dark:bg-gray-700" onChange={e=>setFilters({...filters, maxFees:e.target.value})} />
        <select className="p-2 border rounded dark:bg-gray-700" onChange={e=>setFilters({...filters, minPlacement:e.target.value})}><option value="">Min Placement %</option><option value="70">70%+</option><option value="80">80%+</option><option value="90">90%+</option></select>
        <select className="p-2 border rounded dark:bg-gray-700" onChange={e=>setFilters({...filters, branch:e.target.value})}><option value="">All Branches</option>{branches.map(b=><option key={b}>{b}</option>)}</select>
      </div>
      <button type="submit" className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">Search</button>
    </form>
  );
}