import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

const LoginButtonGroup = () => {
  return (
    <div className={styles.ButtonGroup}>
      <button className={styles.Button}>
        <Image src={"/img/google.svg"} alt="google" width={45} height={45} />
        GOOGLE
      </button>
      <button className={styles.Button}>
        <Image
          src={"/img/facebook.svg"}
          alt="facebook"
          width={45}
          height={45}
        />
        FACEBOOK
      </button>
    </div>
  );
};

export default LoginButtonGroup;
