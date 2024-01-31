"use client";
import React from "react";
import styles from "./page.module.css";
import { Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavigationDrawer = () => {
  const router = useRouter();

  return (
    <div className={styles.Drawer}>
      <div className={styles.Drawer_Sesion}>
        <p>Inicia sesion para mejorar tu experiencia</p>
        <Button
          onClick={() => router.push("/login")}
          fullWidth
          variant="contained"
          color="success"
        >
          INICIA SESION
        </Button>
        <span style={{ fontSize: "13px" }}>
          No tenes cuenta?{" "}
          <Link href={"/register"} className="LinkA">
            Registrate!
          </Link>
        </span>
        <Divider />
      </div>
    </div>
  );
};

export default NavigationDrawer;
