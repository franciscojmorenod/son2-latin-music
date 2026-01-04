import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trackId, customerName, customerEmail, customerPhone, paymentScreenshotUrl } = body;

    // Generate download token
    const downloadToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

    // Get track price
    const trackResult = await sql`
      SELECT price, title FROM music_tracks WHERE id = ${trackId}
    `;

    if (trackResult.rows.length === 0) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 });
    }

    const totalAmount = trackResult.rows[0].price;

    // Insert order
    const result = await sql`
      INSERT INTO music_orders (
        track_id, customer_name, customer_email, customer_phone,
        payment_screenshot_url, download_token, token_expires_at, total_amount
      )
      VALUES (
        ${trackId}, ${customerName}, ${customerEmail}, ${customerPhone || null},
        ${paymentScreenshotUrl || null}, ${downloadToken}, ${expiresAt}, ${totalAmount}
      )
      RETURNING id
    `;

    console.log('✅ Music order created:', result.rows[0].id);

    return NextResponse.json({ 
      success: true, 
      orderId: result.rows[0].id 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}