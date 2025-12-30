import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Insert quote into database
    const result = await sql`
      INSERT INTO quote_requests (
        first_name,
        last_name,
        company_name,
        email,
        phone,
        address,
        city,
        zip,
        event_date,
        start_time,
        duration,
        event_type,
        indoor_outdoor,
        special_request_1,
        status
      ) VALUES (
        ${data.firstName},
        ${data.lastName},
        ${data.company || null},
        ${data.email},
        ${data.phone},
        ${data.address},
        ${data.city},
        ${data.zip},
        ${data.eventDate},
        ${data.startTime},
        ${data.duration},
        ${data.eventType || null},
        ${data.indoorOutdoor || null},
        ${data.message || null},
        'pending'
      )
      RETURNING id
    `;

    return NextResponse.json({ 
      success: true, 
      quoteId: result.rows[0].id,
      message: 'Quote submitted successfully!' 
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit quote' },
      { status: 500 }
    );
  }
}