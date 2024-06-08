import React, { useState, useEffect } from 'react';
import styles from './post.module.css';

const Post = ({ id, username, content, token }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState(''); // Estado para armazenar o texto do novo comentário

    const togglePopup = () => {
        setShowPopup(!showPopup);
        if (!showPopup) {
            fetchComments(); // Chama a função para buscar os comentários quando o popup é aberto
        }
    };

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };
    const submitComment = async () => {
        try {
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
                setComments([...comments, newComment]);
                setCommentText('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch(error) {
            console.error('Erro ao enviar comentário:', error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/comments/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'UserID': localStorage.getItem('userID'),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data.comments);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao buscar os comentários');
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    useEffect(() => {
        if (showPopup) {
            document.body.classList.add(styles.bodyNoScroll);
        } else {
            document.body.classList.remove(styles.bodyNoScroll);
        }
    }, [showPopup]);

    return (
        <div>
            {showPopup && <div className={styles.overlay}></div>}

            <div className={showPopup ? `${styles.post} ${styles.postExpanded}` : styles.post}>

                {showPopup && (<div className={styles.headerPost}>
                    <h1>Publicação de {username}</h1>
                    <button className={styles.closeButton} onClick={togglePopup}>X</button>
                </div>)}
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
                        {comments.map((comment) => (
                            <div key={comment.id} className={styles.comment}>
                                <div className={styles.commentProfileImage}>
                                    <img src="profilePicTest.jpeg" alt="#" />
                                </div>
                                <div className={styles.commentText}>
                                    <h4 className={styles.commentUserName}>{comment.username}</h4>
                                    <p className={styles.commentContent}>{comment.comment_content}</p>
                                    <span className={styles.commentDate}>{comment.created_at}</span>
                                </div>
                            </div>
                        ))}

                        <div className={styles.newComment}>
                            <textarea className={styles.newCommentInput}
                                placeholder="Adicione um comentário..."
                                value={commentText}
                                onChange={handleCommentChange}></textarea>
                            <button className={styles.newCommentButton}
                                onClick={submitComment}>Enviar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Post;
