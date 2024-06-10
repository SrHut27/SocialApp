"use client"
import React, { useState, useEffect } from 'react';
import UpSessionDashboard from "@/components/upSessionDashboard";
import Post from "@/components/cardPost";
import styles from "./page.module.css";

const DashboardPage = () => { 
  const token = localStorage.getItem('token'); 
  if (!token) { // Se não houver token
    window.location.href = '/'; // Redireciona para a página inicial
    return null; 
  }

  const userID = localStorage.getItem('userID');
  const [content, setContent] = useState(''); // Estado para armazenar o conteúdo do novo post
  const [posts, setPosts] = useState([]); // Estado para armazenar os posts

  const newPost = async () => { // Função para criar um novo post
    try {
      const response = await fetch('http://localhost:3001/app/add', { // Faz uma requisição POST para adicionar um novo post
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: userID,
          content: content
        }),
      });
      if (response.ok) {
        const newPost = await response.json();
        window.location.reload();
        setPosts([...posts, newPost]); // Adiciona o novo post ao estado de posts
        setContent(''); // Limpa o campo de texto do novo post
      } else {
        const data = await response.json();
        console.error('Erro ao criar post:', data.error);
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error.message);
    }
  };

  useEffect(() => { // Efeito colateral para buscar os posts ao carregar a página ou quando o token muda
    const fetchPosts = async () => { // Função para buscar os posts
      try {
        const response = await fetch('http://localhost:3001/app/', { // Faz uma requisição GET para buscar os posts
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) { 
          const data = await response.json();
          console.log('Data received:', data);
          setPosts(data.resultado); // Atualiza o estado de posts com os dados recebidos
        } else {
          const errorData = await response.json();
          console.error('Error data received:', errorData); 
          throw new Error(errorData.error || 'Erro ao buscar os posts');
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };

    fetchPosts(); // Chama a função fetchPosts ao montar o componente ou quando o token muda
  }, [token]); // Dependência do useEffect: o efeito será chamado sempre que o token mudar

  return (
    <>
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
        <div className={styles.postsList}>
          {posts.map((post) => (
            <Post key={post.id} username={post.username} content={post.content} token={token} id={post.id} />
          ))}
        </div>

      </div>
    </>
  );
};

export default DashboardPage;
