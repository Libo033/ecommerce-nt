import LoginForm from "@/components/auth/LoginForm";
import { Divider } from "@mui/material";
import React from "react";
import styles from "@/app/page.module.css";
import LoginButtonGroup from "@/components/auth/LoginButtonGroup";

const Login = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoginForm forgotPass={"recover_password"} signUp={"register"} />
      <div className={styles.Divider}>
        <Divider />
      </div>
      <LoginButtonGroup />
    </div>
  );
};

export default Login;
