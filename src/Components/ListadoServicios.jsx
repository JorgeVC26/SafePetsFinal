import React from 'react';
import Servicio from './Servicio';

const ListadoServicios = ({
  servicios,
  setServicioEditar,
  eliminarServicio,
  filtro,
  serviciosFiltrados,
}) => {
  // Obtén el rol del usuario activo del localStorage
  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;

  // Filtra los servicios en función del rol del usuario activo
  let serviciosMostrados = [];

  if (rol === "admin") {
    // Si el rol es "Admin", filtra los servicios para mostrar solo los del usuario activo
    serviciosMostrados = servicios.filter(
      (servicio) => servicio.estado === "Aprobado" && servicio.usuarioActivoName === usuarioActivo[0].name
    );
  } else if (rol === "superadmin") {
    // Si el rol es "SuperAdmin", muestra todos los servicios sin ningún filtro
    serviciosMostrados = servicios.filter((servicio) => servicio.estado === "Aprobado");
  }

  return (
    <div className='listado-gastos contenedor'>
      {serviciosMostrados.length > 0 ? (
        <>
          <h2>Servicios</h2>
          {serviciosMostrados.map((servicio) => (
            <Servicio
              key={servicio.id}
              servicio={servicio}
              setServicioEditar={setServicioEditar}
              eliminarServicio={eliminarServicio}
            />
          ))}
        </>
      ) : (
        <h2>No hay servicios</h2>
      )}
    </div>
  );
};

export default ListadoServicios;
