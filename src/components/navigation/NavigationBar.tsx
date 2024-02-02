"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Drawer, InputAdornment, TextField } from "@mui/material";
import { Menu as MenuDrawer, Search } from "@mui/icons-material";
import Link from "next/link";
import NavigationDrawer from "./NavigationDrawer";
import NavigationBarOptions from "./NavigationBarOptions";
import { usePathname } from "next/navigation";

const NavigationBar: React.FC<{
  logo: string;
  name: string;
  profile: string;
  cart: string;
}> = ({ logo, name, profile, cart }) => {
  const pathname = usePathname();
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(true);

  let items = [
    {
      _id: "1",
      categoria: "Perfumeria",
      opciones: [
        { _id: "1", info: "Perfumes de hombre" },
        { _id: "2", info: "Perfumes de mujer" },
      ],
    },
    {
      _id: "2",
      categoria: "Cabello",
      opciones: [
        { _id: "1", info: "Para lavar" },
        { _id: "2", info: "Para tratar" },
      ],
    },
  ];

  return (
    <nav
      style={
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/recover_password"
          ? { display: "none" }
          : undefined
      }
      className={styles.Navigation}
    >
      <div className={styles.NavigationBar}>
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
      </div>
      <div className={styles.NavigationBar_Items}>
        {items.length > 0 &&
          items.map((i) => (
            <div className={styles.Category} key={i._id}>
              <Link href={`/prods/${i.categoria.toLowerCase()}`}>
                {i.categoria}
              </Link>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
