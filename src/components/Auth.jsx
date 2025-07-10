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
        // Only allow admin/admin
        if (form.email === 'admin' && form.password === 'admin') {
            if (onAuthSuccess) onAuthSuccess();
            setForm({ email: '', password: '', confirmPassword: '' });
            return;
        }
        setError('Невірний логін або пароль. Використайте admin/admin');
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: 340, margin: '0 auto' }}>
                <h2>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Логін (admin)"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ display: 'block', marginBottom: 10, width: '100%' }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль (admin)"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ display: 'block', marginBottom: 10, width: '100%' }}
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Підтвердіть пароль"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{ display: 'block', marginBottom: 10, width: '100%' }}
                        />
                    )}
                    {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
                    <button type="submit" style={{ width: '100%', marginBottom: 10 }}>
                        {isLogin ? 'Увійти' : 'Зареєструватися'}
                    </button>
                </form>
                <button onClick={() => setIsLogin(!isLogin)} style={{ width: '100%' }}>
                    {isLogin ? 'Немає акаунта? Зареєструватися' : 'Вже є акаунт? Увійти'}
                </button>
                <div style={{ marginTop: 16, fontSize: 14, color: '#bbb' }}>
                    <b>Доступ до адмін панелі:</b><br />
                    Логін: <span style={{ color: '#fff' }}>admin</span><br />
                    Пароль: <span style={{ color: '#fff' }}>admin</span>
                </div>
            </div>
        </div>
    );
};

export default Auth;
