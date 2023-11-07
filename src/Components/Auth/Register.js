import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Auth/NavbarHome';
import '../../css/login.css';

function Register() {
  const authToken = localStorage.getItem('authToken');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario'); // Valor predeterminado: usuario
  const navigate = useNavigate();

  const getNextUserId = (users) => {
    // Encuentra el máximo 'id' en los usuarios registrados
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    // Asigna el siguiente 'id' al nuevo usuario
    return maxId + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto para almacenar los datos del usuario
    const userData = { id: 0, name, email, password, role };

    // Obtener los datos actuales de usuarios desde el Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Asignar un 'id' único al nuevo usuario
    userData.id = getNextUserId(existingUsers);

    // Agregar el nuevo usuario al arreglo de usuarios
    const updatedUsers = [...existingUsers, userData];

    // Guardar el arreglo actualizado en Local Storage como cadena JSON
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/login');
  };

  return (
    <div>
      <Navbar authToken={authToken} />
      <div className="formRegister">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Administrador</option>
            <option value="usuario">Usuario</option>
          </select>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
