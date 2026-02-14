import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!secret) {
    return Response.json({ error: 'Cloudinary API secret not configured' }, { status: 500 });
  }
  const body = await request.json();
  const { paramsToSign } = body;
  const signature = cloudinary.utils.api_sign_request(paramsToSign, secret);
  return Response.json({ signature });
}
