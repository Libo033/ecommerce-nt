"use client";
import React, { FormEvent, useContext, useId, useState } from "react";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

interface IRegisterError {
  name: Error | undefined;
  lastName: Error | undefined;
  email: Error | undefined;
  password: Error | undefined;
}

const RegisterForm: React.FC<{ signIn: string }> = ({ signIn }) => {
  const { loaded, signUp } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState<IRegisterError>({
    name: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });
  const $NAME = useId();
  const $LAST_NAME = useId();
  const $EMAIL = useId();
  const $PASSWORD = useId();

  const createAccount = async (e: FormEvent) => {
    try {
      e.preventDefault();

      let em = document.getElementById($EMAIL) as HTMLInputElement;
      let pass = document.getElementById($PASSWORD) as HTMLInputElement;

      if (pass.value.length < 8 || pass.value.length > 32) {
        throw new Error("La contraseña debe tener entre 8 y 32 digitos.", {
          cause: "password",
        });
      }

      let data = await signUp(em.value, pass.value);

      if (data instanceof Error) {
        throw data;
      }

      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        switch (err.cause) {
          case "password":
            setError({ ...error, password: err });
            break;
          case "email":
            setError({ ...error, email: err });
            break;
          default:
            setError({ password: err, email: err, name: err, lastName: err });
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
          onChange={() => setError({ ...error, password: undefined })}
          error={error.password ? true : false}
          helperText={error.password ? error.password.message : " "}
          required
        />
        {loaded && (
          <Button type="submit" variant="contained">
            REGISTRARSE
          </Button>
        )}
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
