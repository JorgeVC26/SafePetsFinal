import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Colaboradores from '../img/gente.jpg';
import Prueba from '../img/duchaMasc.jpg';
import './infoRegistro.css';

const InformacionRegistro = () => {
  const settings = {
    dots: true, // Muestra los indicadores de navegación
    infinite: true, // Bucle infinito del carrusel
    speed: 500, // Velocidad de transición (en milisegundos)
    autoplay: true, // Inicia la reproducción automática
    autoplaySpeed: 3000, // Intervalo de tiempo entre diapositivas (en milisegundos)
  };

  return (
    <Slider {...settings}>
    {/* Diapositiva 1 */}
    <div className="seccionImagen">
      <img
        src={Colaboradores}
        alt="Descripción de la imagen"
        style={{ width: '100%', maxWidth: '100%', height: '70rem', display: 'block' }}
      />
      <p style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translateX(-50%)', zIndex: 1, color: '#fff' }}>
        Si quieres ser parte de la gran familia de SafePets y ofrecer tus servicios a tu comunidad. Regístrate ahora y comienza a.
      </p>

      <Link className="btn-registrarse" to="/register" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        Registrarse
      </Link>
    </div>

    {/* Diapositiva 2 - Otra imagen */}
    <div className="seccionImagen">
      <img
        src={Prueba}
        alt="Descripción de la otra imagen"
        style={{ width: '100%', maxWidth: '100%', height: '70rem', display: 'block' }}
      />
      <p style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translateX(-50%)', zIndex: 1, color: '#fff' }}>
        Descubre los servicios que ofrecen nuestros colaboradores y aprovecha los precios más cómodos.
      </p>

      <Link className="btn-registrarse" to="/serviciosDisponibles" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        Ver Servicios
      </Link>
    </div>

    {/* Agrega más diapositivas si es necesario */}
  </Slider>
);
};

export default InformacionRegistro
