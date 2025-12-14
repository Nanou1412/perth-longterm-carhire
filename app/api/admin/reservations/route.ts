import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

function checkAdmin(req: Request) {
  const secret = req.headers.get('x-admin-secret') || '';
  return secret && secret === process.env.ADMIN_SECRET;
}

export async function GET(req: Request) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const q = await prisma.booking.findMany({ include: { payments: true, vehicle: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ ok: true, bookings: q });
}
