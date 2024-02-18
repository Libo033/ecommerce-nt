import React from "react";
import styles from "../page.module.css";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";

const Option = ({ params }: { params: { opt: string } }) => {
  return (
    <div className="page2">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="LinkA" href={"/admin"}>
          ADMIN
        </Link>
        <span className="Breadcrumb_Span">{params.opt.toUpperCase()}</span>
      </Breadcrumbs>
    </div>
  );
};

export default Option;
