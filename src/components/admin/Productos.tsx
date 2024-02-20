"use client";
import React from "react";
import styles from "./page.module.css";
import { AddCircleOutline, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import ProductoAdminCard from "./ProductoAdminCard";

const Productos = () => {
  return (
    <div className={styles.Page}>
      <p className={styles.Nuevo} /*onClick={() => setModal(true)}*/>
        <AddCircleOutline sx={{ fontSize: "small" }} /> Nuevo Producto
      </p>
      <div style={{ marginTop: "16px", width: "315px" }}>
        <TextField
          fullWidth
          autoComplete="off"
          placeholder="Buscar un producto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ backgroundColor: "#fff" }}
        />
      </div>
      <section>
        <ProductoAdminCard
          _id={"1"}
          marca={"jota"}
          detalle={"Jota rojo carmesi 30Ml"}
          img={[
            "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
          ]}
          categoria={"Perfumeria"}
          precio={32000}
          stock={3}
          mostrar={true}
          otros={[]}
          genero={"femenino"}
        />
      </section>
    </div>
  );
};

export default Productos;
