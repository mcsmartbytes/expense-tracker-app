# Deploying Expense Tracker to Vercel

Complete guide to deploying your Expense Tracker application to Vercel.

## 🚀 Quick Deployment

The fastest way to deploy is via Vercel's GitHub integration.

### Prerequisites

- GitHub account
- Vercel account ([sign up free](https://vercel.com/signup))
- Completed setup (database + environment variables)
- Code pushed to GitHub

## 📤 Step 1: Push to GitHub

If you haven't already:

```bash
# Initialize Git (if not done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Expense Tracker app"

# Add remote repository
git remote add origin https://github.com/mcsmartbytes/expense-tracker-app.git

# Push to GitHub
git push -u origin main
```

## 🔗 Step 2: Connect Vercel to GitHub

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `expense-tracker-app` repository
5. Click **"Import"**

## ⚙️ Step 3: Configure Project

Vercel will auto-detect Next.js. Configure:

### Project Name
```
expense-tracker
```

### Framework Preset
```
Next.js
```
(Should be auto-detected)

### Root Directory
```
./
```
(Leave as default)

### Build Settings
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```
(Should be auto-configured)

## 🔐 Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value | Environments |
|------|-------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_anon_key_here` | Production, Preview, Development |

✅ **Important**: Check all three environments (Production, Preview, Development)

## 🎯 Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (1-3 minutes)
3. Vercel will provide you with a URL like:
   ```
   https://expense-tracker.vercel.app
   ```

## ✅ Step 6: Verify Deployment

Test your deployed app:

1. **Homepage**: Visit your Vercel URL
2. **Signup**: Create a test account
3. **Login**: Sign in
4. **Add Expense**: Test expense creation
5. **Dashboard**: Check statistics

## 🌐 Step 7: Configure Custom Domain (Optional)

### Add Domain

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `expenses.yourdomain.com`)
4. Follow DNS configuration instructions

### Update DNS

Add these records to your DNS provider:

**For apex domain** (example.com):
```
Type: A
Name: @
Value: 76.76.21.21
```

**For subdomain** (expenses.example.com):
```
Type: CNAME
Name: expenses
Value: cname.vercel-dns.com
```

## 🔄 Automatic Deployments

Vercel automatically deploys:

- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request
- **Development**: For other branches

## 📊 Monitoring

### View Deployments

1. Go to Vercel dashboard
2. Click your project
3. See all deployments with:
   - Build logs
   - Runtime logs
   - Performance metrics

### View Analytics

1. Enable Vercel Analytics (free)
2. Monitor:
   - Page views
   - Performance
   - User experience

## 🐛 Troubleshooting

### Build Fails

**Check**:
1. Build logs in Vercel
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript has no errors locally

**Solution**:
```bash
# Test build locally
npm run build

# If it works locally but fails on Vercel, check:
# - Node version compatibility
# - Environment variables
```

### "Missing environment variables" error

**Solution**:
1. Go to Vercel project settings
2. Environment Variables section
3. Add missing variables
4. Redeploy

### Database connection errors

**Solutions**:
1. Verify Supabase URL is correct
2. Check if anon key is correct
3. Ensure Supabase project is not paused
4. Verify RLS policies allow access

### Authentication not working

**Solutions**:
1. Add Vercel domain to Supabase allowed redirect URLs:
   - Go to Supabase **Authentication** → **URL Configuration**
   - Add: `https://your-app.vercel.app/auth/callback`
   - Add: `https://your-app.vercel.app/**`

2. Check if email confirmation is required

### Expenses not loading

**Solutions**:
1. Check browser console for errors
2. Verify user is logged in
3. Check Supabase RLS policies
4. Ensure user_id is being passed correctly

## 🔒 Security Checklist

Before going live:

- [ ] Environment variables are set
- [ ] Supabase RLS is enabled
- [ ] Auth redirect URLs configured
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Rate limiting considered (Supabase settings)
- [ ] Backup strategy in place

## 📈 Performance Optimization

### Enable Vercel Features

1. **Edge Functions**: Consider using edge runtime for faster responses
2. **Image Optimization**: Already enabled by Next.js
3. **Analytics**: Enable Web Analytics
4. **Speed Insights**: Enable to monitor performance

### Supabase Optimization

1. Enable **Connection Pooling** in Supabase
2. Add database indexes (already in schema)
3. Monitor query performance in Supabase dashboard

## 🔄 Updating Your App

```bash
# Make changes locally
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build the new version
3. Deploy to production
4. Show you the deployment status

## 🌍 Environment-specific Settings

### Production
- Uses `main` branch
- Full analytics
- Error tracking enabled

### Preview
- Uses feature branches
- Same environment variables
- Perfect for testing

### Development
- Local development
- Uses `.env.local`
- Hot reload enabled

## 📧 Post-Deployment

### Update Supabase Settings

Add your Vercel URL to Supabase:

1. **Authentication** → **URL Configuration**
   ```
   Site URL: https://your-app.vercel.app
   Redirect URLs:
   - https://your-app.vercel.app/**
   - https://your-app.vercel.app/auth/callback
   ```

2. **Enable Email Rate Limiting** (optional)
   - Prevents spam signups

### Test Everything

- [ ] User signup works
- [ ] Email confirmation arrives
- [ ] Login works
- [ ] Dashboard loads
- [ ] Can add expenses
- [ ] Can edit expenses
- [ ] Can delete expenses
- [ ] Filters work
- [ ] Logout works

## 🎉 You're Live!

Your expense tracker is now:
- ✅ Deployed to production
- ✅ Accessible worldwide
- ✅ Automatically backing up
- ✅ Auto-deploying on git push
- ✅ Monitored by Vercel

## 📱 Share Your App

Share your app with:
```
https://your-app.vercel.app
```

Or your custom domain:
```
https://expenses.yourdomain.com
```

## 🆘 Getting Help

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- Open an issue on GitHub

---

**Congratulations! Your Expense Tracker is live! 🚀**
