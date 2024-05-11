
import styles from "./page.module.css";
import Card from "@/components/cardLoginRegister";

export default function Home() {


  return (
    <main className={styles.main}>
      <div className={styles.facebookinfo}>
        <h1>SocialMedia</h1>
        <h2>A SocialMedia ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h2>
      </div>
      <Card />
    </main>
  );
}

