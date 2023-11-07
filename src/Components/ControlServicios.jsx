import React from "react";
import { useNavigate } from 'react-router-dom';

const ControlServicios = () => {
  const navigate = useNavigate();

  // Obtener el rol del usuario activo y el nombre desde el almacenamiento local
  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;
  const nombreUsuarioActivo = usuarioActivo ? usuarioActivo[0].name : null;

  // Obtener servicios aprobados desde el almacenamiento local
  const serviciosAprobados = JSON.parse(localStorage.getItem('serviciosAprobados'));

  // Realizar el conteo de servicios según el rol
  let cantidadServiciosMostrar = 0;

  if (rol === 'superadmin' && serviciosAprobados) {
    cantidadServiciosMostrar = serviciosAprobados.length;
  } else if (rol === 'admin' && serviciosAprobados && nombreUsuarioActivo) {
    cantidadServiciosMostrar = serviciosAprobados.filter(servicio => servicio.nombre === nombreUsuarioActivo).length;
  }

  const handleReturn = () => {
    navigate('/');
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <p>Imagen aquí</p>

      <div className="contenido-presupuesto">
        <p>
          {rol === 'superadmin'
            ? `${cantidadServiciosMostrar} servicios`
            : rol === 'admin'
            ? ` ${nombreUsuarioActivo}: ${cantidadServiciosMostrar} servicios`
            : `Rol no válido`}
        </p>
      </div>

      <button onClick={handleReturn} className="green-button">
        Regresar
      </button>
    </div>
  );
};

export default ControlServicios;
