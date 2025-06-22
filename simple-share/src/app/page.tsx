"use client";

import { downloadFiles } from "@/helpers/downloadFiles";
import { uploadFiles } from "@/helpers/uploadFiles";
import { useEffect, useState } from "react";

export default function Home() {
  const [keys, setKeys] = useState<string[]>([]);
  const [downloadLinks, setDownloadLinks] = useState<{ url: string }[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const fileList = Array.from(files);
      const uploadedKeys = await uploadFiles(fileList);
      setKeys(uploadedKeys);
      alert(
        `Uploaded ${uploadedKeys.length} files:\n` + uploadedKeys.join("\n")
      );
    } catch (err) {
      alert("Upload failed: " + (err as Error).message);
    }
  };

  useEffect(() => {
    if (!keys) return;
    const getLinks = async () => {
      if (keys.length === 0) return;
      const links = await downloadFiles(keys);
      setDownloadLinks(links);
    };

    getLinks();
  }, [keys]);

  console.log(downloadLinks);

  return (
    <>
      <input type="file" multiple onChange={handleUpload} />
      {downloadLinks && (
        <>
          <h4>Download Links Below:</h4>
          {downloadLinks.map((link, index) => (
            <a href={link.url} key={link.url}>
              file {index + 1}
            </a>
          ))}
        </>
      )}
    </>
  );
}
