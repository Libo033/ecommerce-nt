"use client";
import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import { AddCircleOutline, Search } from "@mui/icons-material";
import { InputAdornment, Modal, Skeleton, TextField } from "@mui/material";
import ProductoAdminCard from "./ProductoAdminCard";
import ProductForm from "./ProductForm";
import { ProductContext } from "@/context/ProductsContext";

const Productos = () => {
  const { products, loaded } = useContext(ProductContext);
  const [modal, setModal] = useState<boolean>(false);

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div className={styles.Page}>
      <p className={styles.Nuevo} onClick={() => setModal(true)}>
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
        {loaded ? (
          products.length > 0 ? (
            products.map((p) => <ProductoAdminCard key={p._id} {...p} />)
          ) : (
            <>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "larger",
                  color: "gray",
                  marginTop: "64px",
                }}
              >
                No hay productos
              </p>
            </>
          )
        ) : (
          <>
            <Skeleton
              sx={{ margin: "15px 0" }}
              variant="rounded"
              width={"100%"}
              height={270}
            />
            <Skeleton
              sx={{ margin: "15px 0" }}
              variant="rounded"
              width={"100%"}
              height={270}
            />
            <Skeleton
              sx={{ margin: "15px 0" }}
              variant="rounded"
              width={"100%"}
              height={270}
            />
          </>
        )}
      </section>
      <Modal open={modal} onClose={handleClose}>
        <>
          <ProductForm id={null} handleClose={handleClose} />
        </>
      </Modal>
    </div>
  );
};

export default Productos;
