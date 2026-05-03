import React from 'react';

export default function CompareTable({ colleges }: { colleges: any[] }) {
  if (!colleges.length) {
    return <div className="text-center py-8 text-gray-500">Select colleges to compare</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Feature</th>
            {colleges.map((c) => (
              <th key={c.id} className="p-4 text-left">{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4">City</td>
            {colleges.map((c) => <td key={c.id} className="p-4">{c.city || '—'}</td>)}
          </tr>
          <tr className="border-b">
            <td className="p-4">Fees (per year)</td>
            {colleges.map((c) => <td key={c.id} className="p-4">₹{c.fees_min?.toLocaleString() || '?'} - ₹{c.fees_max?.toLocaleString() || '?'}</td>)}
          </tr>
          <tr className="border-b">
            <td className="p-4">Avg Placement</td>
            {colleges.map((c) => <td key={c.id} className="p-4">{c.avg_placement_package || 'N/A'} LPA</td>)}
          </tr>
          <tr className="border-b">
            <td className="p-4">Placement %</td>
            {colleges.map((c) => <td key={c.id} className="p-4">{c.placement_percentage || 'N/A'}%</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}