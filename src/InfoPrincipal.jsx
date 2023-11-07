import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Colaboradores from './img/colaboradores.jpg'
import Paseo from './img/paseoMasc.jpg'
import Ducha from './img/duchaMasc.jpg'

const InfoPrincipal = () => {
  return (

<div className="top-section" style={{ display: 'flex', alignItems: 'center' }}>
  <div className="image-container" style={{ flex: 1, textAlign: 'center' }}>
    <Carousel showArrows={true} infiniteLoop={true}>
      <div>
        <img src={Colaboradores} alt="Descripción de la imagen" />
      </div>

      <div>
        <img src={Paseo} alt="Descripción de la imagen" />
      </div>

      <div>
        <img src={Ducha} alt="Descripción de la imagen" />
      </div>
    </Carousel>
  </div>
  <div className="text-container" style={{ flex: 1, textAlign: 'left' }}>
    <div style={{ maxWidth: '80%' }}>
      <h1>¿Qué ofrecemos?</h1>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset 
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
        Aldus PageMaker including versions of Lorem Ipsum.
      </p>

      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset 
        sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
        Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <Link to="./Historia" className='boton-historia'
      >
        Conoce más sobre Nosotros
      </Link>
    </div>
  </div>
</div>



  )
}

export default InfoPrincipal
