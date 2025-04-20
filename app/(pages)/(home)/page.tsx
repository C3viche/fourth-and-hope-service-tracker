import Image from "next/image";
import styles from "./page.module.scss";
import Sidebar from "../../(components)/sidebar/sidebar"

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar/>
       

    </div>
  );
}
