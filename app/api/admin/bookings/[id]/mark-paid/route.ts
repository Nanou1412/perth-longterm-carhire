import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
  // create a payment record marked as paid (cash)
  await prisma.payment.create({ data: { bookingId: id, amount: booking.totalPrice * 100, status: 'paid', paidAt: new Date() } });
  await prisma.booking.update({ where: { id }, data: { status: 'active' } });
  return NextResponse.json({ ok: true });
}
