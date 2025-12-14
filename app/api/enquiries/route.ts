import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const ALLOWED = ['image/png', 'image/jpeg', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

async function saveFile(file: any, uploadsDir: string) {
  if (!file) return null;
  const { name, type, size } = file;
  if (!ALLOWED.includes(type)) throw new Error('Invalid file type');
  if (size > MAX_SIZE) throw new Error('File too large');

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${name.replace(/\s+/g, '_')}`;
  const filePath = path.join(uploadsDir, safeName);
  await fs.promises.writeFile(filePath, buffer);
  return { path: filePath, originalName: name, mime: type, size };
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = form.get('name')?.toString() || '';
    const email = form.get('email')?.toString() || '';
    const phone = form.get('phone')?.toString() || '';
    const subject = form.get('subject')?.toString() || '';
    const message = form.get('message')?.toString() || '';
    const vehicleInterest = form.get('vehicleInterest')?.toString() || '';
    const rentalDuration = form.get('rentalDuration')?.toString() || '';

    const idFile = form.get('idFile') as unknown as File | null;
    const licenseFile = form.get('licenseFile') as unknown as File | null;

    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const saved: any[] = [];
    try {
      const s1 = await saveFile(idFile, uploadsDir);
      if (s1) saved.push({ field: 'idFile', ...s1 });
    } catch (e: any) {
      return NextResponse.json({ error: `ID file error: ${e.message}` }, { status: 400 });
    }
    try {
      const s2 = await saveFile(licenseFile, uploadsDir);
      if (s2) saved.push({ field: 'licenseFile', ...s2 });
    } catch (e: any) {
      return NextResponse.json({ error: `Licence file error: ${e.message}` }, { status: 400 });
    }

    // Optional S3 upload if environment variables present
    if (process.env.AWS_S3_BUCKET && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      try {
        // dynamic import to avoid adding mandatory dependency if not used
        const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
        const s3 = new S3Client({ region: process.env.AWS_REGION || 'ap-southeast-2' });
        for (const f of saved) {
          const body = await fs.promises.readFile(f.path);
          const key = `enquiries/${path.basename(f.path)}`;
          await s3.send(new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key, Body: body, ContentType: f.mime }));
          f.s3Key = key;
          f.s3Url = `s3://${process.env.AWS_S3_BUCKET}/${key}`;
        }
      } catch (e) {
        // don't fail entire request if S3 upload not configured correctly
        console.warn('S3 upload failed', e);
      }
    }

    const meta = { name, email, phone, subject, message, vehicleInterest, rentalDuration, files: saved, createdAt: new Date().toISOString() };
    const metaPath = path.join(uploadsDir, `enquiry-${Date.now()}.json`);
    await fs.promises.writeFile(metaPath, JSON.stringify(meta, null, 2));

    return NextResponse.json({ ok: true, files: saved });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
