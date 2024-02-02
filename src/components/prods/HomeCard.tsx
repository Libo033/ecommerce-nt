"use client";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { IHomeCard } from "@/libs/interfaces";

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

const HomeCard: React.FC<IHomeCard> = ({ _id, marca, detalle, img, categoria, precio }) => {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <article className={styles.HomeCard}>
        <div className={styles.HomeCard_Image}>
          <Image src={img[0]} alt={detalle} width={450} height={450} />
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
          onClick={() =>
            router.push(`/prods/${categoria.toLowerCase()}/${_id}`)
          }
        >
          COMPRAR
        </Button>
      </article>
    </ThemeProvider>
  );
};

export default HomeCard;
