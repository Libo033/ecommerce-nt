"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Drawer, InputAdornment, TextField } from "@mui/material";
import { Menu as MenuDrawer, Search } from "@mui/icons-material";
import Link from "next/link";
import NavigationDrawer from "./NavigationDrawer";
import { useRouter } from "next/navigation";
import NavigationBarOptions from "./NavigationBarOptions";

const NavigationBar: React.FC<{
  logo: string;
  name: string;
  profile: string;
  cart: string;
}> = ({ logo, name, profile, cart }) => {
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(true);

  return (
    <nav className={styles.NavigationBar}>
      <Link href={"/"} className={styles.Logo}>
        <img src={logo} alt={name} />
      </Link>
      <div className={styles.Logo_Search}>
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
      <div className={styles.Account}>
        <NavigationBarOptions user={user} profile={profile} cart={cart} />
      </div>
      <div className={styles.Menu} onClick={() => setToggleDrawer(true)}>
        <MenuDrawer sx={{ fontSize: "45px" }} />
      </div>
      <Drawer
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
      >
        <NavigationDrawer user={user} />
      </Drawer>
    </nav>
  );
};

export default NavigationBar;
