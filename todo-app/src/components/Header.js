import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, username, onLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">Todo App</Link>

                <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul>
                        {isLoggedIn && (
                            <>
                                <li><Link to="/todos">Todos ({username})</Link></li>
                                <li><button onClick={onLogout}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </nav>

                <button className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    );
}

export default Header;