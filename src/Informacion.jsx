import { Link } from "react-router-dom";
import './Style/style.css';
import mascotas from './img/cuidador-perro.jpg'
import serviciosMascotas from './img/serviciosMascotas.jpg'



function Historia() {
    return (
        <div>
          {/* */}
          <header>
          <a className="titulo" href="/">
            <h1>Safe<span>Pets</span></h1>
          </a>
          </header>


          <div className="secciones-principales">
      <div style={{display: 'flex'}}>
            
            
      <div className='seccion sombra margenHorizontal' style={{width: '40%', height:'70rem', justifyContent: 'center'}}>
              <div className='contenido-gasto'  style={{flexDirection: 'column'}}>
                <h1>Cuido Responsable</h1>
                <p>SAFEPETS surgió debido al estilo de vida actual y la creciente dependencia de la tecnologia han, el cual han generado un desafio en asegurarnos de que nuestras mascotas reciban la atención necesaria en nuestra ausencia Por ende nos planteamos la necesidad de encontrar soluciones innovadoras que combinen tecnologia y cuidado animal para garantizar que nuestras queridas mascotas estén bien atendidas</p>
                <img src={mascotas} alt="imagen de comentarios" style={{height: '35rem',  width:'50rem' }}/>
              </div>
              
              
            </div>
            <div className='seccion sombra margenHorizontal' style={{width: '40%', height:'70rem', justifyContent: 'center'}}>
              <div className='contenido-gasto'  style={{flexDirection: 'column'}}>
                <h1>Servicio Garantizado</h1>
                <p>SAFEPETS surgió debido al estilo de vida actual y la creciente dependencia de la tecnologia han, el cual han generado un desafio en asegurarnos de que nuestras mascotas reciban la atención necesaria en nuestra ausencia Por ende nos planteamos la necesidad de encontrar soluciones innovadoras que combinen tecnologia y cuidado animal para garantizar que nuestras queridas mascotas estén bien atendidas</p>
                <img src={serviciosMascotas} alt="imagen de comentarios" style={{height: '35rem',  width:'50rem' }}/>
              </div>
              
              
            </div>
            
  </div>
        </div>
        </div>
    );
  }
  
  
  export default Historia