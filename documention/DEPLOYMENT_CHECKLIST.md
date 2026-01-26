# DEPLOYMENT CHECKLIST

**Project:** SON2 Latin Music Website  
**Version:** 1.0

---

## PRE-DEPLOYMENT CHECKLIST

### ✅ Code Quality

- [ ] All TypeScript errors resolved
- [ ] No console errors in browser
- [ ] All features tested locally
- [ ] No TODO comments in production code
- [ ] Proper error handling in all API routes
- [ ] Loading states implemented
- [ ] Form validation working

### ✅ Environment Variables

**Local (.env.local):**
- [ ] `DATABASE_URL` - Postgres connection string
- [ ] `NEXTAUTH_SECRET` - Generated secret
- [ ] `NEXTAUTH_URL=http://localhost:3000`
- [ ] `RESEND_API_KEY` - Email API key
- [ ] `ADMIN_EMAIL` - Admin email address
- [ ] `ADMIN_SMS_EMAIL` - SMS gateway email
- [ ] `BLOB_READ_WRITE_TOKEN` - Vercel Blob token
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000`

**Vercel (Production):**
- [ ] All above variables set in Vercel dashboard
- [ ] `NEXTAUTH_URL=https://son2latinmusic.vercel.app`
- [ ] `NEXT_PUBLIC_APP_URL=https://son2latinmusic.vercel.app`
- [ ] All variables applied to Production environment

### ✅ Database

- [ ] All tables created in Neon
- [ ] Indexes created for performance
- [ ] Sample data added (if needed)
- [ ] Admin user account created
- [ ] Database connection tested
- [ ] Migrations documented

**Tables to verify:**
- [ ] quote_requests
- [ ] contracts
- [ ] admin_users
- [ ] music_tracks
- [ ] music_orders

### ✅ File Storage

- [ ] Vercel Blob configured
- [ ] Preview music files uploaded to `/public/music/previews/`
- [ ] Full tracks uploaded to Blob storage
- [ ] Test file upload/download working
- [ ] URLs updated in database

### ✅ Authentication

- [ ] Admin credentials set
- [ ] Password hashed with bcrypt
- [ ] Login flow tested
- [ ] Session persistence tested
- [ ] Logout working
- [ ] Protected routes working

### ✅ Email & SMS

- [ ] Resend API key configured
- [ ] Test email sent successfully
- [ ] SMS gateway email tested
- [ ] Notification templates reviewed
- [ ] From addresses verified
- [ ] Admin contact info correct

### ✅ Testing

**Public Website:**
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Photo gallery displays
- [ ] Music store shows tracks
- [ ] Preview audio plays
- [ ] Quote form submits successfully
- [ ] Contact information correct

**Quote System:**
- [ ] Form validation works
- [ ] Date timezone correct
- [ ] Quote created in database
- [ ] Email notification received
- [ ] SMS notification received
- [ ] Quote appears in dashboard

**Admin Panel:**
- [ ] Login works
- [ ] Dashboard displays stats
- [ ] Quote list shows all quotes
- [ ] Quote details page loads
- [ ] Edit functionality works
- [ ] Contract generation works
- [ ] Signed contract displays

**Music Store:**
- [ ] Tracks display correctly
- [ ] Preview playback works
- [ ] Purchase flow complete
- [ ] Order appears in admin
- [ ] Download link generation works
- [ ] Download validation works

**Contract System:**
- [ ] Contract PDF generates
- [ ] Signing URL accessible
- [ ] Signature canvas works
- [ ] Signed PDF created
- [ ] Status updated correctly
- [ ] Notifications sent

---

## DEPLOYMENT STEPS

### Step 1: Final Code Review
```bash
# Pull latest from main
git pull origin main

# Check for uncommitted changes
git status

# Review recent commits
git log --oneline -10
```

### Step 2: Run Local Tests
```bash
# Install dependencies
npm install

# Run build
npm run build

# Check for build errors
# Fix any TypeScript or build errors

# Test locally
npm run dev

# Open http://localhost:3000
# Test all major features
```

### Step 3: Commit Final Changes
```bash
# Add all changes
git add .

# Commit with clear message
git commit -m "Production-ready deployment: [describe changes]"

# Push to main branch
git push origin main
```

### Step 4: Vercel Deployment

**Option A: Automatic (Recommended)**
- Push to GitHub triggers automatic deployment
- Monitor deployment in Vercel dashboard
- Wait for "Deployment Ready" notification

**Option B: Manual via CLI**
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Step 5: Verify Deployment

