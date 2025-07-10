import React, { useState } from 'react';

const initialMovies = [
    { id: 1, title: 'Movie 1', price: 100 },
    { id: 2, title: 'Movie 2', price: 120 },
];

const initialSessions = [
    { id: 1, movieId: 1, time: '18:00' },
    { id: 2, movieId: 2, time: '20:00' },
];

const AdminPanel = () => {
    const [movies, setMovies] = useState(initialMovies);
    const [sessions, setSessions] = useState(initialSessions);
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMoviePrice, setNewMoviePrice] = useState('');
    const [newSessionMovieId, setNewSessionMovieId] = useState('');
    const [newSessionTime, setNewSessionTime] = useState('');

    // Movie handlers
    const addMovie = () => {
        if (!newMovieTitle || !newMoviePrice) return;
        setMovies([
            ...movies,
            { id: Date.now(), title: newMovieTitle, price: Number(newMoviePrice) },
        ]);
        setNewMovieTitle('');
        setNewMoviePrice('');
    };

    const editMovieTitle = (id, value) => {
        setMovies(movies.map(m => m.id === id ? { ...m, title: value } : m));
    };

    const editMoviePrice = (id, value) => {
        setMovies(movies.map(m => m.id === id ? { ...m, price: Number(value) } : m));
    };

    const deleteMovie = (id) => {
        setMovies(movies.filter(m => m.id !== id));
        setSessions(sessions.filter(s => s.movieId !== id));
    };

    // Session handlers
    const addSession = () => {
        if (!newSessionMovieId || !newSessionTime) return;
        setSessions([
            ...sessions,
            { id: Date.now(), movieId: Number(newSessionMovieId), time: newSessionTime },
        ]);
        setNewSessionMovieId('');
        setNewSessionTime('');
    };

    const editSessionMovieId = (id, value) => {
        setSessions(sessions.map(s => s.id === id ? { ...s, movieId: Number(value) } : s));
    };

    const editSessionTime = (id, value) => {
        setSessions(sessions.map(s => s.id === id ? { ...s, time: value } : s));
    };

    const deleteSession = (id) => {
        setSessions(sessions.filter(s => s.id !== id));
    };

    // Statistics
    const totalMovies = movies.length;
    const totalSessions = sessions.length;

    return (
        <div className="container">
            <h2>Адмін панель</h2>
            <div className="card" style={{ marginBottom: 24 }}>
                <b>Додайте фільми:</b>
                <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
                    <input
                        placeholder="Назва фільму"
                        value={newMovieTitle}
                        onChange={e => setNewMovieTitle(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <input
                        type="number"
                        placeholder="Ціна"
                        value={newMoviePrice}
                        onChange={e => setNewMoviePrice(e.target.value)}
                        style={{ width: 80 }}
                    />
                    <button onClick={addMovie}>Додати</button>
                </div>
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id} style={{ marginBottom: 12 }}>
                            <input
                                value={movie.title}
                                onChange={e => editMovieTitle(movie.id, e.target.value)}
                                style={{ width: 180, marginRight: 8 }}
                            />
                            <input
                                type="number"
                                value={movie.price}
                                onChange={e => editMoviePrice(movie.id, e.target.value)}
                                style={{ width: 80, marginRight: 8 }}
                            />
                            <button onClick={() => deleteMovie(movie.id)}>Видалити</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card" style={{ marginBottom: 24 }}>
                <b>Додайте сеанси:</b>
                <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
                    <select
                        value={newSessionMovieId}
                        onChange={e => setNewSessionMovieId(e.target.value)}
                        style={{ flex: 1 }}
                    >
                        <option value="">Оберіть фільм</option>
                        {movies.map(m => (
                            <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                    </select>
                    <input
                        placeholder="Час"
                        value={newSessionTime}
                        onChange={e => setNewSessionTime(e.target.value)}
                        style={{ width: 80 }}
                    />
                    <button onClick={addSession}>Додати</button>
                </div>
                <ul>
                    {sessions.map(session => (
                        <li key={session.id} style={{ marginBottom: 12 }}>
                            <select
                                value={session.movieId}
                                onChange={e => editSessionMovieId(session.id, e.target.value)}
                                style={{ width: 180, marginRight: 8 }}
                            >
                                {movies.map(m => (
                                    <option key={m.id} value={m.id}>{m.title}</option>
                                ))}
                            </select>
                            <input
                                value={session.time}
                                onChange={e => editSessionTime(session.id, e.target.value)}
                                style={{ width: 80, marginRight: 8 }}
                            />
                            <button onClick={() => deleteSession(session.id)}>Видалити</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card">
                <b>Статистика:</b>
                <div>Кількість фільмів: {totalMovies}</div>
                <div>Кількість сеансів: {totalSessions}</div>
            </div>
        </div>
    );
};

export default AdminPanel;
