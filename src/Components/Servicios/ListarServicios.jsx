import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards.css';
import { useNavigate } from 'react-router-dom';
import '../../Style/style.css';

function ListarServicios() {
  const [servicios, setServicios] = useState([]);
  const [serviciosAprobados, setServiciosAprobados] = useState([]);
  const [serviciosRechazados, setServiciosRechazados] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [cambiosGuardados, setCambiosGuardados] = useState(false);
  const [mensaje, setMensaje] = useState(""); // Nuevo estado para el mensaje
  const [mensajeTipo, setMensajeTipo] = useState(""); // Nuevo estado para el tipo de mensaje
  const navigate = useNavigate();

  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;

  const canViewUsers = rol === "superadmin";

  useEffect(() => {
    const storedServicios = JSON.parse(localStorage.getItem('serviciosTemporales'));
    if (storedServicios && Array.isArray(storedServicios)) {
      setServicios(storedServicios);
    }

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

    setServiciosAprobados([...serviciosAprobados, servicio]);

    const actualizarServicio = servicios.filter((servicio) => servicio.id !== id);
    setServicios(actualizarServicio);

    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosAprobados));

    const serviciosTemporales = JSON.parse(localStorage.getItem('serviciosTemporales'));
    const actualizadosTemporales = serviciosTemporales.filter((servicioTemporal) => servicioTemporal.id !== id);
    localStorage.setItem('serviciosTemporales', JSON.stringify(actualizadosTemporales));

    setMensaje("Servicio aprobado"); // Establecer el mensaje
    setMensajeTipo("aprobado"); // Establecer el tipo de mensaje
    setTimeout(() => {
      setMensaje(""); // Borrar el mensaje después de 3 segundos
      setMensajeTipo(""); // Borrar el tipo de mensaje
    }, 3000);
  };

  const handleGuardarCambios = () => {
    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosAprobados));
    localStorage.setItem('serviciosRechazados', JSON.stringify(serviciosRechazados));

    setCambiosGuardados(true);

    setTimeout(() => {
      setCambiosGuardados(false);
    }, 3000);
  };

  const handleRechazar = (id) => {
    const servicio = servicios.find((servicio) => servicio.id === id);
    servicio.estado = 'Rechazado';

    setServiciosRechazados([...serviciosRechazados, servicio]);

    const actualizarServicio = servicios.filter((servicio) => servicio.id !== id);
    setServicios(actualizarServicio);

    localStorage.setItem('serviciosRechazados', JSON.stringify(serviciosRechazados));

    const serviciosTemporales = JSON.parse(localStorage.getItem('serviciosTemporales'));
    const actualizadosTemporales = serviciosTemporales.filter((servicioTemporal) => servicioTemporal.id !== id);
    localStorage.setItem('serviciosTemporales', JSON.stringify(actualizadosTemporales));

    setMensaje("Servicio rechazado"); // Establecer el mensaje
    setMensajeTipo("rechazado"); // Establecer el tipo de mensaje
    setTimeout(() => {
      setMensaje(""); // Borrar el mensaje después de 3 segundos
      setMensajeTipo(""); // Borrar el tipo de mensaje
    }, 3000);
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
      {mensaje && <p className={`mensajeEstado ${mensajeTipo === "aprobado" ? "verde" : "rojo"}`}>{mensaje}</p>} {/* Mostrar el mensaje */}
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
      {cambiosGuardados && <p className='alertaGuardar show'>Cambios guardados</p>}
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
        <h2>No tiene permisos</h2>
      </div>
      <div>
        <a href="/">Inicio</a>
      </div>
    </div>
  );
}

export default ListarServicios;