**Immediate Checks:**
- [ ] Deployment shows "Ready" in Vercel dashboard
- [ ] Build logs show no errors
- [ ] All routes return 200 status
- [ ] Homepage loads correctly

**Visit URLs:**
- [ ] https://son2latinmusic.vercel.app
- [ ] https://son2latinmusic.vercel.app/about
- [ ] https://son2latinmusic.vercel.app/music
- [ ] https://son2latinmusic.vercel.app/photos
- [ ] https://son2latinmusic.vercel.app/quote
- [ ] https://son2latinmusic.vercel.app/admin/login

### Step 6: Test Production

**Public Website Tests:**
- [ ] Homepage loads
- [ ] All navigation links work
- [ ] Images load correctly
- [ ] Audio previews play
- [ ] Forms submit successfully

**Admin Tests:**
- [ ] Login with credentials
- [ ] Dashboard displays
- [ ] View quote details
- [ ] Generate test contract
- [ ] Check notifications

**Music Store Tests:**
- [ ] Browse tracks
- [ ] Play preview
- [ ] Submit test order (use test email)
- [ ] Verify admin receives notification

### Step 7: Database Verification
```sql
-- Check quote count
SELECT COUNT(*) FROM quote_requests;

-- Check recent quotes
SELECT id, first_name, last_name, status, created_at 
FROM quote_requests 
ORDER BY created_at DESC 
LIMIT 5;

-- Check music tracks
SELECT id, title, price, is_active 
FROM music_tracks 
WHERE is_active = true;

-- Check admin users
SELECT id, username, email, active 
FROM admin_users;
```

### Step 8: Monitor Initial Traffic

**First Hour:**
- [ ] Monitor Vercel Analytics
- [ ] Check error logs in Vercel dashboard
- [ ] Monitor database connections in Neon
- [ ] Test from different devices/browsers

**First Day:**
- [ ] Check error rate
- [ ] Monitor response times
- [ ] Review any customer issues
- [ ] Check email delivery rate

---

## POST-DEPLOYMENT CHECKLIST

### ✅ Immediate (Within 1 Hour)

- [ ] Confirm deployment successful
- [ ] Test critical user flows
- [ ] Check error logs
- [ ] Verify database connectivity
- [ ] Test admin login
- [ ] Submit test quote
- [ ] Verify notifications working

### ✅ Short Term (Within 24 Hours)

- [ ] Monitor for errors
- [ ] Check analytics for traffic
- [ ] Test from mobile devices
- [ ] Verify all email notifications
- [ ] Check music store functionality
- [ ] Review Vercel logs
- [ ] Database backup verified

### ✅ Medium Term (Within 1 Week)

- [ ] Collect user feedback
- [ ] Review performance metrics
- [ ] Check for any bugs reported
- [ ] Optimize slow queries
- [ ] Review error logs
- [ ] Plan next features

---

## ROLLBACK PROCEDURE

### If Critical Issues Found:

**Step 1: Identify Issue**
- Check Vercel logs
- Check browser console
- Check database logs
- Note error messages

**Step 2: Quick Fix or Rollback**

**Option A: Quick Fix**
```bash
# Fix the issue locally
# Test thoroughly
git add .
git commit -m "Hotfix: [describe fix]"
git push origin main
# Wait for auto-deploy
```

**Option B: Rollback**
1. Go to Vercel dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "..." menu
5. Click "Promote to Production"
6. Confirm rollback

**Step 3: Communicate**
- Inform stakeholders
- Update status page (if applicable)
- Note issue in logs

**Step 4: Fix and Redeploy**
- Fix issue in development
- Test thoroughly
- Deploy again

---

## MONITORING CHECKLIST

### Daily (First Week)

- [ ] Check Vercel Analytics
- [ ] Review error logs
- [ ] Check database performance
- [ ] Monitor email delivery
- [ ] Review quote submissions
- [ ] Check music orders

### Weekly (Ongoing)

- [ ] Review analytics trends
- [ ] Check for performance degradation
- [ ] Database size and usage
- [ ] Blob storage usage
- [ ] Review customer feedback
- [ ] Plan improvements

### Monthly

- [ ] Comprehensive performance review
- [ ] Database optimization check
- [ ] Security update check
- [ ] Backup verification
- [ ] Cost analysis
- [ ] Feature usage statistics

---

## TROUBLESHOOTING GUIDE

### Deployment Fails

**Symptoms:** Build fails in Vercel

**Check:**
1. Build logs in Vercel dashboard
2. TypeScript errors
3. Missing environment variables
4. Package dependencies

