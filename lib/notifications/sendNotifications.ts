import { Resend } from 'resend';

// Lazy initialization - only create when needed
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY not configured - notifications disabled');
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

interface QuoteNotificationData {
  quoteId: number;
  customerName: string;
  eventDate: string;
  eventLocation: string;
  customerEmail: string;
  customerPhone: string;
}

interface ContractSignedData {
  quoteId: number;
  customerName: string;
  eventDate: string;
  contractUrl: string;
}

export async function notifyNewQuoteRequest(data: QuoteNotificationData) {
  const results = { email: false, sms: false };
  const resend = getResend();

  if (!resend) {
    console.log('⚠️ Notifications skipped - Resend not configured');
    return results;
  }

  try {
    // Send Email Notification
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'SON2 Notifications <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `🎵 New Quote Request - ${data.customerName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111827; color: #fff; padding: 20px; border-radius: 10px;">
            <h1 style="color: #dc2626; text-align: center; margin-bottom: 10px;">🎵 NEW QUOTE REQUEST</h1>
            <p style="text-align: center; color: #9ca3af; margin-bottom: 30px;">Quote #${data.quoteId}</p>
            
            <div style="background: #1f2937; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 15px;">Customer Details</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${data.customerName}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${data.customerEmail}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${data.customerPhone}</p>
              <p style="margin: 8px 0;"><strong>Event Date:</strong> ${data.eventDate}</p>
              <p style="margin: 8px 0;"><strong>Location:</strong> ${data.eventLocation}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://son2latinmusic.vercel.app/admin/quotes/${data.quoteId}" 
                 style="background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                View Quote in Dashboard →
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151;">
              SON2 Latin Music - Contract Management System
            </p>
          </div>
        `
      });
      results.email = true;
      console.log('✅ Email notification sent for new quote');
    }
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
  }

  try {
    // Send SMS via Email Gateway (FREE!)
    if (process.env.ADMIN_SMS_EMAIL) {
      await resend.emails.send({
        from: 'SON2 Notifications <onboarding@resend.dev>',
        to: process.env.ADMIN_SMS_EMAIL,
        subject: '', // Empty subject for cleaner SMS
        text: `🎵 NEW QUOTE REQUEST\n\nCustomer: ${data.customerName}\nEvent: ${data.eventDate}\nLocation: ${data.eventLocation}\n\nView: https://son2latinmusic.vercel.app/admin/quotes/${data.quoteId}`
      });
      results.sms = true;
      console.log('✅ SMS notification sent for new quote (via email gateway)');
    }
  } catch (error) {
    console.error('❌ Error sending SMS notification:', error);
  }

  return results;
}

export async function notifyContractSigned(data: ContractSignedData) {
  const results = { email: false, sms: false };
  const resend = getResend();

  if (!resend) {
    console.log('⚠️ Notifications skipped - Resend not configured');
    return results;
  }

  try {
    // Send Email Notification
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'SON2 Notifications <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `✅ Contract Signed - ${data.customerName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111827; color: #fff; padding: 20px; border-radius: 10px;">
            <h1 style="color: #10b981; text-align: center; margin-bottom: 10px;">✅ CONTRACT SIGNED!</h1>
            <p style="text-align: center; color: #9ca3af; margin-bottom: 30px;">Quote #${data.quoteId}</p>
            
            <div style="background: #1f2937; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #10b981; font-size: 18px; margin-bottom: 15px;">Event Details</h2>
              <p style="margin: 8px 0;"><strong>Customer:</strong> ${data.customerName}</p>
              <p style="margin: 8px 0;"><strong>Event Date:</strong> ${data.eventDate}</p>
              <p style="margin: 8px 0; color: #10b981; font-weight: bold;">Status: BOOKED ✓</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${data.contractUrl}" 
                 style="background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; margin-right: 10px;">
                Download Signed Contract
              </a>
              <a href="https://son2latinmusic.vercel.app/admin/quotes/${data.quoteId}" 
                 style="background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                View in Dashboard
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151;">
              SON2 Latin Music - Contract Management System
            </p>
          </div>
        `
      });
      results.email = true;
      console.log('✅ Email notification sent for contract signing');
    }
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
  }

  try {
    // Send SMS via Email Gateway (FREE!)
    if (process.env.ADMIN_SMS_EMAIL) {
      await resend.emails.send({
        from: 'SON2 Notifications <onboarding@resend.dev>',
        to: process.env.ADMIN_SMS_EMAIL,
        subject: '', // Empty subject for cleaner SMS
        text: `✅ CONTRACT SIGNED!\n\n${data.customerName}\nEvent: ${data.eventDate}\n\nStatus: BOOKED\n\nView: https://son2latinmusic.vercel.app/admin/quotes/${data.quoteId}`
      });
      results.sms = true;
      console.log('✅ SMS notification sent for contract signing (via email gateway)');
    }
  } catch (error) {
    console.error('❌ Error sending SMS notification:', error);
  }

  return results;
}