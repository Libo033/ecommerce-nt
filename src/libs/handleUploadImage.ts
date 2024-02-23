import { UploadApiResponse } from "cloudinary";
import { ChangeEvent } from "react";

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

const handleUploadPC = async () => {};

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

export const handleFileReader = (event: ChangeEvent<HTMLInputElement>) => {
  try {
    const reader: FileReader = new FileReader();
    const allFiles: FileList | null = event.target.files;

    if (allFiles === null) throw new Error("files_not_found");

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      if (typeof onLoadEvent.target?.result?.toString() !== "string") {
        throw new Error("file_not_found");
      }
    };

    reader.readAsDataURL(allFiles[0]);

    return allFiles[0].name;
  } catch (error) {
    throw error;
  }
};
