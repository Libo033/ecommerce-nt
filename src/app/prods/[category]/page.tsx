import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "../page.module.css";

const Category = ({ params }: { params: { category: string } }) => {
  return (
    <div style={{ backgroundColor: "#fafafa" }} className="page2">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="LinkA" href={"/"}>
          INICIO
        </Link>
        <Link className="LinkA" href={"/prods"}>
          PRODUCTOS
        </Link>
        <span className="Breadcrumb_Span">{params.category.toUpperCase()}</span>
      </Breadcrumbs>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Category;
