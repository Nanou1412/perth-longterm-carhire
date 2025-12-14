import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const { password } = body as { password?: string };
    if (!password) return NextResponse.json({ error: 'Missing' }, { status: 400 });
    if (password !== process.env.ADMIN_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const res = NextResponse.json({ ok: true });
    // set httpOnly cookie for session (simple MVP)
    const cookieValue = process.env.ADMIN_SECRET || '';
    res.cookies.set('admin_session', cookieValue, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' , maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
