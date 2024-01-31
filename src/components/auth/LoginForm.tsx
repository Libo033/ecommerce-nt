"use client";
import React, { FormEvent, useId, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Button, FormHelperText, TextField } from "@mui/material";
import Link from "next/link";

const LoginForm: React.FC<{ forgotPass: string; signUp: string }> = ({
  forgotPass,
  signUp,
}) => {
  const [error, setError] = useState<Error | undefined>();
  const $EMAIL = useId();
  const $PASSWORD = useId();

  const handleLogin = (e: FormEvent): void => {
    try {
      e.preventDefault();

      throw new Error("Email o contraseña incorrectos.");
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
      <p className={styles.Form_Title}>Iniciar Sesion</p>
      <form
        style={{ height: "300px" }}
        className={styles.Form_Form}
        onSubmit={(Event: FormEvent) => handleLogin(Event)}
      >
        <TextField
          id={$EMAIL}
          label="Email"
          variant="outlined"
          fullWidth={true}
          type="email"
          onChange={() => setError(undefined)}
          error={error ? true : false}
          required
        />
        <TextField
          id={$PASSWORD}
          label="Contraseña"
          variant="outlined"
          fullWidth={true}
          type="password"
          onChange={() => setError(undefined)}
          error={error ? true : false}
          required
        />
        <Button type="submit" variant="contained">
          Iniciar Sesion
        </Button>
      </form>
      <div className={styles.Form_Links}>
        <Link className="LinkA" href={`/${forgotPass}`}>
          Olvidaste tu constraseña?
        </Link>
        <Link className="LinkA" href={`/${signUp}`}>
          No tenes una cuenta? Registrate!
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
