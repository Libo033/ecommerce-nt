"use client";
import { Breadcrumbs, Skeleton } from "@mui/material";
import Link from "next/link";
import React, { useContext } from "react";
import styles from "./page.module.css";
import HomeCard from "@/components/prods/HomeCard";
import Filter from "@/components/prods/Filter";
import { ProductContext } from "@/context/ProductsContext";

const Prods = () => {
  const { loaded, products } = useContext(ProductContext);

  return (
    <div style={{ backgroundColor: "#fafafa" }} className="page2">
      <Breadcrumbs aria-label="breadcrumb">
        <Link className="LinkA" href={"/"}>
          INICIO
        </Link>
        <span className="Breadcrumb_Span">PRODUCTOS</span>
      </Breadcrumbs>
      <div className={styles.Prods}>
        <div className={styles.Prods_Filter}>
          <Filter />
        </div>
        <section>
          {loaded ? (
            products.length > 0 &&
            products.map((p) => <HomeCard key={p._id} {...p} />)
          ) : (
            <>
              <Skeleton
                sx={{ margin: "18px 0" }}
                variant="rounded"
                width={270}
                height={450}
              />
              <Skeleton
                sx={{ margin: "18px 0" }}
                variant="rounded"
                width={270}
                height={450}
              />
              <Skeleton
                sx={{ margin: "18px 0" }}
                variant="rounded"
                width={270}
                height={450}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Prods;
