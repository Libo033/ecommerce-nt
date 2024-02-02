"use client";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }

  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

const theme = createTheme({
  palette: {
    custom: {
      main: "#3a734b",
      light: "#67a26a",
      dark: "#a9c186",
      contrastText: "#242105",
    },
  },
});

const HomeCard: React.FC<{
  _id: string;
  marca: string;
  detalle: string;
  categoria: string;
  img: string;
  precio: number;
}> = ({ _id, marca, detalle, img, categoria, precio }) => {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <article className={styles.HomeCard}>
        <div className={styles.HomeCard_Image}>
          <Image src={img} alt={detalle} width={450} height={450} />
        </div>
        <div className={styles.HomeCard_Body}>
          <div>
            <p className={styles.HomeCard_Marca}>{marca}</p>
            <p className={styles.HomeCard_Detalle}>{detalle}</p>
          </div>
          <p className={styles.HomeCard_Precio}>
            ${Intl.NumberFormat().format(precio)}
          </p>
        </div>
        <Button
          fullWidth
          sx={{ fontWeight: "600", marginTop: "18px" }}
          variant="outlined"
          color="custom"
        >
          COMPRAR
        </Button>
      </article>
    </ThemeProvider>
  );
};

export default HomeCard;
