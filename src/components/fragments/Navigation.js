import React from 'react';
import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/students">Uczniowie</Link></li>
                <li><Link to="/teachers">Nauczyciele</Link></li>
                <li><Link to="/lessons">Prywatne Lekcje</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation