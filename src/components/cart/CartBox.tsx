import React from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";

const CartBox = () => {
  return (
    <div className={styles.CartBox}>
      <div className={styles.CartBox_ButtonGroup}>
        <Button sx={{ gap: "6px" }} variant="outlined">
          <RemoveShoppingCart /> Vaciar carrito
        </Button>
        <Button sx={{ gap: "6px" }} variant="outlined">
          <AddShoppingCart /> Seguir comprando
        </Button>
      </div>
    </div>
  );
};

export default CartBox;
