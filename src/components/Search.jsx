import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];

const Search = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');
    const [rating, setRating] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResults([]);
        let url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(title)}`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Помилка пошуку');
            const data = await res.json();
            let filtered = data.map(item => item.show);
            if (genre) {
                filtered = filtered.filter(show =>
                    show.genres && show.genres.some(g => g.toLowerCase().includes(genre.toLowerCase()))
                );
            }
            if (year) {
                filtered = filtered.filter(show =>
                    show.premiered && show.premiered.startsWith(year)
                );
            }
            if (rating) {
                filtered = filtered.filter(show =>
                    show.rating && show.rating.average && show.rating.average >= Number(rating)
                );
            }
            setResults(filtered);
        } catch (err) {
            setError('Не вдалося виконати пошук');
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <h2 className="search-title">Пошук фільмів</h2>
            <form
                onSubmit={handleSubmit}
                className="search-form"
            >
                <input
                    type="text"
                    placeholder="Назва фільму"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="">Жанр</option>
                    {genres.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Рік"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                />
                <input
                    type="number"
                    placeholder="Рейтинг"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="0"
                    max="10"
                    step="0.1"
                />
                <button type="submit">Пошук</button>
            </form>
            {loading && <div>Завантаження...</div>}
            {error && <div className="error">{error}</div>}
            <div className="grid">
                {results.map(show => (
                    <MovieCard key={show.id} movie={show}>
                        <button onClick={() => setSelectedMovie(show)}>
                            Детальніше
                        </button>
                    </MovieCard>
                ))}
            </div>
            {results.length === 0 && !loading && !error && (
                <div className="not-found">Нічого не знайдено</div>
            )}
            {selectedMovie && (
                <div className="card modal-details">
                    <button
                        className="close-modal"
                        onClick={() => setSelectedMovie(null)}
                    >
                        Закрити
                    </button>
                    <h2 className="modal-title">
                        {selectedMovie.name || selectedMovie.title} ({selectedMovie.premiered?.slice(0, 4) || selectedMovie.year || '—'})
                    </h2>
                    <img
                        src={selectedMovie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}
                        alt={selectedMovie.name || selectedMovie.title}
                        className="modal-img"
                    />
                    <p>
                        <strong>Опис:</strong>{' '}
                        <span dangerouslySetInnerHTML={{ __html: selectedMovie.summary || selectedMovie.description || '' }} />
                    </p>
                    <p>
                        <strong>Жанр:</strong> {selectedMovie.genres?.join(', ') || selectedMovie.genre || '—'}
                    </p>
                    <p>
                        <strong>Рейтинг:</strong> {selectedMovie.rating?.average ?? selectedMovie.rating ?? '—'}
                    </p>
                    {selectedMovie.officialSite && (
                        <div>
                            <a href={selectedMovie.officialSite} target="_blank" rel="noopener noreferrer">
                                <button>Офіційний сайт</button>
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
