"use client";
import React from "react";
import styles from "./page.module.css";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { usePathname } from "next/navigation";

const Footer: React.FC<{
  fb: string;
  ig: string;
  wp: string;
  info: string;
}> = ({ fb, ig, wp, info }) => {
  const pathname = usePathname();

  return (
    <footer
      style={
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/recover_password"
          ? { display: "none" }
          : undefined
      }
      className={styles.Footer}
    >
      <div className={styles.Footer_Social}>
        <div className={styles.Footer_Logos}>
          <a
            className={styles.Footer_Social}
            rel="noreferrer nofollow"
            target="_blank"
            href={fb}
          >
            <Facebook sx={{ color: "#f6f6f6", fontSize: "30px" }} />
          </a>
          <a
            className={styles.Footer_Social}
            rel="noreferrer nofollow"
            target="_blank"
            href={ig}
          >
            <Instagram sx={{ color: "#f6f6f6", fontSize: "30px" }} />
          </a>
          <a
            className={styles.Footer_Social}
            rel="noreferrer nofollow"
            target="_blank"
            href={wp}
          >
            <WhatsApp sx={{ color: "#f6f6f6", fontSize: "30px" }} />
          </a>
        </div>
      </div>
      <Divider sx={{ borderColor: "#818181" }} />
      <div className={styles.Footer_Info}>
        <p>{info}</p>
      </div>
    </footer>
  );
};

export default Footer;
