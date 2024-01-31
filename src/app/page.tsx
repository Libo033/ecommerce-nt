import Image from "next/image";
import styles from "./page.module.css";
import NavigationBar from "@/components/navigation/NavigationBar";

export default function Home() {
  return (
    <div>
      <NavigationBar logo={"" || "/img/grillo.svg"} name={"Ecommerce"} />
    </div>
  );
}
