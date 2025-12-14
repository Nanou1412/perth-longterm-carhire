import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') || '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const body = await req.text();
  let event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // if not configured, parse body directly (dev)
      event = JSON.parse(body);
    }
  } catch (err: any) {
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'invoice.paid': {
        const invoice = event.data.object;
        const subId = invoice.subscription as string | undefined;
        const amount = invoice.amount_paid;
        // find booking by stripeSubscriptionId
        if (subId) {
          const booking = await prisma.booking.findFirst({ where: { stripeSubscriptionId: subId } });
          if (booking) {
            await prisma.payment.create({ data: { bookingId: booking.id, stripePaymentId: invoice.payment_intent || invoice.id, amount, status: 'paid', paidAt: new Date() } });
            // reset failure count on success
            await prisma.booking.update({ where: { id: booking.id }, data: { failureCount: 0, status: 'active' } });
            // send receipt to client
            try {
              const { sendReceipt } = await import('@/lib/email');
              if (booking.clientEmail) await sendReceipt(booking.clientEmail, booking.id, amount);
            } catch (e) {
              console.warn('send receipt failed', e);
            }
          }
        }
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subId = invoice.subscription as string | undefined;
        if (subId) {
          const booking = await prisma.booking.findFirst({ where: { stripeSubscriptionId: subId } });
          if (booking) {
            await prisma.payment.create({ data: { bookingId: booking.id, stripePaymentId: invoice.payment_intent || invoice.id, amount: invoice.amount_due || 0, status: 'failed' } });
            // increment failure count and set status
            const updated = await prisma.booking.update({ where: { id: booking.id }, data: { failureCount: { increment: 1 } }, include: { payments: true } });
            const failures = updated.failureCount;
            const threshold = parseInt(process.env.PAYMENT_FAILURE_THRESHOLD || '3', 10);
            if (failures >= threshold) {
              await prisma.booking.update({ where: { id: booking.id }, data: { status: 'overdue' } });
              // notify admin
              try {
                const { sendEmail } = await import('@/lib/email');
                const admin = process.env.ADMIN_EMAIL;
                if (admin) await sendEmail({ to: admin, subject: `Booking ${booking.id} is overdue`, text: `Booking ${booking.id} has failed payments ${failures} times and is now marked overdue.` });
              } catch (e) {
                console.warn('notify admin failed', e);
              }
            } else {
              // notify client about failed payment and retry attempts
              try {
                const { sendEmail } = await import('@/lib/email');
                if (booking.clientEmail) await sendEmail({ to: booking.clientEmail, subject: `Payment failed — Booking ${booking.id}`, text: `We attempted to take a payment but it failed. We will retry. Attempt ${failures}/${threshold}. Please update your payment method.` });
              } catch (e) {
                console.warn('notify client failed', e);
              }
            }
          }
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const subId = sub.id as string;
        const booking = await prisma.booking.findFirst({ where: { stripeSubscriptionId: subId } });
        if (booking) {
          await prisma.booking.update({ where: { id: booking.id }, data: { status: 'cancelled' } });
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    // log and continue
    console.error('Webhook handler error', err);
  }

  return NextResponse.json({ received: true });
}
