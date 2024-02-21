"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import styles from "./page.module.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  Chip,
} from "@mui/material";
import { CategoryContext } from "@/context/CategoryContext";
import { Add, Close, FileOpen } from "@mui/icons-material";
import Image from "next/image";

interface IProductForm {
  id: string | null;
}

const ProductForm: React.FC<IProductForm> = ({ id }) => {
  const { categories, loaded } = useContext(CategoryContext);
  const [categoria, setCategoria] = useState<string>("");
  const [genero, setGenero] = useState<string>("Sin");
  const [mostrar, setMostrar] = useState<boolean>(true);
  const [img, setImg] = useState<string[]>([
    "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
  ]);
  const [otros, setOtros] = useState<string[]>([]);

  const handleAddOtros = () => {
    const n = (document.getElementById("otros") as HTMLInputElement).value;
    setOtros([...otros, n]);
  };

  const handleDeleteOtros = (otro: string) => {
    setOtros(otros.filter((o) => o !== otro));
  };

  return (
    <form className={styles.ModalProduct}>
      <p className={styles.ModalTitle}>
        {id ? "Editar producto" : "Crear producto"}
      </p>
      {id && (
        <TextField
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="ID"
          autoComplete="off"
          size="small"
          disabled
        />
      )}
      <div className={styles.ModalDoble}>
        <TextField
          size="small"
          sx={{ margin: "9px 0px 9px 0px", width: "50%" }}
          type="text"
          variant="outlined"
          label="Marca"
          autoComplete="off"
        />
        <FormControl
          size="small"
          style={{ margin: "9px 0px 9px 0px", width: "50%" }}
        >
          <InputLabel size="small" id="demo-simple-select-label">
            Categoria
          </InputLabel>
          <Select
            size="small"
            fullWidth
            id="demo-simple-select"
            labelId="demo-simple-select-label"
            label="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {loaded &&
              categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.nombre}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <TextField
        sx={{ margin: "9px 0px 9px 0px" }}
        size="small"
        type="text"
        variant="outlined"
        label="Detalle"
        autoComplete="off"
      />
      <div className={styles.ModalUploader}>
        <div className={styles.ModalInputsUploader}>
          <TextField
            fullWidth
            sx={{ margin: "9px 0px 9px 0px" }}
            type="text"
            variant="outlined"
            label="URL"
            size="small"
            autoComplete="off"
          />
          <label htmlFor="file" className={styles.ModalFileLabel}>
            <FileOpen sx={{ fontSize: "21px" }} />
          </label>
          <input type="file" id="file" style={{ display: "none" }} />
          <Button
            sx={{ height: "40px", margin: "9px 0px 9px 0px" }}
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
                <Close
                  sx={{
                    position: "absolute",
                    zIndex: "99",
                    top: "6px",
                    right: "6px",
                    fontSize: "21px",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <div className={styles.ModalDoble}>
        <TextField
          fullWidth
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="Precio"
          autoComplete="off"
          size="small"
        />
        <TextField
          fullWidth
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="Stock"
          autoComplete="off"
          size="small"
        />
      </div>
      <div className={styles.ModalDoble}>
        <FormControlLabel
          sx={{ width: "50%", fontSize: "small" }}
          control={
            <Checkbox
              value={mostrar}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMostrar(e.target.checked)
              }
            />
          }
          label="Visible"
        />
        <FormControl
          size="small"
          style={{ margin: "9px 0px 9px 0px", width: "50%" }}
        >
          <InputLabel size="small" id="demo-simple-select-label">
            Genero
          </InputLabel>
          <Select
            size="small"
            fullWidth
            id="demo-simple-select"
            labelId="demo-simple-select-label"
            label="Genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
            <MenuItem value="Sin">Sin</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={styles.ModalProduct_Otros}>
        <TextField
          id="otros"
          fullWidth
          size="small"
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="Otros"
          autoComplete="off"
        />
        <Button
          onClick={() => handleAddOtros()}
          sx={{ margin: "9px 0px 9px 0px" }}
          variant="outlined"
          size="small"
        >
          <Add />
        </Button>
      </div>
      <div className={styles.ModalBadgeContainer}>
        {otros.length > 0 &&
          otros.map((o) => (
            <Chip
              key={o}
              label={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <p>{o}</p>
                  <Close
                    onClick={() => handleDeleteOtros(o)}
                    sx={{ fontSize: "17px", cursor: "pointer" }}
                  />
                </div>
              }
            />
          ))}
      </div>
      <Button type="submit" fullWidth variant="contained">
        {id ? "Editar" : "Crear"}
      </Button>
    </form>
  );
};

export default ProductForm;

/*
interface IProductoAdminCard {
  marca: string; categoria: string;
  detalle: string;
  img: string[];
  precio: number;   stock: number;
  mostrar: boolean;   genero: "femenino" | "masculino" | "sin";
  otros: string[];
}
*/
