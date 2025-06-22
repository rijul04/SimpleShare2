import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// important: This should only be used in the backend part **/api/** for security reasons

export const s3 = new S3Client({
  region: "eu-north-1", // I think this is correct
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function createUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 minutes
  return signedUrl;
}

export async function createDownloadUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 60 }); // 1 hour
  return signedUrl;
}
