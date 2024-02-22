import { UploadApiResponse } from "cloudinary";

const uploadPreset = "05-ecommerce/";

export const handleUploadURL = async (url: string) => {
  const res = await fetch("/api/image", {
    method: "POST",
    body: JSON.stringify({ url }),
    headers: { "Content-Type": "application/json" },
  });
  const data: { code: number; data: UploadApiResponse } = await res.json();

  if (data.code === 201) {
    return data.data;
  } else {
    throw data;
  }
};

export const handleDelete = async (img: string) => {
  const public_id: string = img.slice(
    img.indexOf(uploadPreset) + uploadPreset.length,
    img.length - 4
  );

  const res = await fetch(`/api/image/${public_id}`, { method: "DELETE" });
  const data = await res.json();

  if (data.code === 200) {
    return data.data;
  } else {
    throw data;
  }
};
