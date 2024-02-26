"use client";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Add, Close, FileOpen } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  OutlinedTextFieldProps,
  SxProps,
  TextField,
} from "@mui/material";
import {
  handleDelete,
  handleFileReader,
  handleUploadPC,
  handleUploadURL,
} from "@/libs/handleUploadImage";

interface IImageUploader {
  img: string[];
  setImg: React.Dispatch<SetStateAction<string[]>>;
  txtProps: Partial<OutlinedTextFieldProps>;
}

const ImageUploader: React.FC<IImageUploader> = ({ img, setImg, txtProps }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const closeProps: SxProps = {
    position: "absolute",
    zIndex: "99",
    top: "6px",
    right: "6px",
    fontSize: "21px",
    cursor: "pointer",
  };

  const handleAddImage = async () => {
    try {
      const fileInput = document.getElementById("file") as HTMLInputElement;
      setLoading(true);
      if (fileInput.files?.length === 0) {
        // SUBIR URL
        const res = await handleUploadURL(url);
        setImg([...img, res.secure_url]);
      } else {
        // SUBIR ARCHIVO
        const secure_url = await handleUploadPC(fileInput);
        setImg([...img, secure_url]);
      }
    } catch (error) {
      console.log(error);
    }
    setUrl("");
    setLoading(false);
  };

  const handleDeleteImg = async (image: string) => {
    try {
      const res = await handleDelete(image);
      if (res.result === "ok") setImg(img.filter((i) => i !== image));
    } catch (error) {
      console.log(error);
    }
  };

  const fileReader = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const data = handleFileReader(e);
      setUrl(data);
    } catch (error) {
      console.log(error);
      setUrl("");
    }
  };

  return (
    <div className={styles.ModalUploader}>
      <div className={styles.ModalInputsUploader}>
        <TextField
          fullWidth
          sx={{ margin: "9px 0px" }}
          {...txtProps}
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label htmlFor="file" className={styles.ModalFileLabel}>
          <FileOpen sx={{ fontSize: "21px" }} />
        </label>
        <input
          type="file"
          id="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => fileReader(e)}
          style={{ display: "none" }}
        />
        <Button
          sx={{ height: "40px", margin: "9px 0px" }}
          onClick={() => handleAddImage()}
          variant="outlined"
        >
          {loading ? <CircularProgress size={18} /> : <Add />}
        </Button>
      </div>
      <div className={styles.ModalUploaderImages}>
        {img.length > 0 &&
          img.map((i) => (
            <div key={i} style={{ position: "relative" }}>
              <Image src={i} alt="producto" width={400} height={400} />
              <Close sx={closeProps} onClick={() => handleDeleteImg(i)} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
