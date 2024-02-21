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
} from "@mui/material";
import { CategoryContext } from "@/context/CategoryContext";

interface IProductForm {
  id: string | null;
}

const ProductForm: React.FC<IProductForm> = ({ id }) => {
  const { categories, loaded } = useContext(CategoryContext);
  const [categoria, setCategoria] = useState<string>("");
  const [genero, setGenero] = useState<string>("Sin");
  const [mostrar, setMostrar] = useState<boolean>(true);

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
          sx={{ margin: "9px 0px 9px 0px", width: "50%" }}
          type="text"
          variant="outlined"
          label="Marca"
          autoComplete="off"
        />
        <FormControl style={{ margin: "9px 0px 9px 0px", width: "50%" }}>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
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
        type="text"
        variant="outlined"
        label="Detalle"
        autoComplete="off"
      />
      <div>
        <TextField
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="URL"
          autoComplete="off"
        />
      </div>
      <div className={styles.ModalDoble}>
        <TextField
          fullWidth
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="Precio"
          autoComplete="off"
        />
        <TextField
          fullWidth
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="Stock"
          autoComplete="off"
        />
      </div>
      <div className={styles.ModalDoble}>
        <FormControlLabel
          sx={{ width: "50%" }}
          control={
            <Checkbox
              value={mostrar}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMostrar(e.target.checked)
              }
            />
          }
          label="Visible para los usuarios"
        />
        <FormControl style={{ margin: "9px 0px 9px 0px", width: "50%" }}>
          <InputLabel id="demo-simple-select-label">Genero</InputLabel>
          <Select
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
      <div>
        <TextField
          sx={{ margin: "9px 0px 9px 0px" }}
          type="text"
          variant="outlined"
          label="Otros"
          autoComplete="off"
        />
      </div>
      <Button fullWidth variant="contained">
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
