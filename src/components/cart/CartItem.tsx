import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { Add, Close, Remove } from "@mui/icons-material";
import { IHomeCard } from "@/libs/interfaces";

const CartItem: React.FC<IHomeCard> = ({ img, detalle, _id, precio }) => {
  return (
    <article className={styles.CartItem}>
      <Image src={img[0]} alt="producto" width={300} height={300} />
      <div className={styles.CartItem_Info}>
        <p className={styles.CartItem_Marca}>{detalle}</p>
        <p className={styles.CartItem_Id}>#{_id}</p>
      </div>
      <div className={styles.CartItem_Q}>
        <Remove sx={{ cursor: "pointer" }} />
        <span>1</span>
        <Add sx={{ cursor: "pointer" }} />
      </div>
      <p className={styles.CartItem_Price}>
        ${Intl.NumberFormat().format(precio)}
      </p>
      <Close sx={{ margin: "24px", cursor: "pointer" }} />
    </article>
  );
};

export default CartItem;
