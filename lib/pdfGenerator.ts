import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface ContractData {
  quote_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_zip: string;
  event_date: string;
  event_time: string;
  event_duration: string;
  event_location: string;
  total_price: number;
  deposit_amount: number;
  balance_due: number;
  num_musicians: number;
  num_sets: number;
  num_breaks: number;
  special_requests?: string;
}

export async function generateContract(data: ContractData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const black = rgb(0, 0, 0);
  const darkGray = rgb(0.3, 0.3, 0.3);
  const primaryColor = rgb(0.8, 0.2, 0.2);
  
  let yPosition = height - 50;
  
  page.drawText('SON2 LATIN MUSIC', {
    x: 50,
    y: yPosition,
    size: 24,
    font: boldFont,
    color: primaryColor,
  });
  
  yPosition -= 20;
  page.drawText('PERFORMANCE CONTRACT', {
    x: 50,
    y: yPosition,
    size: 16,
    font: boldFont,
    color: black,
  });
  
  yPosition -= 10;
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: width - 50, y: yPosition },
    thickness: 2,
    color: primaryColor,
  });
  
  yPosition -= 30;
  
  page.drawText(`Contract #${data.quote_id}`, {
    x: 50,
    y: yPosition,
    size: 10,
    font: font,
    color: darkGray,
  });
  
  page.drawText(`Date: ${new Date().toLocaleDateString()}`, {
    x: width - 150,
    y: yPosition,
    size: 10,
    font: font,
    color: darkGray,
  });
  
  yPosition -= 30;
  
  page.drawText('CLIENT INFORMATION', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: black,
  });
  
  yPosition -= 20;
  page.drawText(`Name: ${data.customer_name}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Email: ${data.customer_email}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Phone: ${data.customer_phone}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Address: ${data.customer_address}, ${data.customer_city}, FL ${data.customer_zip}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  
  yPosition -= 30;
  
  page.drawText('EVENT DETAILS', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: black,
  });
  
  yPosition -= 20;
  page.drawText(`Date: ${new Date(data.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Start Time: ${data.event_time}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Duration: ${data.event_duration}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Location: ${data.event_location}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Number of Musicians: ${data.num_musicians}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Number of Sets: ${data.num_sets}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  
  if (data.special_requests) {
    yPosition -= 20;
    page.drawText('Special Requests:', { x: 50, y: yPosition, size: 10, font: boldFont, color: black });
    yPosition -= 15;
    page.drawText(data.special_requests.substring(0, 100), { x: 50, y: yPosition, size: 10, font: font, color: black });
  }
  
  yPosition -= 30;
  
  page.drawText('PAYMENT TERMS', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: black,
  });
  
  yPosition -= 20;
  page.drawText(`Total Amount: $${data.total_price.toFixed(2)}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Deposit (50%): $${data.deposit_amount.toFixed(2)}`, { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText(`Balance Due: $${data.balance_due.toFixed(2)}`, { x: 50, y: yPosition, size: 10, font: boldFont, color: primaryColor });
  yPosition -= 10;
  page.drawText('(Balance due on day of event)', { x: 50, y: yPosition, size: 8, font: font, color: darkGray });
  
  yPosition -= 30;
  
  page.drawText('PAYMENT METHODS', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: black,
  });
  
  yPosition -= 20;
  page.drawText('Zelle: 352-575-5439', { x: 50, y: yPosition, size: 10, font: font, color: black });
  yPosition -= 15;
  page.drawText('PayPal: son2latinmusic@gmail.com', { x: 50, y: yPosition, size: 10, font: font, color: black });
  
  yPosition -= 30;
  
  page.drawText('TERMS & CONDITIONS', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: black,
  });
  
  yPosition -= 20;
  const terms = [
    '1. Deposit is non-refundable and required to secure the booking.',
    '2. Balance must be paid on or before the day of the event.',
    '3. Client is responsible for providing adequate performance space and power.',
    '4. Cancellation must be made at least 30 days prior to event date.',
    '5. SON2 Latin Music reserves the right to substitute musicians if necessary.',
  ];
  
  for (const term of terms) {
    page.drawText(term, { x: 50, y: yPosition, size: 9, font: font, color: black });
    yPosition -= 15;
  }
  
  yPosition -= 30;
  
  page.drawText('SIGNATURES', {
    x: 50,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: black,
  });
  
  yPosition -= 30;
  
  page.drawLine({ start: { x: 50, y: yPosition }, end: { x: 250, y: yPosition }, thickness: 1, color: black });
  page.drawText('Client Signature', { x: 50, y: yPosition - 15, size: 9, font: font, color: darkGray });
  page.drawText('Date: _________________', { x: 50, y: yPosition - 30, size: 9, font: font, color: darkGray });
  
  page.drawLine({ start: { x: width - 250, y: yPosition }, end: { x: width - 50, y: yPosition }, thickness: 1, color: black });
  page.drawText('SON2 Latin Music Representative', { x: width - 250, y: yPosition - 15, size: 9, font: font, color: darkGray });
  page.drawText('Date: _________________', { x: width - 250, y: yPosition - 30, size: 9, font: font, color: darkGray });
  
  const footerY = 50;
  page.drawText('SON2 LATIN MUSIC | 9030 Pinebreeze Dr., Riverview, FL 33578', { x: 50, y: footerY, size: 8, font: font, color: darkGray });
  page.drawText('Phone: 352-575-4933 | Email: son2latinmusic@gmail.com', { x: 50, y: footerY - 12, size: 8, font: font, color: darkGray });
  
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}