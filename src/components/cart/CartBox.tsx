"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Button, Divider } from "@mui/material";
import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
import CartItem from "./CartItem";

/* https://dribbble.com/shots/14157532-GameWorld-Ecommerce-Cart */

const CartBox = () => {
  let items = [];

  return (
    <div className={styles.CartBox}>
      <div className={styles.CartBox_ButtonGroup}>
        <Button sx={{ gap: "6px" }} variant="outlined">
          <AddShoppingCart /> Seguir comprando
        </Button>
        <Button sx={{ gap: "6px" }} variant="outlined" color="error">
          <RemoveShoppingCart /> Vaciar carrito
        </Button>
      </div>
      <section className={styles.CartBox_ItemsContainer}>
        <Divider />
        <p className={styles.CartBox_Empty}>El carrito esta vacio.</p>
        <Divider />
      </section>
      <div className={styles.CartBox_Total}>
        <p>Subtotal: ${Intl.NumberFormat().format(120000)}</p>
        <Button
          variant="contained"
          size="large"
          sx={{ fontWeight: "600" }}
          color="success"
        >
          comprar
        </Button>
      </div>
    </div>
  );
};

export default CartBox;
