
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: "" });

    const showToast = (msg) => {
        setToast({ show: true, message: msg });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    const fetchFavorites = async () => {
        try {
            const { data } = await API.get('/fav');
            if (Array.isArray(data)) {
                setFavorites(data.filter(f => f.anime !== null));
            } else if (data && data.favorites) {
                setFavorites(data.favorites.filter(f => f.anime !== null));
            } else {
                setFavorites([]);
            }
            setLoading(false);
        } catch (err) {
            console.error("Fetch error", err);
            setLoading(false);
        }
    };

    const handleRemove = async (animeId) => {
        try {
            await API.delete(`/fav/${animeId}`);
            setFavorites(favorites.filter(fav => fav.anime?._id !== animeId));
            showToast("Removed from Favorites 🗑️");
        } catch (err) {
            showToast("Could not remove favorite");
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto', color: '#fff' }}>

            <style>{`
                .anime-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 25px;
                }

                .anime-card {
                    background: #1e293b;
                    border-radius: 12px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    height: 100%; /* Ensures all cards in a row are same height */
                }

                .anime-card img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover; /* Changed to cover for better look */
                    display: block;
                }

                .card-content {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1; /* This makes the content area fill the available space */
                }

                /* ALIGNMENT FIX: Push this container to the bottom */
                .card-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto; 
                    padding-top: 15px;
                }

                .view-btn-fav {
                    background: transparent;
                    border: 1px solid #facc15;
                    color: #facc15;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.25s ease;
                }

                .view-btn-fav:hover {
                    background: #facc15;
                    color: #fff;
                    box-shadow: 0 0 15px #facc15;
                    transform: translateY(-2px);
                }

                .remove-btn-fav {
                    background: transparent;
                    border: 1px solid #ef4444;
                    color: #ef4444;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .remove-btn-fav:hover {
                    background: #ef4444;
                    color: #fff;
                    box-shadow: 0 0 15px #ef4444;
                    transform: translateY(-2px);
                }
            `}</style>

            {toast.show && <div className="toast-container">{toast.message}</div>}

            <h2 style={{ color: '#38bdf8', marginBottom: '30px', borderLeft: '4px solid #38bdf8', paddingLeft: '15px' }}>
                My Favorite Anime
            </h2>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>No favorites added yet.</p>
                    <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Browse Anime</Link>
                </div>
            ) : (
                <div className="anime-grid">
                    {favorites.map((fav) => (
                        <div key={fav._id} className="anime-card">
                            <img src={`http://localhost:8888/${fav.anime.image}`} alt={fav.anime.name} />

                            <div className="card-content">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                                    <span style={{ color: '#38bdf8', fontSize: '0.9rem' }}>★</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>
                                        {fav.anime.ratingInfo?.averageRating || "0.0"}
                                    </span>
                                </div>

                                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#38bdf8', textTransform: 'capitalize' }}>
                                    {fav.anime.name}
                                </h3>

                                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '15px' }}>
                                    {fav.anime.genre?.join(' • ')}
                                </p>

                                {/* WRAPPER FOR BUTTONS */}
                                <div className="card-actions">
                                    <Link to={`/anime/${fav.anime._id}`} className="view-btn-fav">
                                        View Details
                                    </Link>

                                    <button onClick={() => handleRemove(fav.anime._id)} className="remove-btn-fav">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;