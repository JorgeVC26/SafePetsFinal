import React, { useEffect, useState } from 'react';
//import detalles from '../detalleServicio/detalleServicio';
import './detalleServicio.css';

const DetalleServicio = () => {
  const [detalleServicio, setDetalleServicio] = useState(null);

  useEffect(() => {
    // Obtener detalles del servicio almacenados en localStorage
    const storedDetails = localStorage.getItem('detalleServicio');
    if (storedDetails) {
      setDetalleServicio(JSON.parse(storedDetails));
      // Limpiar el item de localStorage después de obtener los detalles
      localStorage.removeItem('detalleServicio');
    }
  }, []);

  return (
    <div className='cont__servicio'>
      <div className='__title'>
      <h2>Detalles del Servicio</h2>
      </div>
      {detalleServicio && (
        <div className='dato__s'>
          {/* Mostrar detalles del servicio */}
          <div className='contenido__imagen'>
            <div className='__imagen'>
          <p>Imagen {detalleServicio.imagen}</p>
          </div>
          <div className='__info'>
          <p>Categoría: {detalleServicio.categoria}</p>
          <p>Nombre Completo: {detalleServicio.nombre} {detalleServicio.apellido}</p>
          <p>Telefono: {detalleServicio.telefono}</p>
          <p>Ubicación: {detalleServicio.ubicacion}</p>
          </div>
          </div>
          <div className='contenido__datos'>
          <p>Sobre mi: {detalleServicio.descripcion}</p>
          <p>Tarifa: {detalleServicio.precio}</p>
          <p>Creado por: {detalleServicio.usuarioActivoName}</p>
          <p>Agregado el: {detalleServicio.fecha}</p>
          {/* ... (mostrar otros detalles) */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleServicio;