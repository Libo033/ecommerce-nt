"use client";
import React, { useContext } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";

const LoginButtonGroup = () => {
  const { googleSignIn, facebookSignIn, loaded } = useContext(AuthContext);

  return (
    <div className={styles.ButtonGroup}>
      {loaded && (
        <>
          <button className={styles.Button} onClick={() => googleSignIn()}>
            <Image
              src={"/img/google.svg"}
              alt="google"
              width={45}
              height={45}
            />
            GOOGLE
          </button>
          <button className={styles.Button} onClick={() => facebookSignIn()}>
            <Image
              src={"/img/facebook.svg"}
              alt="facebook"
              width={45}
              height={45}
            />
            FACEBOOK
          </button>
        </>
      )}
    </div>
  );
};

export default LoginButtonGroup;
