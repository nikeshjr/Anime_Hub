
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import StarRating from '../components/StarRating';

const AnimeDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [anime, setAnime] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editText, setEditText] = useState("");
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({ show: false, message: "" });

    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    const sortComments = (commentList) => {
        if (!commentList) return [];
        return [...commentList].sort((a, b) => {
            if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    };

    const fetchData = async () => {
        try {
            const animeRes = await API.get(`/anime/${id}`);
            const commentRes = await API.get(`/comments/${id}`);
            setAnime(animeRes.data.data);
            setComments(sortComments(commentRes.data));
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => { if (id) fetchData(); }, [id]);

    const handleLike = async () => {
        try {
            const { data } = await API.post(`/likes/${id}`);
            setAnime({ ...anime, isLiked: data.liked, likesCount: data.currentLikes });
            showToast(data.liked ? "Added to Liked ❤️" : "Removed from Liked");
            const refreshRes = await API.get(`/anime/${id}`);
            setAnime(refreshRes.data.data);
        } catch (err) { showToast("Login to like!"); }
    };

    const handleFavorite = async () => {
        try {
            if (anime.isFavorited) {
                await API.delete(`/fav/${id}`);
                setAnime({ ...anime, isFavorited: false });
                showToast("Removed from Favorites 🗑️");
            } else {
                await API.post(`/fav/${id}`);
                setAnime({ ...anime, isFavorited: true });
                showToast("Added to Favorites ⭐");
            }
        } catch (err) {
            showToast(err.response?.data?.message || "Error updating favorites");
        }
    };

    const handleRate = async (score) => {
        try {
            const { data } = await API.post(`/ratings/${id}/rate`, { score });
            setAnime({ 
                ...anime, 
                ratingInfo: { 
                    ...anime.ratingInfo, 
                    averageRating: data.averageRating,
                    totalVotes: data.totalVotes
                } 
            });
            showToast(`Rated ${score} stars! ⭐`);
        } catch (err) {
            showToast(err.response?.data?.message || "Login to rate!");
        }
    };

    const handleTogglePin = async (commentId) => {
        try {
            const { data } = await API.patch(`/comments/${commentId}/pin`);
            const updated = comments.map(c => c._id === commentId ? { ...c, isPinned: data.isPinned } : c);
            setComments(sortComments(updated));
            showToast(data.isPinned ? "Comment Pinned 📌" : "Comment Unpinned");
        } catch (err) { showToast("Admin permissions required"); }
    };

    const handleUpdateComment = async (commentId) => {
        try {
            const { data } = await API.put(`/comments/${commentId}`, { text: editText });
            setComments(comments.map(c => c._id === commentId ? { ...c, text: data.text } : c));
            setEditingCommentId(null);
            showToast("Comment updated successfully!");
        } catch (err) { showToast("Failed to update comment"); }
    };

    const postComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/comments', { text: newComment, animeId: id });
            const newCommentWithUser = { ...data, user: { _id: user?._id || user?.id, username: user?.username } };
            setComments(sortComments([newCommentWithUser, ...comments]));
            setNewComment("");
            showToast("Comment posted! 💬");
        } catch (err) { showToast("Login to comment"); }
    };

    const deleteComment = async (commentId) => {
        if (window.confirm("Delete this comment permanently?")) {
            try {
                await API.delete(`/comments/${commentId}`);
                setComments(comments.filter(c => c._id !== commentId));
                showToast("Comment deleted 🗑️");
            } catch (err) { showToast("Could not delete comment"); }
        }
    };

    if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

    const baseBtnStyle = {
        background: 'transparent',
        padding: '8px 18px',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.25s ease'
    };

    const getActionBtnStyle = (color, isLarge = false) => ({
        background: 'transparent',
        border: `1px solid ${color}`,
        color: color,
        padding: isLarge ? '10px 25px' : '4px 12px',
        borderRadius: '25px',
        fontSize: isLarge ? '14px' : '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        outline: 'none'
    });

    const handleActionHover = (e, color) => {
        e.currentTarget.style.background = color;
        e.currentTarget.style.color = '#0f172a';
        e.currentTarget.style.boxShadow = `0 0 15px ${color}`;
        e.currentTarget.style.transform = 'translateY(-3px)';
    };

    const handleActionLeave = (e, color) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = color;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
    };

    return (
        
        <div style={{ padding: '110px 20px 40px 20px', maxWidth: '1200px', margin: 'auto', color: '#fff' }}>
            
            {toast.show && <div className="toast-container">{toast.message}</div>}

            <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', marginBottom: '60px' }}>
                <div style={{ flex: '0 0 450px' }}>
                    <img src={`http://localhost:8888/${anime.image}`} alt={anime.name} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', border: '1px solid #334155' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                    <h1 style={{ color: '#38bdf8', fontSize: '3rem', fontWeight: '800', margin: '0 0 15px 0' }}>{anime.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <span style={{ color: '#facc15', fontSize: '1.4rem', fontWeight: 'bold' }}>★ {anime.ratingInfo?.averageRating || "0.0"}</span>
                        <span style={{ color: '#38bdf8' }}>({anime.ratingInfo?.totalVotes || 0} votes)</span>
                    </div>
                  
                    <p style={{ color: '#cbd5e1', lineHeight: '1.6', marginBottom: '20px' }}>{anime.description}</p>

                    {anime.recentLikers && anime.recentLikers.length > 0 && (
                        <div style={{ marginBottom: '25px', fontSize: '0.95rem', color: '#cbd5e1' }}>
                            <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Liked by : </span>
                            {anime.recentLikers.map((like, index) => (
                                <span key={like.user?._id || index}>
                                    <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>
                                        {like.user?.username}
                                    </span>
                                    {index < anime.recentLikers.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div 
                        style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '25px', maxWidth: '400px', transition: 'all 0.3s ease' }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#38bdf8';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#334155';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#38bdf8', fontWeight: 'bold' }}>RATE THIS ANIME</p>
                        <StarRating initialRating={0} onRate={handleRate} />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={handleLike} style={{ ...baseBtnStyle, border: '1px solid #ef4444', color: '#ef4444' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 0 20px #ef4444'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                            {anime.isLiked ? '❤️' : '🤍'} Like ({anime.likesCount || 0})
                        </button>
                        <button onClick={handleFavorite} style={{ ...baseBtnStyle, border: '1px solid #facc15', color: '#facc15' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 0 20px #facc15'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#facc15'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                            {anime.isFavorited ? '⭐' : '☆'} Favorite
                        </button>
                    </div>
                </div>
            </div>

            <hr style={{ borderColor: '#334155', margin: '3rem 0' }} />

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ marginBottom: '20px', color: '#38bdf8' }}>Comments ({comments.length})</h3>
                <form onSubmit={postComment} style={{ marginBottom: '30px' }}>
                    <textarea 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Join the discussion..." 
                        style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155', color: '#fff', marginBottom: '15px', transition: 'all 0.3s ease', outline: 'none' }} 
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#38bdf8';
                            e.target.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                            e.target.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            if (document.activeElement !== e.target) {
                                e.target.style.borderColor = '#334155';
                                e.target.style.boxShadow = 'none';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#38bdf8';
                            e.target.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                            e.target.style.transform = 'translateY(-5px)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#334155';
                            e.target.style.boxShadow = 'none';
                            e.target.style.transform = 'translateY(0)';
                        }}
                        required 
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                            type="submit" 
                            style={getActionBtnStyle('#38bdf8', true)}
                            onMouseEnter={(e) => handleActionHover(e, '#38bdf8')}
                            onMouseLeave={(e) => handleActionLeave(e, '#38bdf8')}
                        >
                            Post Comment
                        </button>
                    </div>
                </form>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {comments.map((c) => (
                        <div key={c._id} style={{ padding: '15px', background: c.isPinned ? 'rgba(56, 189, 248, 0.1)' : '#1e293b', borderRadius: '20px', border: c.isPinned ? '1px solid #38bdf8' : '1px solid #334155', transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ color: '#38bdf8' }}>{c.user?.username || "User"} {c.isPinned && "📌"}</strong>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {user?.role === 'admin' && (
                                        <button 
                                            onClick={() => handleTogglePin(c._id)} 
                                            style={getActionBtnStyle('#22c55e')}
                                            onMouseEnter={(e) => handleActionHover(e, '#22c55e')}
                                            onMouseLeave={(e) => handleActionLeave(e, '#22c55e')}
                                        >
                                            {c.isPinned ? 'Unpin' : 'Pin'}
                                        </button>
                                    )}
                                    {(user?._id === c.user?._id || user?.id === c.user?._id) && (
                                        <button 
                                            onClick={() => { setEditingCommentId(c._id); setEditText(c.text); }} 
                                            style={getActionBtnStyle('#facc15')}
                                            onMouseEnter={(e) => handleActionHover(e, '#facc15')}
                                            onMouseLeave={(e) => handleActionLeave(e, '#facc15')}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {(user?._id === c.user?._id || user?.id === c.user?._id || user?.role === 'admin') && (
                                        <button 
                                            onClick={() => deleteComment(c._id)} 
                                            style={getActionBtnStyle('#ef4444')}
                                            onMouseEnter={(e) => handleActionHover(e, '#ef4444')}
                                            onMouseLeave={(e) => handleActionLeave(e, '#ef4444')}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>

                            {editingCommentId === c._id ? (
                                <div style={{ marginTop: '10px' }}>
                                    <textarea value={editText} onChange={(e) => setEditText(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '12px', background: '#0f172a', color: '#fff', border: '1px solid #334155', marginBottom: '10px' }} />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => handleUpdateComment(c._id)} style={{ padding: '6px 15px', borderRadius: '20px', background: '#38bdf8', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Save</button>
                                        <button onClick={() => setEditingCommentId(null)} style={{ padding: '6px 15px', borderRadius: '20px', background: 'transparent', color: '#fff', border: '1px solid #64748b', cursor: 'pointer' }}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ margin: '12px 0', color: 'white', lineHeight: '1.5' }}>{c.text}</p>
                            )}
                            <small style={{ color: '#64748b' }}>{new Date(c.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ height: '100px' }}></div>
        </div>
    );
};

export default AnimeDetails;