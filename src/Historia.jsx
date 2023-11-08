import { Link } from "react-router-dom";
import './Style/historia_carrousel.css';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import image1 from './img/imagen.png'; 
import image2 from './img/img.jpg';
import image3 from './img/img.jpg';

function Home() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    return (
        <div>
          {/* */}
          <header>
          <a className="titulo" href="/">
            <h1>Safe<span>Pets</span></h1>
          </a>
            </header>

      <div className="card">
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
        <div className="card-image">
          <Slider {...settings}>
            <div>
              <img src={image1} alt="Imagen de mascota 1" className="pet-image" />
            </div>
            <div>
              <img src={image2} alt="Imagen de mascota 2" className="pet-image" />
            </div>
            <div>
              <img src={image3} alt="Imagen de mascota 3" className="pet-image" />
            </div>
          </Slider>
        </div>
        
      </div>
      </div>
    );
  }
  
  export default Home;