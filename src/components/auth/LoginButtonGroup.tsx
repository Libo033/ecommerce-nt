"use client";
import React, { useContext } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginButtonGroup = () => {
  const router = useRouter();
  const { googleSignIn, facebookSignIn, loaded } = useContext(AuthContext);

  const loginWithGoogle = () => {
    // usar redirect para despues de logearse
  };

  const loginWithFacebook = () => {
    // usar redirect para despues de logearse
  };

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
          <button className={styles.Button}>
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
