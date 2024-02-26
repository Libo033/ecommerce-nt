"use client";
import Image from "next/image";
import React, { useContext } from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import { Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { ProductContext } from "@/context/ProductsContext";

interface IProductoAdminCard {
  _id: string;
  marca: string;
  detalle: string;
  img: string[];
  categoria: string;
  precio: number;
  stock: number;
  mostrar: boolean;
  otros: string[];
  genero: string;
}

const ProductoAdminCard: React.FC<IProductoAdminCard> = (props) => {
  const { deleteOneProduct } = useContext(ProductContext);
  return (
    <article className={styles.ProductoAdminCard}>
      <div className={styles.ProductoAdminCard_Img}>
        {/*Agregar swiper para las imagenes*/}
        <Image src={props.img[0]} alt="detalle" width={800} height={800} />
      </div>
      <div className={styles.ProductoAdminCard_Info}>
        <p className={styles.ProductoAdminCard_Id}>ID: {props._id}</p>
        <p className={styles.ProductoAdminCard_Marca}>{props.marca}</p>
        <p className={styles.ProductoAdminCard_Det}>{props.detalle}</p>
        <p className={styles.ProductoAdminCard_Cat}>{props.categoria}</p>
        <p className={styles.ProductoAdminCard_Gen}>
          <strong>Genero:</strong> {props.genero}
        </p>
        <p className={styles.ProductoAdminCard_Stock}>
          <strong>Stock:</strong> {props.stock}
        </p>

        <p className={styles.ProductoAdminCard_Precio}>
          ${Intl.NumberFormat().format(props.precio)}
        </p>
        <p className={styles.ProductoAdminCard_Vis}>
          {props.mostrar ? (
            <>
              <Visibility /> Visible para los usuarios
            </>
          ) : (
            <>
              <VisibilityOff />
              No visible para los usuarios
            </>
          )}
        </p>
      </div>
      <div className={styles.ProductoAdminCard_ButtonGroup}>
        <Button
          fullWidth
          sx={{ gap: "8px" }}
          variant="outlined"
          color="primary"
        >
          <Edit />
          Editar
        </Button>
        <Button
          fullWidth
          sx={{ gap: "8px" }}
          onClick={() => deleteOneProduct(props._id)}
          variant="outlined"
          color="error"
        >
          <Delete />
          Eliminar
        </Button>
      </div>
    </article>
  );
};

export default ProductoAdminCard;
