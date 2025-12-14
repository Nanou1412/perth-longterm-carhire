// SendGrid helper (optional) — dynamic import so package is optional
const SENDGRID_FROM = process.env.SENDER_EMAIL || process.env.ADMIN_EMAIL || 'no-reply@perthdrive.com.au';

export async function sendEmail(opts: { to: string; subject: string; text?: string; html?: string }) {
  if (!process.env.SENDGRID_API_KEY) return false;
  try {
    // dynamic import to avoid hard dependency when not used
    // @ts-ignore
    const sgMail = (await import('@sendgrid/mail')).default;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({ to: opts.to, from: SENDGRID_FROM, subject: opts.subject, text: opts.text, html: opts.html });
    return true;
  } catch (err) {
    console.warn('sendEmail failed', err);
    return false;
  }
}

export async function sendReceipt(to: string, bookingId: string, amountCents: number) {
  const amount = (amountCents / 100).toFixed(2);
  const subject = `Payment receipt — Booking ${bookingId}`;
  const html = `<p>We received a payment of <strong>${amount} AUD</strong> for your booking <strong>${bookingId}</strong>. Thank you for choosing ${process.env.BUSINESS_NAME || 'PerthDrive'}.</p>`;
  return sendEmail({ to, subject, html, text: `We received a payment of ${amount} AUD for your booking ${bookingId}.` });
}

export async function notifyAdmin(subject: string, text: string) {
  const admin = process.env.ADMIN_EMAIL;
  if (!admin) return false;
  return sendEmail({ to: admin, subject, text });
}

export default sendEmail;
