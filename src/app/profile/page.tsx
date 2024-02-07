"use client";
import React, { useContext } from "react";
import styles from "../page.module.css";
import { AuthContext } from "@/context/AuthContext";
import NoAccount from "@/components/auth/NoAccount";

const Profile = () => {
  const { loaded, user } = useContext(AuthContext);

  return (
    <>
      {loaded && user ? (
        <div className="page2">
          <p className={styles.PageTitle}>Perfil</p>
        </div>
      ) : (
        <div className="page2">
          <NoAccount />
        </div>
      )}
    </>
  );
};

export default Profile;
