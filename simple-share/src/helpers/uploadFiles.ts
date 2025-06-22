import { v4 as uuidv4 } from "uuid";

export async function uploadFiles(files: File[]): Promise<string[]> {
  const uploadedKeys: string[] = [];
  const uuid = uuidv4();

  for (const file of files) {
    // Step 1: Get pre-signed upload URL
    const res = await fetch(
      `/api/upload-url?filename=${encodeURIComponent(
        file.name
      )}&contentType=${encodeURIComponent(file.type)}&uuid=${encodeURIComponent(
        uuid
      )}`
    );
    if (!res.ok) throw new Error("Failed to get upload URL");

    const { url, key } = await res.json();

    // Step 2: Upload to S3
    const upload = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
    if (!upload.ok) throw new Error(`Upload failed for ${file.name}`);

    uploadedKeys.push(key);
  }

  return uploadedKeys;
}
