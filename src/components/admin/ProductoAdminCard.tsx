"use client";
import Image from "next/image";
import React, { SetStateAction, useContext } from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import { Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { ProductContext } from "@/context/ProductsContext";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import { useRouter } from "next/navigation";

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
  setModal: React.Dispatch<SetStateAction<boolean>>;
}

const ProductoAdminCard: React.FC<IProductoAdminCard> = (props) => {
  const { deleteOneProduct } = useContext(ProductContext);
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/productos?id=${props._id}`);
    props.setModal(true);
  };

  return (
    <article className={styles.ProductoAdminCard}>
      <div className={styles.ProductoAdminCard_Img}>
        <Swiper slidesPerView={1} loop={true}>
          {props.img.map((i) => (
            <SwiperSlide
              key={i}
              style={{
                height: "270px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={i} alt="detalle" width={800} height={800} />
            </SwiperSlide>
          ))}
        </Swiper>
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
          onClick={() => handleEdit()}
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
