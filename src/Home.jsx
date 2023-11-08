import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Style/style.css';
import Usuarios from './img/Users.png';
import Resena from './img/resenas.png';
import ImgServicios from './img/servicios.png';
import Historia from './img/historia.png';
import InfoPrincipal from "./InfoPrincipal";
import InformacionRegistro from "./InfoRegistro/InformacionRegistro";
import Contacto from "./Contacto/Contacto";
import Footer from "./footer/footer";
import MensajeLogout from "./MensajeLogout";

function Home() {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const usuarioActivo = JSON.parse(localStorage.getItem('users'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;
  const canViewAdmin = rol === 'superadmin' || rol === 'admin';

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('authToken');
    localStorage.removeItem('rolActivo');
    localStorage.removeItem('UsuarioActivo');
    // Recarga la página actual
    window.location.reload();
    // Redirecciona al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div>
      <header>
        <a className="titulo" href="/">
          <h1>Safe<span>Pets</span></h1>
        </a>
        <ul>
          {!authToken && (
            <>
              <div className="contenedor-btns">
                <Link className="btn-iniciar-sesion" to="/login">Iniciar Sesión</Link>
                <Link className="btn-iniciar-sesion" to="/register">Registrarse</Link>
              </div>
            </>
          )}
          {authToken && (
            <li className="logout-button-container">
              <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
            </li>
          )}
        </ul>
      </header>

      <InfoPrincipal />

      <div className="secciones-principales">
        <div style={{ display: 'flex' }}>
          <div className='seccion card margenHorizontal' style={{ width: '18%', height: '40rem', justifyContent: 'center' }}>
            <div className='contenido-gasto' style={{ flexDirection: 'column' }}>
              <Link to="/serviciosDisponibles" className='Titulos contenido-URL' >Servicios Disponibles
                <img src={ImgServicios} alt="imagen de servicios" style={{ height: '100px' }} />
              </Link>
            </div>
          </div>
          {authToken && canViewAdmin && (
            <div className='seccion card margenHorizontal' style={{ width: '18%', height: '40rem', justifyContent: 'center' }}>
              <div className='contenido-gasto' style={{ flexDirection: 'column' }}>
                <Link to="./Service" className='Titulos contenido-URL' >Servicios
                  <img src={ImgServicios} alt="imagen de servicios" style={{ height: '100px' }} />
                </Link>
              </div>
            </div>
          )}
          {authToken && canViewAdmin && (
            <div className='seccion card margenHorizontal' style={{ width: '18%', height: '40rem', justifyContent: 'center' }}>
              <div className='contenido-gasto' style={{ flexDirection: 'column' }} >
                <Link to="/administrar" className='Titulos contenido-URL'>Administrar
                  <img src={Usuarios} alt="imagen de usuarios" style={{ height: '100px' }} />
                </Link>
              </div>
            </div>
          )}
          <div className='seccion card margenHorizontal' style={{ width: '18%', height: '40rem', justifyContent: 'center' }}>
            <div className='contenido-gasto' style={{ flexDirection: 'column' }}>
              <Link to="./Informacion" className='Titulos contenido-URL'>Información
                <img src={Resena} alt="imagen de comentarios" style={{ height: '100px' }} />
              </Link>
            </div>
          </div>
          <div className='seccion card margenHorizontal' style={{ width: '18%', height: '40rem', justifyContent: 'center' }}>
            <div className='contenido-gasto' style={{ flexDirection: 'column' }}>
              <Link to="./Historia" className='Titulos contenido-URL'>Historia
                <img src={Historia} alt="imagen de comentarios" style={{ height: '100px' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <InformacionRegistro />

      <Contacto />

      <Footer />

      {showLogoutConfirmation && (
        <MensajeLogout onConfirm={confirmLogout} onCancel={() => setShowLogoutConfirmation(false)} />
      )}
    </div>
  );
}

export default Home;