import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    console.log('Download request for token:', params.token);

    // Get order details
    const result = await sql`
      SELECT 
        mo.id as order_id,
        mo.download_count,
        mo.download_limit,
        mo.token_expires_at,
        mo.order_status,
        mt.title,
        mt.full_track_blob_url
      FROM music_orders mo
      JOIN music_tracks mt ON mo.track_id = mt.id
      WHERE mo.download_token = ${params.token}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid download link' }, { status: 404 });
    }

    const order = result.rows[0];

    // Check if order is confirmed
    if (order.order_status !== 'confirmed' && order.order_status !== 'completed') {
      return NextResponse.json({ 
        error: 'Order not yet confirmed. Please wait for payment verification.' 
      }, { status: 403 });
    }

    // Check if token expired
    if (new Date(order.token_expires_at) < new Date()) {
      return NextResponse.json({ 
        error: 'Download link has expired. Please contact support.' 
      }, { status: 403 });
    }

    // Check download limit
    if (order.download_count >= order.download_limit) {
      return NextResponse.json({ 
        error: `Download limit reached (${order.download_limit} downloads max)` 
      }, { status: 403 });
    }

    // Check if full track URL exists
    if (!order.full_track_blob_url) {
      return NextResponse.json({ 
        error: 'Track file not available. Please contact support.' 
      }, { status: 404 });
    }

    // Increment download count
    await sql`
      UPDATE music_orders
      SET 
        download_count = download_count + 1,
        order_status = 'completed',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${order.order_id}
    `;

    // Redirect to the blob URL for download
    return NextResponse.redirect(order.full_track_blob_url);

  } catch (error: any) {
    console.error('Error processing download:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}