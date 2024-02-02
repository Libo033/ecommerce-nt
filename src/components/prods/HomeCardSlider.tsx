import React from "react";
import styles from "./page.module.css";
import { IHomeCard } from "@/libs/interfaces";

const HomeCardSlider: React.FC<{ title: string, cards: Array<IHomeCard> }> = ({ title, cards }) => {
  return (
    <div className={styles.HomeCardSlider}>
      <p className={styles.HomeCardSlider_Title}>{title}</p>
      <section></section>
    </div>
  );
};

export default HomeCardSlider;
