"use client"
import styles from "./page.module.css";
import Card from "@/components/cardLoginRegister";
import { useEffect } from 'react';


export default function Home() {


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      window.location.href = '/dashboard'
      return null
    }
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.facebookinfo}>
        <h1>SocialApp</h1>
        <h2>A SocialApp ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h2>
      </div>
      <div className={styles.cardDiv}>
      <Card />
      </div>
    </main>
  );
}

