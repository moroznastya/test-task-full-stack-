import React, { useState } from 'react';
import { data, Link } from 'react-router-dom';


function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Додано стан для помилки

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Помилка авторизації'); 
                return;
            }

            onLogin(data.token, username); 
        } catch (err) {
            setError('Помилка підключення до сервера');
            console.error(err);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>} {/* Виводимо повідомку про помилку */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                
            </form>
            <p>
                Не маєте аккаунту? <Link to="/register">Зареєструватися</Link>
            </p>
        </div>
    );
}

export default LoginPage;