**Solutions:**
```bash
# Locally:
npm run build

# Fix any errors
# Commit and push again
```

### Database Connection Issues

**Symptoms:** 500 errors, "database connection failed"

**Check:**
1. DATABASE_URL in environment variables
2. Neon database status
3. Connection limits
4. Firewall rules

**Solutions:**
- Verify DATABASE_URL is correct
- Check Neon dashboard for issues
- Restart database (if needed)

### Email Notifications Not Working

**Symptoms:** Notifications not received

**Check:**
1. RESEND_API_KEY in environment
2. ADMIN_EMAIL is correct
3. Resend dashboard for errors
4. Spam folder

**Solutions:**
- Verify API key is valid
- Check Resend logs
- Test with curl:
```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "test@example.com",
    "subject": "Test",
    "text": "Test email"
  }'
```

### Music Downloads Not Working

**Symptoms:** Download links return errors

**Check:**
1. BLOB_READ_WRITE_TOKEN configured
2. Blob storage files exist
3. Token not expired
4. Download count not exceeded

**Solutions:**
- Verify token in environment
- Check Blob dashboard
- Regenerate download token if needed

---

## ENVIRONMENT VARIABLE QUICK REFERENCE

### Required for Production
```env
# Database
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# Authentication
NEXTAUTH_SECRET=xxx_at_least_32_characters_xxx
NEXTAUTH_URL=https://son2latinmusic.vercel.app

# Email & SMS
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=son2latinmusic@gmail.com
ADMIN_SMS_EMAIL=3525755439@tmomail.net

# File Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx

# Application
NEXT_PUBLIC_APP_URL=https://son2latinmusic.vercel.app
```

### How to Generate NEXTAUTH_SECRET
```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

---

## PERFORMANCE BENCHMARKS

### Target Metrics

- **Page Load Time:** < 2 seconds
- **API Response Time:** < 500ms
- **Database Query Time:** < 100ms
- **PDF Generation Time:** < 3 seconds
- **Email Delivery Time:** < 5 seconds

### Monitoring Tools

- Vercel Analytics (built-in)
- Neon Database Metrics
- Browser DevTools Network Tab
- Lighthouse Performance Score

---

## SECURITY CHECKLIST

- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Environment variables secured
- [ ] Admin passwords hashed (bcrypt)
- [ ] SQL injection prevention (parameterized queries)
- [ ] CORS configured properly
- [ ] Rate limiting considered
- [ ] Session security (HTTP-only cookies)
- [ ] Input validation on all forms
- [ ] File upload validation
- [ ] No sensitive data in logs

---

## BACKUP STRATEGY

### Database

**Neon Automatic Backups:**
- Frequency: Daily
- Retention: 7 days (free tier)
- Type: Point-in-time recovery

**Manual Backups:**
```bash
# Export database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Import backup
psql $DATABASE_URL < backup-20260126.sql
```

### Code

**Git Repository:**
- Primary backup: GitHub
- Commit frequently
- Tag releases

### Files (Blob Storage)

**Vercel Blob:**
- No automatic backups
- Consider periodic manual backup:
```javascript
// Download all files from Blob
// Store locally or in separate storage
```

---

## LAUNCH ANNOUNCEMENT CHECKLIST

- [ ] Update business cards with website
- [ ] Update social media profiles
- [ ] Update Google Business listing
- [ ] Email existing clients
- [ ] Post on Facebook/Instagram
- [ ] Update printed materials
- [ ] Add to email signatures
- [ ] Tell band members

---

## SUCCESS CRITERIA

**Week 1:**
- [ ] Zero critical bugs
- [ ] At least 1 quote submitted
- [ ] Admin login successful
- [ ] Notifications working

**Month 1:**
- [ ] 10+ quotes received
- [ ] 2+ contracts signed
- [ ] 1+ music sale
- [ ] Positive user feedback

**Quarter 1:**
- [ ] 50+ quotes received
- [ ] 10+ contracts signed
- [ ] 10+ music sales
- [ ] Regular repeat visits

---

## CONTACTS

**Technical Issues:**
- Developer: [Contact info]

**Business Questions:**
- Francisco Moreno
- Email: son2latinmusic@gmail.com
- Phone: (352) 575-4933 / (352) 575-5439

**Emergency:**
- Critical bugs: Contact developer immediately
- Database issues: Check Neon dashboard
- Deployment issues: Check Vercel dashboard

---

**Checklist Version:** 1.0  
**Last Updated:** January 26, 2026