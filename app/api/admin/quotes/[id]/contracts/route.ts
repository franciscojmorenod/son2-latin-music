import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { generateContract } from '@/lib/pdfGenerator';
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quoteResult = await sql`
      SELECT * FROM quote_requests
      WHERE id = ${parseInt(params.id)}
    `;

    if (quoteResult.rows.length === 0) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    const quote = quoteResult.rows[0];

    if (!quote.total_price || !quote.deposit_amount) {
      return NextResponse.json({ 
        error: 'Quote must have pricing set before generating contract' 
      }, { status: 400 });
    }

    const contractData = {
      quote_id: quote.id,
      customer_name: `${quote.first_name} ${quote.last_name}`,
      customer_email: quote.email,
      customer_phone: quote.phone,
      customer_address: quote.address,
      customer_city: quote.city,
      customer_zip: quote.zip,
      event_date: quote.event_date,
      event_time: new Date(`2000-01-01T${quote.start_time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      event_duration: quote.duration,
      event_location: `${quote.address}, ${quote.city}, FL ${quote.zip}`,
      total_price: parseFloat(quote.total_price.toString()),
      deposit_amount: parseFloat(quote.deposit_amount.toString()),
      balance_due: parseFloat(quote.balance_due?.toString() || '0'),
      num_musicians: quote.num_musicians,
      num_sets: quote.num_sets,
      num_breaks: quote.num_breaks,
      special_requests: quote.special_request_1,
    };

    console.log('Generating PDF contract...');
    
    const pdfBytes = await generateContract(contractData);
    
    console.log('PDF generated, uploading to Blob storage...');
    
    const contractToken = uuidv4();
    
    const blob = await put(`contracts/contract-${quote.id}-${contractToken}.pdf`, Buffer.from(pdfBytes), {
      access: 'public',
      contentType: 'application/pdf',
    });
    
    console.log('PDF uploaded to:', blob.url);
    
    const contractResult = await sql`
      INSERT INTO contracts (
        quote_id,
        contract_token,
        status,
        sent_at,
        expires_at,
        unsigned_pdf_url,
        contract_data
      ) VALUES (
        ${quote.id},
        ${contractToken},
        'generated',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + INTERVAL '30 days',
        ${blob.url},
        ${JSON.stringify(contractData)}
      )
      RETURNING id, contract_token
    `;
    
    const contract = contractResult.rows[0];
    
    await sql`
      UPDATE quote_requests
      SET status = 'quoted'
      WHERE id = ${quote.id}
    `;
    
    return NextResponse.json({
      success: true,
      contract_id: contract.id,
      contract_token: contract.contract_token,
      pdf_url: blob.url,
      signing_url: `/sign/${contract.contract_token}`
    });

  } catch (error: any) {
    console.error('Error generating contract:', error);
    return NextResponse.json(
      { error: 'Failed to generate contract', details: error.message },
      { status: 500 }
    );
  }
}