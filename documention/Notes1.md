 HOW TO LOOK AT THE DATABASE
Access Neon Database Console:

Go to: https://console.neon.tech
Login with your account
Click your project name
Click "SQL Editor" in the left sidebar
You'll see all your tables!

View Quote Records:
Run this query:
sqlSELECT 
  id,
  first_name,
  last_name,
  email,
  phone,
  event_date,
  start_time,
  city,
  status,
  created_at
FROM quote_requests
ORDER BY created_at DESC
LIMIT 20;
This shows the 20 most recent quotes with their dates.

3️⃣ YES! YOU CAN MANUALLY EDIT THE DATABASE
FIX A SPECIFIC QUOTE DATE:
sql-- Fix quote #7's date from May 22 to May 23
UPDATE quote_requests
SET event_date = '2026-05-23'
WHERE id = 7;
FIX MULTIPLE QUOTES (Add 1 Day to All Wrong Dates):
sql-- Add 1 day to all dates that are off by 1 day
UPDATE quote_requests
SET event_date = event_date + INTERVAL '1 day'
WHERE event_date < CURRENT_DATE + INTERVAL '1 month';
-- This affects recent quotes only (safety filter)
VIEW QUOTES WITH WRONG DATES:
sql-- See which quotes might have wrong dates
SELECT 
  id,
  first_name,
  last_name,
  event_date,
  EXTRACT(DOW FROM event_date) as day_of_week,
  TO_CHAR(event_date, 'Day, Month DD, YYYY') as formatted_date
FROM quote_requests
ORDER BY event_date DESC
LIMIT 10;
Day of week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday

🔍 CHECK IF EDIT QUOTE EXISTS
powershell# Find edit/update quote files
Get-ChildItem -Path app -Recurse -Filter "*.tsx" | Where-Object { $_.FullName -like "*quote*" -and $_.FullName -like "*edit*" }
Or check your admin dashboard:

Go to: http://localhost:3000/admin/quotes
Click on a quote
Is there an "Edit" button?

If yes, share the edit page file and I'll fix the date issue there too!

📊 QUICK DATABASE COMMANDS
View all tables:
sqlSELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
View table structure:
sqlSELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'quote_requests';
Count quotes by status:
sqlSELECT status, COUNT(*) 
FROM quote_requests 
GROUP BY status;

Do you have an edit quote page? If so, where is it? 🔍