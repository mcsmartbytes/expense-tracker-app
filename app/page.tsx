import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Expense Tracker
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Take control of your finances with our powerful expense tracking platform
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Track Expenses</h3>
              <p className="text-gray-600">
                Log and categorize all your expenses in one place
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Analyze Spending</h3>
              <p className="text-gray-600">
                Get insights into your spending patterns and trends
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Save Money</h3>
              <p className="text-gray-600">
                Identify areas to cut costs and reach your financial goals
              </p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/auth/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-blue-600"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-12 text-gray-600">
            <p className="text-sm">✓ No credit card required</p>
            <p className="text-sm">✓ Free forever plan</p>
            <p className="text-sm">✓ Secure and private</p>
          </div>
        </div>
      </div>
    </main>
  );
}
