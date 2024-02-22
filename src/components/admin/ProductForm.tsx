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
  OutlinedTextFieldProps,
} from "@mui/material";
import { CategoryContext } from "@/context/CategoryContext";
import { Add, Close } from "@mui/icons-material";
import ImageUploader from "./ImageUploader";

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

  const handleAddOtros = () => {
    const n = (document.getElementById("otros") as HTMLInputElement).value;
    setOtros([...otros, n]);
  };

  const handleDeleteOtros = (otro: string) => {
    setOtros(otros.filter((o) => o !== otro));
  };

  const handleAddImage = () => {};

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
      <div className={styles.ModalProduct_Otros}>
        <TextField
          id="otros"
          fullWidth
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="Otros"
        />
        <Button
          onClick={() => handleAddOtros()}
          sx={{ margin: "9px 0px" }}
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
