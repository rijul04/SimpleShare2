"use client";

import { uploadFiles } from "@/helpers/uploadFiles";

export default function FileUpload() {
  let keys: string[] | undefined;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const fileList = Array.from(files);
      // keys = await uploadFiles(fileList);
      // alert(`Uploaded ${keys.length} files:\n` + keys.join("\n"));
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    }
  };

  return {
    component: <input type="file" multiple onChange={handleUpload} />,
    keys: keys ?? undefined,
  };
}
