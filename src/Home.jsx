import { Link, useNavigate } from "react-router-dom";
import './Style/style.css';
import Usuarios from './img/Users.png'
import Resena from './img/resenas.png'
import ImgServicios from './img/servicios.png'
import Historia from './img/historia.png'
import Colaboradores from './img/colaboradores.jpg'
import InfoPrincipal from "./InfoPrincipal";



function Home() {
    
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const usuarioActivo = JSON.parse(localStorage.getItem('users'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;
  const canViewAdmin = rol === 'superadmin' || rol === 'admin';
  const handleLogout = () => {
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
              
                <Link className="btn-iniciar-sesion"  to="/login">Iniciar Sesión</Link>
              
            
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


      <div className="seccionImagen" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
  <img
    src={Colaboradores}
    alt="Descripción de la imagen"
    style={{ width: '100%', maxWidth: '100%', height: '70rem', display: 'block' }}
  />
    <p style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translateX(-50%)', zIndex: 1, color: '#fff' }}>
    Si quieres ser parte de la gran familia ded SafePets y ofrecer tus servicios a tu comunidad. Regístrate ahora y comienza a.
  </p>

  <Link className="btn-registrarse" to="/register" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
    Registrarse
  </Link>

</div>



    </div>
  );
}

export default Home;
