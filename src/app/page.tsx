import Image from "next/image";
import styles from "./page.module.css";
import HomeCard from "@/components/prods/HomeCard";
import HomeCardSlider from "@/components/prods/HomeCardSlider";
import { IHomeCard } from "@/libs/interfaces";

export default function Home() {
  const cards: IHomeCard[] = [
    {
      _id: "1",
      marca: "Jota",
      detalle: "Jota azul marino femenino 25ml",
      categoria: "Perfumeria",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      precio: 32000,
    },
    {
      _id: "2",
      marca: "Jota",
      detalle: "Jota azul marino femenino 60ml",
      categoria: "Perfumeria",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      precio: 49999,
    },
    {
      _id: "3",
      marca: "Jota",
      detalle: "Jota rojo carmesí femenino 25ml",
      categoria: "Perfumeria",
      img: [
        "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg",
      ],
      precio: 34999,
    },
  ];

  return (
    <div className="page2">
      <HomeCardSlider title={"Nuevas Ofertas"} cards={cards} />
    </div>
  );
}
