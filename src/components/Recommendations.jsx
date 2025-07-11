import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'];

function getRandom(arr, n) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

const Recommendations = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [movies, setMovies] = useState([]);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch('https://api.tvmaze.com/shows')
            .then(res => {
                if (!res.ok) throw new Error('Помилка завантаження');
                return res.json();
            })
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Не вдалося отримати фільми');
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        let filtered = movies;
        if (title) {
            filtered = filtered.filter(m => m.name?.toLowerCase().includes(title.toLowerCase()));
        }
        if (genre) {
            filtered = filtered.filter(m => m.genres?.some(g => g.toLowerCase() === genre.toLowerCase()));
        }
        if (year) {
            filtered = filtered.filter(m => m.premiered && m.premiered.startsWith(year));
        }
        if (rating) {
            filtered = filtered.filter(m => m.rating?.average && m.rating.average >= Number(rating));
        }
        setResults(getRandom(filtered, 10));
        setSearched(true);
    };

    return (
        <div className="container">
            <h2 className="recommendations-title">Рекомендації фільмів</h2>
            <form onSubmit={handleSearch} className="recommendations-form">
                <input
                    type="text"
                    placeholder="Назва фільму"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <select value={genre} onChange={e => setGenre(e.target.value)}>
                    <option value="">Жанр</option>
                    {genres.map(g => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Рік"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                />
                <input
                    type="number"
                    placeholder="Рейтинг"
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                    min="0"
                    max="10"
                    step="0.1"
                />
                <button type="submit" disabled={loading}>Шукати рекомендації</button>
            </form>
            {loading && <div>Завантаження...</div>}
            {error && <div className="recommendations-error">{error}</div>}
            <div className="grid">
                {results.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            {results.length === 0 && searched && !loading && (
                <div className="recommendations-not-found">Нічого не знайдено</div>
            )}
        </div>
    );
};

export default Recommendations;
