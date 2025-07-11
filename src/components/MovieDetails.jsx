import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.tvmaze.com/shows/${id}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setLoading(false);
                const storedFavorites = localStorage.getItem('favorites');
                if (storedFavorites) {
                    const arr = JSON.parse(storedFavorites);
                    setIsFavorite(arr.some(f => f.id === data.id));
                }
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleFavorite = () => {
        const storedFavorites = localStorage.getItem('favorites');
        let arr = storedFavorites ? JSON.parse(storedFavorites) : [];
        if (isFavorite) {
            arr = arr.filter(f => f.id !== movie.id);
        } else {
            arr.push(movie);
        }
        localStorage.setItem('favorites', JSON.stringify(arr));
        setIsFavorite(!isFavorite);
    };

    if (loading) return <div className="container">Завантаження...</div>;
    if (!movie) return <div className="container">Фільм не знайдено</div>;

    return (
        <div className="container">
            <div className="card modal-details">
                <h2 className="modal-title">{movie.name} ({movie.premiered?.slice(0, 4) || '—'})</h2>
                <img
                    src={movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
                    alt={movie.name}
                    className="modal-img"
                />
                <p><strong>Опис:</strong> <span dangerouslySetInnerHTML={{ __html: movie.summary || '' }} /></p>
                <p><strong>Жанр:</strong> {movie.genres?.join(', ') || '—'}</p>
                <p><strong>Рейтинг:</strong> {movie.rating?.average ?? '—'}</p>
                {movie.officialSite && (
                    <div>
                        <a href={movie.officialSite} target="_blank" rel="noopener noreferrer">
                            <button>Офіційний сайт</button>
                        </a>
                    </div>
                )}
                <button className="favorite-btn" onClick={handleFavorite}>
                    {isFavorite ? 'Видалити з Обраного' : 'Додати у Обране'}
                </button>
            </div>
        </div>
    );
};

export default MovieDetails;
