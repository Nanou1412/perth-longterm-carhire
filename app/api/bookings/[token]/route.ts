import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: { token: string } }) {
  try {
    const token = params.token;
    const booking = await prisma.booking.findUnique({ where: { token }, include: { payments: true, vehicle: true } });
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true, booking });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
