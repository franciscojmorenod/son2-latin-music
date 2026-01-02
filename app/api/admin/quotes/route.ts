import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sql`
      SELECT 
        id,
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
        status,
        created_at
      FROM quote_requests
      ORDER BY created_at DESC
    `;

    const quotes = result.rows;

    // Calculate stats for all statuses
    const stats = {
      total: quotes.length,
      pending: quotes.filter(q => q.status === 'pending').length,
      quoted: quotes.filter(q => q.status === 'quoted').length,
      booked: quotes.filter(q => q.status === 'booked').length,
      deposit_paid: quotes.filter(q => q.status === 'deposit_paid').length,
      fully_booked: quotes.filter(q => q.status === 'fully_booked').length,
    };

    return NextResponse.json({ quotes, stats });
  } catch (error: any) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}