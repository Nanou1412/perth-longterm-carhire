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
            // increment failure count or set status
            await prisma.booking.update({ where: { id: booking.id }, data: { status: 'payment_failed' } });
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
