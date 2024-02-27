"use client";
import React, { useContext } from "react";
import styles from "./page.module.css";
import { Button, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AccordionItems from "./AccordionItems";
import {
  AccountCircle,
  AdminPanelSettings,
  Logout,
  ShoppingCart,
} from "@mui/icons-material";
import { User } from "firebase/auth";
import { CategoryContext } from "@/context/CategoryContext";

const NavigationDrawer: React.FC<{
  user: User | null;
  logOut: () => Promise<void>;
  admin: boolean;
}> = ({ user, logOut, admin }) => {
  const { categories } = useContext(CategoryContext);
  const router = useRouter();

  return (
    <div className={styles.Drawer}>
      {user ? ( // Sesion iniciada
        <div className={styles.Drawer_Sesion}>
          <p>Bienvenido Valentin Libonati</p>
          <Button
            onClick={() => router.push("/profile")}
            fullWidth
            variant="contained"
            color="success"
            sx={{ gap: "7px" }}
          >
            <AccountCircle />
            Perfil
          </Button>
          <Button
            onClick={() => router.push("/cart")}
            fullWidth
            variant="contained"
            color="success"
            sx={{ gap: "7px" }}
          >
            <ShoppingCart />
            Carrito
          </Button>
          {admin && ( // Button Redirect para el administrador
            <Button
              onClick={() => router.push("/admin")}
              fullWidth
              variant="contained"
              color="success"
              sx={{ gap: "7px" }}
            >
              <AdminPanelSettings />
              Admin
            </Button>
          )}
          <Divider />
        </div>
      ) : (
        // Sin sesion iniciada
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
      )}
      <div className={styles.Drawer_Items}>
        <AccordionItems items={categories} /> {/* items = categorias de venta */}
      </div>
      {user && ( // LOGOUT
        <div style={{ paddingTop: "12px" }} className={styles.Drawer_Sesion}>
          <Divider />
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ gap: "7px", marginBottom: "24px" }}
            onClick={() => logOut()}
          >
            <Logout />
            Cerrar sesión
          </Button>
        </div>
      )}
    </div>
  );
};

export default NavigationDrawer;
