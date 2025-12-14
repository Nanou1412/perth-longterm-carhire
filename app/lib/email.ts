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

export default sendEmail;
