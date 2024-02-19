"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import { Button, Modal, TextField } from "@mui/material";

const MiniCardCategoria: React.FC<{ name: string; id: string }> = ({
  name,
  id,
}) => {
  const [modal, setModal] = useState<boolean>(false);

  const handleDeleteCategory = () => {
    if (confirm(`Estas seguro que deseas borrar la categoria ${name}?`)) {
      console.log("Categoria borrada!");
    }
  };

  return (
    <article
      style={{ justifyContent: "space-between" }}
      className={styles.MiniCard}
    >
      <p>{name}</p>
      <div className={styles.AdminIcons}>
        <Edit onClick={() => setModal(true)} sx={{ cursor: "pointer" }} />
        <Delete onClick={handleDeleteCategory} sx={{ cursor: "pointer" }} />
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <form className={styles.Modal}>
          <p className={styles.ModalTitle}>Editar categoria</p>
          <TextField
            sx={{ margin: "9px 0px 9px 0px" }}
            fullWidth
            type="text"
            variant="outlined"
            label="ID"
            autoComplete="off"
            disabled
          />
          <TextField
            sx={{ margin: "9px 0px 21px 0px" }}
            fullWidth
            type="text"
            variant="outlined"
            label="Nombre"
            autoComplete="off"
            required
          />
          <Button fullWidth variant="contained">
            editar
          </Button>
        </form>
      </Modal>
    </article>
  );
};

const Categorias = () => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className={styles.Categorias}>
      <p className={styles.Categorias_Nueva} onClick={() => setModal(true)}>
        <AddCircleOutline sx={{ fontSize: "small" }} /> Nueva Categoria
      </p>
      <section>
        <MiniCardCategoria id="1" name={"Perfumeria"} />
      </section>
      <Modal open={modal} onClose={() => setModal(false)}>
        <form className={styles.Modal}>
          <p className={styles.ModalTitle}>Crear categoria</p>
          <TextField
            sx={{ margin: "9px 0px 21px 0px" }}
            fullWidth
            type="text"
            variant="outlined"
            label="Nombre"
            autoComplete="off"
            required
          />
          <Button fullWidth variant="contained">
            craer
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Categorias;
