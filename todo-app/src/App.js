import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TodoList from './pages/TodoList/TodoList';
import Header from './components/Header';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); 

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        if (token) {
            setIsLoggedIn(true);
            setUsername(storedUsername || ''); 
        }
    }, []);

    const handleLogin = (token, username) => { 
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <div className="App">
                <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} /> {/* Передаємо isLoggedIn та username */}
                <Routes>
                    <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/todos" />} />
                    <Route path="/register" element={!isLoggedIn ? <RegisterPage onRegister={handleLogin} /> : <Navigate to="/todos" />} />
                    <Route path="/todos" element={isLoggedIn ? <TodoList username={username} /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/todos" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;