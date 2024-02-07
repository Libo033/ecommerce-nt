import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "./page.module.css";
import { IHomeCard } from "@/libs/interfaces";
import HomeCard from "@/components/prods/HomeCard";
import Filter from "@/components/prods/Filter";

const Prods = () => {
  const cards: IHomeCard[] = [
    {
      _id: "1",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "2",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "3",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "4",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "5",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "6",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "7",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "8",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "9",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "10",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "11",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
    {
      _id: "12",
      marca: "jota",
      detalle: "Jota blanco 30Ml",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      categoria: "Perfumeria",
      precio: 32000,
    },
  ];

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
          {cards.length > 0 &&
            cards.map((card) => <HomeCard key={card._id} {...card} />)}
        </section>
      </div>
    </div>
  );
};

export default Prods;
