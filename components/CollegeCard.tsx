import Link from 'next/link';
export default function CollegeCard({ college }) {
  return (
    <Link href={`/college/${college.slug}`}>
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-indigo-600">{college.name}</h3>
        <p className="text-gray-500">{college.city}, {college.state}</p>
        <p className="text-sm text-gray-400">Fees: ₹{college.fees_min?.toLocaleString()}/yr</p>
      </div>
    </Link>
  );
}