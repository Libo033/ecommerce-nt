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

export const handleUploadPC = async (fileInput: HTMLInputElement) => {
  const formData: FormData = new FormData();
  const fileList = fileInput.files;

  if (fileList === null) throw new Error("file_list_empty");

  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].size > 10485760) {
      alert(`El archivo no puede ser mayor a 10MB`);
      throw new Error("file_size_too_large");
    }
    formData.append("file", fileList[i]);
  }

  formData.append(
    "upload_preset",
    uploadPreset.slice(0, uploadPreset.length - 1)
  );

  const savingImage: Promise<UploadApiResponse> = new Promise(
    async (resolve, reject) => {
      const data = await fetch( // CHEQUEAR SI SE PUEDE REEMPLAZAR POR MI API
        "https://api.cloudinary.com/v1_1/dsuydyqgz/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      resolve(data);
    }
  );

  const { secure_url }: UploadApiResponse = await savingImage;

  (fileInput as HTMLInputElement).value = "";

  return secure_url;
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
