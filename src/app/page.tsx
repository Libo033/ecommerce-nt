import styles from "./page.module.css";
import Poster from "@/components/main/Poster";
import HomeCardSlider from "@/components/prods/HomeCardSlider";
import { IHomeCard } from "@/libs/interfaces";

export default function Home() {
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
  ];

  return (
    <div>
      <Poster
        h1={"Bienvenido compra Natura, Avon y muchas cosas mas."}
        h2={
          "Compra lo que necesites y coordina con el vendedor para recibir tus productos."
        }
      />
      <div className="page2">
        <HomeCardSlider title={"Ultimas Unidades"} cards={cards} />
      </div>
    </div>
  );
}
