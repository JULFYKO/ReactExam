import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';
import Sessions from './components/Sessions';
import Favorites from './components/Favorites';
import AdminPanel from './components/AdminPanel';
import Auth from './components/Auth';
import Recommendations from './components/Recommendations';

const navLinks = [
  { to: '/', label: 'Головна' },
  { to: '/search', label: 'Пошук' },
  { to: '/sessions', label: 'Сеанси' },
  { to: '/favorites', label: 'Обрані' },
  { to: '/admin', label: 'Адмін' },
  { to: '/auth', label: 'Вхід/Реєстрація' },
  { to: '/recommendations', label: 'Рекомендації' },
];

const App = () => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('isAdmin') === 'true'
  );
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    navigate('/admin');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="container">
      <nav>
        {navLinks.map((link, idx) => (
          <React.Fragment key={link.to}>
            <Link to={link.to}>{link.label}</Link>
            {idx < navLinks.length - 1 && ' | '}
          </React.Fragment>
        ))}
        {isAdmin && (
          <button style={{ marginLeft: 16 }} onClick={handleLogout}>
            Вийти з адмінки
          </button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminPanel />
            ) : (
              <div className="card" style={{ maxWidth: 400, margin: '32px auto', textAlign: 'center' }}>
                <h3>Доступ лише для адміністратора</h3>
                <p>Увійдіть як адміністратор для доступу до панелі.</p>
                <Link to="/auth">
                  <button>Вхід/Реєстрація</button>
                </Link>
              </div>
            )
          }
        />
        <Route
          path="/auth"
          element={<Auth onAuthSuccess={handleAuthSuccess} />}
        />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="*" element={<div>Сторінку не знайдено</div>} />
      </Routes>
    </div>
  );
};

export default App;
