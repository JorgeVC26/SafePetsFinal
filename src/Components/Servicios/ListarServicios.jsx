import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards.css';
import { useNavigate } from 'react-router-dom';
import '../../Style/style.css'

function ListarServicios() {
  const [servicios, setServicios] = useState([]); // Inicializa como un arreglo vacío
  const [serviciosAprobados, setServiciosAprobados] = useState([]);
  const [serviciosRechazados, setServiciosRechazados] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [cambiosGuardados, setCambiosGuardados] = useState(false); // Estado para controlar si los cambios se han guardado
  const navigate = useNavigate();

  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;

  // Verifica si el usuario tiene el rol necesario para ver a los usuarios
  const canViewUsers = rol === "superadmin";

  useEffect(() => {
    // Obtén los datos de servicios temporales del Local Storage al cargar el componente
    const storedServicios = JSON.parse(localStorage.getItem('serviciosTemporales'));
    if (storedServicios && Array.isArray(storedServicios)) {
      setServicios(storedServicios);
    }

    // Obtén los datos de servicios aprobados y rechazados del Local Storage al cargar el componente
    const storedServiciosAprobados = JSON.parse(localStorage.getItem('serviciosAprobados'));
    if (storedServiciosAprobados && Array.isArray(storedServiciosAprobados)) {
      setServiciosAprobados(storedServiciosAprobados);
    }

    const storedServiciosRechazados = JSON.parse(localStorage.getItem('serviciosRechazados'));
    if (storedServiciosRechazados && Array.isArray(storedServiciosRechazados)) {
      setServiciosRechazados(storedServiciosRechazados);
    }
  }, []);

  const handleAprobar = (id) => {
    const servicio = servicios.find((servicio) => servicio.id === id);
    servicio.estado = 'Aprobado';

    // Mover el servicio aprobado a la lista de servicios aprobados
    setServiciosAprobados([...serviciosAprobados, servicio]);

    // Eliminar el servicio de la lista principal
    const actualizarServicio = servicios.filter((servicio) => servicio.id !== id);
    setServicios(actualizarServicio);

    // Actualizar el servicio aprobado en el localStorage
    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosAprobados));

    // Eliminar el servicio aprobado de serviciosTemporales en el localStorage
    const serviciosTemporales = JSON.parse(localStorage.getItem('serviciosTemporales'));
    const actualizadosTemporales = serviciosTemporales.filter((servicioTemporal) => servicioTemporal.id !== id);
    localStorage.setItem('serviciosTemporales', JSON.stringify(actualizadosTemporales));
  };

  const handleGuardarCambios = () => {
    // Guardar servicios aprobados y rechazados en el localStorage
    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosAprobados));
    localStorage.setItem('serviciosRechazados', JSON.stringify(serviciosRechazados));

    // Actualiza el estado para indicar que los cambios se han guardado
    setCambiosGuardados(true);

    // Establece un temporizador para que la alerta desaparezca después de 3 segundos
    setTimeout(() => {
      setCambiosGuardados(false);
    }, 3000); // 3000 milisegundos = 3 segundos
  };

  const handleRechazar = (id) => {
    const servicio = servicios.find((servicio) => servicio.id === id);
    servicio.estado = 'Rechazado';

    // Mover el servicio rechazado a la lista de servicios rechazados
    setServiciosRechazados([...serviciosRechazados, servicio]);

    // Eliminar el servicio de la lista principal
    const actualizarServicio = servicios.filter((servicio) => servicio.id !== id);
    setServicios(actualizarServicio);

    // Guardar el servicio rechazado en el localStorage
    localStorage.setItem('serviciosRechazados', JSON.stringify(serviciosRechazados));

    // Eliminar el servicio rechazado de serviciosTemporales en el localStorage
    const serviciosTemporales = JSON.parse(localStorage.getItem('serviciosTemporales'));
    const actualizadosTemporales = serviciosTemporales.filter((servicioTemporal) => servicioTemporal.id !== id);
    localStorage.setItem('serviciosTemporales', JSON.stringify(actualizadosTemporales));
  };

  return canViewUsers ? (
    <div className='contenedor-usuarios'>
      <header>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <a className="titulo" href="/">
              <h1>Safe<span>Pets</span></h1>
            </a>
          </Link>
        </div>
      </header>
      <h2>Lista de servicios temporales</h2>
      <Link className="back-button" to="/">Regresar</Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nombre Colaborador</th>
            <th>Precio Servicio</th>
            <th>Estado</th>
            <th>Categoría Servicio</th>
            <th>Usuario Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio, index) => (
            <tr key={index}>
              <td>{servicio.nombre}</td>
              <td>{servicio.precio}</td>
              <td>{servicio.estado}</td>
              <td>{servicio.categoria}</td>
              <td>{servicio.usuarioActivoName}</td>
              <td className='actions'>
                <button
                  className="green-button"
                  onClick={() => handleAprobar(servicio.id)}
                >
                  Aprobar
                </button>
                <button
                  className="red-button"
                  onClick={() => handleRechazar(servicio.id)}
                >
                  Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="blue-button" onClick={handleGuardarCambios}>
        Guardar Cambios
      </button>
      {cambiosGuardados && <p className='alertaGuardar show'>Cambios guardados</p>} {/* Muestra el mensaje si los cambios se han guardado */}
      {serviciosRechazados.length > 0 && (
        <div className="rechazados">
          <h3>Servicios Rechazados</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Usuario Activo</th>
              </tr>
            </thead>
            <tbody>
              {serviciosRechazados.map((servicio, index) => (
                <tr key={index}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.precio}</td>
                  <td>{servicio.estado}</td>
                  <td>{servicio.usuarioActivoName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : (
    <div className='container_back'>
      <div>
        <h2>No tiene permisos </h2>
      </div>
      <div>
        <a href="/">Inicio</a>
      </div>
    </div>
  );
}

export default ListarServicios;