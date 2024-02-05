"use client";
import React, { Fragment, useState } from "react";
import styles from "./page.module.css";
import { Button, Divider } from "@mui/material";
import { AddShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
import CartItem from "./CartItem";
import { IHomeCard } from "@/libs/interfaces";

/* https://dribbble.com/shots/14157532-GameWorld-Ecommerce-Cart */

const CartBox = () => {
  const items: IHomeCard[] = [
    {
      _id: "1",
      marca: "jota",
      detalle: "Jota azul marino femenino 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "2",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "3",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "4",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "5",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "6",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
  ];
  let total: number = 0;
  items.forEach((i) => (total = total + i.precio));

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
        {items.length > 0 ? (
          items.map((i) => (
            <Fragment key={i._id}>
              <CartItem {...i} />
              <Divider />
            </Fragment>
          ))
        ) : (
          <>
            <Divider />
            <p className={styles.CartBox_Empty}>El carrito esta vacio.</p>
            <Divider />
          </>
        )}
      </section>
      <div className={styles.CartBox_Total}>
        <p>Subtotal: ${Intl.NumberFormat().format(total)}</p>
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
