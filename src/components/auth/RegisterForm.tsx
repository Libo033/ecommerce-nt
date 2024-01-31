"use client";
import React, { FormEvent, useId, useState } from "react";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC<{ signIn: string }> = ({ signIn }) => {
  const router = useRouter();
  const [error, setError] = useState<{
    name: Error | undefined;
    lastName: Error | undefined;
    email: Error | undefined;
    password: Error | undefined;
  }>({
    name: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });
  const $NAME = useId();
  const $LAST_NAME = useId();
  const $EMAIL = useId();
  const $PASSWORD = useId();

  const createAccount = (e: FormEvent) => {
    try {
      e.preventDefault();

      if (
        (document.getElementById($PASSWORD) as HTMLInputElement).value.length <
        8
      ) {
        throw new Error("La contraseña debe contener mas de 8 digitos.", {
          cause: "password",
        });
      }

      console.log("Cuenta creada");
    } catch (err) {
      if (err instanceof Error) {
        switch (err.cause) {
          case "password":
            setError({ ...error, password: err });
            break;

          default:
            break;
        }
      }
    }
  };

  return (
    <div className={styles.Form}>
      <div className={styles.Form_ImgContainer}>
        <Image src={"/img/login.svg"} alt="login" width={90} height={90} />
      </div>
      <p className={styles.Form_Title}>Registrarse</p>
      <form
        style={{ height: "390px" }}
        className={styles.Form_Form}
        onSubmit={(Event: FormEvent) => createAccount(Event)}
      >
        <div className={styles.Form_FormDoubleContainer}>
          <TextField
            id={$NAME}
            label="Nombre"
            variant="outlined"
            fullWidth={true}
            type="text"
            error={error.name ? true : false}
            required
          />
          <TextField
            id={$LAST_NAME}
            label="Apellido"
            variant="outlined"
            fullWidth={true}
            type="text"
            error={error.lastName ? true : false}
            required
          />
        </div>
        <TextField
          id={$EMAIL}
          label="Email"
          variant="outlined"
          fullWidth={true}
          type="email"
          error={error.email ? true : false}
          required
        />
        <TextField
          id={$PASSWORD}
          label="Contraseña"
          variant="outlined"
          fullWidth={true}
          type="password"
          error={error.password ? true : false}
          required
        />
        <Button type="submit" variant="contained">
          REGISTRARSE
        </Button>
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
