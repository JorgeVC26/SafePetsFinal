import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Auth/NavbarHome';
import '../../css/login.css';
import { Link } from 'react-router-dom';

function CrearUsuario() {
  const authToken = localStorage.getItem('authToken');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario'); // Valor predeterminado: usuario
  const navigate = useNavigate();

  // Función para obtener el próximo ID único para el nuevo usuario
  const getNextUserId = (users) => {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto para almacenar los datos del nuevo usuario
    const userData = { name, email, password, role };

    // Obtener los datos actuales de usuarios desde el Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Asignar un 'id' único al nuevo usuario
    userData.id = getNextUserId(existingUsers);

    // Agregar el nuevo usuario al arreglo de usuarios
    const updatedUsers = [...existingUsers, userData];

    // Guardar el arreglo actualizado en Local Storage como cadena JSON
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/usuarios'); // Redirige de nuevo a la lista de usuarios
  };

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
    <div  className='container_add'>
      <div className="card">
        <div className="card-header">
          <h2>Crear Usuario</h2>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Correo Electrónico:</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Rol:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>

            <button type="submit" className="green-button">Crear Usuario</button>
            <Link className="back-button"  to="/usuarios">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CrearUsuario;
