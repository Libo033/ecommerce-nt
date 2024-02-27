"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { ProductContext } from "@/context/ProductsContext";
import { IProduct } from "@/libs/interfaces";

interface IProductForm {
  id: string | null;
  handleClose: () => void;
}

const ProductForm: React.FC<IProductForm> = ({ id, handleClose }) => {
  const { products, createOneProduct, updateOneProduct } =
    useContext(ProductContext);
  const { categories, loaded } = useContext(CategoryContext);
  const [categoria, setCategoria] = useState<string>("");
  const [genero, setGenero] = useState<string>("sin");
  const [mostrar, setMostrar] = useState<boolean>(true);
  const [img, setImg] = useState<string[]>([]);
  const [otros, setOtros] = useState<string[]>([]);

  const textFieldProps: Partial<OutlinedTextFieldProps> = {
    type: "text",
    autoComplete: "off",
    size: "small",
  };

  const handleNewProduct = async (e: FormEvent) => {
    e.preventDefault();

    let d = document;

    let prod: IProduct = {
      _id: id?.toString() || "",
      marca: (d.getElementById("marca") as HTMLInputElement).value,
      categoria,
      genero,
      mostrar,
      img,
      otros,
      detalle: (d.getElementById("detalle") as HTMLInputElement).value,
      precio: parseFloat(
        (d.getElementById("precio") as HTMLInputElement).value
      ),
      stock: parseInt((d.getElementById("stock") as HTMLInputElement).value),
    };

    if (id) {
      const mod = await updateOneProduct(prod);

      if (mod) handleClose();
    } else {
      const creado = await createOneProduct(prod);

      if (creado) handleClose();
    }
  };

  useEffect(() => {
    if (id) {
      products.forEach((p) => {
        if (p._id === id) {
          (document.getElementById("marca") as HTMLInputElement).value =
            p.marca;
          (document.getElementById("detalle") as HTMLInputElement).value =
            p.detalle;
          (document.getElementById("precio") as HTMLInputElement).value =
            p.precio.toString();
          (document.getElementById("stock") as HTMLInputElement).value =
            p.stock.toString();
          setOtros(p.otros);
          setMostrar(p.mostrar);
          setImg(p.img);
          setGenero(p.genero);
          setCategoria(p.categoria);
        }
      });
    }
  }, [id]); // cuando hay ID settear todo.

  return (
    <form
      className={styles.ModalProduct}
      onSubmit={(e: FormEvent) => handleNewProduct(e)}
    >
      <p className={styles.ModalTitle}>
        {id ? "Editar producto" : "Crear producto"}
      </p>
      {id && (
        <TextField
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="ID"
          value={id}
          disabled
        />
      )}
      <div className={styles.ModalDoble}>
        <TextField
          {...textFieldProps}
          sx={{ margin: "9px 0px", width: "50%" }}
          label="Marca"
          id="marca"
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
                <MenuItem key={c._id} value={c.nombre}>
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
        id="detalle"
      />
      <ImageUploader img={img} setImg={setImg} txtProps={textFieldProps} />
      <div className={styles.ModalDoble}>
        <TextField
          fullWidth
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="Precio"
          id="precio"
          type="number"
        />
        <TextField
          fullWidth
          sx={{ margin: "9px 0px" }}
          {...textFieldProps}
          label="Stock"
          id="stock"
          type="number"
        />
      </div>
      <div className={styles.ModalDoble}>
        <FormControlLabel
          sx={{ width: "50%", fontSize: "small" }}
          control={
            <Checkbox
              value={mostrar}
              checked={mostrar}
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
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="femenino">Femenino</MenuItem>
            <MenuItem value="sin">Sin</MenuItem>
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
