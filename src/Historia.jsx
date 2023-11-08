import { Link } from "react-router-dom";
import './Style/historia_carrousel.css';

import Footer from "./footer/footer"

function Home() {

    return (
        <div>
          {/* */}
          <header>
          <a className="titulo" href="/">
            <h1>Safe<span>Pets</span></h1>
          </a>
            </header>
            <div className="hero">
            <div className="conocenos">
              <h1>Conocenos</h1>
            </div>
            </div>
           
        <div className="card-content">
          <div className="card-text">
            <h2 className="card-title">Nuestra Historia</h2>
            <p className="card-description">SAFEPETS surgió debido al estilo de vida actual 
            y la creciente dependencia de la tecnología, lo cual ha generado un desafío en 
            asegurarnos de que nuestras mascotas reciban la atención necesaria en nuestra ausencia. 
            Por ende, nos planteamos la necesidad de encontrar soluciones innovadoras que combinen 
            tecnología y cuidado animal para garantizar que nuestras queridas mascotas estén bien atendidas.</p>
          </div>
        </div>
        
        <div className="contenedor-imagenes">
        <div className="imagen-con-texto">
      <div className="imagen-izquierda"></div>
      <div className="texto"><h4>Misión: 
            Nuestra misión es brindar comodidad, seguridad y bienestar 
            a las mascotas y sus dueños. Nos comprometemos a facilitar 
            la vida de los dueños de mascotas ocupados al ofrecer servicios de 
            paseo y cuidado de mascotas confiables y de calidad. Nuestra pasión es 
            garantizar que cada mascota reciba el amor, atención y ejercicio que merece, 
            al tiempo que creamos oportunidades significativas para nuestros cuidadores. Nos 
            esforzamos por construir una comunidad de amantes de mascotas comprometidos 
            con la felicidad y salud de los animales que hacen parte de nuestras vidas.</h4>
    </div>
      </div>
      <div className="imagen-con-texto">
      <div className="imagen-derecha"></div>
      <div className="texto"><h4>Visión: 
            Nuestra visión es convertirnos en la plataforma confiable en 
            servicios de cuidado y paseo de mascotas, reconocida por su 
            compromiso con el bienestar de los animales y la confianza de los 
            dueños de mascotas en las diferentes zonas. Buscamos innovar constantemente, 
            ampliando nuestros servicios y llegando a nuevas comunidades para brindar 
            soluciones integrales para las necesidades de las mascotas y sus dueños.</h4>
    </div>
      </div>
    </div>
    <Footer />
      </div>
    );
  }
  
  export default Home;