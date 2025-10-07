"use client";

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from '@/components/ui/Navbar';
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

interface DashboardStats {
  totalExpenses: number;
  monthlyExpenses: number;
  expenseCount: number;
  topCategory: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalExpenses: 0,
    monthlyExpenses: 0,
    expenseCount: 0,
    topCategory: '—',
  });
  const [loading, setLoading] = useState(true);
  const [recentExpenses, setRecentExpenses] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch all expenses
      const { data: expenses, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      if (expenses) {
        const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount.toString()), 0);

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyTotal = expenses
          .filter(exp => {
            const expDate = new Date(exp.date);
            return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
          })
          .reduce((sum, exp) => sum + parseFloat(exp.amount.toString()), 0);

        // Find top category
        const categoryTotals: Record<string, number> = {};
        expenses.forEach(exp => {
          categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + parseFloat(exp.amount.toString());
        });
        const topCat = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

        setStats({
          totalExpenses: total,
          monthlyExpenses: monthlyTotal,
          expenseCount: expenses.length,
          topCategory: topCat ? topCat[0] : '—',
        });

        setRecentExpenses(expenses.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${stats.totalExpenses.toFixed(2)}
                  </p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${stats.monthlyExpenses.toFixed(2)}
                  </p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Count</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.expenseCount}</p>
                </div>
                <div className="text-4xl">📈</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Top Category</p>
                  <p className="text-lg font-bold text-gray-900">{stats.topCategory}</p>
                </div>
                <div className="text-4xl">🏆</div>
              </div>
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Recent Expenses</h2>
              <Link
                href="/expenses"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All →
              </Link>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : recentExpenses.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400 mb-4">No expenses yet</p>
                <Link
                  href="/expenses"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Add Your First Expense
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentExpenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {expense.description}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          ${parseFloat(expense.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
