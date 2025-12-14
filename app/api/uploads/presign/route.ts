import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { filename = '', contentType = '' } = body as any;
  if (process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    try {
      // dynamic import S3 client and presigner
      // @ts-ignore
      const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
      // @ts-ignore
      const { getSignedUrl } = await import('@aws-sdk/s3-request-presigner');
      const s3 = new S3Client({ region: process.env.AWS_REGION || 'ap-southeast-2' });
      const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}-${filename.replace(/\s+/g,'_')}`;
      const command = new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key, ContentType: contentType });
      const url = await getSignedUrl(s3, command, { expiresIn: 900 });
      return NextResponse.json({ ok: true, url, key });
    } catch (e) {
      console.warn('presign error', e);
      return NextResponse.json({ error: 'Presign failed' }, { status: 500 });
    }
  }

  // fallback: return an upload to local server (not presigned) - store in uploads/ after fetch to /api/enquiries
  const uploadsDir = path.join(process.cwd(), 'uploads');
  await fs.promises.mkdir(uploadsDir, { recursive: true });
  const key = `uploads/${Date.now()}-${filename.replace(/\s+/g,'_')}`;
  return NextResponse.json({ ok: true, url: null, key });
}
