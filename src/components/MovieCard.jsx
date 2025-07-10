import React from 'react';

const getRating = (movie) => {
    if (typeof movie.rating === 'object' && movie.rating !== null) {
        return movie.rating.average ?? '—';
    }
    return movie.rating ?? '—';
};

const MovieCard = ({ movie, children }) => (
    <div className="card movie-card">
        <img
            src={movie.image?.medium || 'https://placehold.co/210x295?text=No+Image'}
            alt={movie.name || movie.title}
            className="movie-img"
        />
        <strong className="movie-title">{movie.name || movie.title}</strong>
        <div className="movie-genres">
            {movie.genres?.join(', ') || movie.genre || '—'}
        </div>
        <div className="movie-year">
            {movie.premiered?.slice(0, 4) || movie.year || '—'}
        </div>
        <div className="movie-rating">
            Рейтинг: {getRating(movie)}
        </div>
        {children}
    </div>
);

export default MovieCard;
