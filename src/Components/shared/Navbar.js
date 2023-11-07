import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Navbar.css';

function Navbar({ authToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('authToken');
    localStorage.removeItem('UsuarioActivo');
  
    // Recarga la página actual
    window.location.reload();
    // Redirecciona al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        {!authToken && (
          <>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        )}
        {authToken && (
          <div className='salir'>
            <li className="logout-button-container">
              <button className="logout-button" onClick={handleLogout}>Salir</button>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
