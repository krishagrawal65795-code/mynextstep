'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddCollegePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', city: '', state: '', website: '' });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleFileUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return toast.error('College name is required');

    setUploading(true);
    let docUrl = '';
    if (file) {
      docUrl = await handleFileUpload(file);
    }

    const res = await fetch('/api/college-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, verification_document: docUrl }),
    });

    if (res.ok) {
      toast.success('College submitted for review');
      setForm({ name: '', city: '', state: '', website: '' });
      setFile(null);
    } else {
      toast.error('Submission failed');
    }
    setUploading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">➕ Add a Missing College</h1>
      <p className="text-gray-600 mb-6">Help us grow our database. Your submission will be reviewed.</p>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          required
          placeholder="College name *"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="City"
          className="w-full p-2 border rounded"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />
        <input
          placeholder="State"
          className="w-full p-2 border rounded"
          value={form.state}
          onChange={e => setForm({ ...form, state: e.target.value })}
        />
        <input
          placeholder="Website (optional)"
          className="w-full p-2 border rounded"
          value={form.website}
          onChange={e => setForm({ ...form, website: e.target.value })}
        />
        <div>
          <label className="block text-sm font-medium mb-1">Upload ID Card / Admission Letter (optional)</label>
          <input type="file" accept="image/*,application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-2 rounded disabled:opacity-50"
        >
          {uploading ? 'Submitting...' : 'Submit for Review'}
        </button>
      </form>
    </div>
  );
}