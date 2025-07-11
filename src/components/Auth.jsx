import React, { useState } from 'react';


const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Заповніть всі поля');
            return;
        }
        if (!isLogin && form.password !== form.confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }
        if (form.email === 'admin' && form.password === 'admin') {
            if (onAuthSuccess) onAuthSuccess();
            setForm({ email: '', password: '', confirmPassword: '' });
            return;
        }
        setError('Невірний логін або пароль. Використайте admin/admin');
    };

    return (
        <div className="container">
            <div className="card auth-card">
                <h2>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Логін (admin)"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль (admin)"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Підтвердіть пароль"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="auth-input"
                        />
                    )}
                    {error && <div className="auth-error">{error}</div>}
                    <button type="submit" className="auth-btn">
                        {isLogin ? 'Увійти' : 'Зареєструватися'}
                    </button>
                </form>
                <button onClick={() => setIsLogin(!isLogin)} className="auth-btn">
                    {isLogin ? 'Немає акаунта? Зареєструватися' : 'Вже є акаунт? Увійти'}
                </button>
                <div className="auth-info">
                    <b>Доступ до адмін панелі:</b><br />
                    Логін: <span className="auth-info-login">admin</span><br />
                    Пароль: <span className="auth-info-login">admin</span>
                </div>
            </div>
        </div>
    );
};

export default Auth;
