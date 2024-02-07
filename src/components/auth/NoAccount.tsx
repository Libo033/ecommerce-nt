"use client;";
import React from "react";
import styles from "./page.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NoAccount = () => {
  const router = useRouter();

  return (
    <div className={styles.NoAccount}>
      <p>Inicia sesion o create una cuenta</p>
      <span>Para ver tu perfil necesitas iniciar sesion.</span>
      <Button
        onClick={() => router.push("/login")}
        sx={{ marginTop: "36px" }}
        variant="outlined"
        size="large"
      >
        Inciar sesion
      </Button>
    </div>
  );
};

export default NoAccount;
