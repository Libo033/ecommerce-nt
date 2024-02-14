"use client";
import React, { useContext } from "react";
import styles from "../page.module.css";
import { AuthContext } from "@/context/AuthContext";
import NoAccount from "@/components/auth/NoAccount";
import { Button, TextField } from "@mui/material";

const Profile = () => {
  const { loaded, user, deleteAccount } = useContext(AuthContext);

  const handleDeleteAccount = async () => {
    if (confirm("Estas seguro que deseas borrar tu cuenta")) {
      let res = await deleteAccount();

      if (res) {
        location.reload();
      } else {
        alert(
          "No se pudo eliminar tu cuenta. Cerra sesion y volve a intentar!"
        );
      }
    }
  };

  return (
    <>
      {loaded && user ? (
        <div className="page2">
          <p className={styles.PageTitle}>Perfil</p>
          <div className={styles.Profile_Info}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <TextField
                className={styles.TextField1}
                label="email"
                value={user.email}
                disabled
              />
              {user.emailVerified ? (
                <p
                  style={{
                    color: "#67a26a",
                    fontSize: "large",
                    fontWeight: "300",
                  }}
                >
                  Email verificado
                </p>
              ) : (
                <Button className={styles.Button1} variant="contained">
                  Verificar email
                </Button>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "36px",
              }}
            >
              <TextField
                className={styles.TextField1}
                type="password"
                value={"**************"}
                label="contraseña"
                disabled
              />
              <Button className={styles.Button1} variant="contained">
                Cambiar contraseña
              </Button>
            </div>
            <div style={{ marginTop: "50px" }}>
              <Button
                onClick={() => handleDeleteAccount()}
                color="error"
                variant="contained"
                size="large"
              >
                Eliminar Cuenta
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="page2">
          <NoAccount />
        </div>
      )}
    </>
  );
};

export default Profile;
