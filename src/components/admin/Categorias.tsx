"use client";
import React, { useContext, useState } from "react";
import styles from "./page.module.css";
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import { Alert, Button, Modal, TextField, Snackbar } from "@mui/material";
import { CategoryContext } from "@/context/CategoryContext";

const MiniCardCategoria: React.FC<{ nombre: string; id: string }> = ({
  nombre,
  id,
}) => {
  const { updateOne, deleteOne } = useContext(CategoryContext);
  const [inputName, setInputName] = useState<string>(nombre);
  const [modal, setModal] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);

  const handleClose = () => {
    setModal(false);
    setInputName(nombre);
  };

  const handleDeleteCategory = async () => {
    if (confirm(`Estas seguro que deseas borrar la categoria ${nombre}?`)) {
      const deleted = await deleteOne(id);
    }
  };

  const handleEditCategory = async (id: string, name: string) => {
    const edited = await updateOne(id, name);

    if (edited) {
      setEdited(true);
      setTimeout(() => {
        setEdited(false);
      }, 3000);
    } else {
      alert("Error al editar categoria. Intentalo mas tarde.");
    }
    setModal(false);
    setInputName("");
  };

  return (
    <article
      style={{ justifyContent: "space-between" }}
      className={styles.MiniCard}
    >
      <p>{nombre}</p>
      <div className={styles.AdminIcons}>
        <Edit onClick={() => setModal(true)} sx={{ cursor: "pointer" }} />
        <Delete onClick={handleDeleteCategory} sx={{ cursor: "pointer" }} />
      </div>
      <Modal open={modal} onClose={handleClose}>
        <form className={styles.Modal}>
          <p className={styles.ModalTitle}>Editar categoria</p>
          <TextField
            sx={{ margin: "9px 0px 9px 0px" }}
            fullWidth
            type="text"
            variant="outlined"
            label="ID"
            autoComplete="off"
            value={id}
            disabled
          />
          <TextField
            sx={{ margin: "9px 0px 21px 0px" }}
            fullWidth
            type="text"
            variant="outlined"
            label="Nombre"
            autoComplete="off"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            required
          />
          <Button
            onClick={async () => await handleEditCategory(id, inputName)}
            fullWidth
            variant="contained"
          >
            editar
          </Button>
        </form>
      </Modal>
      <Snackbar open={edited}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Categoria editada exitosamente!
        </Alert>
      </Snackbar>
    </article>
  );
};

const Categorias = () => {
  const { categories, createOne } = useContext(CategoryContext);
  const [inputName, setInputName] = useState<string>("");
  const [created, setCreated] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const handleClose = () => {
    setModal(false);
    setInputName("");
  };

  const handleCreateCategory = async (name: string) => {
    const created = await createOne(name);

    if (created) {
      setCreated(true);
      setTimeout(() => {
        setCreated(false);
      }, 3000);
    } else {
      alert("Error al crear categoria. Intentalo mas tarde.");
    }
    setModal(false);
    setInputName("");
  };

  return (
    <div className={styles.Categorias}>
      <p className={styles.Categorias_Nueva} onClick={() => setModal(true)}>
        <AddCircleOutline sx={{ fontSize: "small" }} /> Nueva Categoria
      </p>
      <section>
        {categories.length > 0 &&
          categories.map((c) => (
            <MiniCardCategoria key={c._id} id={c._id} nombre={c.nombre} />
          ))}
      </section>
      <Modal open={modal} onClose={handleClose}>
        <form className={styles.Modal}>
          <p className={styles.ModalTitle}>Crear categoria</p>
          <TextField
            sx={{ margin: "15px 0px 21px 0px" }}
            fullWidth
            type="text"
            variant="outlined"
            label="Nombre"
            autoComplete="off"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            required
          />
          <Button
            onClick={async () => await handleCreateCategory(inputName)}
            fullWidth
            variant="contained"
          >
            craer
          </Button>
        </form>
      </Modal>
      <Snackbar open={created}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Categoria creada exitosamente!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Categorias;
