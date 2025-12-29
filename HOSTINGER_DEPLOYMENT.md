# 🌐 Deploying to Hostinger - Complete Guide

## Prerequisites
- Node.js installed on your computer
- Hostinger account with VPS or Cloud Hosting (shared hosting won't work for Next.js)
- SSH access to your Hostinger server

## Option 1: Deploy Next.js on Hostinger VPS (Recommended)

### Step 1: Prepare Your Local Project
```bash
# On Windows, open Command Prompt or PowerShell
cd son2-latin-music
npm install
npm run build
```

### Step 2: Connect to Hostinger via SSH
```bash
ssh username@your-server-ip
```

### Step 3: Install Node.js on Server
```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 4: Upload Your Project
Option A - Using Git (Recommended):
```bash
# On your local machine
cd son2-latin-music
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GIT_REPO
git push -u origin main

# On Hostinger server
cd /home/your-username
git clone YOUR_GIT_REPO
cd son2-latin-music
npm install
npm run build
```

Option B - Using FTP/SFTP:
- Use FileZilla or WinSCP
- Upload entire son2-latin-music folder
- Connect via SSH and run:
```bash
cd son2-latin-music
npm install
npm run build
```

### Step 5: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Step 6: Start Your App
```bash
cd son2-latin-music
pm2 start npm --name "son2-music" -- start
pm2 save
pm2 startup
```

### Step 7: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/son2latinmusic.xyz
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name son2latinmusic.xyz www.son2latinmusic.xyz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/son2latinmusic.xyz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 8: Install SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d son2latinmusic.xyz -d www.son2latinmusic.xyz
```

---

## Option 2: Export as Static Site (Works on Shared Hosting)

If you only have Hostinger shared hosting, you can export Next.js as a static site:

### Step 1: Modify next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

### Step 2: Build Static Files
```bash
npm run build
```

This creates an `out` folder with static HTML/CSS/JS files.

### Step 3: Upload to Hostinger
1. Open Hostinger File Manager or use FTP
2. Navigate to `public_html` folder
3. Upload all contents from the `out` folder
4. Done! Your site is live at son2latinmusic.xyz

**Note:** With static export, you lose some Next.js features:
- No server-side rendering
- Forms need external services (EmailJS, Formspree)
- No API routes

---

## Option 3: Use Alternative Hosting (Easiest)

Since Next.js works best with platforms designed for it, consider these FREE alternatives:

### Vercel (Recommended - FREE)
1. Push code to GitHub
2. Import to Vercel
3. Connect your domain
4. Done in 5 minutes!

### Netlify (FREE)
1. Push code to GitHub
2. Import to Netlify
3. Connect domain
4. Deploy!

### Railway (FREE tier)
1. Connect GitHub
2. Deploy with one click
3. Add custom domain

You can then point your Hostinger domain to these services via DNS settings.

---

## Pointing Hostinger Domain to External Hosting

If you deploy to Vercel/Netlify:

1. **Log into Hostinger Dashboard**
2. **Go to Domain → DNS/Nameservers**
3. **Update DNS Records:**

For Vercel:
```
Type: A     Name: @     Value: 76.76.21.21
Type: CNAME Name: www   Value: cname.vercel-dns.com
```

For Netlify:
```
Type: A     Name: @     Value: 75.2.60.5
Type: CNAME Name: www   Value: your-site.netlify.app
```

---

## Recommended Approach for You

Given that you have Hostinger:

**If you have VPS/Cloud hosting:**
→ Use Option 1 (Full Next.js deployment)

**If you have Shared hosting:**
→ Use Option 2 (Static export) OR
→ Use Option 3 (Deploy to Vercel, point domain)

**Easiest & Best Performance:**
→ Deploy to Vercel (free), point Hostinger domain to it

---

## Windows-Specific Notes

### Install Node.js on Windows:
1. Download from https://nodejs.org
2. Run installer
3. Open Command Prompt and verify:
```cmd
node --version
npm --version
```

### Extract Project Files:
1. Use 7-Zip or WinRAR to extract the .tar.gz file
2. Or use Windows built-in: Right-click → Extract All

### Run Commands:
Use Command Prompt (cmd) or PowerShell:
```cmd
cd C:\path\to\son2-latin-music
npm install
npm run dev
```

---

## Need Help?

Contact: 352-575-4933
Email: son2latinmusic@gmail.com

Choose the option that matches your Hostinger plan!
