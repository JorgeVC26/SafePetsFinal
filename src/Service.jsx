import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Filtro from './Components/Filtro';
import Modal from './Components/Modal';
import ListadoServicios from './Components/ListadoServicios';
import { generarId } from './Components/helpers';
import IconoNuevoServicio from './img/nuevo-gasto.svg';
import ControlServicios from './Components/ControlServicios';
import './Style/style.css';
import './App.css';

function Service() {
  const authToken = localStorage.getItem('authToken');

  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;
  console.log(rol);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [mensajeServicioAgregado, setMensajeServicioAgregado] = useState(false); // Nuevo estado

  const [serviciosAprobados, setServiciosAprobados] = useState(
    JSON.parse(localStorage.getItem('serviciosAprobados')) || []
  );
  const [servicioTemporal, setServiciosTemporales] = useState(
    JSON.parse(localStorage.getItem('serviciosTemporales')) || []
  );

  const [servicioEditar, setServicioEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(servicioEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [servicioEditar]);

  useEffect(() => {
    // Actualizar servicios aprobados en el localStorage
    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosAprobados));
  }, [serviciosAprobados]);

  useEffect(() => {
    if (filtro) {
      const serviciosFiltrados = serviciosAprobados.filter(
        (servicio) => servicio.categoria === filtro
      );
      setServiciosFiltrados(serviciosFiltrados);
    }
  }, [filtro]);

  const handleNuevoServicio = () => {
    setModal(true);
    setServicioEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const handleEliminarServicio = (id) => {
    if (authToken && (rol === 'superadmin' || rol === 'admin')) {
      const serviciosActualizados = serviciosAprobados.filter(
        (servicio) => servicio.id !== id
      );
      setServiciosAprobados(serviciosActualizados);
    } else {
      alert('No tienes permisos para eliminar servicios.');
      window.location.reload();
    }
  };

  const handleEditarServicio = (id) => {
    if (authToken && (rol === 'superadmin' || rol === 'admin')) {
      const servicioAEditar = serviciosAprobados.find((servicio) => servicio.id === id);
      setServicioEditar(servicioAEditar);
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    } else {
      alert('No tienes permisos para editar servicios.');
    }
  };

  const guardarServicio = (servicio) => {
    if (servicio.id !== "") {
      const servicioAprobado = serviciosAprobados.find((servicioState) => servicioState.id === servicio.id);
  
      if (servicioAprobado) {
        // Agregar el servicio a servicioTemporal
        setServiciosTemporales([...servicioTemporal, servicioAprobado]);
  
        // Eliminar el servicio de serviciosAprobados
        const serviciosActualizados = serviciosAprobados.filter((servicioState) => servicioState.id !== servicio.id);
        setServiciosAprobados(serviciosActualizados);
  
        setServicioEditar({});
      }
    } else {
      servicio.id = generarId();
      servicio.fecha = Date.now();
      setServiciosTemporales([...servicioTemporal, servicio]);
    }

    // Muestra el mensaje de servicio agregado
    setMensajeServicioAgregado(true);

    // Oculta el mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeServicioAgregado(false);
    }, 3000);

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    });
  };
  
  useEffect(() => {
    localStorage.setItem('serviciosTemporales', JSON.stringify(servicioTemporal) ?? []);
  }, [servicioTemporal]);

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header servicios={serviciosAprobados} />
      <ControlServicios cantidadServicios={serviciosAprobados.length} />
      <main>
        <Filtro filtro={filtro} setFiltro={setFiltro} />
        <ListadoServicios
          servicios={serviciosAprobados}
          setServicioEditar={setServicioEditar}
          eliminarServicio={handleEliminarServicio}
          editarServicio={handleEditarServicio}
          filtro={filtro}
          serviciosFiltrados={serviciosFiltrados}
        />
      </main>
      {authToken && (rol === 'superadmin' || rol === 'admin') && (
        <div className='nuevo-gasto'>
          <img
            src={IconoNuevoServicio}
            alt='imagen nuevo servicio'
            onClick={handleNuevoServicio}
          />
        </div>
      )}

      {authToken && (rol === 'superadmin' || rol === 'admin') && modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarServicio={guardarServicio}
          servicioEditar={servicioEditar}
          setServicioEditar={setServicioEditar}
        />
      )}

      {/* Mensaje de servicio agregado */}
      {mensajeServicioAgregado && (
        <div className='mensaje-servicio-agregado aparecer'>Su servicio será evaluado para agregarlo a la sección de Servicios</div>
      )}
    </div>
  );
}

export default Service;