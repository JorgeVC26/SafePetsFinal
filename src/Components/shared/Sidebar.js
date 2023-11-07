import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/estilo.css'; 

function Sidebar() {
  return (
    <div>
      <aside>
      <ul>
        <li>
          <Link to="/dashboard">Inicio</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/contact">Contacto</Link>
        </li>
      </ul>
    </aside>
    </div>
  );
}

export default Sidebar;
