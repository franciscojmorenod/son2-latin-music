# 💻 Windows Installation Guide

## Step-by-Step Setup for Windows

### Step 1: Install Node.js

1. Download Node.js from: https://nodejs.org/en/download
2. Choose "Windows Installer (.msi)" - LTS version
3. Run the installer
4. Click "Next" through all options (keep defaults)
5. Check "Automatically install necessary tools" if asked
6. Complete installation

### Step 2: Verify Installation

Open **Command Prompt** (search for "cmd" in Windows):
```cmd
node --version
npm --version
```

You should see version numbers (like v18.x.x and 9.x.x)

### Step 3: Extract Project Files

1. Download the `son2-latin-music-complete.tar.gz` file
2. Right-click → Extract All (or use 7-Zip/WinRAR)
3. Extract to a location like: `C:\Users\YourName\Documents\son2-latin-music`

### Step 4: Open Command Prompt in Project Folder

**Method 1:**
1. Open File Explorer
2. Navigate to the son2-latin-music folder
3. Click in the address bar, type `cmd`, press Enter

**Method 2:**
1. Open Command Prompt
2. Type: `cd C:\Users\YourName\Documents\son2-latin-music`

### Step 5: Install Dependencies

In Command Prompt, run:
```cmd
npm install
```

This will take 2-3 minutes. You'll see a progress bar.

### Step 6: Start Development Server

```cmd
npm run dev
```

### Step 7: View Your Site

Open your browser and go to:
```
http://localhost:3000
```

Your site is now running! 🎉

---

## Common Windows Issues & Solutions

### Issue 1: "npm is not recognized"
**Solution:** Node.js isn't in your PATH
1. Restart Command Prompt
2. If still not working, reinstall Node.js
3. Make sure to check "Add to PATH" during installation

### Issue 2: Permission Errors
**Solution:** Run Command Prompt as Administrator
1. Search for "cmd"
2. Right-click → "Run as administrator"
3. Navigate to project folder again
4. Run commands

### Issue 3: Port 3000 Already in Use
**Solution:** Use a different port
```cmd
npm run dev -- -p 3001
```
Then visit: http://localhost:3001

### Issue 4: Antivirus Blocking
**Solution:** Add exception
1. Open Windows Security
2. Virus & threat protection → Manage settings
3. Add exclusion for project folder

---

## Adding Your Media Files (Windows)

### Photos:
1. Navigate to: `son2-latin-music\public\images`
2. Copy your band photos here
3. Supported formats: .jpg, .jpeg, .png, .webp

### Audio:
1. Navigate to: `son2-latin-music\public\audio`
2. Copy your music files here
3. Supported formats: .mp3

### Videos:
1. Navigate to: `son2-latin-music\public\videos`
2. Copy your video files here
3. Supported formats: .mp4

---

## Building for Production

When ready to deploy:

```cmd
npm run build
```

This creates optimized files in the `.next` folder.

---

## Editing Files on Windows

**Recommended Editors:**
- Visual Studio Code (FREE) - https://code.visualstudio.com
- Notepad++ (FREE) - https://notepad-plus-plus.org
- Sublime Text

**To edit a page:**
1. Open editor
2. File → Open Folder → Select son2-latin-music
3. Navigate to `app\page.tsx` for homepage
4. Make changes
5. Save (Ctrl+S)
6. Refresh browser - changes appear instantly!

---

## Using Git on Windows

**Install Git:**
1. Download from: https://git-scm.com/download/win
2. Install with default options

**Initialize Repository:**
```cmd
cd C:\Users\YourName\Documents\son2-latin-music
git init
git add .
git commit -m "Initial commit"
```

---

## Deployment from Windows

### To Vercel:
1. Install Vercel CLI:
```cmd
npm install -g vercel
```

2. Deploy:
```cmd
vercel
```

3. Follow prompts
4. Your site is live!

### To Hostinger:
See `HOSTINGER_DEPLOYMENT.md` for detailed instructions.

---

## Quick Reference

**Start development:**
```cmd
npm run dev
```

**Build for production:**
```cmd
npm run build
```

**Install new package:**
```cmd
npm install package-name
```

**Stop server:**
Press `Ctrl + C` in Command Prompt

---

## File Paths on Windows

Use backslashes `\` in Windows commands:
```cmd
cd C:\Users\YourName\son2-latin-music
```

But in code/config files, use forward slashes `/`:
```javascript
'/images/photo.jpg'
```

---

## Getting Help

If you encounter issues:
1. Check the error message carefully
2. Google the error message
3. Check Node.js is version 18 or higher
4. Try deleting `node_modules` folder and running `npm install` again

**Support:**
- Phone: 352-575-4933
- Email: son2latinmusic@gmail.com

---

**You're all set! Enjoy your new website! 🎵**
