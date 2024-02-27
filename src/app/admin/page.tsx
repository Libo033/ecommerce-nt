import React from "react";
import styles from "../page.module.css";
import MiniCard from "@/components/admin/MiniCard";

const Admin = () => {
  return (
    <div className="page2">
      <p className={styles.PageTitle}>Admin</p>
      <div>
        <MiniCard name="Categorias" />
        <MiniCard name="Productos" />
      </div>
    </div>
  );
};

export default Admin;
