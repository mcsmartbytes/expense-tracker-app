# Expense Tracker - Setup Guide

Complete guide to setting up your Expense Tracker application.

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 20.x or higher installed
- npm or yarn package manager
- A Supabase account ([sign up here](https://supabase.com))
- Git installed
- A code editor (VS Code recommended)

## 🔧 Step-by-Step Setup

### 1. Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: Expense Tracker
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
4. Click **"Create new project"**
5. Wait for project to initialize (2-3 minutes)

### 2. Get Supabase Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under Project API Keys)
   - **anon/public key** (under Project API Keys)

### 3. Clone and Setup Project

```bash
# Clone the repository
git clone https://github.com/mcsmartbytes/expense-tracker-app.git
cd expense-tracker-app

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### 4. Configure Environment Variables

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Set Up Database

1. In your Supabase project, go to **SQL Editor**
2. Click **"New query"**
3. Open the `DATABASE-SCHEMA.sql` file from the project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click **"Run"**

This will create:
- `user_profiles` table
- `expenses` table
- `expense_categories` table
- `budgets` table (for future features)
- All necessary indexes
- Row Level Security policies
- Auto-triggers for timestamps

### 6. Enable Email Authentication

1. In Supabase, go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize signup confirmation email

### 7. Run the Application

```bash
# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## ✅ Verify Setup

1. **Test Homepage**: Visit http://localhost:3000
   - Should see the landing page

2. **Test Signup**:
   - Click "Get Started Free"
   - Create a new account
   - Check your email for confirmation
   - Click confirmation link

3. **Test Login**:
   - Go to "Sign In"
   - Enter your credentials
   - Should redirect to dashboard

4. **Test Expense Creation**:
   - Click "Expenses" or "Add Expense"
   - Fill in the form
   - Submit
   - Should see your expense in the list

## 🐛 Troubleshooting

### "Missing Supabase environment variables" error

**Solution**: Make sure `.env.local` exists and has the correct values.

```bash
# Check if file exists
ls -la .env.local

# Verify contents (should not be empty)
cat .env.local
```

### Database connection errors

**Solutions**:
1. Verify your Supabase project is active
2. Check if the SQL schema was run successfully
3. Ensure your API keys are correct

### Authentication not working

**Solutions**:
1. Check if Email provider is enabled in Supabase
2. Verify email confirmation is not required (or check your email)
3. Clear browser cookies and try again

### Expenses not saving

**Solutions**:
1. Check browser console for errors
2. Verify RLS policies are set up correctly
3. Make sure you're logged in
4. Check if user_id is being set correctly

## 🔍 Checking Database

To verify your database setup:

1. Go to Supabase **Table Editor**
2. You should see these tables:
   - `user_profiles`
   - `expenses`
   - `expense_categories`
   - `budgets`

3. Check if default categories were inserted:
   - Click on `expense_categories` table
   - Should see 13 system categories

## 📧 Email Configuration (Optional)

To use custom email templates:

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirm signup
   - Invite user
   - Magic link
   - Change email address
   - Reset password

## 🎨 Customization

### Change App Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      },
    },
  },
}
```

### Add More Categories

Edit `app/expenses/page.tsx`:
```typescript
const EXPENSE_CATEGORIES = [
  "Your New Category",
  // ... existing categories
];
```

And add to database:
```sql
INSERT INTO expense_categories (name, icon, color, is_system)
VALUES ('Your New Category', '🔥', '#ff0000', TRUE);
```

## 📱 Testing Checklist

- [ ] Homepage loads correctly
- [ ] Can create new account
- [ ] Email confirmation received
- [ ] Can log in
- [ ] Dashboard shows correctly
- [ ] Can add expense
- [ ] Can edit expense
- [ ] Can delete expense
- [ ] Category filter works
- [ ] Statistics calculate correctly
- [ ] Can log out
- [ ] Protected routes redirect to login

## 🚀 Next Steps

Once setup is complete:
1. [Deploy to Vercel](./DEPLOYMENT.md)
2. Invite users to test
3. Customize categories for your needs
4. Add your own features

## 💡 Tips

- Use meaningful expense descriptions
- Set up email templates for better user experience
- Regularly backup your Supabase database
- Monitor usage in Supabase dashboard
- Enable database backups in Supabase (Settings → Database)

## 🆘 Need Help?

- Check the [README](./README.md) for general information
- Review [Supabase docs](https://supabase.com/docs)
- Open an issue on GitHub
- Check browser console for error messages

---

**Setup complete! 🎉 Now you're ready to deploy!**
