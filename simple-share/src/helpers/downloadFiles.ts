export async function downloadFiles(
  keys: string[]
): Promise<{ url: string }[]> {
  const downloadLinks: { url: string }[] = [];

  for (const key of keys) {
    const res = await fetch(`/api/download-url?key=${encodeURIComponent(key)}`);
    if (!res.ok) throw new Error("Failed to get upload URL");

    downloadLinks.push(await res.json());
  }

  return downloadLinks;
}
