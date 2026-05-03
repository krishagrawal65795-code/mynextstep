'use client';
import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
const cutoffData = [
  { college: "VIT Vellore", branch: "CSE", closingRank: 25000, fees: 198000 },
  { college: "SRM Chennai", branch: "CSE", closingRank: 45000, fees: 185000 },
  { college: "Manipal", branch: "CSE", closingRank: 35000, fees: 210000 },
  { college: "LPU", branch: "CSE", closingRank: 80000, fees: 160000 },
  { college: "KIIT", branch: "CSE", closingRank: 55000, fees: 175000 },
  { college: "PES Bangalore", branch: "CSE", closingRank: 28000, fees: 220000 },
];
export default function PredictorPage() {
  const [rank, setRank] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const handlePredict = () => {
    if (!rank) return;
    setLoading(true);
    setTimeout(() => {
      const r = parseInt(rank);
      const predictions = cutoffData.map(item => {
        let prob = Math.min(95, Math.max(5, Math.round((1 - r / item.closingRank) * 100)));
        if (r > item.closingRank) prob = Math.min(40, prob);
        let category = prob >= 70 ? 'Dream' : prob >= 40 ? 'Moderate' : 'Low Chance';
        return { ...item, probability: prob, category };
      }).sort((a,b) => b.probability - a.probability).slice(0, 15);
      setResults(predictions);
      setLoading(false);
    }, 500);
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">🎯 JEE Main College Predictor</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-4 flex gap-4"><input type="number" placeholder="Your CRL Rank" value={rank} onChange={e=>setRank(e.target.value)} className="flex-1 p-2 border rounded dark:bg-gray-700" /><button onClick={handlePredict} className="bg-indigo-600 text-white px-6 py-2 rounded">Predict</button></div>
      {loading && <LoadingSpinner />}
      {results.length > 0 && <div className="mt-8 space-y-3">{results.map(r => (<div key={r.college} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between"><div><strong>{r.college}</strong> - {r.branch}<br/><span className="text-sm text-gray-500">Fees: ₹{r.fees.toLocaleString()}/yr</span></div><div className="text-right"><span className={`text-lg font-bold ${r.probability>70?'text-green-600':r.probability>40?'text-yellow-600':'text-red-600'}`}>{r.probability}%</span><br/><span className="text-xs text-gray-400">{r.category}</span></div></div>))}</div>}
    </div>
  );
}