"use client";
import React, { useId } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import Link from "next/link";

const LoginForm: React.FC<{ forgotPass: string; signUp: string }> = ({
  forgotPass,
  signUp,
}) => {
  const $EMAIL = useId();
  const $PASSWORD = useId();

  return (
    <div className={styles.Form}>
      <div className={styles.Form_ImgContainer}>
        <Image src={"/img/login.svg"} alt="login" width={90} height={90} />
      </div>
      <p className={styles.Form_Title}>Iniciar Sesion</p>
      <form className={styles.Form_Form}>
        <TextField
          id={$EMAIL}
          label="Email"
          variant="outlined"
          fullWidth={true}
          type="email"
          required
        />
        <TextField
          id={$PASSWORD}
          label="Contraseña"
          variant="outlined"
          fullWidth={true}
          type="password"
          required
        />
        <Button variant="contained">Iniciar Sesion</Button>
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
