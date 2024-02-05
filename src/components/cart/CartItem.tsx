import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { Add, Close, Remove } from "@mui/icons-material";

const CartItem = () => {
  return (
    <article className={styles.CartItem}>
      <Image
        src={
          "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg"
        }
        alt="producto"
        width={300}
        height={300}
      />
      <div className={styles.CartItem_Info}>
        <p className={styles.CartItem_Marca}>Jota blanco 30Ml</p>
        <p className={styles.CartItem_Id}>#123456789</p>
      </div>
      <div className={styles.CartItem_Q}>
        <Remove sx={{ cursor: "pointer" }} />
        <span>1</span>
        <Add sx={{ cursor: "pointer" }} />
      </div>
      <p className={styles.CartItem_Price}>
        ${Intl.NumberFormat().format(31999)}
      </p>
      <Close sx={{ margin: "36px", cursor: "pointer" }} />
    </article>
  );
};

export default CartItem;
