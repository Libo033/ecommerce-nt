import { UploadApiResponse } from "cloudinary";

export const handleUploadURL = async (url: string) => {
  const res = await fetch("/api/image", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  });
  const data: { code: number; data: UploadApiResponse } = await res.json();

  return data.data;
};
