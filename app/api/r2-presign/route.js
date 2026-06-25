import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
  const { filename, contentType } = await request.json();

  if (!filename || !contentType) {
    return Response.json({ error: 'filename and contentType are required' }, { status: 400 });
  }

  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET,
    Key: filename,
    ContentType: contentType,
  });

  const url = await getSignedUrl(r2, command, { expiresIn: 3600 });

  return Response.json({ url, publicUrl: `${process.env.NEXT_PUBLIC_VIDEO_CDN}/${filename}` });
}
