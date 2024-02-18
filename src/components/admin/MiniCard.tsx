import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const MiniCard: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Link href={`/admin/${name}`} className={styles.MiniCard}>
      <p>{name}</p>
    </Link>
  );
};

export default MiniCard;
