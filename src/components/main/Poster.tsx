import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";

const Poster: React.FC<{ h1: string; h2: string }> = ({ h1, h2 }) => {
  return (
    <div className={styles.Poster}>
      <div>
        <h1>{h1}</h1>
        <h2>{h2}</h2>
      </div>
      <Link href={"/prods"}>
        Empezar <ArrowForward />
      </Link>
    </div>
  );
};

export default Poster;
