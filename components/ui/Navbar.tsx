"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUserEmail();
  }, []);

  async function getUserEmail() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserEmail(user.email || '');
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-600">Expense Tracker</h1>
            <div className="hidden md:flex space-x-6">
              <a href="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                Dashboard
              </a>
              <a href="/expenses" className="text-gray-700 hover:text-blue-600 transition">
                Expenses
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
