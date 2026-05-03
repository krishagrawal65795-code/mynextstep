'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, LogOut, LogIn, Edit3, MessageCircle, GitCompare, TrendingUp, ShieldAlert, Sun, Moon } from 'lucide-react';
export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark'); setDarkMode(true);
    } else { document.documentElement.classList.remove('dark'); setDarkMode(false); }
  }, []);
  const toggleDark = () => { if (darkMode) { document.documentElement.classList.remove('dark'); localStorage.theme = 'light'; setDarkMode(false); } else { document.documentElement.classList.add('dark'); localStorage.theme = 'dark'; setDarkMode(true); } };
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MyNextSeat</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/colleges">Colleges</Link>
          <Link href="/compare"><GitCompare size={16} /> Compare</Link>
          <Link href="/predictor"><TrendingUp size={16} /> Predictor</Link>
          <Link href="/ask"><MessageCircle size={16} /> Ask</Link>
          <Link href="/warnings" className="text-red-600 dark:text-red-400"><ShieldAlert size={16} /> Warnings</Link>
          <Link href="/review/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><Edit3 size={16} /> Write Review</Link>
          <button onClick={toggleDark} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          {session ? (
            <div className="flex items-center gap-3">
              {session.user.role === 'admin' && <Link href="/admin" className="text-red-500">Admin</Link>}
              <Link href={`/profile/${session.user.id}`}><User size={18} /></Link>
              <button onClick={() => signOut()}><LogOut size={18} /></button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2"><LogIn size={18} />Login</Link>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <div className="md:hidden py-4 border-t flex flex-col gap-3 px-4">
          <Link href="/colleges" onClick={() => setIsOpen(false)}>Colleges</Link>
          <Link href="/compare" onClick={() => setIsOpen(false)}>Compare</Link>
          <Link href="/predictor" onClick={() => setIsOpen(false)}>Predictor</Link>
          <Link href="/ask" onClick={() => setIsOpen(false)}>Ask</Link>
          <Link href="/warnings" onClick={() => setIsOpen(false)}>Warnings</Link>
          <Link href="/review/new" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-center">Write Review</Link>
          {!session && <Link href="/login" className="text-center">Login</Link>}
        </div>
      )}
    </nav>
  );
}