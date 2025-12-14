import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

function checkAdmin(req: Request) {
  const secret = req.headers.get('x-admin-secret') || '';
  return secret && secret === process.env.ADMIN_SECRET;
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = params.id;
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!booking.stripeSubscriptionId) return NextResponse.json({ error: 'No subscription attached' }, { status: 400 });
  try {
    await stripe.subscriptions.del(booking.stripeSubscriptionId);
  } catch (e) {
    console.warn('Stripe cancel failed', e);
  }
  await prisma.booking.update({ where: { id }, data: { status: 'cancelled' } });
  return NextResponse.json({ ok: true });
}
