import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { sql } from '@vercel/postgres';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sql`
      SELECT * FROM quote_requests
      WHERE id = ${parseInt(params.id)}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);

  } catch (error: any) {
    console.error('Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    console.log('Updating quote:', params.id, data);

    // Calculate balance due
    const balance_due = data.total_price && data.deposit_amount 
      ? data.total_price - data.deposit_amount 
      : null;

    await sql`
      UPDATE quote_requests
      SET 
        total_price = ${data.total_price},
        deposit_amount = ${data.deposit_amount},
        balance_due = ${balance_due},
        num_musicians = ${data.num_musicians},
        num_sets = ${data.num_sets},
        num_breaks = ${data.num_breaks},
        status = ${data.status},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${parseInt(params.id)}
    `;

    console.log('Quote updated successfully');
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error updating quote:', error);
    return NextResponse.json(
      { error: 'Failed to update quote', details: error.message },
      { status: 500 }
    );
  }
}