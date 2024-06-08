"use client"
import React, { useState, useEffect } from 'react';
import UpSessionDashboard from "@/components/upSessionDashboard";
import Post from "@/components/cardPost";
import styles from "./page.module.css"

const DashboardPage = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/'
    return null
  }
  const username = localStorage.getItem('username')
  const userID = localStorage.getItem('userID')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState([])
  const newPost = async () => {
    try {
      const response = await fetch('http://localhost:3001/app/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          userID: userID,
          content: content
        }),
      })
      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json()
        console.error('Erro ao criar post:', data.error);
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error.message);
    }
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/app', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json()
          setPosts(data.resultado)
        } else {
          const errorData = await response.json()
          throw new Error(errorData.Error)
        }
      } catch (error) {
        console.error(error)
      }
    };

    fetchPosts()
  }, [token])


  return <>
    <UpSessionDashboard />
    <div className={styles.post}>
    <div className={styles.newPost}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Digite seu novo post..."
        />
        <button onClick={newPost}>Publicar</button>
      </div>
      {posts.map((post) => (
          <Post key={post.id} username={post.username} content={post.content} />
        ))}
      
    </div>
  </>;
};

export default DashboardPage;