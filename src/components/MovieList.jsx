import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://api.tvmaze.com/shows';
const MOVIES_PER_PAGE = 60;

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(API_URL)
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

    const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
    const pagedMovies = movies.slice((page - 1) * MOVIES_PER_PAGE, page * MOVIES_PER_PAGE);

    return (
        <div className="container">
            <h2>Movie List</h2>
            {loading && <div>Завантаження...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="grid">
                {pagedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}>
                        <button onClick={() => navigate(`/movie/${movie.id}`)}>
                            Детальніше
                        </button>
                    </MovieCard>
                ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={page === i + 1 ? 'active' : ''}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
}

export default MovieList;
