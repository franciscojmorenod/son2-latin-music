import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const result = await sql`
      SELECT 
        id,
        quote_id,
        contract_token,
        status,
        unsigned_pdf_url,
        signed_pdf_url,
        signed_at,
        signer_ip,
        expires_at,
        contract_data
      FROM contracts
      WHERE contract_token = ${params.token}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error fetching contract:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contract' },
      { status: 500 }
    );
  }
}