"use client";
import React, { useId } from "react";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC<{ signIn: string }> = ({ signIn }) => {
  const router = useRouter();
  const $NAME = useId();
  const $LAST_NAME = useId();
  const $EMAIL = useId();
  const $PASSWORD = useId();

  return (
    <div className={styles.Form}>
      <div className={styles.Form_ImgContainer}>
        <Image src={"/img/login.svg"} alt="login" width={90} height={90} />
      </div>
      <p className={styles.Form_Title}>Registrarse</p>
      <form style={{ height: "390px" }} className={styles.Form_Form}>
        <div className={styles.Form_FormDoubleContainer}>
          <TextField
            id={$NAME}
            label="Nombre"
            variant="outlined"
            fullWidth={true}
            type="text"
            required
          />
          <TextField
            id={$LAST_NAME}
            label="Apellido"
            variant="outlined"
            fullWidth={true}
            type="text"
            required
          />
        </div>
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
        <Button variant="contained">REGISTRARSE</Button>
      </form>
      <div style={{ justifyContent: "center" }} className={styles.Form_Links}>
        <Link className="LinkA" href={`/${signIn}`}>
          Ya tenes cuenta? inicia sesion
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
