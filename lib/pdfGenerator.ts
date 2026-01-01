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
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const cursiveFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  
  const black = rgb(0, 0, 0);
  const darkGray = rgb(0.3, 0.3, 0.3);
  const lightGray = rgb(0.9, 0.9, 0.9);
  const primaryColor = rgb(0.8, 0.2, 0.2);
  
  // ==================== PAGE 1 ====================
  const page1 = pdfDoc.addPage([612, 792]);
  const { width, height } = page1.getSize();
  const margin = 50;
  const contentWidth = width - (margin * 2);
  
  let y = height - 40;
  
  // HEADER - Centered Logo/Title
  const logoText = 'SON2 LATIN MUSIC';
  const logoWidth = boldFont.widthOfTextAtSize(logoText, 24);
  page1.drawText(logoText, {
    x: (width - logoWidth) / 2,
    y,
    size: 24,
    font: boldFont,
    color: primaryColor,
  });
  
  y -= 30;
  
  // Subtitle - Centered
  const subtitleText = 'Contract for Services';
  const subtitleWidth = boldFont.widthOfTextAtSize(subtitleText, 16);
  page1.drawText(subtitleText, {
    x: (width - subtitleWidth) / 2,
    y,
    size: 16,
    font: boldFont,
    color: black,
  });
  
  y -= 10;
  
  // Decorative line
  page1.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 2,
    color: primaryColor,
  });
  
  y -= 25;
  
  // Contract Date - Centered
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const contractDateText = `Contract Date: ${today}`;
  const dateWidth = font.widthOfTextAtSize(contractDateText, 10);
  page1.drawText(contractDateText, {
    x: (width - dateWidth) / 2,
    y,
    size: 10,
    font,
    color: darkGray,
  });
  
  y -= 25;
  
  // Contract Introduction
  const contractIntro = `This contract for the professional services of musicians, made this ${today}, between ${data.customer_name} (hereinafter called the 'Employer') and SON2 LATIN MUSIC (hereinafter called 'Employees' or 'SON2').`;
  
  for (const line of wrapText(contractIntro, 85)) {
    page1.drawText(line, { x: margin, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 10;
  
  // Agreement paragraph
  const para2 = "The Leader represents that the Employees already designated have agreed to be bound by the said terms and conditions. The Employees severally agree to render collectively to the Employer services as musicians as the band known as SON2 LATIN MUSIC.";
  for (const line of wrapText(para2, 85)) {
    page1.drawText(line, { x: margin, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 15;
  
  // Performance Details Section
  page1.drawRectangle({
    x: margin,
    y: y - 5,
    width: contentWidth,
    height: 20,
    color: lightGray,
  });
  
  page1.drawText('PERFORMANCE DETAILS', {
    x: margin + 10,
    y,
    size: 11,
    font: boldFont,
    color: black,
  });
  
  y -= 25;
  
  page1.drawText(`• The Employees agree to perform up to ${data.num_sets} set(s) at approximately 50 minutes for each set.`, {
    x: margin + 10,
    y,
    size: 10,
    font,
    color: black,
  });
  y -= 16;
  
  page1.drawText('• The Employees will provide a PA system and operate the system during the performance.', {
    x: margin + 10,
    y,
    size: 10,
    font,
    color: black,
  });
  y -= 16;
  
  const setupText = "• The Employer understands that SON2 will have access to the area 30 minutes prior to the performance and that final connections to the sound system will occur in the last 5 minutes prior to performance.";
  for (const line of wrapText(setupText, 80)) {
    page1.drawText(line, {
      x: margin + 10,
      y,
      size: 10,
      font,
      color: black,
    });
    y -= 14;
  }
  y -= 2;
  
  page1.drawText('• The Employees will have access to the rear stage area with vehicle to unload and load.', {
    x: margin + 10,
    y,
    size: 10,
    font,
    color: black,
  });
  y -= 16;
  
  const insuranceText = "• The Employees will not be required to provide liability insurance as the event site has proper liability insurance.";
  for (const line of wrapText(insuranceText, 80)) {
    page1.drawText(line, {
      x: margin + 10,
      y,
      size: 10,
      font,
      color: black,
    });
    y -= 14;
  }
  y -= 2;
  
  const liabilityText = "• The Employees agree not to hold the event organizer liable for any equipment used during the performance.";
  for (const line of wrapText(liabilityText, 80)) {
    page1.drawText(line, {
      x: margin + 10,
      y,
      size: 10,
      font,
      color: black,
    });
    y -= 14;
  }
  
  y -= 20;
  
  // Event Details Section
  page1.drawRectangle({
    x: margin,
    y: y - 5,
    width: contentWidth,
    height: 20,
    color: lightGray,
  });
  
  page1.drawText('EVENT DETAILS', {
    x: margin + 10,
    y,
    size: 11,
    font: boldFont,
    color: black,
  });
  
  y -= 25;
  
  // Client Information
  page1.drawText('Client Name:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(data.customer_name, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Event Location:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(`${data.customer_address}, ${data.customer_city}, FL ${data.customer_zip}`, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Email:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(data.customer_email, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Phone:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(data.customer_phone, { x: margin + 120, y, size: 10, font, color: black });
  y -= 20;
  
  // Event Schedule
  const eventDateFormatted = new Date(data.event_date).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  page1.drawText('Event Date:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(eventDateFormatted, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Start Time:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(data.event_time, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Duration:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(data.event_duration, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Setup Time:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText('1 hour', { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Intermissions:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(`${data.num_breaks}`, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  page1.drawText('Musicians:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
  page1.drawText(`${data.num_musicians}`, { x: margin + 120, y, size: 10, font, color: black });
  y -= 14;
  
  if (data.special_requests) {
    page1.drawText('Special Requests:', { x: margin + 10, y, size: 10, font: boldFont, color: darkGray });
    const requestText = data.special_requests.length > 50 ? data.special_requests.substring(0, 50) + '...' : data.special_requests;
    page1.drawText(requestText, { x: margin + 120, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 20;
  
  // Payment Section
  page1.drawRectangle({
    x: margin,
    y: y - 5,
    width: contentWidth,
    height: 20,
    color: lightGray,
  });
  
  page1.drawText('PAYMENT TERMS', {
    x: margin + 10,
    y,
    size: 11,
    font: boldFont,
    color: black,
  });
  
  y -= 25;
  
  page1.drawText('Total Amount:', { x: margin + 10, y, size: 11, font: boldFont, color: black });
  page1.drawText(`$${data.total_price.toFixed(2)}`, { x: margin + 400, y, size: 11, font: boldFont, color: primaryColor });
  y -= 16;
  
  page1.drawText('Deposit (50%):', { x: margin + 10, y, size: 10, font, color: black });
  page1.drawText(`$${data.deposit_amount.toFixed(2)}`, { x: margin + 400, y, size: 10, font, color: black });
  y -= 16;
  
  page1.drawText('Balance Due:', { x: margin + 10, y, size: 11, font: boldFont, color: black });
  page1.drawText(`$${data.balance_due.toFixed(2)}`, { x: margin + 400, y, size: 11, font: boldFont, color: primaryColor });
  y -= 20;
  
  page1.drawText('The Total includes: Amplification, Music, Setup, Transportation', {
    x: margin + 10,
    y,
    size: 9,
    font,
    color: darkGray,
  });
  y -= 16;
  
  page1.drawText('The Total Payment is due before Performance.', {
    x: margin + 10,
    y,
    size: 10,
    font: boldFont,
    color: black,
  });
  y -= 14;
  
  // Centered red warning
  const warningText = 'Music will NOT start before receiving Full Payment.';
  const warningWidth = boldFont.widthOfTextAtSize(warningText, 10);
  page1.drawText(warningText, {
    x: (width - warningWidth) / 2,
    y,
    size: 10,
    font: boldFont,
    color: primaryColor,
  });
  
  // Footer - Page 1 (right-aligned)
  const page1Text = 'Page 1 of 2';
  const page1Width = font.widthOfTextAtSize(page1Text, 9);
  page1.drawText(page1Text, {
    x: width - margin - page1Width,
    y: 30,
    size: 9,
    font,
    color: darkGray,
  });
  
  // ==================== PAGE 2 ====================
  const page2 = pdfDoc.addPage([612, 792]);
  y = height - 40;
  
  // Header - Page 2
  const logoWidth2 = boldFont.widthOfTextAtSize(logoText, 20);
  page2.drawText(logoText, {
    x: (width - logoWidth2) / 2,
    y,
    size: 20,
    font: boldFont,
    color: primaryColor,
  });
  
  y -= 10;
  page2.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: primaryColor,
  });
  
  y -= 30;
  
  // Additional Terms Section
  page2.drawRectangle({
    x: margin,
    y: y - 5,
    width: contentWidth,
    height: 20,
    color: lightGray,
  });
  
  page2.drawText('ADDITIONAL TERMS AND CONDITIONS', {
    x: margin + 10,
    y,
    size: 11,
    font: boldFont,
    color: black,
  });
  
  y -= 25;
  
  const terms = [
    "If any members have not been chosen upon the signing of this contract, the leader shall, as an agent for the Employer and under his instructions, hire such persons and any replacements as required for persons who for any reason does not or cannot perform any or all services. Employer shall, at all times have complete control over the services of the Employees under this contract.",
    
    "The agreement of the Employees to perform is subject to proven detention by sickness, accidents, or accidents to means of transportation, riots, strikes, epidemics, acts of God, or any other legitimate conditions beyond the control of the Employees.",
    
    "If the Employer breaches this agreement, he shall pay the Employees, in addition to damages, 6% interest thereon plus a reasonable attorney's fee necessary for the enforcement of the contract.",
    
    "The undersigned agent is acting herein in order to secure employment and is not responsible to any party herein for any breach of this agreement by either party or for any damages or injuries arising out of said employment.",
    
    "The Employer is signing this contract himself, or having the same signed by a representative, acknowledges his (her or their) authority to do so, and hereby assumes liability for the amount stated herein."
  ];
  
  for (let i = 0; i < terms.length; i++) {
    page2.drawText(`${i + 1}.`, { x: margin + 10, y, size: 10, font: boldFont, color: black });
    
    const wrappedLines = wrapText(terms[i], 80);
    for (let j = 0; j < wrappedLines.length; j++) {
      page2.drawText(wrappedLines[j], {
        x: margin + (j === 0 ? 25 : 25),
        y,
        size: 9,
        font,
        color: black,
      });
      y -= 12;
    }
    y -= 8;
  }
  
  y -= 30;
  
  // Signatures Section
  page2.drawRectangle({
    x: margin,
    y: y - 5,
    width: contentWidth,
    height: 20,
    color: lightGray,
  });
  
  page2.drawText('SIGNATURES', {
    x: margin + 10,
    y,
    size: 11,
    font: boldFont,
    color: black,
  });
  
  y -= 30;
  
  // Two-column signature layout
  const col1X = margin + 20;
  const col2X = width / 2 + 20;
  
  // Client Signature (Left)
  page2.drawText('CLIENT (EMPLOYER)', {
    x: col1X,
    y,
    size: 10,
    font: boldFont,
    color: darkGray,
  });
  
  // Band Signature (Right)
  page2.drawText('SON2 LATIN MUSIC (EMPLOYEE)', {
    x: col2X,
    y,
    size: 10,
    font: boldFont,
    color: darkGray,
  });
  
  y -= 40;
  
  // Draw Francisco's signature in cursive ABOVE the line
  const signatureY = y + 25;
  page2.drawText('Francisco Moreno', {
    x: col2X + 20,
    y: signatureY,
    size: 18,
    font: cursiveFont,
    color: black,
  });
  
  // Signature lines
  page2.drawLine({
    start: { x: col1X, y },
    end: { x: col1X + 200, y },
    thickness: 1,
    color: black,
  });
  
  page2.drawLine({
    start: { x: col2X, y },
    end: { x: col2X + 200, y },
    thickness: 1,
    color: black,
  });
  
  y -= 15;
  
  page2.drawText('Signature', { x: col1X, y, size: 8, font, color: darkGray });
  page2.drawText('Signature', { x: col2X, y, size: 8, font, color: darkGray });
  
  y -= 25;
  
  // Add Francisco's date ABOVE the line
  const dateY = y + 15;
  const todayFormatted = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  page2.drawText(todayFormatted, {
    x: col2X + 20,
    y: dateY,
    size: 10,
    font,
    color: black,
  });
  
  // Date lines
  page2.drawLine({
    start: { x: col1X, y },
    end: { x: col1X + 200, y },
    thickness: 1,
    color: black,
  });
  
  page2.drawLine({
    start: { x: col2X, y },
    end: { x: col2X + 200, y },
    thickness: 1,
    color: black,
  });
  
  y -= 15;
  
  page2.drawText('Date', { x: col1X, y, size: 8, font, color: darkGray });
  page2.drawText('Date', { x: col2X, y, size: 8, font, color: darkGray });
  
  y -= 40;
  
  // Contact Information
  page2.drawRectangle({
    x: margin,
    y: y - 5,
    width: contentWidth,
    height: 20,
    color: lightGray,
  });
  
  page2.drawText('CONTACT & PAYMENT INFORMATION', {
    x: margin + 10,
    y,
    size: 11,
    font: boldFont,
    color: black,
  });
  
  y -= 25;
  
  page2.drawText('Please Make Checks Payable to:', { x: margin + 10, y, size: 9, font: boldFont, color: darkGray });
  y -= 14;
  page2.drawText('Francisco and Celina Moreno', { x: margin + 10, y, size: 10, font, color: black });
  y -= 14;
  page2.drawText('9030 Pinebreeze Dr., Riverview, FL 33578', { x: margin + 10, y, size: 10, font, color: black });
  y -= 14;
  page2.drawText('Phone: 352-575-4933', { x: margin + 10, y, size: 10, font, color: black });
  y -= 14;
  page2.drawText('Email: Son2latinmusic@gmail.com', { x: margin + 10, y, size: 10, font, color: black });
  y -= 20;
  
  page2.drawText('Preferred Payment Method:', { x: margin + 10, y, size: 10, font: boldFont, color: primaryColor });
  y -= 14;
  page2.drawText('Zelle: 352-575-5439', { x: margin + 10, y, size: 11, font: boldFont, color: black });
  y -= 16;
  page2.drawText('Also Accepted:', { x: margin + 10, y, size: 9, font: boldFont, color: darkGray });
  y -= 12;
  page2.drawText('PayPal: son2latinmusic@gmail.com  (additional charges apply - PP fee)', {
    x: margin + 10,
    y,
    size: 9,
    font,
    color: black,
  });
  
  // Footer - Page 2 (right-aligned)
  const page2Text = 'Page 2 of 2';
  const page2Width = font.widthOfTextAtSize(page2Text, 9);
  page2.drawText(page2Text, {
    x: width - margin - page2Width,
    y: 30,
    size: 9,
    font,
    color: darkGray,
  });
  
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    if ((currentLine + ' ' + word).length <= maxChars) {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  
  if (currentLine) lines.push(currentLine);
  return lines;
}