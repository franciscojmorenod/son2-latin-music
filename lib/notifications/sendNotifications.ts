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

interface MusicOrderData {
  orderId: number;
  customerName: string;
  customerEmail: string;
  trackTitle: string;
  amount: number;
}

interface MusicDownloadData {
  customerName: string;
  customerEmail: string;
  trackTitle: string;
  downloadLink: string;
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
        subject: '',
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
        subject: '',
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

export async function notifyNewMusicOrder(data: MusicOrderData) {
  const results = { email: false, sms: false };
  const resend = getResend();

  if (!resend) {
    console.log('⚠️ Notifications skipped - Resend not configured');
    return results;
  }

  try {
    // Send Email to Admin
    if (process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'SON2 Notifications <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `🎵 New Music Order - ${data.trackTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111827; color: #fff; padding: 20px; border-radius: 10px;">
            <h1 style="color: #dc2626; text-align: center; margin-bottom: 10px;">🎵 NEW MUSIC ORDER</h1>
            <p style="text-align: center; color: #9ca3af; margin-bottom: 30px;">Order #${data.orderId}</p>
            
            <div style="background: #1f2937; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 15px;">Order Details</h2>
              <p style="margin: 8px 0;"><strong>Track:</strong> ${data.trackTitle}</p>
              <p style="margin: 8px 0;"><strong>Customer:</strong> ${data.customerName}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${data.customerEmail}</p>
              <p style="margin: 8px 0;"><strong>Amount:</strong> $${data.amount}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://son2latinmusic.vercel.app/admin/music-orders" 
                 style="background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                View Order in Dashboard →
              </a>
            </div>
          </div>
        `
      });
      results.email = true;
      console.log('✅ Email notification sent for new music order');
    }
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
  }

  try {
    // Send SMS
    if (process.env.ADMIN_SMS_EMAIL) {
      await resend.emails.send({
        from: 'SON2 Notifications <onboarding@resend.dev>',
        to: process.env.ADMIN_SMS_EMAIL,
        subject: '',
        text: `🎵 NEW MUSIC ORDER\n\nTrack: ${data.trackTitle}\nCustomer: ${data.customerName}\nAmount: $${data.amount}\n\nView: https://son2latinmusic.vercel.app/admin/music-orders`
      });
      results.sms = true;
      console.log('✅ SMS notification sent for new music order');
    }
  } catch (error) {
    console.error('❌ Error sending SMS notification:', error);
  }

  return results;
}

export async function notifySendDownloadLink(data: MusicDownloadData) {
  const results = { email: false };
  const resend = getResend();

  if (!resend) {
    console.log('⚠️ Notifications skipped - Resend not configured');
    return results;
  }

  try {
    await resend.emails.send({
      from: 'SON2 Latin Music <onboarding@resend.dev>',
      to: data.customerEmail,
      subject: `Your Download Link - ${data.trackTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111827; color: #fff; padding: 20px; border-radius: 10px;">
          <h1 style="color: #10b981; text-align: center; margin-bottom: 10px;">✅ Payment Confirmed!</h1>
          
          <div style="background: #1f2937; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #10b981; font-size: 18px; margin-bottom: 15px;">Hi ${data.customerName}!</h2>
            <p style="margin: 8px 0;">Your payment has been confirmed. Thank you for your purchase!</p>
            <p style="margin: 8px 0;"><strong>Track:</strong> ${data.trackTitle}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.downloadLink}" 
               style="background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 18px;">
              ⬇️ Download Your Track
            </a>
          </div>
          
          <div style="background: #1f2937; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 8px 0; font-size: 14px; color: #9ca3af;">
              <strong>Important:</strong> This download link expires in 24 hours and can be used up to 3 times.
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #374151;">
            SON2 Latin Music - Thank you for your support!
          </p>
        </div>
      `
    });
    results.email = true;
    console.log('✅ Download link email sent');
  } catch (error) {
    console.error('❌ Error sending download link email:', error);
  }

  return results;
}