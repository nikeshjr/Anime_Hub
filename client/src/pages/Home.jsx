
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const genresList = ["Action", "Isekai", "Dark Fantasy", "Mystery", "Dystopian", "Adventure", "Sports", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Psychological", "Mecha", "Military", "Shounen", "Supernatural", "Thriller", "Seinen"];

const Home = () => {
    const [animes, setAnimes] = useState([]);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('newest');
    const [featured, setFeatured] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAnimes = async () => {
        setLoading(true);
        try {
            const { data } = await API.get(`/anime?search=${search}&genre=${genre}&sort=${sort}`);
            const resultData = data.data;
            setAnimes(resultData);

            if (!search && !genre && resultData.length > 0) {
                setFeatured(resultData[0]);
            }
        } catch (err) {
            console.error("Error fetching anime", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimes();
    }, [search, genre, sort]);

  
    const getBadgeText = () => {
        if (sort === 'top_rated') return 'TOP RATED';
        if (sort === 'popular') return 'MOST POPULAR';
        if (sort === 'oldest') return 'CLASSIC';
        if (sort === 'newest') return 'NEWEST'; 
        return 'FEATURED';
    };

    return (
        <div>
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
                    min-height: 380px;
                    transition: all 0.3s ease;
                }

                .anime-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 20px rgba(56, 189, 248, 0.2);
                }

                .anime-card img {
                    width: 100%;
                    height: 200px;
                    object-fit: fill;
                    display: block;
                }

                .card-content {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    align-items: center;
                }

                .anime-name {
                    font-size: 1.2rem;
                    color: #38bdf8;
                    text-transform: capitalize;
                    margin: 0 0 8px 0;
                    text-align: center;
                }

                .genre-text {
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 15px;
                    text-align: center;
                }

                .view-btn-yellow {
                    background: transparent;
                    border: 1px solid #facc15;
                    color: #facc15;
                    padding: 6px 14px;
                    border-radius: 6px;
                    font-weight: bold;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 0 6px rgba(250, 204, 21, 0.3);
                    text-align: center;
                }

                .view-btn-yellow:hover {
                    background: #facc15;
                    color: #fff;
                    box-shadow:
                        0 0 10px rgba(250, 204, 21, 0.9),
                        0 0 22px rgba(250, 204, 21, 0.6),
                        0 0 40px rgba(250, 204, 21, 0.3);
                    transform: translateY(-2px);
                }

                .action-btn-main {
                    background: #1e293b;
                    border: 1px solid #334155;
                    color: #fff;
                    padding: 10px;
                    border-radius: 8px;
                    outline: none;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .blue-glow-hover:hover, .blue-glow-hover:focus {
                    border-color: #38bdf8;
                    box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
                    transform: translateY(-5px);
                }
            `}</style>
          
            {!loading && featured && !search && !genre && (
                <div className="hero-banner" style={{
                    backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 1) 20%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.1) 100%), url(http://localhost:8888/${featured.image})`,
                    backgroundPosition: 'center right',
                    backgroundSize: 'cover',
                    minHeight: '450px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <div className="hero-content" style={{ maxWidth: '600px', marginLeft: '5%' }}>
                        <span className="badge" style={{ background: '#38bdf8', color: '#000', padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.8rem', display: 'inline-block', marginBottom: '10px' }}>
                            {getBadgeText()}
                        </span>
                        <h1 style={{ fontSize: '4rem', margin: '0 0 15px 0', textTransform: 'capitalize', lineHeight: '1.1', color: '#38bdf8' }}>
                            {featured.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                            <span style={{ color: '#facc15', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                ★ {featured.ratingInfo?.averageRating || "0.0"}
                            </span>
                        </div>
                        <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '25px', lineHeight: '1.6' }}>
                            {featured.description?.substring(0, 180)}...
                        </p>
                        <Link to={`/anime/${featured._id}`} className="view-btn-yellow">
                            View Details
                        </Link>
                    </div>
                </div>
            )}

            <div style={{ padding: '0 5%' }}>
                <div style={{ margin: '3rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <h2 style={{ fontSize: '2rem', borderLeft: '4px solid #38bdf8', paddingLeft: '15px', color: '#38bdf8' }}>
                        {search || genre ? "Filtered Results" : "Explore Anime"}
                    </h2>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'stretch', flexWrap: 'wrap' }}>
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className="action-btn-main blue-glow-hover" style={{ width: '160px' }}>
                            <option value="newest">Newest First</option>
                            <option value="popular">Most Popular</option>
                            <option value="top_rated">Top Rated</option>
                            <option value="oldest">Oldest</option>
                        </select>

                        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="action-btn-main blue-glow-hover" style={{ width: '160px' }}>
                            <option value="">All Genres</option>
                            {genresList.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>

                        <input className="action-btn-main blue-glow-hover" type="text" placeholder="Search title..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '250px' }} />
                    </div>
                </div>

                <div className="anime-grid">
                    {animes.map((anime) => (
                        <div key={anime._id} className="anime-card">
                            <img src={`http://localhost:8888/${anime.image}`} alt={anime.name} />
                            <div className="card-content">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                                    <span style={{ color: '#facc15', fontSize: '0.9rem', fontWeight: 'bold' }}>★</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#facc15' }}>
                                        {anime.ratingInfo?.averageRating || "0.0"}
                                    </span>
                                </div>
                                <h3 className="anime-name">{anime.name}</h3>
                                <p className="genre-text">{anime.genre?.join(' • ')}</p>
                                <div style={{ flexGrow: 1 }} />
                                <Link to={`/anime/${anime._id}`} className="view-btn-yellow">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ height: '100px' }}></div>
        </div>
    );
};

export default Home;