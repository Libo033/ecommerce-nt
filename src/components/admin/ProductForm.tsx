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
  OutlinedTextFieldProps,
} from "@mui/material";
import { CategoryContext } from "@/context/CategoryContext";
import ImageUploader from "./ImageUploader";
import Otros from "./Otros";

interface IProductForm {
  id: string | null;
}

const ProductForm: React.FC<IProductForm> = ({ id }) => {
  const { categories, loaded } = useContext(CategoryContext);
  const [categoria, setCategoria] = useState<string>("");
  const [genero, setGenero] = useState<string>("Sin");
  const [mostrar, setMostrar] = useState<boolean>(true);
  const [img, setImg] = useState<string[]>([]);
  const [otros, setOtros] = useState<string[]>([]);

  const textFieldProps: Partial<OutlinedTextFieldProps> = {
    type: "text",
    autoComplete: "off",
    size: "small",
  };

  return (
    <form className={styles.ModalProduct}>
      <p className={styles.ModalTitle}>
        {id ? "Editar producto" : "Crear producto"}
      </p>
      {id && (
        <TextField
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="ID"
          disabled
        />
      )}
      <div className={styles.ModalDoble}>
        <TextField
          {...textFieldProps}
          sx={{ margin: "9px 0px", width: "50%" }}
          label="Marca"
        />
        <FormControl size="small" style={{ margin: "9px 0px", width: "50%" }}>
          <InputLabel size="small" id="cat-select-label">
            Categoria
          </InputLabel>
          <Select
            size="small"
            fullWidth
            id="cat-select"
            labelId="cat-select-label"
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
        {...textFieldProps}
        sx={{ margin: "9px 0px" }}
        label="Detalle"
      />
      <ImageUploader img={img} setImg={setImg} txtProps={textFieldProps} />
      <div className={styles.ModalDoble}>
        <TextField
          fullWidth
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="Precio"
        />
        <TextField
          fullWidth
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="Stock"
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
        <FormControl size="small" style={{ margin: "9px 0px", width: "50%" }}>
          <InputLabel size="small" id="gen-select-label">
            Genero
          </InputLabel>
          <Select
            size="small"
            fullWidth
            id="gen-select"
            labelId="gen-select-label"
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
      <Otros
        otros={otros}
        setOtros={setOtros}
        textFieldProps={textFieldProps}
      />
      <Button type="submit" fullWidth variant="contained">
        {id ? "Editar" : "Crear"}
      </Button>
    </form>
  );
};

export default ProductForm;
