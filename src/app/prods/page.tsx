import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";

const Prods = () => {
  return (
    <div style={{ backgroundColor: "#fafafa" }} className="page2">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="LinkA" href={"/"}>INICIO</Link>
        <span className="Breadcrumb_Span">PRODUCTOS</span>
      </Breadcrumbs>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Prods;
