import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

function checkAdmin(req: Request) {
  const secret = req.headers.get('x-admin-secret') || '';
  return secret && secret === process.env.ADMIN_SECRET;
}

export async function GET(req: Request) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const settings = await prisma.setting.findMany();
  return NextResponse.json({ ok: true, settings });
}

export async function POST(req: Request) {
  if (!checkAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { key, value } = body;
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });
  await prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } });
  return NextResponse.json({ ok: true });
}
