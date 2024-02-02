"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Menu, MenuItem } from "@mui/material";
import {
  AccountCircle,
  LogoutOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const NavigationBarOptions: React.FC<{
  user: boolean;
  profile: string;
  cart: string;
}> = ({ user, profile, cart }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user ? (
        <div className={styles.LoggedIn}>
          <div className={styles.LoggedIn_Logo}>
            <AccountCircle
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => handleClick(e)}
              sx={{
                fontSize: "32px",
                display: "flex",
                justifyContent: "center",
              }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                sx={{ gap: "9px" }}
                onClick={() => {
                  router.push(`/${profile}`);
                  handleClose();
                }}
              >
                <AccountCircle />
                Perfil
              </MenuItem>
              <MenuItem sx={{ gap: "9px" }} onClick={handleClose}>
                <LogoutOutlined />
                Cerrar sesion
              </MenuItem>
            </Menu>
          </div>
          <div className={styles.LoggedIn_Logo}>
            <ShoppingCart
              onClick={() => router.push(`/${cart}`)}
              sx={{
                fontSize: "32px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default NavigationBarOptions;