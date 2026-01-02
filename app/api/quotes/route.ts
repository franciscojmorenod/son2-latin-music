import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { notifyNewQuoteRequest } from '@/lib/notifications/sendNotifications';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📥 Received quote data:', body);
    
    // Accept both camelCase and snake_case field names
    const first_name = body.first_name || body.firstName;
    const last_name = body.last_name || body.lastName;
    const email = body.email;
    const phone = body.phone;
    const address = body.address;
    const city = body.city;
    const zip = body.zip;
    const event_date = body.event_date || body.eventDate;
    const start_time = body.start_time || body.startTime;
    const duration = body.duration;
    const indoor_outdoor = body.indoor_outdoor || body.indoorOutdoor;
    const special_request_1 = body.special_request_1 || body.specialRequest1 || body.specialRequest;

    // Validate required fields
    if (!first_name || !last_name || !email || !phone) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        received: body 
      }, { status: 400 });
    }

    // Insert quote into database
    const result = await sql`
      INSERT INTO quote_requests (
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        zip,
        event_date,
        start_time,
        duration,
        indoor_outdoor,
        special_request_1,
        status
      )
      VALUES (
        ${first_name},
        ${last_name},
        ${email},
        ${phone},
        ${address},
        ${city},
        ${zip},
        ${event_date},
        ${start_time},
        ${duration},
        ${indoor_outdoor},
        ${special_request_1},
        'pending'
      )
      RETURNING *
    `;

    const newQuote = result.rows[0];
    
    console.log('✅ Quote created:', newQuote.id);
    console.log('📧 Sending notifications...');

 // Fire and forget - don't await, don't block response
setImmediate(() => {
  notifyNewQuoteRequest({
    quoteId: newQuote.id,
    customerName: `${newQuote.first_name} ${newQuote.last_name}`,
    customerEmail: newQuote.email,
    customerPhone: newQuote.phone,
    eventDate: new Date(newQuote.event_date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    eventLocation: `${newQuote.city}, FL`
  }).catch(err => console.error('❌ Notification error:', err));
});

return NextResponse.json(newQuote, { status: 201 });
  } catch (error: any) {
    console.error('❌ Error creating quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote', details: error.message },
      { status: 500 }
    );
  }
}