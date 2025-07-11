import React, { useState } from 'react';

const movies = [
    { id: 1, title: 'Fast & Furious' },
    { id: 2, title: 'The Office' },
    { id: 3, title: 'The Crown' },
    { id: 4, title: 'Avengers' },
    { id: 5, title: 'Inception' },
    { id: 6, title: 'Interstellar' },
];

function isWeekend(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay();
    return day === 0 || day === 6;
}

function getHours(dateStr) {
    if (!dateStr) return [];
    if (isWeekend(dateStr)) {
        return [10, 12, 14, 16, 18, 20];
    }
    return [8, 10, 12, 14, 16, 18, 20, 22];
}

const Sessions = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [plannedSessions, setPlannedSessions] = useState([]);

    const handleBook = (movie, hour) => {
        const exists = plannedSessions.some(
            s => s.date === selectedDate && s.hour === hour && s.movie.id === movie.id
        );
        if (!exists) {
            setPlannedSessions([
                ...plannedSessions,
                { date: selectedDate, hour, movie }
            ]);
        }
    };

    const handleRemove = (idx) => {
        setPlannedSessions(plannedSessions.filter((_, i) => i !== idx));
    };

    const hours = getHours(selectedDate);

    return (
        <div className="container">
            <h2>Розклад сеансів</h2>
            <div className="card sessions-date-card">
                <label>
                    Дата:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="sessions-date-input"
                    />
                </label>
            </div>
            {selectedDate && (
                <div>
                    {hours.length === 0 ? (
                        <div className="card sessions-empty-card">Оберіть дату.</div>
                    ) : (
                        hours.map(hour => (
                            <div key={hour} className="card sessions-hour-card">
                                <b>{`${hour}:00`}</b>
                                <div className="grid">
                                    {movies.map(movie => (
                                        <div key={movie.id} className="card sessions-movie-card">
                                            <strong>{movie.title}</strong>
                                            <button
                                                onClick={() => handleBook(movie, hour)}
                                                disabled={plannedSessions.some(
                                                    s => s.date === selectedDate && s.hour === hour && s.movie.id === movie.id
                                                )}
                                                className="sessions-book-btn"
                                            >
                                                {plannedSessions.some(
                                                    s => s.date === selectedDate && s.hour === hour && s.movie.id === movie.id
                                                ) ? 'Записано' : 'Записатися'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
            <div className="card sessions-planned-card">
                <h3>Заплановані сеанси</h3>
                {plannedSessions.length === 0 ? (
                    <div className="sessions-none">Немає запланованих сеансів.</div>
                ) : (
                    <ul className="sessions-planned-list">
                        {plannedSessions.map((s, idx) => (
                            <li key={idx} className="sessions-planned-item">
                                <b>{s.movie.title}</b> — {s.date} о {s.hour}:00
                                <button
                                    onClick={() => handleRemove(idx)}
                                    className="sessions-remove-btn"
                                >
                                    Видалити
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sessions;
