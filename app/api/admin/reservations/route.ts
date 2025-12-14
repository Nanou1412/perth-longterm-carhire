import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

function checkAdminCookie(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  // simple check: admin_session cookie must equal ADMIN_SECRET
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('admin_session='));
  if (!match) return false;
  const val = match.split('=')[1] || '';
  return val === (process.env.ADMIN_SECRET || '');
}

export async function GET(req: Request) {
  if (!checkAdminCookie(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const q = await prisma.booking.findMany({ include: { payments: true, vehicle: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ ok: true, bookings: q });
}
