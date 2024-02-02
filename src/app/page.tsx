import Image from "next/image";
import styles from "./page.module.css";
import HomeCard from "@/components/prods/HomeCard";

export default function Home() {
  return (
    <div className="page2" style={{display: "flex", justifyContent: "space-evenly"}}>
      <HomeCard
        _id={"1"}
        marca={"jota"}
        detalle={"jota azul marino femenino 25ml"}
        categoria={"Perfumeria"}
        img={
          "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg"
        }
        precio={32000}
      />
      <HomeCard
        _id={"2"}
        marca={"jota"}
        detalle={"jota verde femenino 25ml"}
        categoria={"Perfumeria"}
        img={
          "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg"
        }
        precio={33000}
      />
            <HomeCard
        _id={"2"}
        marca={"jota"}
        detalle={"jota rojo carmesi femenino 45ml"}
        categoria={"Perfumeria"}
        img={
          "https://res.cloudinary.com/dsuydyqgz/image/upload/v1706882995/01-varios/rd8ntaaaq4ovveaksu9t.jpg"
        }
        precio={51000}
      />
    </div>
  );
}
