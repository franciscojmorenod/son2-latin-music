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
  
  let y = height - 40;
  
  // Header
  page.drawText('SON2 LATIN MUSIC', { x: 50, y, size: 16, font: boldFont, color: black });
  y -= 25;
  page.drawText('Contract for Services', { x: 50, y, size: 14, font: boldFont, color: black });
  y -= 25;
  
  // Contract intro
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const contractIntro = `This contract for the personal services of musicians, made this ${today}, between ${data.customer_name} (hereinafter called the 'Employer') and SON2 LATIN MUSIC (hereinafter called 'Employees' or 'SON2').`;
  
  const lines = wrapText(contractIntro, 80);
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 10;
  
  // Paragraph 2
  const para2 = "The Leader represents that the Employees already designated have agreed to be bound by the said terms and conditions. The Employees severally agree to render collectively to the Employer services as musicians as the band known as SON2 LATIN MUSIC.";
  for (const line of wrapText(para2, 80)) {
    page.drawText(line, { x: 50, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 10;
  
  // Performance details
  page.drawText(`The Employees agree to perform up to ${data.num_sets} set(s) at approximately 50 minutes for each set.`, { x: 50, y, size: 10, font, color: black });
  y -= 18;
  
  page.drawText('The Employees will provide a PA system and operate the system during the performance.', { x: 50, y, size: 10, font, color: black });
  y -= 18;
  
  const para3 = "The Employer understands that SON2 will have access to the area We will be performing in up to 30 minutes prior to the performance and that final connections to the sound system will occur in the last 5 minutes prior to the performance.";
  for (const line of wrapText(para3, 80)) {
    page.drawText(line, { x: 50, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 10;
  
  page.drawText('The Employees understand that SON2 will have access to the rear stage area with vehicle to unload and load.', { x: 50, y, size: 10, font, color: black });
  y -= 18;
  
  const para4 = "The Employees understand that as a performer I will not be required to provide liability insurance as the event site has proper liability insurance.";
  for (const line of wrapText(para4, 80)) {
    page.drawText(line, { x: 50, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 10;
  
  const para5 = "The Employees also agree not to hold the event organizer liable for any of my equipment used during the performance.";
  for (const line of wrapText(para5, 80)) {
    page.drawText(line, { x: 50, y, size: 10, font, color: black });
    y -= 14;
  }
  
  y -= 15;
  
  // Event details
  page.drawText('Name and address of place of engagement:', { x: 50, y, size: 10, font: boldFont, color: black });
  y -= 16;
  page.drawText(data.customer_name, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(data.customer_address, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`${data.customer_city}, FL ${data.customer_zip}`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`eMail: ${data.customer_email}`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`Phone Number: ${data.customer_phone}`, { x: 50, y, size: 10, font, color: black });
  y -= 20;
  
  // Employment details
  const eventDateFormatted = new Date(data.event_date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  page.drawText(`Date of employment\t: ${eventDateFormatted}`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`Start Time\t\t: ${data.event_time}`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`Hours of employment\t: ${data.event_duration}`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`Set up time\t\t: 1hr`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`Intermission(s)\t\t: ${data.num_breaks}`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  
  if (data.special_requests) {
    page.drawText(`Special Request\t\t: ${data.special_requests.substring(0, 50)}`, { x: 50, y, size: 10, font, color: black });
    y -= 14;
  }
  
  page.drawText(`Min Num of Musicians\t: ${data.num_musicians}`, { x: 50, y, size: 10, font, color: black });
  y -= 20;
  
  // Payment
  page.drawText(`Total Wages\t\t: $ ${data.total_price.toFixed(2)}`, { x: 50, y, size: 10, font: boldFont, color: black });
  y -= 14;
  page.drawText(`Deposit\t\t\t: $ ${data.deposit_amount.toFixed(2)}`, { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText(`Due\t\t\t: $ ${data.balance_due.toFixed(2)}`, { x: 50, y, size: 10, font: boldFont, color: black });
  y -= 20;
  
  page.drawText('The Total includes Amplification, Music, Setup, Transportation', { x: 50, y, size: 10, font, color: black });
  y -= 16;
  page.drawText('The Total Payment is due before Performance.', { x: 50, y, size: 10, font: boldFont, color: black });
  y -= 14;
  page.drawText('Music will NOT start before receiving Full Payment.', { x: 50, y, size: 10, font: boldFont, color: black });
  y -= 20;
  
  // Additional terms
  page.drawText('Additional Terms and Conditions', { x: 50, y, size: 12, font: boldFont, color: black });
  y -= 18;
  
  const terms = [
    "If any members have not been chosen upon the signing of this contract, the leader shall, as an agent for the Employer and under his instructions, hire such persons and any replacements as required for persons who for any reason does not or cannot perform any or all services.",
    "If the Employer breaches this agreement, he shall pay the Employees, in addition to damages, 6% interest thereon plus a reasonable attorney's fee necessary for the enforcement of the contract."
  ];
  
  for (const term of terms) {
    for (const line of wrapText(term, 80)) {
      page.drawText(line, { x: 50, y, size: 9, font, color: black });
      y -= 12;
    }
    y -= 6;
  }
  
  y -= 15;
  
  // Signatures
  page.drawText('_______________________________________________________', { x: 50, y, size: 10, font, color: black });
  y -= 16;
  page.drawText("Employer's Name", { x: 50, y, size: 9, font, color: darkGray });
  page.drawText('DATE', { x: 350, y, size: 9, font, color: darkGray });
  y -= 25;
  
  page.drawText('____________________________________________', { x: 50, y, size: 10, font, color: black });
  page.drawText(today, { x: 300, y, size: 10, font, color: black });
  y -= 16;
  page.drawText("Employee's Signature (Francisco Moreno)", { x: 50, y, size: 9, font, color: darkGray });
  page.drawText('DATE', { x: 350, y, size: 9, font, color: darkGray });
  y -= 25;
  
  // Footer
  page.drawText('SON2 LATIN MUSIC', { x: 50, y, size: 10, font: boldFont, color: black });
  y -= 14;
  page.drawText('(Please Make Checks Payable to)', { x: 50, y, size: 9, font, color: darkGray });
  y -= 16;
  page.drawText('Francisco and Celina Moreno', { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText('9030 Pinebreeze Dr.', { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText('Riverview, FL 33578', { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText('Phone: 352-575-4933', { x: 50, y, size: 10, font, color: black });
  y -= 14;
  page.drawText('Son2latinmusic@gmail.com', { x: 50, y, size: 10, font, color: black });
  y -= 18;
  page.drawText('Preferred Payment Method: Zelle (using phone #: 352-575-5439)', { x: 50, y, size: 10, font: boldFont, color: black });
  y -= 14;
  page.drawText('Also accepted', { x: 50, y, size: 9, font, color: black });
  y -= 12;
  page.drawText('Paypal account: son2latinmusic@gmail.com  (additional charges apply - PP fee)', { x: 50, y, size: 9, font, color: black });
  
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