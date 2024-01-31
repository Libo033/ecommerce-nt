"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Drawer, InputAdornment, TextField } from "@mui/material";
import { AccountCircle, Menu, Search } from "@mui/icons-material";
import Link from "next/link";
import NavigationDrawer from "./NavigationDrawer";

const NavigationBar: React.FC<{ logo: string; name: string }> = ({
  logo,
  name,
}) => {
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

  return (
    <nav className={styles.NavigationBar}>
      <Link href={"/"} className={styles.Logo}>
        <img src={logo} alt={name} />
      </Link>
      <div className={styles.Logo_Search}>
        <TextField
          fullWidth
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
      <div className={styles.Account}>
        <Link href={"/login"} className={styles.Account_Link}>
          <div className={styles.Account_Logo}>
            <AccountCircle
              sx={{
                fontSize: "36px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
          <div className={styles.Account_Info}>
            <span style={{ fontWeight: "600", fontSize: "16px" }}>
              Mi cuenta
            </span>
            <span
              style={{ fontWeight: "400", fontSize: "14px", color: "gray" }}
            >
              Iniciar sesion o registrarse.
            </span>
          </div>
        </Link>
      </div>
      <div className={styles.Menu} onClick={() => setToggleDrawer(true)}>
        <Menu sx={{ fontSize: "45px" }} />
      </div>
      <Drawer
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
      >
        <NavigationDrawer />
      </Drawer>
    </nav>
  );
};

export default NavigationBar;
