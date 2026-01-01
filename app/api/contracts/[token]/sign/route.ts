import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { PDFDocument } from 'pdf-lib';

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    console.log('=== SIGNING CONTRACT ===');
    console.log('Token:', params.token);
    
    const body = await request.json();
    const { signature } = body;

    if (!signature) {
      return NextResponse.json({ error: 'Signature required' }, { status: 400 });
    }

    console.log('Fetching contract from database...');

    // Fetch contract
    const contractResult = await sql`
      SELECT * FROM contracts
      WHERE contract_token = ${params.token}
    `;

    if (contractResult.rows.length === 0) {
      console.log('Contract not found');
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    const contract = contractResult.rows[0];
    console.log('Contract found:', contract.id, 'Status:', contract.status);

    // Check if already signed
    if (contract.status === 'signed') {
      console.log('Contract already signed');
      return NextResponse.json({ error: 'Contract already signed' }, { status: 400 });
    }

    // Check if expired
    if (new Date(contract.expires_at) < new Date()) {
      console.log('Contract expired');
      return NextResponse.json({ error: 'Contract has expired' }, { status: 400 });
    }

    console.log('Fetching unsigned PDF from:', contract.unsigned_pdf_url);

    // Fetch the unsigned PDF
    const pdfResponse = await fetch(contract.unsigned_pdf_url);
    if (!pdfResponse.ok) {
      console.log('Failed to fetch PDF');
      throw new Error('Failed to fetch unsigned PDF');
    }
    const pdfBytes = await pdfResponse.arrayBuffer();

    console.log('Loading PDF document...');

    // Load PDF
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const secondPage = pages[1]; // Page 2 (0-indexed)

    console.log('Processing signature image...');

    // Convert base64 signature to image
    const signatureImageBytes = await fetch(signature).then(res => res.arrayBuffer());
    const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

    console.log('Adding signature to PDF...');

    // Add signature to page 2 (client signature area)
    const { width } = secondPage.getSize();
    const margin = 50;
    const col1X = margin + 20;
    
    // Position signature above the client signature line
    const signatureY = 365;
    const signatureWidth = 150;
    const signatureHeight = 40;

    secondPage.drawImage(signatureImage, {
      x: col1X + 10,
      y: signatureY,
      width: signatureWidth,
      height: signatureHeight,
    });

    console.log('Saving signed PDF...');

    // Save the modified PDF
    const signedPdfBytes = await pdfDoc.save();

    console.log('Uploading signed PDF to Blob storage...');

    // Upload signed PDF to Blob
    const blob = await put(
      `contracts/signed-contract-${contract.quote_id}-${params.token}.pdf`,
      Buffer.from(signedPdfBytes),
      {
        access: 'public',
        contentType: 'application/pdf',
      }
    );

    console.log('Signed PDF uploaded to:', blob.url);

    // Get client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    console.log('Updating contract in database...');

    // Update contract in database
    const updateResult = await sql`
      UPDATE contracts
      SET 
        status = 'signed',
        signed_pdf_url = ${blob.url},
        signed_at = CURRENT_TIMESTAMP,
        signer_ip = ${ip}
      WHERE contract_token = ${params.token}
      RETURNING id, status, signed_pdf_url, signed_at
    `;

    console.log('Contract update result:', updateResult.rows[0]);

    if (updateResult.rowCount === 0) {
      console.log('WARNING: Contract update affected 0 rows!');
      throw new Error('Failed to update contract');
    }

    console.log('Updating quote status to booked...');

    // Update quote status to booked
    const quoteUpdateResult = await sql`
      UPDATE quote_requests
      SET status = 'booked'
      WHERE id = ${contract.quote_id}
      RETURNING id, status
    `;

    console.log('Quote update result:', quoteUpdateResult.rows[0]);

    console.log('=== CONTRACT SIGNED SUCCESSFULLY ===');

    return NextResponse.json({
      success: true,
      signed_pdf_url: blob.url,
      status: 'signed',
      signed_at: updateResult.rows[0].signed_at,
      message: 'Contract signed successfully'
    });

  } catch (error: any) {
    console.error('!!! ERROR SIGNING CONTRACT !!!');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: 'Failed to sign contract', details: error.message },
      { status: 500 }
    );
  }
}