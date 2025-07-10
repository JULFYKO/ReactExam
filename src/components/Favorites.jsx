import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Отримати обрані фільми з локального сховища
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const handleRemove = (id) => {
        const updated = favorites.filter(movie => movie.id !== id);
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    return (
        <div className="container">
            <h2>Обрані фільми</h2>
            {favorites.length === 0 ? (
                <p>Немає обраних фільмів.</p>
            ) : (
                <div className="grid">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}>
                            <button onClick={() => navigate(`/movie/${movie.id}`)}>
                                Детальніше
                            </button>
                            <button onClick={() => handleRemove(movie.id)}>
                                Видалити
                            </button>
                        </MovieCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
