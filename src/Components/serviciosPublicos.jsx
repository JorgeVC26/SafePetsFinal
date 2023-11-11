import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconoNuevoServicio from '../img/nuevo-gasto.svg';
import CerrarBtn from '../img/cerrar.svg'
import { formatearFecha } from './helpers';
import '../Style/style.css';
import '../App.css';
import IconoPaseo from '../img/paseo.avif';
import IconoComida from '../img/comida-mascota.png';
import IconoHigiene from '../img/higiene_mascota.png';
import IconoCuido from '../img/cuido_completo.png';

function ServiciosPublicos() {
  const diccionarioIconos = {
    paseo: IconoPaseo,
    restaurante: IconoComida,
    higiene: IconoHigiene,
    cuido: IconoCuido
  };

  // Estado para almacenar los servicios obtenidos del localStorage
  const [serviciosMostrados, setServiciosMostrados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Servicio que se está calificando
  const [servicioACalificar, setServicioACalificar] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [calificacion, setCalificacion] = useState(0);

  // Función para obtener los servicios del localStorage
  const obtenerServiciosDelLocalStorage = () => {
    const serviciosAprobados = JSON.parse(localStorage.getItem('serviciosAprobados')) || [];
    setServiciosMostrados(serviciosAprobados);
  };

  // Función para abrir el modal de calificación
  const abrirModalCalificacion = (servicio) => {
    setServicioACalificar(servicio);
    setCalificacion(servicio.calificacion || 0); // Mostrar la calificación actual del servicio
    setModalVisible(true);
  };

  const verDetalles = (servicio) => {
    // Almacenar la información del servicio en localStorage
    localStorage.setItem('detalleServicio', JSON.stringify(servicio));
    // Redireccionar a la página de detalles
    window.location.href = '/detalleServicio';
  };

  // Función para cerrar el modal de calificación
  const cerrarModalCalificacion = () => {
    setServicioACalificar(null);
    setCalificacion(0);
    setModalVisible(false);
  };

  const calificarServicio = () => {
    // Comprueba que haya un servicio para calificar
    if (servicioACalificar) {
      // Copia los servicios mostrados para no mutar el estado directamente
      const serviciosActualizados = [...serviciosMostrados];
  
      // Encuentra el índice del servicio a calificar
      const indexServicioACalificar = serviciosActualizados.findIndex(servicio => servicio.id === servicioACalificar.id);
  
      if (indexServicioACalificar !== -1) {
        // Verifica si el servicio tiene un array de calificaciones o crea uno
        if (!serviciosActualizados[indexServicioACalificar].calificaciones) {
          serviciosActualizados[indexServicioACalificar].calificaciones = [];
        }
  
        // Agrega la calificación al array de calificaciones
        serviciosActualizados[indexServicioACalificar].calificaciones.push(calificacion);
  
        // Calcula el promedio de calificaciones para el servicio
        const calificaciones = serviciosActualizados[indexServicioACalificar].calificaciones;
  
        if (calificaciones.length > 0) {
          const calificacionesNumeros = calificaciones.map(calificacion => parseFloat(calificacion));
          const sumatoriaCalificaciones = calificacionesNumeros.reduce((acc, curr) => acc + curr, 0);
          const promedio = sumatoriaCalificaciones / calificacionesNumeros.length;
          serviciosActualizados[indexServicioACalificar].promedioCalificaciones = promedio;
        }
        
  
        // Actualiza el estado con los servicios calificados
        setServiciosMostrados(serviciosActualizados);
  
        // Actualiza el localStorage con los servicios calificados
        localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosActualizados));
      }
  
      cerrarModalCalificacion(); // Cierra el modal después de calificar.
    }
  };
  
  

  useEffect(() => {
    obtenerServiciosDelLocalStorage();
  }, []);

  return (
    <div>
      <header>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <a className="titulo" href="/">
              <h1>Safe<span>Pets</span></h1>
            </a>
          </Link>
        </div>
      </header>
      <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <p>Imagen aquí</p>
        <div className="contenido-presupuesto">
          <p>{serviciosMostrados.length} servicios disponibles</p>
        </div>
      </div>
      <div className="filtros sombra contenedor" style={{ margin: '70px auto' }}>
        <form>
          <div className='campo'>
            <label>Filtrar Servicios</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="">-- Todas las Categorías --</option>
              <option value="paseo">Paseo</option>
              <option value="higiene">Higiene y Estética</option>
              <option value="cuido">Cuidado completo</option>
              <option value="restaurante">Restaurante</option>
            </select>
          </div>
        </form>
      </div>
      <div className='listado-gastos contenedor'>
      {serviciosMostrados.length > 0 ? (
  <>
    <h2>Servicios</h2>
    {serviciosMostrados
      .filter(servicio => !filtro || servicio.categoria === filtro) // Filtra los servicios por categoría si se ha seleccionado un filtro
      .map((servicio, index) => (
        <div className='gasto sombra' key={index}>
          <div className='contenido-gasto'>
            <img src={diccionarioIconos[servicio.categoria]} alt="Icono servicio" />
            <div className='descripcion-gasto'>
              <p className='categoria'>{servicio.categoria}</p>
              <p className='nombre-gasto'>{servicio.nombre}</p>
              <p className='nombre-gasto'>{servicio.ubicacion}</p>
              <p className='nombre-gasto'>Creado por: {servicio.usuarioActivoName}</p>
              <p className='fecha-gasto'>
                Agregado el: <span>{formatearFecha(servicio.fecha)}</span>
              </p>
              {servicio.promedioCalificaciones && (
                <p className='fecha-gasto'>Calificación: {servicio.promedioCalificaciones.toFixed(2)}</p>
              )}
              <button className='nombre-gasto calificar' onClick={() => abrirModalCalificacion(servicio)}>Calificar</button>
            </div>
          </div>
          <p className='cantidad-gasto'>₡{servicio.precio}</p>

          <button className="ver-mas-btn" onClick={() => verDetalles(servicio)}>
            Ver Más
          </button>
        </div>
      ))}
  </>
) : (
  <h2>No hay servicios</h2>
)}
      </div>

      {modalVisible && (
        <div className="modal modal_Calificacion">
          <div className="cerrar-modal">
            <img
              src={CerrarBtn}
              lt="cerrar modal"
              onClick={cerrarModalCalificacion}
            />
          </div>
          <div className='campo'>
          <h2>Calificar Servicio</h2>
          <p>Servicio: {servicioACalificar.nombre}</p>
          <label>Calificación:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
          />
          <button className='btn_cancelar' onClick={cerrarModalCalificacion}>Cancelar</button>
          <button className='btn_calificar' onClick={calificarServicio}>Calificar</button>
        </div>

        </div>


      )}
    </div>
  );
}

export default ServiciosPublicos;
