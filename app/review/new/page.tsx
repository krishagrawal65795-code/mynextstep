'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import toast from 'react-hot-toast';
export default function NewReviewPage() {
  const { status } = useSession();
  const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ collegeId: '', branch: '', year: '3', rating_placement: 3, rating_faculty: 3, rating_hostel: 3, rating_mess: 3, rating_labs: 3, rating_freedom: 3, pros: '', cons: '', reality_gap: '', would_recommend: true, is_anonymous: true });
  useEffect(() => { if (status === 'unauthenticated') router.push('/login'); fetch('/api/colleges').then(res=>res.json()).then(setColleges); }, [status]);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] }, maxFiles: 1 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', image);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      imageUrl = data.url;
      setUploading(false);
    }
    const reviewData = { ...form, pros: form.pros.split(',').map(s=>s.trim()).filter(Boolean), cons: form.cons.split(',').map(s=>s.trim()).filter(Boolean), year: parseInt(form.year), image_url: imageUrl };
    const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reviewData) });
    if (res.ok) { toast.success('Review submitted!'); router.push('/'); } else toast.error('Error submitting review');
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Write a Review</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
        <select className="w-full p-2 border rounded" value={form.collegeId} onChange={e=>setForm({...form, collegeId: e.target.value})} required><option value="">Select College</option>{colleges.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <div className="grid md:grid-cols-2 gap-4"><input placeholder="Branch" className="p-2 border rounded" value={form.branch} onChange={e=>setForm({...form, branch: e.target.value})} required /><select value={form.year} onChange={e=>setForm({...form, year: e.target.value})} className="p-2 border rounded"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
        <div className="space-y-2">{['placement','faculty','hostel','mess','labs','freedom'].map(f => (<div key={f} className="flex items-center gap-4"><span className="w-24 capitalize">{f}</span><input type="range" min="1" max="5" step="0.5" className="flex-1" value={form['rating_'+f]} onChange={e=>setForm({...form, ['rating_'+f]: parseFloat(e.target.value)})} /><span className="w-12">{form['rating_'+f]}</span></div>))}</div>
        <input placeholder="Pros (comma separated)" className="w-full p-2 border rounded" value={form.pros} onChange={e=>setForm({...form, pros: e.target.value})} />
        <input placeholder="Cons (comma separated)" className="w-full p-2 border rounded" value={form.cons} onChange={e=>setForm({...form, cons: e.target.value})} />
        <textarea placeholder="Reality gap (promised vs actual)" className="w-full p-2 border rounded" rows={2} value={form.reality_gap} onChange={e=>setForm({...form, reality_gap: e.target.value})} />
        <div {...getRootProps()} className="border-2 border-dashed rounded p-4 text-center cursor-pointer"><input {...getInputProps()} /><p>Drag & drop an image (optional) or click to upload</p>{imagePreview && <Image src={imagePreview} alt="Preview" width={100} height={75} className="mt-2 rounded" />}</div>
        <div className="flex gap-4"><label><input type="checkbox" checked={form.would_recommend} onChange={e=>setForm({...form, would_recommend: e.target.checked})} /> Would recommend</label><label><input type="checkbox" checked={form.is_anonymous} onChange={e=>setForm({...form, is_anonymous: e.target.checked})} /> Post anonymously</label></div>
        <button type="submit" disabled={uploading} className="w-full bg-indigo-600 text-white py-2 rounded">{uploading ? 'Uploading...' : 'Submit Review'}</button>
      </form>
    </div>
  );
}