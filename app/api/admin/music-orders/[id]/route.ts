import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { sql } from '@vercel/postgres';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    // Update order status
    await sql`
      UPDATE music_orders
      SET 
        order_status = ${status},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
    `;

    // If confirmed, send email to customer with download link
    if (status === 'confirmed') {
      const orderResult = await sql`
        SELECT 
          mo.customer_name,
          mo.customer_email,
          mo.download_token,
          mt.title as track_title
        FROM music_orders mo
        JOIN music_tracks mt ON mo.track_id = mt.id
        WHERE mo.id = ${params.id}
      `;

      if (orderResult.rows.length > 0) {
        const order = orderResult.rows[0];
        const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/music/download/${order.download_token}`;

        // TODO: Send email with download link
        // For now, just log it
        console.log(`Send download link to ${order.customer_email}: ${downloadLink}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}