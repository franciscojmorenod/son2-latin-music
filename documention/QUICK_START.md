# QUICK START GUIDE - SON2 LATIN MUSIC

**Get up and running in 10 minutes!**

---

## FOR ADMINS (Using the System)

### 1. Login (30 seconds)

1. Go to: https://son2latinmusic.vercel.app/admin/login
2. Enter username and password
3. Click "Sign In"

**You're in!** 🎉

### 2. View Quotes (1 minute)

1. You're now on the dashboard
2. See 6 stat cards showing quote counts
3. Scroll down to see all quotes in table
4. Click "View Details →" on any quote

### 3. Process a Quote (5 minutes)

**When new quote comes in:**

1. Check your email/SMS for notification
2. Click link to open quote
3. Review customer info and event details
4. Click "Edit Quote" button
5. Enter pricing:
   - Total Price: 750.00
   - Deposit: 375.00
6. Change status to "Quoted"
7. Click "Save Changes"
8. Contact customer with quote

### 4. Generate Contract (2 minutes)

**After customer accepts:**

1. Open quote details
2. Click "Generate Contract" (green button)
3. Wait 2-3 seconds
4. Click "Copy Signing Link" (purple button)
5. Send link to customer via email/text
6. Wait for customer to sign
7. You'll get notification when signed!

### 5. Approve Music Order (2 minutes)

**When someone buys music:**

1. Check email/SMS notification
2. Go to Music Orders page
3. Find pending order
4. Click 🔗 to view payment screenshot
5. Verify payment in your Zelle
6. Click ✅ green checkmark
7. Customer gets download link automatically!

**That's it! You're ready to use the system!** ✨

---

## FOR DEVELOPERS (Setting Up Locally)

### Prerequisites

- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)
- Database (Neon Postgres)
- Email API key (Resend)

### 1. Clone Repository (1 minute)
```bash
git clone https://github.com/yourusername/son2-latin-music.git
cd son2-latin-music
```

### 2. Install Dependencies (2 minutes)
```bash
npm install
```

### 3. Set Up Environment Variables (3 minutes)
```bash
# Create .env.local file
notepad .env.local
```

**Add these variables:**
```env
# Database
DATABASE_URL=postgresql://xxx

# Authentication
NEXTAUTH_SECRET=your_32_char_secret_here
NEXTAUTH_URL=http://localhost:3000

# Email & SMS
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=son2latinmusic@gmail.com
ADMIN_SMS_EMAIL=3525755439@tmomail.net

# File Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Database (2 minutes)
```bash
# Run SQL scripts in Neon console
# Copy from DESIGN_DOCUMENT.md > Database Schema
```

### 5. Create Admin User (1 minute)
```bash
# Generate password hash
node scripts/generate-password-hash.js

# Copy SQL output and run in Neon console
```

### 6. Run Development Server (1 minute)
```bash
npm run dev
```

**Open:** http://localhost:3000

**You're running locally!** 🚀

### 7. Deploy to Vercel (2 minutes)
```bash
# Push to GitHub
git add .
git commit -m "Initial deployment"
git push origin main

# Vercel auto-deploys from GitHub
# Add environment variables in Vercel dashboard
```

**Live site:** https://son2latinmusic.vercel.app

---

## COMMON TASKS

### Change Admin Password
```bash
node scripts/generate-password-hash.js
# Edit password in script
# Run SQL output in Neon
```

### Add Music Track
```sql
INSERT INTO music_tracks (
  title, artist, genre, price, 
  preview_url, description, duration_seconds
) VALUES (
  'New Song', 'SON2 Latin Music', 'Salsa', 2.99,
  '/music/previews/new-song-preview.mp3',
  'Description here', 240
);
```

### Generate Preview Audio
```bash
# Place full MP3 in: music-files/full-tracks/
node scripts/generate-previews.js
# Preview saved to: public/music/previews/
```

### View Logs

**Vercel:**
1. Go to Vercel dashboard
2. Click project
3. Click "Logs" tab
4. View real-time logs

**Database:**
1. Go to Neon dashboard
2. Click "Monitoring"
3. View queries and performance

---

## HELPFUL COMMANDS
```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
psql $DATABASE_URL                    # Connect to database
pg_dump $DATABASE_URL > backup.sql   # Backup database

# Git
git status                  # Check changes
git add .                   # Stage all changes
git commit -m "message"     # Commit changes
git push origin main        # Push to GitHub

# Vercel
vercel                # Deploy to preview
vercel --prod        # Deploy to production
vercel logs          # View logs
```

---

## TESTING CHECKLIST

**Quick 5-Minute Test:**

- [ ] Homepage loads
- [ ] Submit test quote
- [ ] Login to admin
- [ ] View quote in dashboard
- [ ] Play music preview
- [ ] Generate test contract

**All good?** ✅ System working!

**Something broken?** Check:
1. Browser console (F12)
2. Network tab for failed requests
3. Vercel logs for server errors
4. Database connection

---

## GET HELP

**Documentation:**
- Full Design Doc: `docs/DESIGN_DOCUMENT.md`
- User Guide: `docs/USER_GUIDE.md`
- API Reference: `docs/API_REFERENCE.md`

**Support:**
- Email: son2latinmusic@gmail.com
- Phone: (352) 575-4933

**Developer:**
- [Contact info]

---

## NEXT STEPS

After getting started:

1. **Customize content** - Add your photos, update text
2. **Test thoroughly** - Try all features
3. **Add tracks** - Upload your music
4. **Promote site** - Share with customers
5. **Monitor** - Check analytics and errors
6. **Improve** - Add features based on feedback

---

**Ready to rock!** 🎸🎵

**Document Version:** 1.0  
**Last Updated:** January 26, 2026