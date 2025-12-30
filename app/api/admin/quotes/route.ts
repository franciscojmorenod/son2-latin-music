import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all quotes
    const quotesResult = await sql`
      SELECT 
        id, first_name, last_name, email, phone, 
        city, event_date, status, created_at
      FROM quote_requests
      ORDER BY created_at DESC
      LIMIT 50
    `;

    // Calculate stats
    const statsResult = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'quoted') as quoted,
        COUNT(*) FILTER (WHERE status = 'booked') as booked
      FROM quote_requests
    `;

    return NextResponse.json({
      quotes: quotesResult.rows,
      stats: {
        total: parseInt(statsResult.rows[0].total),
        pending: parseInt(statsResult.rows[0].pending),
        quoted: parseInt(statsResult.rows[0].quoted),
        booked: parseInt(statsResult.rows[0].booked),
      }
    });

  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}