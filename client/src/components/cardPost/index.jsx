"use client"
import React, { useState, useEffect } from 'react';
import styles from './post.module.css';

const Post = ({ id, username, content, token }) => {
    const [showPopup, setShowPopup] = useState(false); // Estado para controlar exibição do popup
    const [comments, setComments] = useState([]); // Estado para armazenar os comentários
    const [commentText, setCommentText] = useState(''); // Estado para armazenar texto do novo comentário

    // Função para alternar a exibição do popup
    const togglePopup = () => {
        setShowPopup(!showPopup);
        if (!showPopup) { 
            fetchComments();
        }
    };

    // Função para atualizar o estado com o texto do novo comentário
    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    // Função para enviar um novo comentário
    const submitComment = async () => {
        try {
            // Faz uma requisição POST para adicionar um novo comentário
            const response = await fetch(`http://localhost:3001/comments/add/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    postID: id,
                    userID: localStorage.getItem('userID'),
                    content: commentText,
                })
            });
            if (response.ok) {
                const newComment = await response.json();
                setComments([...comments, newComment]); // Adiciona o novo comentário ao estado de comentários
                setCommentText(''); // Limpa o texto do novo comentário
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error('Erro ao enviar comentário:', error.message);
        }
    };

    const userID = localStorage.getItem('userID'); // Obtém o ID do usuário do armazenamento local

    // Função para buscar os comentários deste post
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/comments`, { // Faz uma requisição GET para buscar os comentários
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'UserID': userID,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.resultado) {
                    // Filtra os comentários para este post
                    const filteredComments = data.resultado.filter(comment => comment.post_id === id);
                    setComments(filteredComments); // Atualiza o estado com os comentários filtrados
                } else {
                    setComments([]);
                }
                console.log('Comentários recebidos:', data); 
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao buscar os comentários');
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    // Efeito colateral para adicionar ou remover a classe CSS quando o popup é exibido ou ocultado
    useEffect(() => {
        if (showPopup) {
            document.body.classList.add(styles.bodyNoScroll);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
        }
    }, [showPopup]); // Atualiza o efeito quando showPopup muda

    return (
        <div>
            {showPopup && <div className={styles.overlay}></div>} {/* Renderiza o overlay se showPopup for true */}

            <div className={showPopup ? `${styles.post} ${styles.postExpanded}` : styles.post}> {/* Adiciona classes CSS dinamicamente */}
                {showPopup && (
                    <div className={styles.headerPost}> {/* Renderiza o header do popup se showPopup for true */}
                        <h1>Publicação de {username}</h1>
                        <button className={styles.closeButton} onClick={togglePopup}>X</button>
                    </div>
                )}
                <div className={showPopup ? `${styles.postInformation} ${styles.postInformationExpanded}` : styles.postInformation}>
                    <div className={styles.profileImage}>
                        <img src="profilePicTest.jpeg" alt="#" />
                    </div>
                    <div className={styles.postGrid2}>
                        <h2 className={styles.profileName}>{username}</h2>
                        <p className={styles.postText}>{content}</p>
                        <div className={styles.postImage}>
                            <img src="Test.jpeg" alt="#" />
                        </div>
                        <button onClick={togglePopup} className={`${styles.commentButton} ${showPopup ? styles.hideButton : ''}`}>
                            <img src="comment.png" alt="Comentar" className={styles.commentIcon} /> <p>Comentar</p>
                        </button>
                    </div>
                </div>
                {showPopup && (
                    <div className={styles.commentsSection}>
                        <h3 className={styles.commentsTitle}>Comentários</h3>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className={styles.comment}> {/* Renderiza os comentários */}
                                    <div className={styles.commentProfileImage}>
                                        <img src="profilePicTest.jpeg" alt="#" />
                                    </div>
                                    <div className={styles.commentText}>
                                        <h4 className={styles.commentUserName}>{comment.username}</h4>
                                        <p className={styles.commentContent}>{comment.comment_content}</p>
                                        <span className={styles.commentDate}>{comment.created_at}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noComments}>Nenhum comentário ainda.</p>
                        )}

                        <div className={styles.newComment}>
                            <textarea
                                className={styles.newCommentInput}
                                placeholder="Adicione um comentário..."
                                value={commentText}
                                onChange={handleCommentChange}
                            ></textarea>
                            <button
                                className={styles.newCommentButton}
                                onClick={submitComment}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post; 
