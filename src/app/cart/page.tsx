import React from "react";
import styles from "../page.module.css";
import CartBox from "@/components/cart/CartBox";

const Cart = () => {
  return (
    <div className="page2">
      <p className={styles.PageTitle}>Carrito</p>
      <div>
        <CartBox />
      </div>
    </div>
  );
};

export default Cart;
