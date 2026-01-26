# SON2 LATIN MUSIC - API REFERENCE

**Version:** 1.0  
**Base URL (Production):** https://son2latinmusic.vercel.app  
**Base URL (Development):** http://localhost:3000

---

## TABLE OF CONTENTS

1. [Authentication](#authentication)
2. [Public APIs](#public-apis)
3. [Admin APIs](#admin-apis)
4. [Music Store APIs](#music-store-apis)
5. [Contract APIs](#contract-apis)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)

---

## AUTHENTICATION

### Authentication Methods

**Public APIs:** No authentication required

**Admin APIs:** Session-based authentication via NextAuth

**Headers Required for Admin APIs:**
```http
Cookie: next-auth.session-token=<token>
```

### Login Endpoint

**POST** `/api/auth/signin`

Handled by NextAuth - use the web login form instead.

---

## PUBLIC APIS

### 1. Submit Quote Request

Create a new event quote request.

**Endpoint:** `POST /api/quotes`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "(352) 575-4933",
  "address": "123 Main Street",
  "city": "Tampa",
  "zip": "33601",
  "eventDate": "2026-06-15",
  "startTime": "19:00",
  "duration": "3 hours",
  "indoorOutdoor": "outdoor",
  "message": "Wedding reception for 150 guests"
}
```

**Field Requirements:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| firstName | string | Yes | Max 100 chars |
| lastName | string | Yes | Max 100 chars |
| email | string | Yes | Valid email format |
| phone | string | Yes | Any format accepted |
| address | string | No | Street address |
| city | string | No | City name |
| zip | string | No | ZIP code |
| eventDate | string | Yes | Format: YYYY-MM-DD |
| startTime | string | No | Format: HH:MM (24-hour) |
| duration | string | No | e.g., "3 hours", "4-5 hours" |
| indoorOutdoor | string | No | "indoor", "outdoor", or "both" |
| message | string | No | Special requests |

**Success Response (201):**
```json
{
  "id": 45,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "(352) 575-4933",
  "event_date": "2026-06-15",
  "status": "pending",
  "created_at": "2026-01-26T15:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Missing required fields",
  "received": { ... }
}
```

**Side Effects:**
- Quote record created in database
- Admin receives email notification
- Admin receives SMS notification

---

### 2. Get Music Tracks

Fetch all active music tracks for sale.

**Endpoint:** `GET /api/music/tracks`

**Parameters:** None

**Success Response (200):**
```json
{
  "tracks": [
    {
      "id": 1,
      "title": "A Cuerpo Cobarde",
      "artist": "SON2 Latin Music",
      "album": "Original Recordings",
      "genre": "Salsa",
      "price": "2.99",
      "preview_url": "/music/previews/A CUERPO COBARDE FINAL-preview.mp3",
      "duration_seconds": 240,
      "description": "Energetic salsa track with powerful brass...",
      "cover_image_url": null
    },
    {
      "id": 2,
      "title": "Anacaona",
      "artist": "SON2 Latin Music",
      "album": "Original Recordings",
      "genre": "Salsa",
      "price": "2.99",
      "preview_url": "/music/previews/ANACAONA FINAL-preview.mp3",
      "duration_seconds": 235,
      "description": "Classic salsa celebrating the legendary...",
      "cover_image_url": null
    }
  ]
}
```

**Error Response (500):**
```json
{
  "error": "Failed to fetch tracks"
}
```

---

### 3. Get Single Track

Fetch details for a specific music track.

**Endpoint:** `GET /api/music/tracks/[id]`

**Parameters:**
- `id` (path parameter) - Track ID

**Example:** `GET /api/music/tracks/1`

**Success Response (200):**
```json
{
  "track": {
    "id": 1,
    "title": "A Cuerpo Cobarde",
    "artist": "SON2 Latin Music",
    "album": "Original Recordings",
    "genre": "Salsa",
    "price": "2.99",
    "preview_url": "/music/previews/A CUERPO COBARDE FINAL-preview.mp3",
    "duration_seconds": 240,
    "description": "Energetic salsa track...",
    "cover_image_url": null
  }
}
```

**Error Response (404):**
```json
{
  "error": "Track not found"
}
```

---

### 4. Create Music Order

Submit a music track purchase order.

**Endpoint:** `POST /api/music/orders`

**Request Body:**
```json
{
  "trackId": 1,
  "customerName": "Jane Smith",
  "customerEmail": "jane.smith@example.com",
  "customerPhone": "(813) 555-1234",
  "paymentScreenshotUrl": "https://blob.vercel-storage.com/screenshot.jpg"
}
```

**Field Requirements:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| trackId | integer | Yes | Valid track ID |
| customerName | string | Yes | Full name |
| customerEmail | string | Yes | Valid email |
| customerPhone | string | No | Phone number |
| paymentScreenshotUrl | string | No | Blob storage URL |

**Success Response (201):**
```json
{
  "success": true,
  "orderId": 15
}
```

**Error Response (404):**
```json
{
  "error": "Track not found"
}
```

**Side Effects:**
- Order record created in database
- Download token generated (24-hour expiry)
- Admin receives email notification
- Admin receives SMS notification

---

### 5. Download Track

Download purchased music track (requires valid token).

**Endpoint:** `GET /api/music/download/[token]`

**Parameters:**
- `token` (path parameter) - Unique download token from email

**Example:** `GET /api/music/download/abc123def456...`

**Success Response (302):**
- Redirects to Blob storage URL
- File download begins

**Error Responses:**

**Invalid Token (404):**
```json
{
  "error": "Invalid download link"
}
```

**Order Not Confirmed (403):**
```json
{
  "error": "Order not yet confirmed. Please wait for payment verification."
}
```

**Token Expired (403):**
```json
{
  "error": "Download link has expired. Please contact support."
}
```

**Download Limit Reached (403):**
```json
{
  "error": "Download limit reached (3 downloads max)"
}
```

**Side Effects:**
- Download count incremented
- If first download: Order status → "completed"

---

## ADMIN APIS

**Authentication Required:** All admin APIs require valid session cookie.

### 1. Get All Quotes

Fetch all quote requests with statistics.

**Endpoint:** `GET /api/admin/quotes`

**Parameters:** None

**Success Response (200):**
```json
{
  "quotes": [
    {
      "id": 44,
      "first_name": "Lisa",
      "last_name": "Rosario",
      "email": "lisa401234@yahoo.com",
      "phone": "224-324-2460",
      "city": "Zephyrhills",
      "event_date": "2026-05-23",
      "status": "quoted",
      "created_at": "2026-01-26T10:30:00.000Z"
    },
    // ... more quotes
  ],
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

**Error Response (401):**
```json
{
  "error": "Unauthorized"
}
```

---

### 2. Get Single Quote

Fetch detailed information for a specific quote.

**Endpoint:** `GET /api/admin/quotes/[id]`

**Parameters:**
- `id` (path parameter) - Quote ID

**Example:** `GET /api/admin/quotes/44`

**Success Response (200):**
```json
{
  "id": 44,
  "first_name": "Lisa",
  "last_name": "Rosario",
  "email": "lisa401234@yahoo.com",
  "phone": "224-324-2460",
  "address": "4829 Allen Rd",
  "city": "Zephyrhills",
  "zip": "33541",
  "event_date": "2026-05-23",
  "start_time": "19:00:00",
  "duration": "1",
  "indoor_outdoor": "indoor",
  "special_request_1": "La Mercedes, LLC",
  "total_price": "750.00",
  "deposit_amount": "375.00",
  "balance_due": "375.00",
  "num_musicians": 3,
  "num_sets": 3,
  "num_breaks": 2,
  "status": "quoted",
  "created_at": "2026-01-26T10:30:00.000Z",
  "updated_at": "2026-01-26T11:45:00.000Z"
}
```

**Error Responses:**

**Not Found (404):**
```json
{
  "error": "Quote not found"
}
```

**Unauthorized (401):**
```json
{
  "error": "Unauthorized"
}
```

---

### 3. Update Quote

Update quote details including pricing and status.

**Endpoint:** `PATCH /api/admin/quotes/[id]`

**Parameters:**
- `id` (path parameter) - Quote ID

**Request Body (all fields optional):**
```json
{
  "first_name": "Lisa",
  "last_name": "Rosario",
  "email": "lisa401234@yahoo.com",
  "phone": "224-324-2460",
  "address": "4829 Allen Rd",
  "city": "Zephyrhills",
  "zip": "33541",
  "event_date": "2026-05-23",
  "start_time": "19:00",
  "duration": "3 hours",
  "indoor_outdoor": "indoor",
  "special_request_1": "Wedding reception",
  "total_price": 800.00,
  "deposit_amount": 400.00,
  "num_musicians": 4,
  "num_sets": 3,
  "num_breaks": 2,
  "status": "quoted"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "quote": {
    "id": 44,
    // ... updated fields
  }
}
```

**Error Response (404):**
```json
{
  "error": "Quote not found"
}
```

**Side Effects:**
- Quote record updated
- `updated_at` timestamp updated
- Balance due recalculated (if pricing changed)

---

### 4. Generate Contract

Generate PDF contract for a quote.

**Endpoint:** `POST /api/admin/quotes/[id]/contracts`

**Parameters:**
- `id` (path parameter) - Quote ID

**Request Body:** None

**Prerequisites:**
- Quote must have `total_price` set
- Quote must have `deposit_amount` set

**Success Response (201):**
```json
{
  "contract_id": 12,
  "quote_id": 44,
  "pdf_url": "https://xxx.public.blob.vercel-storage.com/contracts/unsigned/quote-44-contract.pdf",
  "contract_token": "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
  "signing_url": "https://son2latinmusic.vercel.app/sign/abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
  "created_at": "2026-01-26T12:00:00.000Z"
}
```

**Error Responses:**

**Missing Pricing (400):**
```json
{
  "error": "Please set total_price and deposit_amount before generating contract"
}
```

**Quote Not Found (404):**
```json
{
  "error": "Quote not found"
}
```

**Side Effects:**
- Contract record created in database
- PDF generated and uploaded to Blob storage
- Unique contract token generated
- Signing URL created

---

### 5. Get Latest Contract

Fetch the most recent contract for a quote.

**Endpoint:** `GET /api/admin/quotes/[id]/contracts/latest`

**Parameters:**
- `id` (path parameter) - Quote ID

**Success Response (200):**
```json
{
  "contract_id": 12,
  "quote_id": 44,
  "unsigned_pdf_url": "https://xxx.public.blob.vercel-storage.com/contracts/unsigned/quote-44-contract.pdf",
  "signed_pdf_url": "https://xxx.public.blob.vercel-storage.com/contracts/signed/quote-44-signed.pdf",
  "contract_token": "abc123def456...",
  "signed_at": "2026-01-26T14:30:00.000Z",
  "signature_data": "data:image/png;base64,iVBORw0KGgo...",
  "ip_address": "192.168.1.1",
  "created_at": "2026-01-26T12:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "No contract found for this quote"
}
```

---

### 6. Get All Music Orders

Fetch all music purchase orders.

**Endpoint:** `GET /api/admin/music-orders`

**Parameters:** None

**Success Response (200):**
```json
{
  "orders": [
    {
      "id": 15,
      "customer_name": "Jane Smith",
      "customer_email": "jane.smith@example.com",
      "customer_phone": "(813) 555-1234",
      "track_title": "Anacaona",
      "total_amount": "2.99",
      "payment_screenshot_url": "https://blob.vercel-storage.com/...",
      "order_status": "pending",
      "download_token": "xyz789abc123...",
      "download_count": 0,
      "download_limit": 3,
      "created_at": "2026-01-26T15:00:00.000Z"
    }
  ]
}
```

---

### 7. Update Music Order Status

Approve or reject a music order.

**Endpoint:** `PATCH /api/admin/music-orders/[id]`

**Parameters:**
- `id` (path parameter) - Order ID

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Valid Status Values:**
- `confirmed` - Approve order (sends download link)
- `cancelled` - Reject/cancel order

**Success Response (200):**
```json
{
  "success": true
}
```

**Side Effects (when status = "confirmed"):**
- Order status updated to "confirmed"
- Customer receives email with download link
- Download link valid for 24 hours, 3 downloads

---

## CONTRACT APIS

### 1. Get Contract for Signing

Fetch contract details and PDF for customer to review.

**Endpoint:** `GET /api/contracts/[token]/sign`

**Parameters:**
- `token` (path parameter) - Contract token from signing URL

**Success Response (200):**
```json
{
  "quote": {
    "id": 44,
    "first_name": "Lisa",
    "last_name": "Rosario",
    "event_date": "2026-05-23",
    "total_price": "750.00",
    "deposit_amount": "375.00"
  },
  "contract_url": "https://xxx.public.blob.vercel-storage.com/contracts/unsigned/quote-44-contract.pdf",
  "contract_token": "abc123def456..."
}
```

**Error Response (404):**
```json
{
  "error": "Contract not found"
}
```

---

### 2. Sign Contract

Submit electronic signature to complete contract.

**Endpoint:** `POST /api/contracts/[token]/sign`

**Parameters:**
- `token` (path parameter) - Contract token

**Request Body:**
```json
{
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Field Requirements:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| signature | string | Yes | Data URL of signature image |

**Success Response (200):**
```json
{
  "success": true,
  "signed_pdf_url": "https://xxx.public.blob.vercel-storage.com/contracts/signed/quote-44-signed.pdf",
  "contract_id": 12,
  "quote_id": 44
}
```

**Error Responses:**

**Contract Not Found (404):**
```json
{
  "error": "Contract not found"
}
```

**Already Signed (400):**
```json
{
  "error": "Contract already signed"
}
```

**Missing Signature (400):**
```json
{
  "error": "Signature is required"
}
```

**Side Effects:**
- Signature overlaid on PDF
- Signed PDF uploaded to Blob storage
- Contract record updated with signature data and timestamp
- Quote status updated to "booked"
- Admin receives email notification
- Admin receives SMS notification

---

## ERROR HANDLING

### Standard Error Response Format
```json
{
  "error": "Error message here",
  "details": "Optional additional details"
}
```

### HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET/PATCH request |
| 201 | Created | Successful POST request |
| 302 | Redirect | Download redirect |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Valid auth but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

### Common Error Messages

**Authentication Errors:**
```json
{ "error": "Unauthorized" }
{ "error": "Session expired" }
```

**Validation Errors:**
```json
{ "error": "Missing required fields" }
{ "error": "Invalid email format" }
{ "error": "Invalid date format" }
```

**Business Logic Errors:**
```json
{ "error": "Please set pricing before generating contract" }
{ "error": "Contract already signed" }
{ "error": "Download limit reached" }
{ "error": "Download link has expired" }
```

---

## RATE LIMITING

### Current Limits

**Public APIs:**
- No hard limits currently enforced
- Reasonable use expected

**Admin APIs:**
- No hard limits (session-based protection)

**Download API:**
- 3 downloads per token
- Token expires after 24 hours

### Future Considerations

Potential rate limiting to be implemented:
- 100 requests/hour per IP for public APIs
- 1000 requests/hour for authenticated admin APIs
- Stricter limits on file uploads

---

## TESTING ENDPOINTS

### cURL Examples

**Submit Quote:**
```bash
curl -X POST https://son2latinmusic.vercel.app/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "3525754933",
    "eventDate": "2026-06-15"
  }'
```

**Get Tracks:**
```bash
curl https://son2latinmusic.vercel.app/api/music/tracks
```

**Get Single Track:**
```bash
curl https://son2latinmusic.vercel.app/api/music/tracks/1
```

### JavaScript/Fetch Examples

**Submit Quote:**
```javascript
const response = await fetch('/api/quotes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '3525754933',
    eventDate: '2026-06-15'
  })
});

const data = await response.json();
console.log('Quote ID:', data.id);
```

**Get Tracks:**
```javascript
const response = await fetch('/api/music/tracks');
const data = await response.json();
console.log('Tracks:', data.tracks);
```

**Admin - Get Quotes:**
```javascript
const response = await fetch('/api/admin/quotes', {
  credentials: 'include' // Include session cookie
});
const data = await response.json();
console.log('Quotes:', data.quotes);
console.log('Stats:', data.stats);
```

---

## WEBHOOKS

**Status:** Not currently implemented

**Future:** Potential webhooks for:
- Quote status changes
- Contract signed events
- Payment received events
- Music order completed events

---

## API CHANGELOG

**Version 1.0 (January 2026):**
- Initial API release
- Quote management endpoints
- Music store endpoints
- Contract generation and signing
- Admin endpoints

---

**Document Version:** 1.0  
**Last Updated:** January 26, 2026