"use client"
import React, { useState } from 'react';
import UpSessionDashboard from "@/components/upSessionDashboard";
import Post from "@/components/cardPost";
import styles from "./page.module.css"

const DashboardPage = () => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const userID = localStorage.getItem('userID')
  const [newPostText, setNewPostText] = useState('')
  const newPost = async () => {
    try {
      const response = await fetch('http://localhost:3001/app/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userID: userID,
          text: newPostText
        }),
      })
      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json()
        throw new Error(data.error)
      }
    } catch (error) {
      console.error(error)
    }
  }


  if (!token) {
    window.location.href = '/'
    return null
  }

  return <>
    <UpSessionDashboard />
    <div className={styles.post}>
    <div className={styles.newPost}>
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Digite seu novo post..."
        />
        <button onClick={newPost}>Publicar</button>
      </div>
      <Post username={username} />
      <Post username={username} />
    </div>
  </>;
};

export default DashboardPage;