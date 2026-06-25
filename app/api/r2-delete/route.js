import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
});

export async function POST(request) {
  const { keys } = await request.json();
  if (!Array.isArray(keys) || keys.length === 0) {
    return Response.json({ error: 'keys array required' }, { status: 400 });
  }

  const results = await Promise.allSettled(
    keys.map(key =>
      r2.send(new DeleteObjectCommand({ Bucket: process.env.CLOUDFLARE_R2_BUCKET, Key: key }))
    )
  );

  const failed = results.filter(r => r.status === 'rejected').map(r => r.reason?.message);
  if (failed.length > 0) {
    return Response.json({ error: failed.join(', ') }, { status: 500 });
  }

  return Response.json({ ok: true });
}
