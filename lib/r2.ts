import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || "real-estate-assets";
const publicUrl = process.env.R2_PUBLIC_URL; // e.g. https://pub-xxxx.r2.dev or custom cdn domain

// Initialize S3 Client for Cloudflare R2 if configured
const getR2Client = (): S3Client | null => {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

/**
 * Uploads a file to Cloudflare R2, or falls back to local public/uploads directory
 */
export async function uploadImageFile(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<{ url: string; key: string; provider: "r2" | "local" }> {
  const r2 = getR2Client();
  const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  if (r2) {
    // Cloudflare R2 Upload
    await r2.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: safeName,
        Body: fileBuffer,
        ContentType: contentType,
      })
    );

    const url = publicUrl
      ? `${publicUrl.replace(/\/$/, "")}/${safeName}`
      : `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${safeName}`;

    return { url, key: safeName, provider: "r2" };
  } else {
    // Local fallback: save to public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, safeName);
    fs.writeFileSync(filePath, fileBuffer);

    return { url: `/uploads/${safeName}`, key: safeName, provider: "local" };
  }
}

/**
 * Deletes an image from Cloudflare R2 or local storage
 */
export async function deleteImageFile(key: string): Promise<boolean> {
  const r2 = getR2Client();
  if (r2) {
    try {
      await r2.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      );
      return true;
    } catch (e) {
      console.error("Error deleting from R2:", e);
      return false;
    }
  } else {
    try {
      const localPath = path.join(process.cwd(), "public", "uploads", key);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
      return true;
    } catch (e) {
      console.error("Error deleting local file:", e);
      return false;
    }
  }
}
