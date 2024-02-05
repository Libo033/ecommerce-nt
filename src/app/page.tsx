import Image from "next/image";
import styles from "./page.module.css";
import Poster from "@/components/main/Poster";

export default function Home() {
  return (
    <div>
      <Poster
        h1={"Bienvenido compra Natura, Avon y muchas cosas mas."}
        h2={
          "Compra lo que necesites y coordina con el vendedor para recibir tus productos."
        }
      />
    </div>
  );
}
