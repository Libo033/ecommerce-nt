"use client";
import React from "react";
import styles from "./page.module.css";
import { AddCircleOutline, Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

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
      <section></section>
    </div>
  );
};

export default Productos;
