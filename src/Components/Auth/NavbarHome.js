import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css';

function Navbar({ authToken }) {
  return (
    <nav className="navbarHome">
      <ul>
        {!authToken && (
          <>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>

            <li>
              <Link to="/">Ir a Inicio</Link>
            </li>
          </>
        )}
        {authToken && (
          <div>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Salir</Link>
            </li>


          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
