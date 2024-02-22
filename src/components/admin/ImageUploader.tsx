"use client";
import React, { SetStateAction, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Add, Close, FileOpen } from "@mui/icons-material";
import {
  Button,
  OutlinedTextFieldProps,
  SxProps,
  TextField,
} from "@mui/material";

interface IImageUploader {
  img: string[];
  setImg: React.Dispatch<SetStateAction<string[]>>;
  txtProps: Partial<OutlinedTextFieldProps>;
}

const ImageUploader: React.FC<IImageUploader> = ({ img, setImg, txtProps }) => {
  const [url, setUrl] = useState("");

  const closeProps: SxProps = {
    position: "absolute",
    zIndex: "99",
    top: "6px",
    right: "6px",
    fontSize: "21px",
    cursor: "pointer",
  };

  const handleAddImage = () => {
    console.log("Nueva Imagen");
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
        <input type="file" id="file" style={{ display: "none" }} />
        <Button
          sx={{ height: "40px", margin: "9px 0px" }}
          onClick={() => handleAddImage()}
          variant="outlined"
        >
          <Add />
        </Button>
      </div>
      <div className={styles.ModalUploaderImages}>
        {img.length > 0 &&
          img.map((i) => (
            <div key={i} style={{ position: "relative" }}>
              <Image src={i} alt="producto" width={400} height={400} />
              <Close sx={closeProps} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
