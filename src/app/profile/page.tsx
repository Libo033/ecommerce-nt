"use client";
import React, { useContext } from "react";
import styles from "../page.module.css";
import { AuthContext } from "@/context/AuthContext";
import NoAccount from "@/components/auth/NoAccount";
import { Button, TextField } from "@mui/material";

const Profile = () => {
  const { loaded, user } = useContext(AuthContext);

  return (
    <>
      {loaded && user ? (
        <div className="page2">
          <p className={styles.PageTitle}>Perfil</p>
          <div className={styles.Profile_Info}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <TextField
                sx={{ minWidth: "300px", width: "30%" }}
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
                <Button
                  sx={{ minWidth: "230px" }}
                  variant="contained"
                  size="large"
                >
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
                sx={{ minWidth: "300px", width: "30%" }}
                type="password"
                value={"**************"}
                label="contraseña"
                disabled
              />
              <Button
                sx={{ minWidth: "230px" }}
                variant="contained"
                size="large"
              >
                Cambiar contraseña
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "36px",
              }}
            >
              <Button color="error" variant="contained" size="large">
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
