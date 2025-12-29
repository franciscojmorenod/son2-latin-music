# Son2 Latin Music - Modern Website

A modern, responsive Next.js website for Son2 Latin Music, featuring vibrant design, smooth animations, and mobile-first approach.

## 🎵 Features

- **Modern Design**: Vibrant Latin music-inspired color palette with gradient effects
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Performance Optimized**: Built with Next.js 14 for blazing-fast page loads
- **SEO Friendly**: Optimized metadata and structure for search engines
- **Interactive Components**: Smooth animations and hover effects
- **Media Galleries**: Video, audio, and photo showcases
- **Booking Forms**: Quote request and contact forms
- **Social Media Integration**: Links to all social platforms

## 🚀 Pages

- **Home**: Hero section with band introduction and features
- **About**: Band information and guarantees
- **Videos**: YouTube embeds and local video gallery
- **Audios**: Music player with track samples
- **Photos**: Image gallery with lightbox
- **Get Quote**: Detailed booking form
- **Contact**: Simple contact form

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🛠️ Installation

1. **Install Dependencies**
```bash
cd son2-latin-music
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
son2-latin-music/
├── app/
│   ├── about/page.tsx
│   ├── audios/page.tsx
│   ├── contact/page.tsx
│   ├── photos/page.tsx
│   ├── quote/page.tsx
│   ├── videos/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   └── Footer.tsx
├── public/
│   ├── images/      # Add your photos here
│   ├── audio/       # Add your audio files here
│   └── videos/      # Add your video files here
├── package.json
└── README.md
```

## 🎨 Customization

### Adding Media Files

1. **Photos**: Place images in `/public/images/`
2. **Audio**: Place MP3 files in `/public/audio/`
3. **Videos**: Place MP4 files in `/public/videos/`

### Updating Content

- **Navigation**: Edit `components/Navigation.tsx`
- **Footer**: Edit `components/Footer.tsx`
- **Colors**: Modify `tailwind.config.js`

### Form Integration

The quote and contact forms are currently set up with basic functionality. To make them fully functional, integrate with:

**Option 1: EmailJS (Recommended for quick setup)**
```bash
npm install @emailjs/browser
```
- Sign up at [EmailJS](https://www.emailjs.com/)
- Add your service ID, template ID, and public key
- Update the form submission handlers

**Option 2: Formspree**
- Sign up at [Formspree](https://formspree.io/)
- Replace form action with your Formspree endpoint

**Option 3: Build Your Own Backend**
- Use FastAPI (Python) or Express (Node.js)
- Deploy to Vercel, Railway, or Render

## 🌐 Deployment

### Deploy to Vercel (Recommended - FREE)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Click "Deploy"

Your site will be live in minutes with a free `.vercel.app` domain!

### Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Select your repository
- Build command: `npm run build`
- Publish directory: `.next`
- Click "Deploy"

## 🔧 Environment Variables

If you add backend functionality, create a `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📱 Mobile Testing

Test on different devices:
```bash
# Get your local IP
ipconfig getifaddr en0  # Mac
ip addr show           # Linux
ipconfig               # Windows

# Access from phone
http://YOUR_IP:3000
```

## 🎯 Next Steps

1. **Add Your Media**:
   - Upload band photos to `/public/images/`
   - Upload audio tracks to `/public/audio/`
   - Upload videos to `/public/videos/`

2. **Configure Forms**:
   - Set up EmailJS or Formspree
   - Test form submissions

3. **Update Content**:
   - Review all text content
   - Add more performance dates/venues
   - Update contact information

4. **SEO Optimization**:
   - Add Google Analytics
   - Submit sitemap to Google Search Console
   - Add structured data for events

5. **Deploy**:
   - Push to GitHub
   - Deploy to Vercel
   - Connect custom domain (son2latinmusic.xyz)

## 🆘 Support

For questions or issues:
- Email: son2latinmusic@gmail.com
- Phone: 352-575-4933

## 📄 License

© 2024 Son2 Latin Music. All rights reserved.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
