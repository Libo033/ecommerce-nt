"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { Drawer, InputAdornment, TextField } from "@mui/material";
import { Menu as MenuDrawer, Search } from "@mui/icons-material";
import Link from "next/link";
import NavigationDrawer from "./NavigationDrawer";
import NavigationBarOptions from "./NavigationBarOptions";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { CategoryContext } from "@/context/CategoryContext";

const NavigationBar: React.FC<{
  logo: string;
  name: string;
  profile: string;
  cart: string;
}> = ({ logo, name, profile, cart }) => {
  const { categories } = useContext(CategoryContext);
  const { user, loaded, getUserRole, logOut } = useContext(AuthContext);
  const pathname = usePathname();
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    getUserRole().then((isAdmin) => setAdmin(isAdmin));
  }, [getUserRole, loaded]);

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
          {loaded && (
            <NavigationBarOptions
              user={user}
              profile={profile}
              cart={cart}
              admin={admin}
              logOut={logOut}
            />
          )}
        </div>
        <div className={styles.Menu} onClick={() => setToggleDrawer(true)}>
          <MenuDrawer sx={{ fontSize: "45px" }} />
        </div>
        <Drawer
          anchor="right"
          open={toggleDrawer}
          onClose={() => setToggleDrawer(false)}
        >
          <NavigationDrawer user={user} admin={admin} logOut={logOut} />
        </Drawer>
      </div>
      <div
        style={pathname.includes("prods") ? { display: "none" } : undefined}
        className={styles.NavigationBar_Items}
      >
        {categories.length > 0 &&
          categories.map((i) => (
            <div className={styles.Category} key={i._id}>
              <Link href={`/prods/${i.nombre.toLowerCase()}`}>{i.nombre}</Link>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
