import React, { useState } from 'react';

// Список фільмів
const movies = [
    { id: 1, title: 'Fast & Furious' },
    { id: 2, title: 'The Office' },
    { id: 3, title: 'The Crown' },
    { id: 4, title: 'Avengers' },
    { id: 5, title: 'Inception' },
    { id: 6, title: 'Interstellar' },
];

// Функція для визначення вихідного дня
function isWeekend(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay();
    return day === 0 || day === 6;
}

// Генерує години для вибраної дати
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

    // Додаємо запис на сеанс
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

    // Видалити запис
    const handleRemove = (idx) => {
        setPlannedSessions(plannedSessions.filter((_, i) => i !== idx));
    };

    const hours = getHours(selectedDate);

    return (
        <div className="container">
            <h2>Розклад сеансів</h2>
            <div className="card" style={{ marginBottom: 24 }}>
                <label>
                    Дата:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        style={{ marginLeft: 8 }}
                    />
                </label>
            </div>
            {selectedDate && (
                <div>
                    {hours.length === 0 ? (
                        <div className="card">Оберіть дату.</div>
                    ) : (
                        hours.map(hour => (
                            <div key={hour} className="card" style={{ marginBottom: 16 }}>
                                <b>{`${hour}:00`}</b>
                                <div className="grid">
                                    {movies.map(movie => (
                                        <div key={movie.id} className="card" style={{ width: 220 }}>
                                            <strong>{movie.title}</strong>
                                            <button
                                                onClick={() => handleBook(movie, hour)}
                                                disabled={plannedSessions.some(
                                                    s => s.date === selectedDate && s.hour === hour && s.movie.id === movie.id
                                                )}
                                                style={{ marginTop: 8 }}
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
            {/* Заплановані сеанси */}
            <div className="card" style={{ marginTop: 32 }}>
                <h3>Заплановані сеанси</h3>
                {plannedSessions.length === 0 ? (
                    <div style={{ color: '#bbb' }}>Немає запланованих сеансів.</div>
                ) : (
                    <ul>
                        {plannedSessions.map((s, idx) => (
                            <li key={idx} style={{ marginBottom: 8 }}>
                                <b>{s.movie.title}</b> — {s.date} о {s.hour}:00
                                <button
                                    style={{ marginLeft: 12 }}
                                    onClick={() => handleRemove(idx)}
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
