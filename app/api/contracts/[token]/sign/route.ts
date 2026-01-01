import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { put } from '@vercel/blob';
import { PDFDocument } from 'pdf-lib';

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const body = await request.json();
    const { signature } = body;

    if (!signature) {
      return NextResponse.json({ error: 'Signature required' }, { status: 400 });
    }

    // Fetch contract
    const contractResult = await sql`
      SELECT * FROM contracts
      WHERE contract_token = ${params.token}
    `;

    if (contractResult.rows.length === 0) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    const contract = contractResult.rows[0];

    // Check if already signed
    if (contract.status === 'signed') {
      return NextResponse.json({ error: 'Contract already signed' }, { status: 400 });
    }

    // Check if expired
    if (new Date(contract.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Contract has expired' }, { status: 400 });
    }

    console.log('Fetching unsigned PDF from:', contract.unsigned_pdf_url);

    // Fetch the unsigned PDF
    const pdfResponse = await fetch(contract.unsigned_pdf_url);
    if (!pdfResponse.ok) {
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
    const { width, height } = secondPage.getSize();
    const margin = 50;
    const col1X = margin + 20;
    
    // Position signature above the client signature line
    // Based on our layout: signatures section is around y=400, signature line at y=360
    const signatureY = 365; // Just above the signature line
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

    console.log('Updating database...');

    // Update contract in database
    await sql`
      UPDATE contracts
      SET 
        status = 'signed',
        signed_pdf_url = ${blob.url},
        signed_at = CURRENT_TIMESTAMP,
        signer_ip = ${ip}
      WHERE contract_token = ${params.token}
    `;

    // Update quote status to booked
    await sql`
      UPDATE quote_requests
      SET status = 'booked'
      WHERE id = ${contract.quote_id}
    `;

    console.log('Contract signed successfully!');

    return NextResponse.json({
      success: true,
      signed_pdf_url: blob.url,
      message: 'Contract signed successfully'
    });

  } catch (error: any) {
    console.error('Error signing contract:', error);
    return NextResponse.json(
      { error: 'Failed to sign contract', details: error.message },
      { status: 500 }
    );
  }
}