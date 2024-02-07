"use client";
import React, { FormEvent, useContext, useId, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";

const Recover = () => {
  const { loaded, recoverPassword } = useContext(AuthContext);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const $EMAIL = useId();

  const emailSender = (e: FormEvent) => {
    try {
      e.preventDefault();

      let em = (document.getElementById($EMAIL) as HTMLInputElement).value;

      if (em === "") {
        throw new Error("Ingresa tu email.");
      }

      recoverPassword(em);

      setEmailSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  return (
    <div className={styles.Form}>
      <div className={styles.Form_ImgContainer}>
        <Image src={"/img/login.svg"} alt="login" width={90} height={90} />
      </div>
      <p className={styles.Form_Title}>Olvidaste tu constraseña?</p>
      <span className={styles.Form_SubTitle}>
        No te preocupes, te mandaremos las instrucciones para que cambies tu
        costraseña.
      </span>
      {emailSent ? (
        <div className={styles.RecoverSend}>
          <Image src={"/img/check.png"} alt="check" width={78} height={78} />
          <p>Email enviado exitosamente!</p>
        </div>
      ) : (
        <form
          style={{ height: "180px" }}
          className={styles.Form_Form}
          onSubmit={(Event: FormEvent) => emailSender(Event)}
        >
          <TextField
            id={$EMAIL}
            label="Email"
            variant="outlined"
            fullWidth={true}
            type="email"
            onChange={() => setError(undefined)}
            error={error ? true : false}
            helperText={error?.message}
          />
          <Button type="submit" variant="contained">
            ENVIAR
          </Button>
        </form>
      )}
      <div style={{ justifyContent: "center" }} className={styles.Form_Links}>
        <Link className="LinkA" href={"/login"}>
          Volver a inicio de sesion
        </Link>
      </div>
    </div>
  );
};

export default Recover;
