# SON2 LATIN MUSIC - USER GUIDE

**Version:** 1.0  
**Last Updated:** January 26, 2026  
**Audience:** Band Manager, Admin Users

---

## TABLE OF CONTENTS

1. [Getting Started](#getting-started)
2. [Admin Login](#admin-login)
3. [Dashboard Overview](#dashboard-overview)
4. [Managing Quotes](#managing-quotes)
5. [Contract Management](#contract-management)
6. [Music Store Orders](#music-store-orders)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## GETTING STARTED

### System Requirements

**Web Browser:**
- Chrome (recommended)
- Firefox
- Safari
- Edge

**Device:**
- Desktop computer (recommended)
- Laptop
- Tablet (limited functionality)
- Mobile phone (view only)

### Accessing the Admin Panel

**Production URL:** https://son2latinmusic.vercel.app/admin/login

**Local Development:** http://localhost:3000/admin/login

---

## ADMIN LOGIN

### Step 1: Navigate to Login Page

1. Open web browser
2. Go to: `https://son2latinmusic.vercel.app/admin/login`
3. You'll see the SON2 Latin Music login screen

### Step 2: Enter Credentials

**Fields:**
- **Username:** Your admin username
- **Password:** Your admin password

**Click:** "Sign In" button

### Step 3: Access Dashboard

After successful login, you'll be redirected to the admin dashboard.

**Session Duration:** 30 days (you'll stay logged in)

### Logging Out

1. Click your name in the top-right corner
2. Click "Sign Out" button
3. You'll be redirected to the login page

---

## DASHBOARD OVERVIEW

### Dashboard URL
`https://son2latinmusic.vercel.app/admin/dashboard`

### Stats Cards (Top Section)

**6 Statistics Displayed:**

1. **Total Quotes** - All quote requests received
2. **Pending** (Yellow) - New requests awaiting review
3. **Quoted** (Blue) - Price provided to customer
4. **Booked** (Green) - Contract signed
5. **Deposit Paid** (Purple) - Deposit received
6. **Fully Booked** (Emerald) - Signed + fully paid

### Status Filter Buttons

**Click any button to filter quotes:**
- All - Shows all quotes
- Pending - Shows only pending quotes
- Quoted - Shows only quoted quotes
- Booked - Shows only booked quotes
- Deposit Paid - Shows only deposit paid
- Fully Booked - Shows only fully booked

### Quote Table

**Columns:**
- **Customer** - Name of the person requesting quote
- **Contact** - Email and phone number
- **Event Date** - Date of the event
- **Location** - City where event will be held
- **Status** - Current status with color badge
- **Submitted** - When quote was submitted
- **Action** - "View Details →" button

**Actions:**
- Click "View Details →" to open full quote information

---

## MANAGING QUOTES

### Viewing Quote Details

**Step 1:** Click "View Details →" on any quote from dashboard

**You'll see 4 main sections:**

#### 1. Customer Information
- First Name
- Last Name
- Email
- Phone
- Address
- City
- ZIP Code

#### 2. Event Location
- Full address details
- City and ZIP

#### 3. Event Details
- Event Date
- Start Time
- Duration
- Indoor/Outdoor setting
- Special Requests

#### 4. Pricing & Status
- Quote Status (dropdown)
- Total Price
- Deposit Amount
- Balance Due (auto-calculated)
- Number of Musicians
- Number of Sets
- Number of Breaks

### Editing a Quote

**Step 1:** Click "Edit Quote" button (orange, top-right)

**Step 2:** All fields become editable

**You can change:**
- Customer contact information
- Event details (date, time, duration)
- Pricing (total price, deposit)
- Band configuration (musicians, sets, breaks)
- Status

**Step 3:** Make your changes

**Step 4:** Click "Save Changes" (green button)

**OR** Click "Cancel" to discard changes

**Result:** Quote is updated, changes saved to database

### Changing Quote Status

**Status Flow:**
1. **Pending** - Initial state when customer submits
2. **Quoted** - After you provide pricing
3. **Booked** - After customer signs contract
4. **Deposit Paid** - After deposit received
5. **Fully Booked** - After full payment received
6. **Completed** - After event is done
7. **Cancelled** - If booking is cancelled

**How to Change:**
1. Click "Edit Quote"
2. Select new status from "Quote Status" dropdown
3. Click "Save Changes"

### Setting Pricing

**Important:** Set pricing before generating contract!

**Steps:**
1. Click "Edit Quote"
2. Enter **Total Price** (e.g., 750.00)
3. Enter **Deposit Amount** (e.g., 375.00)
4. Balance Due is calculated automatically
5. Click "Save Changes"

**Example Pricing:**
- 3-hour event: $750
- 4-hour event: $1,000
- 5-hour event: $1,300
- Additional hours: $250/hour
- Deposit: 50% of total

---

## CONTRACT MANAGEMENT

### Generating a Contract

**Prerequisites:**
- Quote must have Total Price set
- Quote must have Deposit Amount set

**Steps:**

1. Open quote details
2. Ensure pricing is set
3. Click "Generate Contract" button (green)
4. Wait 2-3 seconds for PDF generation
5. Success message appears
6. Contract PDF link now visible

**Result:**
- Unsigned PDF is created
- Contract token is generated
- Ready to send to customer

### Viewing the Contract

**Option 1: View PDF**
- Click "View Contract" button (blue)
- PDF opens in new tab
- Review before sending to customer

**Option 2: Download PDF**
- Right-click "View Contract"
- Select "Save Link As..."
- Save to your computer

### Sending Contract to Customer

**Step 1:** Click "Copy Signing Link" button (purple)

**Step 2:** Link is copied to clipboard
```
https://son2latinmusic.vercel.app/sign/abc123def456...
```

**Step 3:** Send link to customer via:
- Email
- Text message
- Any messaging app

**Step 4:** Customer receives link, opens it, reviews contract, and signs

### After Customer Signs

**Automatic Updates:**
- Quote status changes to "Booked"
- Signed PDF is created and stored
- You receive email notification
- You receive SMS notification

**You'll see:**
- "Contract Signed" status
- Link to signed PDF
- Timestamp of when it was signed

### Downloading Signed Contract

1. Open quote details
2. Click "View Signed Contract" button
3. PDF opens in new tab
4. Right-click → Save to download

---

## MUSIC STORE ORDERS

### Accessing Music Orders

**From Dashboard:**
1. Click "Music Orders" in navigation (or create link)
2. Or go directly to: `https://son2latinmusic.vercel.app/admin/music-orders`

### Orders Table

**Columns:**
- **Order** - Order ID and timestamp
- **Customer** - Name, email, phone
- **Track** - Song title purchased
- **Amount** - Price paid
- **Status** - Order status badge
- **Downloads** - Download count (e.g., 0/3)
- **Actions** - Buttons for order management

### Order Statuses

**Pending (Yellow):**
- New order, payment pending
- Customer has submitted order
- Awaiting your approval

**Confirmed (Green):**
- Payment verified
- Download link sent to customer
- Customer can download

**Completed (Blue):**
- Customer has downloaded track
- Order fulfilled

**Cancelled (Red):**
- Order was cancelled
- No download provided

### Approving an Order

**For Pending Orders:**

**Step 1:** View order details

**Step 2:** Check payment screenshot (if provided)
- Click 🔗 icon to view screenshot
- Verify payment in your Zelle account

**Step 3:** Click ✅ (green checkmark) button

**Result:**
- Order status → "Confirmed"
- Customer receives email with download link
- Download link valid for 24 hours, 3 downloads max

### Rejecting an Order

**Step 1:** Click ❌ (red X) button

**Step 2:** Confirm cancellation

**Result:**
- Order status → "Cancelled"
- Customer is notified (optional)

### Copying Download Link

**For Confirmed Orders:**

**Step 1:** Click "Copy Link" button

**Step 2:** Link copied to clipboard
```
https://son2latinmusic.vercel.app/api/music/download/abc123...
```

**Step 3:** Send link manually if needed

**Note:** Link expires in 24 hours, limited to 3 downloads

---

## COMMON TASKS

### Task 1: Processing a New Quote Request

**You receive email/SMS notification**

1. Click link in email/SMS
2. Opens quote details page
3. Review customer information
4. Review event details
5. Calculate pricing
6. Click "Edit Quote"
7. Enter Total Price and Deposit Amount
8. Change status to "Quoted"
9. Click "Save Changes"
10. Contact customer with quote

### Task 2: Creating and Sending a Contract

**Customer accepts quote**

1. Open quote details
2. Verify pricing is set
3. Click "Generate Contract"
4. Wait for PDF generation
5. Click "View Contract" to review
6. Click "Copy Signing Link"
7. Send link to customer via email/text
8. Wait for customer to sign

**Customer signs contract**

9. You receive notification
10. Open quote details
11. Status automatically updated to "Booked"
12. Click "View Signed Contract" to see signed version

### Task 3: Processing a Music Order

**You receive order notification**

1. Go to Music Orders page
2. Find new pending order
3. Click 🔗 to view payment screenshot
4. Check your Zelle account for payment
5. Verify payment matches order amount
6. Click ✅ to approve order
7. Customer receives download link automatically

### Task 4: Following Up on Deposit

**After contract is signed**

1. Open quote details
2. Note deposit amount due
3. Contact customer for deposit
4. Receive payment via Zelle
5. Click "Edit Quote"
6. Change status to "Deposit Paid"
7. Click "Save Changes"

### Task 5: Completing a Booking

**After event is finished**

1. Open quote details
2. Verify full payment received
3. Click "Edit Quote"
4. Change status to "Completed"
5. Click "Save Changes"

---

## TROUBLESHOOTING

### Cannot Login

**Problem:** Username/password not working

**Solutions:**
1. Verify username spelling (case-sensitive)
2. Verify password (case-sensitive)
3. Clear browser cookies
4. Try incognito/private window
5. Contact developer for password reset

### Quote Not Showing in Dashboard

**Problem:** Quote submitted but not visible

**Solutions:**
1. Refresh the page (Ctrl+R or Cmd+R)
2. Clear browser cache
3. Check spam folder for notification email
4. Verify quote was actually submitted

### Contract Generation Fails

**Problem:** "Generate Contract" button doesn't work

**Solutions:**
1. Verify Total Price is set
2. Verify Deposit Amount is set
3. Refresh the page
4. Try again after 1 minute
5. Check browser console for errors

### Email Notifications Not Received

**Problem:** Not receiving email notifications

**Solutions:**
1. Check spam/junk folder
2. Add onboarding@resend.dev to contacts
3. Verify ADMIN_EMAIL in environment variables
4. Check Vercel logs for errors

### SMS Notifications Not Received

**Problem:** Not receiving SMS notifications

**Solutions:**
1. Verify phone number is correct
2. Verify SMS gateway email is correct
3. Check if carrier supports email-to-SMS
4. Try sending test notification

### Download Link Expired

**Problem:** Customer says download link doesn't work

**Solutions:**
1. Check if 24 hours have passed
2. Check if download limit (3) reached
3. Generate new order if needed
4. Manually send file via email as alternative

### Wrong Event Date Displayed

**Problem:** Date shows one day earlier/later

**Solutions:**
- Fixed in latest version
- Refresh browser cache
- Update to latest deployment

### Cannot Edit Quote

**Problem:** "Edit Quote" button not working

**Solutions:**
1. Verify you're logged in
2. Refresh the page
3. Clear browser cache
4. Try different browser

---

## KEYBOARD SHORTCUTS

**Dashboard:**
- `Ctrl+R` / `Cmd+R` - Refresh page
- `Esc` - Close modals/popups

**Quote Editing:**
- `Tab` - Move to next field
- `Shift+Tab` - Move to previous field
- `Ctrl+S` / `Cmd+S` - Save changes (if supported)

---

## BEST PRACTICES

### Quote Management
✅ Respond to quotes within 24 hours  
✅ Always set pricing before generating contract  
✅ Review contract before sending to customer  
✅ Keep special requests notes detailed  
✅ Update status as booking progresses

### Contract Management
✅ Generate contracts only when pricing is finalized  
✅ Review contract PDF before sending  
✅ Send signing link via secure method  
✅ Follow up if customer doesn't sign within 3 days  
✅ Download and save signed contracts locally

### Music Orders
✅ Verify payment before approving order  
✅ Approve orders within 24 hours  
✅ Keep payment screenshots for records  
✅ Monitor download counts  
✅ Respond to customer inquiries promptly

---

## SUPPORT

**For Technical Issues:**
- Contact: Developer
- Email: [developer email]

**For Business Questions:**
- Contact: Francisco Moreno
- Email: son2latinmusic@gmail.com
- Phone: (352) 575-4933 or (352) 575-5439

---

## APPENDIX

### A. Status Color Guide

**Quote Statuses:**
- 🟡 Yellow - Pending
- 🔵 Blue - Quoted
- 🟢 Green - Booked
- 🟣 Purple - Deposit Paid
- 🟢 Emerald - Fully Booked
- ⚫ Gray - Completed
- 🔴 Red - Cancelled

**Music Order Statuses:**
- 🟡 Yellow - Pending
- 🟢 Green - Confirmed
- 🔵 Blue - Completed
- 🔴 Red - Cancelled

### B. Pricing Guidelines

**Base Rates:**
- 3-hour event: $750
- 4-hour event: $1,000
- 5-hour event: $1,300

**Additional Services:**
- Extra hour: +$250
- Extra musician: +$150
- Special equipment: Varies

**Deposit:**
- Standard: 50% of total
- Rush booking: 100%

### C. Quick Reference

**Important URLs:**
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Quote Details: `/admin/quotes/[id]`
- Music Orders: `/admin/music-orders`
- Contract Signing: `/sign/[token]`

**Email Addresses:**
- Admin: son2latinmusic@gmail.com
- Zelle: son2latinmusic@gmail.com
- SMS Gateway: 3525755439@tmomail.net

---

**Document Version:** 1.0  
**Last Updated:** January 26, 2026