'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) setError('Invalid credentials');
      else { toast.success('Logged in'); router.push('/'); }
    } else {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password, fullName: name }) });
      if (res.ok) { toast.success('Account created. Please login.'); setIsLogin(true); setError(''); }
      else setError('Registration failed');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && <input type="text" placeholder="Full Name" className="w-full p-2 border rounded dark:bg-gray-700" value={name} onChange={e=>setName(e.target.value)} required />}
          <input type="email" placeholder="Email" className="w-full p-2 border rounded dark:bg-gray-700" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded dark:bg-gray-700" value={password} onChange={e=>setPassword(e.target.value)} required />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p className="text-center text-sm mt-4">{isLogin ? "Don't have an account? " : "Already have an account? "}<button onClick={()=>{setIsLogin(!isLogin); setError('');}} className="text-indigo-600">{isLogin ? 'Sign Up' : 'Login'}</button></p>
      </div>
    </div>
  );
}