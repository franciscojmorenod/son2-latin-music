# SON2 LATIN MUSIC - COMPLETE DESIGN DOCUMENT

**Project:** Full-Stack Band Website with Quote Management & Music Store  
**Client:** SON2 Latin Music (Tampa Bay, Florida)  
**Version:** 1.0  
**Last Updated:** January 2026  
**Technology:** Next.js 14, TypeScript, PostgreSQL, Vercel

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Database Schema](#database-schema)
5. [Public Website Features](#public-website-features)
6. [Admin Panel Features](#admin-panel-features)
7. [Music Store System](#music-store-system)
8. [API Documentation](#api-documentation)
9. [Authentication & Security](#authentication--security)
10. [Email & SMS Notifications](#email--sms-notifications)
11. [File Storage](#file-storage)
12. [Deployment & Environment](#deployment--environment)
13. [Future Enhancements](#future-enhancements)

---

## PROJECT OVERVIEW

### Business Description
SON2 Latin Music is a professional Latin band based in Tampa Bay, Florida, specializing in Salsa, Bachata, Cumbia, and other Latin genres. They perform at weddings, corporate events, festivals, and private parties.

### Project Goals
- Replace manual quote process with automated system
- Streamline contract generation and signing
- Manage bookings and track payments
- Sell original music tracks online
- Professional online presence

### Key Users
1. **Public Users:** Event organizers, potential clients
2. **Admin Users:** Band manager (Francisco), booking coordinator
3. **Customers:** Music track buyers

---

## TECH STACK

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **UI Components:** Custom components

### Backend
- **Runtime:** Node.js (Vercel Serverless Functions)
- **API:** Next.js API Routes
- **Authentication:** NextAuth.js v4
- **Email:** Resend API
- **SMS:** Email-to-SMS gateway (free via carrier)

### Database
- **Provider:** Vercel Postgres (Neon)
- **Type:** PostgreSQL
- **ORM:** @vercel/postgres (SQL template literals)

### File Storage
- **Provider:** Vercel Blob
- **Usage:** PDF contracts, music files, payment screenshots

### Deployment
- **Platform:** Vercel
- **Domain:** son2latinmusic.vercel.app
- **CI/CD:** Git push → Auto deploy

---

## SYSTEM ARCHITECTURE
```
┌─────────────────────────────────────────────────────────┐
│                    PUBLIC WEBSITE                       │
│  Home | About | Photos | Videos | Music | Get Quote    │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌────────▼─────────┐
│  Quote System  │      │   Music Store    │
│                │      │                  │
│ • Form         │      │ • Preview Play   │
│ • Validation   │      │ • Purchase       │
│ • Submission   │      │ • Download       │
└───────┬────────┘      └────────┬─────────┘
        │                        │
        └────────┬───────────────┘
                 │
        ┌────────▼─────────────────────────────────┐
        │         API ROUTES                       │
        │  /api/quotes                             │
        │  /api/admin/quotes                       │
        │  /api/music/tracks                       │
        │  /api/music/orders                       │
        │  /api/contracts                          │
        │  /api/auth                               │
        └────────┬─────────────────────────────────┘
                 │
        ┌────────▼─────────────────────────────────┐
        │    NEON POSTGRES DATABASE                │
        │  • quote_requests                        │
        │  • contracts                             │
        │  • admin_users                           │
        │  • music_tracks                          │
        │  • music_orders                          │
        └────────┬─────────────────────────────────┘
                 │
        ┌────────▼─────────────────────────────────┐
        │       EXTERNAL SERVICES                  │
        │  • Resend (Email)                        │
        │  • Email-to-SMS (Mint Mobile)            │
        │  • Vercel Blob (File Storage)            │
        └──────────────────────────────────────────┘
```

---

## DATABASE SCHEMA

### 1. quote_requests

Stores all event booking inquiries.
```sql
CREATE TABLE quote_requests (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  zip VARCHAR(20),
  event_date DATE NOT NULL,
  start_time TIME,
  duration VARCHAR(50),
  indoor_outdoor VARCHAR(20),
  special_request_1 TEXT,
  total_price DECIMAL(10, 2),
  deposit_amount DECIMAL(10, 2),
  balance_due DECIMAL(10, 2),
  num_musicians INTEGER DEFAULT 3,
  num_sets INTEGER DEFAULT 3,
  num_breaks INTEGER DEFAULT 2,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quotes_status ON quote_requests(status);
CREATE INDEX idx_quotes_event_date ON quote_requests(event_date);
CREATE INDEX idx_quotes_created_at ON quote_requests(created_at DESC);
```

**Status Values:**
- `pending` - New quote request
- `quoted` - Price provided to customer
- `booked` - Contract signed
- `deposit_paid` - Deposit received
- `fully_booked` - Contract signed + fully paid
- `completed` - Event completed
- `cancelled` - Booking cancelled

### 2. contracts

Stores generated contracts and signing information.
```sql
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  quote_id INTEGER REFERENCES quote_requests(id),
  contract_token VARCHAR(255) UNIQUE NOT NULL,
  unsigned_pdf_url TEXT,
  signed_pdf_url TEXT,
  signature_data TEXT,
  signed_at TIMESTAMP,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contracts_quote_id ON contracts(quote_id);
CREATE INDEX idx_contracts_token ON contracts(contract_token);
```

### 3. admin_users

Admin authentication and user management.
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. music_tracks

Music store product catalog.
```sql
CREATE TABLE music_tracks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) DEFAULT 'SON2 Latin Music',
  album VARCHAR(255),
  genre VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  preview_url TEXT NOT NULL,
  full_track_blob_url TEXT,
  duration_seconds INTEGER,
  description TEXT,
  cover_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tracks_active ON music_tracks(is_active);
CREATE INDEX idx_tracks_genre ON music_tracks(genre);
```

**Current Tracks:**
- A Cuerpo Cobarde (Salsa)
- Anacaona (Salsa)
- La Quiero Y Qué (Salsa)
- Pa Oriente (Salsa)

### 5. music_orders

Music purchase orders and downloads.
```sql
CREATE TABLE music_orders (
  id SERIAL PRIMARY KEY,
  track_id INTEGER REFERENCES music_tracks(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  payment_method VARCHAR(50) DEFAULT 'zelle',
  payment_screenshot_url TEXT,
  order_status VARCHAR(50) DEFAULT 'pending',
  download_token VARCHAR(255) UNIQUE,
  download_count INTEGER DEFAULT 0,
  download_limit INTEGER DEFAULT 3,
  token_expires_at TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON music_orders(order_status);
CREATE INDEX idx_orders_token ON music_orders(download_token);
CREATE INDEX idx_orders_customer_email ON music_orders(customer_email);
```

**Order Status Values:**
- `pending` - Payment pending verification
- `confirmed` - Payment verified, download available
- `completed` - Track downloaded
- `cancelled` - Order cancelled

---

## PUBLIC WEBSITE FEATURES

### Navigation Menu
- Home
- About
- Audios
- Music (Store)
- Photos
- Videos
- Get Quote
- Contact
- Reviews (external link to Google)

### 1. Home Page (`/`)
**Features:**
- Hero section with band branding
- Services showcase
- Recent performances
- Call-to-action buttons
- Contact information

**Components:**
- Hero banner with gradient text
- Services grid
- Photo carousel
- Contact section

### 2. About Page (`/about`)
**Features:**
- Band history
- Band members
- Musical style
- Service areas

### 3. Photo Gallery (`/photos`)
**Features:**
- Grid layout (responsive)
- 136+ performance photos
- Lightbox modal on click
- Lazy loading
- Hover effects

**Technical Details:**
- Images stored in `/public/images/`
- Client-side rendering
- Click to enlarge

### 4. Videos Page (`/videos`)
**Features:**
- Embedded YouTube videos
- Performance highlights
- Responsive video player

### 5. Audios Page (`/audios`)
**Features:**
- Audio track listings
- Embedded players
- Sample tracks

### 6. Music Store (`/music`)
**Features:**
- Track catalog display
- 60-second preview playback
- Genre badges (Salsa, Son Cubano)
- Price display ($2.99/track)
- "Buy" button → Purchase flow

**Technical Implementation:**
```typescript
// Audio preview playback
const [playingTrack, setPlayingTrack] = useState<number | null>(null)
const [audioElements, setAudioElements] = useState<{ [key: number]: HTMLAudioElement }>({})

const togglePlay = (trackId: number, previewUrl: string) => {
  if (playingTrack === trackId) {
    audioElements[trackId]?.pause()
    setPlayingTrack(null)
  } else {
    Object.values(audioElements).forEach(audio => audio.pause())
    if (!audioElements[trackId]) {
      const audio = new Audio(previewUrl)
      audio.onended = () => setPlayingTrack(null)
      setAudioElements(prev => ({ ...prev, [trackId]: audio }))
      audio.play()
    } else {
      audioElements[trackId].play()
    }
    setPlayingTrack(trackId)
  }
}
```

### 7. Purchase Page (`/music/purchase/[id]`)
**Features:**
- Track information display
- Zelle payment instructions
- Customer information form
- Optional payment screenshot upload
- Order submission

**Payment Instructions:**
```
Pay via Zelle to: son2latinmusic@gmail.com
Amount: $2.99
```

**Form Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Payment screenshot (optional)

### 8. Get Quote Page (`/quote`)
**Features:**
- Multi-section form
- Real-time validation
- Date/time pickers
- Address fields
- Special requests textarea
- Success confirmation

**Form Sections:**
1. Personal Information (First name, Last name, Email, Phone)
2. Event Location (Address, City, ZIP)
3. Event Details (Date, Start time, Duration, Indoor/Outdoor)
4. Additional Information (Message/requests)

**Technical Implementation:**
```typescript
// Timezone-aware date handling
const response = await fetch('/api/quotes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: formData.firstname,
    lastName: formData.lastname,
    email: formData.email,
    phone: formData.phone,
    eventDate: formData.date, // Sent as string: "2026-05-23"
    // ... other fields
  })
})
```

### 9. Contact Page (`/contact`)
**Features:**
- Contact form
- Phone numbers display
- Email address
- Business hours
- Service area information

---

## ADMIN PANEL FEATURES

### Authentication (`/admin/login`)
**Features:**
- Username/password login
- Session management (JWT)
- Secure authentication via NextAuth
- Auto-redirect to dashboard on success

**Credentials Storage:**
- Database: `admin_users` table
- Passwords: bcrypt hashed
- Sessions: JWT tokens (30-day expiry)

### Dashboard (`/admin/dashboard`)
**Features:**
- 6 stat cards (Total, Pending, Quoted, Booked, Deposit Paid, Fully Booked)
- Status filter buttons
- Quote listing table
- Real-time data

**Stats Display:**
```typescript
interface Stats {
  total: number
  pending: number
  quoted: number
  booked: number
  deposit_paid: number
  fully_booked: number
}
```

**Quote Table Columns:**
- Customer name
- Contact info (email, phone)
- Event date (timezone-corrected)
- Location (city)
- Status badge
- Submitted date
- View Details button

**Status Colors:**
- Pending: Yellow
- Quoted: Blue
- Booked: Green
- Deposit Paid: Purple
- Fully Booked: Emerald
- Completed: Gray
- Cancelled: Red

### Quote Detail Page (`/admin/quotes/[id]`)
**Features:**
- Full quote information display
- Inline editing mode
- Customer information
- Event details
- Pricing management
- Contract generation
- Contract signing link

**Editable Fields:**
- Personal info (name, email, phone, address)
- Event details (date, time, duration, setting)
- Pricing (total, deposit)
- Band configuration (musicians, sets, breaks)
- Status

**Actions:**
- Edit Quote
- Save Changes
- Cancel Edit
- Generate Contract
- View Contract PDF
- Copy Signing Link

**Contract Generation:**
```typescript
const handleGenerateContract = async () => {
  const response = await fetch(`/api/admin/quotes/${quoteId}/contracts`, {
    method: 'POST',
  })
  
  if (response.ok) {
    const data = await response.json()
    setContractUrl(data.pdf_url)
    setContractToken(data.contract_token)
    alert('Contract generated successfully!')
  }
}
```

### Music Orders Management (`/admin/music-orders`)
**Features:**
- Order listing table
- Status badges
- Payment screenshot viewing
- Order approval/rejection
- Download link generation

**Table Columns:**
- Order ID & timestamp
- Customer details
- Track name
- Amount
- Status
- Download count
- Action buttons

**Admin Actions:**
- ✅ Approve order (confirmed)
- ❌ Cancel order
- 📋 Copy download link

**Workflow:**
1. Customer submits order
2. Admin receives email/SMS notification
3. Admin views payment screenshot
4. Admin approves or rejects
5. Customer receives email with download link
6. Customer downloads (up to 3 times, 24-hour expiry)

---

## MUSIC STORE SYSTEM

### Preview Generation
**Tool:** FFmpeg-based script
```javascript
// scripts/generate-previews.js
const config = {
  inputFolder: './music-files/full-tracks',
  outputFolder: './public/music/previews',
  previewDuration: 60,
  startTime: 30,
  bitrate: '128k',
};

function generatePreview(inputFile) {
  const command = `ffmpeg -y -i "${inputFile}" -ss ${config.startTime} -t ${config.previewDuration} -ab ${config.bitrate} "${outputFile}"`;
  execSync(command, { stdio: 'ignore' });
}
```

**Output:**
- 60-second clip
- Starts at 30 seconds into song
- 128kbps quality (smaller file size)
- Saved to `/public/music/previews/`

### Purchase Flow

**Step 1: Customer Browses**
- View track catalog at `/music`
- Play 60-second previews
- Click "Buy Full Track"

**Step 2: Purchase Page**
- Display track info and price
- Show Zelle payment instructions
- Customer fills out form
- Optional: Upload payment screenshot
- Submit order

**Step 3: Order Processing**
```typescript
// API creates order record
const result = await sql`
  INSERT INTO music_orders (
    track_id, customer_name, customer_email, 
    download_token, token_expires_at, total_amount
  ) VALUES (
    ${trackId}, ${customerName}, ${customerEmail},
    ${downloadToken}, ${expiresAt}, ${totalAmount}
  )
  RETURNING id
`;

// Send notification to admin
notifyNewMusicOrder({
  orderId: result.rows[0].id,
  customerName,
  trackTitle,
  amount
});
```

**Step 4: Admin Approval**
- Admin receives email + SMS
- Views order in dashboard
- Checks payment screenshot (if provided)
- Clicks approve

**Step 5: Download Delivery**
```typescript
// Update order status
await sql`
  UPDATE music_orders
  SET order_status = 'confirmed'
  WHERE id = ${orderId}
`;

// Send download link to customer
const downloadLink = `${baseUrl}/api/music/download/${downloadToken}`;
await notifySendDownloadLink({
  customerEmail,
  trackTitle,
  downloadLink
});
```

**Step 6: Customer Downloads**
- Receives email with download link
- Clicks link
- Download validated:
  - Token not expired (24 hours)
  - Download count < 3
  - Order status = confirmed
- Track downloaded
- Download count incremented

### Download Security
```typescript
// app/api/music/download/[token]/route.ts
export async function GET(request, { params }) {
  const { token } = params;
  
  // Fetch order details
  const order = await sql`
    SELECT * FROM music_orders mo
    JOIN music_tracks mt ON mo.track_id = mt.id
    WHERE mo.download_token = ${token}
  `;
  
  // Validate
  if (order.order_status !== 'confirmed') {
    return NextResponse.json({ error: 'Order not confirmed' }, { status: 403 });
  }
  
  if (new Date(order.token_expires_at) < new Date()) {
    return NextResponse.json({ error: 'Link expired' }, { status: 403 });
  }
  
  if (order.download_count >= order.download_limit) {
    return NextResponse.json({ error: 'Download limit reached' }, { status: 403 });
  }
  
  // Increment counter
  await sql`
    UPDATE music_orders
    SET download_count = download_count + 1
    WHERE id = ${order.id}
  `;
  
  // Redirect to Blob storage
  return NextResponse.redirect(order.full_track_blob_url);
}
```

**Security Features:**
- Unique cryptographic tokens (32 bytes hex)
- Time-limited links (24 hours)
- Download count limit (3 downloads)
- Server-side validation
- No direct file URLs exposed

---

## API DOCUMENTATION

### Public APIs

#### POST `/api/quotes`
Create new quote request.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(352) 575-4933",
  "address": "123 Main St",
  "city": "Tampa",
  "zip": "33601",
  "eventDate": "2026-05-23",
  "startTime": "19:00",
  "duration": "3 hours",
  "indoorOutdoor": "outdoor",
  "message": "Wedding reception"
}
```

**Response:**
```json
{
  "id": 44,
  "first_name": "John",
  "last_name": "Doe",
  "status": "pending",
  "created_at": "2026-01-26T10:30:00Z"
}
```

#### GET `/api/music/tracks`
Fetch all active music tracks.

**Response:**
```json
{
  "tracks": [
    {
      "id": 1,
      "title": "A Cuerpo Cobarde",
      "artist": "SON2 Latin Music",
      "genre": "Salsa",
      "price": "2.99",
      "preview_url": "/music/previews/A CUERPO COBARDE FINAL-preview.mp3",
      "duration_seconds": 240,
      "description": "Energetic salsa track..."
    }
  ]
}
```

#### GET `/api/music/tracks/[id]`
Fetch single track details.

**Response:**
```json
{
  "track": {
    "id": 1,
    "title": "A Cuerpo Cobarde",
    "artist": "SON2 Latin Music",
    "price": "2.99",
    "preview_url": "/music/previews/...",
    "description": "..."
  }
}
```

#### POST `/api/music/orders`
Create music purchase order.

**Request Body:**
```json
{
  "trackId": 1,
  "customerName": "Jane Smith",
  "customerEmail": "jane@example.com",
  "customerPhone": "(813) 555-1234",
  "paymentScreenshotUrl": "https://blob.vercel-storage.com/..."
}
```

**Response:**
```json
{
  "success": true,
  "orderId": 15
}
```

#### GET `/api/music/download/[token]`
Download purchased track.

**Parameters:**
- `token`: Download token from confirmation email

**Response:**
- Success: Redirects to Blob storage URL
- Error: JSON error message with appropriate status code

### Admin APIs (Protected)

#### GET `/api/admin/quotes`
Fetch all quotes with stats.

**Authentication:** Required (NextAuth session)

**Response:**
```json
{
  "quotes": [...],
  "stats": {
    "total": 45,
    "pending": 5,
    "quoted": 10,
    "booked": 15,
    "deposit_paid": 8,
    "fully_booked": 7
  }
}
```

#### GET `/api/admin/quotes/[id]`
Fetch single quote details.

**Response:**
```json
{
  "id": 44,
  "first_name": "Lisa",
  "last_name": "Rosario",
  "email": "lisa@example.com",
  "phone": "224-324-2460",
  "event_date": "2026-05-23",
  "start_time": "19:00:00",
  "total_price": "750.00",
  "deposit_amount": "375.00",
  "status": "quoted"
}
```

#### PATCH `/api/admin/quotes/[id]`
Update quote details.

**Request Body:**
```json
{
  "total_price": 800,
  "deposit_amount": 400,
  "status": "quoted",
  "num_musicians": 4
}
```

#### POST `/api/admin/quotes/[id]/contracts`
Generate contract PDF.

**Response:**
```json
{
  "pdf_url": "https://blob.vercel-storage.com/contracts/...",
  "contract_token": "abc123def456...",
  "signing_url": "https://son2latinmusic.vercel.app/sign/abc123def456"
}
```

#### GET `/api/admin/music-orders`
Fetch all music orders.

**Response:**
```json
{
  "orders": [
    {
      "id": 15,
      "customer_name": "Jane Smith",
      "customer_email": "jane@example.com",
      "track_title": "Anacaona",
      "total_amount": "2.99",
      "order_status": "pending",
      "download_count": 0,
      "download_limit": 3,
      "created_at": "2026-01-26T..."
    }
  ]
}
```

#### PATCH `/api/admin/music-orders/[id]`
Update order status (approve/reject).

**Request Body:**
```json
{
  "status": "confirmed"
}
```

### Contract Signing API

#### GET `/api/contracts/[token]/sign`
Fetch contract for signing.

**Response:**
```json
{
  "quote": {...},
  "contract_url": "https://blob.vercel-storage.com/...",
  "token": "abc123..."
}
```

#### POST `/api/contracts/[token]/sign`
Submit electronic signature.

**Request Body:**
```json
{
  "signature": "data:image/png;base64,iVBORw0KGgo..."
}
```

**Response:**
```json
{
  "success": true,
  "signed_pdf_url": "https://blob.vercel-storage.com/...",
  "contract_id": 12
}
```

---

## AUTHENTICATION & SECURITY

### NextAuth Configuration
```typescript
// app/api/auth/[...nextauth]/auth.config.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        const user = await sql`
          SELECT * FROM admin_users
          WHERE username = ${credentials.username}
          AND active = true
        `;
        
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );
        
        if (isValid) {
          return {
            id: user.id,
            name: user.name,
            email: user.email
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  }
};
```

### Password Management

**Password Reset Script:**
```javascript
// scripts/generate-password-hash.js
const bcrypt = require('bcryptjs');

const newUsername = 'francisco';
const newPassword = 'YourSecurePassword123!';

async function generateSQL() {
  const passwordHash = await bcrypt.hash(newPassword, 10);
  
  console.log(`
UPDATE admin_users
SET 
  username = '${newUsername}',
  password_hash = '${passwordHash}'
WHERE username = 'francisco';
  `);
}

generateSQL();
```

**Security Features:**
- Bcrypt password hashing (10 rounds)
- JWT session tokens
- HTTP-only cookies
- CSRF protection
- Server-side session validation

### Route Protection
```typescript
// Protected admin pages
export default function AdminPage() {
  const { data: session, status } = useSession();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status]);
  
  if (status === 'loading') return <Loading />;
  
  return <AdminContent />;
}
```

### API Route Protection
```typescript
// Protected API routes
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Protected logic...
}
```

---

## EMAIL & SMS NOTIFICATIONS

### Resend Email Integration

**Configuration:**
```typescript
// lib/notifications/sendNotifications.ts
import { Resend } from 'resend';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}
```

**Environment Variables:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=son2latinmusic@gmail.com
ADMIN_SMS_EMAIL=3525755439@tmomail.net
```

### Notification Types

#### 1. New Quote Request

**Triggered:** When customer submits quote form

**Email to Admin:**
- Subject: "🎵 New Quote Request - [Customer Name]"
- Contains: Customer details, event info
- Link: Direct to admin dashboard

**SMS to Admin:**
- Plain text message
- Customer name, event date, location
- Dashboard link

**Implementation:**
```typescript
export async function notifyNewQuoteRequest(data: QuoteNotificationData) {
  const resend = getResend();
  if (!resend) return;
  
  // Email
  await resend.emails.send({
    from: 'SON2 Notifications <onboarding@resend.dev>',
    to: process.env.ADMIN_EMAIL,
    subject: `🎵 New Quote Request - ${data.customerName}`,
    html: emailTemplate
  });
  
  // SMS via email gateway
  await resend.emails.send({
    from: 'SON2 Notifications <onboarding@resend.dev>',
    to: process.env.ADMIN_SMS_EMAIL,
    text: smsMessage
  });
}
```

#### 2. Contract Signed

**Triggered:** When customer signs contract

**Email to Admin:**
- Subject: "✅ Contract Signed - [Customer Name]"
- Contains: Event details, status update
- Links: Signed PDF, dashboard

**SMS to Admin:**
- Booking confirmation
- Customer name, event date
- Dashboard link

#### 3. New Music Order

**Triggered:** When customer purchases track

**Email to Admin:**
- Subject: "🎵 New Music Order - [Track Title]"
- Contains: Customer info, track, amount
- Link: Music orders dashboard

**SMS to Admin:**
- Order notification
- Track name, customer, amount
- Orders dashboard link

#### 4. Download Link Delivery

**Triggered:** When admin approves music order

**Email to Customer:**
- Subject: "Your Download Link - [Track Title]"
- Contains: Thank you, track details
- Button: Download link (24-hour expiry)
- Important: 3-download limit notice

**Implementation:**
```typescript
export async function notifySendDownloadLink(data: MusicDownloadData) {
  await resend.emails.send({
    from: 'SON2 Latin Music <onboarding@resend.dev>',
    to: data.customerEmail,
    subject: `Your Download Link - ${data.trackTitle}`,
    html: downloadEmailTemplate
  });
}
```

### Free SMS via Email Gateway

**How it Works:**
- Uses carrier email-to-SMS gateway
- No Twilio fees (100% free)
- Sends SMS by emailing special address

**Gateway Addresses:**
- Mint Mobile (T-Mobile): `[phone]@tmomail.net`
- AT&T: `[phone]@txt.att.net`
- Verizon: `[phone]@vtext.com`
- Sprint: `[phone]@messaging.sprintpcs.com`

**Example:**
```
Phone: 352-575-5439
Gateway: 3525755439@tmomail.net
```

### Async Notification Pattern

**Problem:** Notifications block HTTP response

**Solution:** Fire-and-forget with Promise.resolve()
```typescript
// Send response first
const response = NextResponse.json(newQuote, { status: 201 });

// Then trigger notifications (non-blocking)
Promise.resolve().then(() => {
  notifyNewQuoteRequest({...})
    .catch(err => console.error('Notification error:', err));
});

return response;
```

**Benefits:**
- Fast API response (1-2 seconds)
- Notifications sent in background
- No user wait time
- Errors logged but don't affect request

---

## FILE STORAGE

### Vercel Blob Storage

**Usage:**
1. PDF contracts (unsigned & signed)
2. Full music track files
3. Payment screenshot uploads

**Configuration:**
```typescript
import { put } from '@vercel/blob';

const blob = await put(
  'music/full-tracks/song.mp3',
  fileBuffer,
  {
    access: 'public',
    contentType: 'audio/mpeg',
  }
);

console.log('URL:', blob.url);
// https://xxx.public.blob.vercel-storage.com/music/full-tracks/song.mp3
```

**File Organization:**
```
blob.vercel-storage.com/
├── contracts/
│   ├── unsigned/
│   │   └── quote-44-contract.pdf
│   └── signed/
│       └── quote-44-signed.pdf
├── music/
│   └── full-tracks/
│       ├── A CUERPO COBARDE FINAL.mp3
│       ├── ANACAONA FINAL.mp3
│       └── ...
└── music-orders/
    └── payment-screenshots/
        └── timestamp-filename.jpg
```

### Preview Files (Local)

**Location:** `/public/music/previews/`

**Generated by:** FFmpeg script

**Characteristics:**
- 60 seconds long
- 128kbps bitrate
- Starts at 30 seconds
- Publicly accessible

**Why Local?**
- Small file size (~1-2 MB)
- Fast CDN delivery via Vercel
- No storage costs
- No download limits

### Contract PDF Generation

**Library:** @react-pdf/renderer

**Process:**
1. Admin clicks "Generate Contract"
2. API fetches quote data
3. React PDF component renders
4. PDF buffer created
5. Uploaded to Vercel Blob
6. URL stored in database

**Template Structure:**
```typescript
// Contract includes:
- SON2 Latin Music header/logo
- Quote ID and date
- Customer information
- Event details
- Pricing breakdown
- Terms and conditions
- Signature line
- Contract date
```

### Electronic Signature

**Process:**
1. Customer receives signing link
2. Opens unique URL: `/sign/[token]`
3. Reviews contract PDF
4. Signs on canvas
5. Signature converted to data URL
6. API overlays signature on PDF
7. Saves signed PDF to Blob
8. Updates contract record
9. Sends confirmation

**Signature Capture:**
```typescript
// react-signature-canvas
const signatureRef = useRef<SignatureCanvas>(null);

const handleSign = async () => {
  const signatureData = signatureRef.current
    ?.getTrimmedCanvas()
    .toDataURL('image/png');
  
  await fetch(`/api/contracts/${token}/sign`, {
    method: 'POST',
    body: JSON.stringify({ signature: signatureData })
  });
};
```

---

## DEPLOYMENT & ENVIRONMENT

### Vercel Deployment

**Repository:** GitHub (son2-latin-music)

**Branch Strategy:**
- `main` - Production deployment
- Auto-deploy on push

**Build Command:**
```bash
npm run build
```

**Environment Variables:**

**Production (Vercel):**
```env
# Database
DATABASE_URL=postgresql://neondb_owner:xxx@ep-still-fire-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require

# Authentication
NEXTAUTH_SECRET=xxx_generated_secret_xxx
NEXTAUTH_URL=https://son2latinmusic.vercel.app

# Email/SMS
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=son2latinmusic@gmail.com
ADMIN_SMS_EMAIL=3525755439@tmomail.net

# File Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# App URL
NEXT_PUBLIC_APP_URL=https://son2latinmusic.vercel.app
```

**Local Development (.env.local):**
```env
# Same as production but with:
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Domain Configuration

**Current:**
- son2latinmusic.vercel.app

**Custom Domain (Future):**
- son2latinmusic.com (available to add)

### Performance Optimizations

**Next.js Features:**
- App Router (React Server Components)
- Automatic code splitting
- Image optimization
- Static generation where possible
- API route edge functions

**Database:**
- Connection pooling (Neon)
- Indexed queries
- Optimized SQL

**Caching:**
- Static assets via Vercel CDN
- Preview audio files cached
- Database query optimization

### Monitoring

**Vercel Analytics:**
- Page views
- Performance metrics
- Error tracking

**Database:**
- Neon dashboard metrics
- Query performance
- Connection usage

**Logs:**
- Vercel Runtime Logs
- API request logs
- Error logs
- Notification logs

---

## FUTURE ENHANCEMENTS

### Phase 1 (Immediate)
- [ ] Custom domain setup
- [ ] Email domain verification (better deliverability)
- [ ] Admin notification preferences
- [ ] Multiple admin accounts
- [ ] Quote notes/comments system

### Phase 2 (Short Term)
- [ ] Calendar integration (Google Calendar)
- [ ] Payment tracking (Zelle confirmations)
- [ ] Automated deposit reminders
- [ ] SMS reminders for upcoming events
- [ ] Customer testimonials page
- [ ] Blog/news section

### Phase 3 (Medium Term)
- [ ] Online payment processing (Stripe)
- [ ] Instant download after payment
- [ ] Music album bundles
- [ ] Discount codes system
- [ ] Customer account portal
- [ ] Event history for repeat customers

### Phase 4 (Long Term)
- [ ] Mobile app (React Native)
- [ ] Booking calendar widget
- [ ] Real-time availability checking
- [ ] Equipment/venue requirements form
- [ ] Automated contract generation based on templates
- [ ] Integration with booking platforms

### Music Store Enhancements
- [ ] Music player with queue
- [ ] Playlists
- [ ] Album releases
- [ ] Lyrics display
- [ ] Music videos integration
- [ ] Streaming revenue tracking
- [ ] Distribution to Spotify/Apple Music

### Admin Panel Enhancements
- [ ] Analytics dashboard
- [ ] Revenue reports
- [ ] Customer relationship management
- [ ] Email campaign management
- [ ] Inventory management (equipment)
- [ ] Musician scheduling
- [ ] Setlist management

---

## APPENDIX

### A. Color Palette
```css
/* Brand Colors */
--salsa-400: #f87171;    /* Primary red */
--salsa-500: #ef4444;
--salsa-600: #dc2626;
--cumbia-400: #fbbf24;   /* Accent yellow */
--merengue-600: #d97706; /* Accent orange */

/* Background */
--gray-900: #111827;     /* Main background */
--gray-800: #1f2937;     /* Cards */
--gray-700: #374151;     /* Borders */

/* Text */
--white: #ffffff;
--gray-300: #d1d5db;     /* Secondary text */
--gray-400: #9ca3af;     /* Tertiary text */
```

### B. Typography
```css
/* Font Family */
font-family: 'Inter', system-ui, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-5xl: 3rem;      /* 48px */
--text-7xl: 4.5rem;    /* 72px */
```

### C. Component Library

**Button Variants:**
- Primary: Gradient (salsa-600 → merengue-600)
- Secondary: Gray with hover
- Success: Green
- Danger: Red
- Ghost: Transparent with hover

**Form Elements:**
- Input: Dark background, salsa border on focus
- Textarea: Same as input, resizable
- Select: Custom dropdown styling
- Date/Time: Native inputs with custom styling

**Status Badges:**
- Rounded pill shape
- Color-coded by status
- Semi-transparent background
- Uppercase text

### D. Responsive Breakpoints
```css
/* Mobile First */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### E. Git Workflow

**Branch Protection:**
- Main branch protected
- Requires successful build
- Auto-deploy on merge

**Commit Message Format:**
```
feat: Add music store purchase flow
fix: Correct timezone issue in date display
docs: Update README with deployment steps
refactor: Simplify notification system
```

### F. Database Backup

**Neon Automatic Backups:**
- Daily automated backups
- Point-in-time recovery
- Retention: 7 days (free tier)

**Manual Export:**
```bash
pg_dump $DATABASE_URL > backup.sql
```

### G. Testing Checklist

**Quote System:**
- [ ] Form validation
- [ ] Date selection (timezone)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Admin dashboard display
- [ ] Quote editing
- [ ] Status updates

**Music Store:**
- [ ] Preview playback
- [ ] Purchase form
- [ ] Order creation
- [ ] Admin approval
- [ ] Download link email
- [ ] Download validation
- [ ] Token expiry
- [ ] Download limit

**Contract System:**
- [ ] PDF generation
- [ ] Signing page load
- [ ] Signature capture
- [ ] Signed PDF creation
- [ ] Status update
- [ ] Email notifications

**Authentication:**
- [ ] Login
- [ ] Session persistence
- [ ] Logout
- [ ] Route protection
- [ ] API authentication

---

## CONTACTS

**Developer:** Claude (AI Assistant)  
**Project Owner:** Francisco Moreno (SON2 Latin Music)  
**Email:** son2latinmusic@gmail.com  
**Phone:** (352) 575-4933, (352) 575-5439  
**Location:** Tampa Bay, Florida, USA

---

**Document Version:** 1.0  
**Last Updated:** January 26, 2026  
**Total Pages:** 45+

---

*This is a living document and will be updated as new features are added.*