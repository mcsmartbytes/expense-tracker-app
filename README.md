# Expense Tracker App

A modern, full-featured expense tracking application built with Next.js, Supabase, and Tailwind CSS.

![Expense Tracker](https://img.shields.io/badge/Next.js-13.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.58-green)

## ✨ Features

- 🔐 **Secure Authentication** - Email/password authentication with Supabase Auth
- 💰 **Expense Tracking** - Add, edit, and delete expenses with ease
- 📊 **Dashboard Analytics** - View spending patterns and statistics
- 🏷️ **Category Management** - 13 pre-defined expense categories
- 💳 **Payment Methods** - Track payment methods for each expense
- 📅 **Date-based Tracking** - Filter and view expenses by date
- 🔍 **Category Filtering** - Filter expenses by category with real-time totals
- 👤 **Multi-user Support** - Each user has their own isolated data
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Row Level Security** - Secure data access with Supabase RLS

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- A Supabase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mcsmartbytes/expense-tracker-app.git
   cd expense-tracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Go to your Supabase project
   - Open the SQL Editor
   - Copy and paste the contents of `DATABASE-SCHEMA.sql`
   - Run the SQL script

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to Vercel
- [Database Schema](./DATABASE-SCHEMA.sql) - Complete database schema

## 🏗️ Project Structure

```
expense-tracker-nextjs/
├── app/
│   ├── auth/
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   ├── dashboard/          # Dashboard page
│   ├── expenses/           # Expenses management page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx  # Route protection
│   └── ui/
│       └── Navbar.tsx      # Navigation bar
├── utils/
│   └── supabase.ts         # Supabase client
├── public/                 # Static assets
├── DATABASE-SCHEMA.sql     # Database schema
└── package.json            # Dependencies
```

## 🎯 Features in Detail

### Authentication
- Email/password signup and login
- Secure session management
- Protected routes
- Automatic user profile creation

### Expense Management
- Add new expenses with:
  - Date
  - Category (13 predefined options)
  - Description
  - Amount
  - Payment method
  - Notes
- Edit existing expenses
- Delete expenses
- Filter by category
- View statistics

### Dashboard
- Total expenses overview
- Monthly spending
- Expense count
- Top spending category
- Recent expenses list

### Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Personal Care
- Housing
- Insurance
- Savings
- Other

## 🔒 Security

- Row Level Security (RLS) enabled
- User data isolation
- Secure authentication with Supabase
- Environment variable protection

## 🛠️ Tech Stack

- **Frontend**: Next.js 13.5.6, React 18.2.0, TypeScript 5.0
- **Styling**: Tailwind CSS 3.4.13
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: Vercel

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Open an issue on GitHub
3. Contact support

## 🎉 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Made with ❤️ for better expense tracking**
