import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sql`
      SELECT 
        mo.id,
        mo.customer_name,
        mo.customer_email,
        mo.customer_phone,
        mo.payment_screenshot_url,
        mo.order_status,
        mo.download_token,
        mo.download_count,
        mo.download_limit,
        mo.total_amount,
        mo.created_at,
        mt.title as track_title
      FROM music_orders mo
      JOIN music_tracks mt ON mo.track_id = mt.id
      ORDER BY mo.created_at DESC
    `;

    return NextResponse.json({ orders: result.rows });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}