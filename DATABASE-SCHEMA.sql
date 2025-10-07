-- Expense Tracker Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users profile table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  payment_method VARCHAR(50),
  receipt_url TEXT,
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create categories table (predefined categories)
CREATE TABLE IF NOT EXISTS expense_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(20),
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, name)
);

-- Create budgets table
CREATE TABLE IF NOT EXISTS budgets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
  period VARCHAR(20) NOT NULL, -- 'monthly', 'yearly'
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON expenses(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON budgets(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budgets_updated_at
  BEFORE UPDATE ON budgets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Expenses Policies
CREATE POLICY "Users can view own expenses"
  ON expenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON expenses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON expenses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON expenses FOR DELETE
  USING (auth.uid() = user_id);

-- Categories Policies
CREATE POLICY "Users can view own categories"
  ON expense_categories FOR SELECT
  USING (auth.uid() = user_id OR is_system = TRUE);

CREATE POLICY "Users can insert own categories"
  ON expense_categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories"
  ON expense_categories FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories"
  ON expense_categories FOR DELETE
  USING (auth.uid() = user_id);

-- Budgets Policies
CREATE POLICY "Users can view own budgets"
  ON budgets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own budgets"
  ON budgets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own budgets"
  ON budgets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own budgets"
  ON budgets FOR DELETE
  USING (auth.uid() = user_id);

-- Insert default system categories
INSERT INTO expense_categories (name, icon, color, is_system, user_id) VALUES
  ('Food & Dining', '🍔', '#ef4444', TRUE, NULL),
  ('Transportation', '🚗', '#f59e0b', TRUE, NULL),
  ('Shopping', '🛍️', '#ec4899', TRUE, NULL),
  ('Entertainment', '🎬', '#8b5cf6', TRUE, NULL),
  ('Bills & Utilities', '📄', '#3b82f6', TRUE, NULL),
  ('Healthcare', '🏥', '#10b981', TRUE, NULL),
  ('Education', '📚', '#6366f1', TRUE, NULL),
  ('Travel', '✈️', '#14b8a6', TRUE, NULL),
  ('Personal Care', '💅', '#f472b6', TRUE, NULL),
  ('Housing', '🏠', '#0ea5e9', TRUE, NULL),
  ('Insurance', '🛡️', '#06b6d4', TRUE, NULL),
  ('Savings', '💰', '#22c55e', TRUE, NULL),
  ('Other', '📌', '#64748b', TRUE, NULL)
ON CONFLICT DO NOTHING;

-- Create function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
