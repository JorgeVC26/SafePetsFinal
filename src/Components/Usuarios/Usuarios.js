import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards.css';
import { useNavigate } from 'react-router-dom';

function Usuarios() {
  const [users, setUsers] = useState([]); // Inicializa como un arreglo vacío
  const navigate = useNavigate();

  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;

  // Verifica si el usuario tiene el rol necesario para ver a los usuarios
  const canViewUsers = rol === "superadmin" || rol === "admin";

  useEffect(() => {
    // Obtén los datos de usuarios del Local Storage al cargar el componente
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers && Array.isArray(storedUsers)) {
      setUsers(storedUsers);
    }
  }, []);

  const handleDelete = (id) => {
    if (rol === "superadmin") {
      // Solo el superadmin puede eliminar usuarios
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } else {
      alert('No tienes permisos para eliminar usuarios.');
    }
  };

  const handleAddUser = () => {
    
    if (rol === "admin" || rol === "superadmin") {
      // Solo el admin y el superadmin pueden agregar usuarios
      navigate('/CrearUsuario');
    } else {
      alert('No tienes permisos para agregar usuarios.');
    }
  };

  const handleEditUser = (id) => {
    if (rol === "superadmin" || rol === "admin") {
      // Solo el admin y el superadmin pueden editar usuarios
      navigate(`/editarUsuario/${id}`);
    } else {
      alert('No tienes permisos para editar usuarios.');
    }
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
      <h2>Lista de Usuarios</h2>
      <button className="green-button" onClick={handleAddUser}>Agregar Usuario</button>
      <Link className="back-button"  to="/">Regresar</Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
   
              <td className='actions'>
                <button className="blue-button" onClick={() => handleEditUser(user.id)}>Editar</button>
                <button className="red-button" onClick={() => handleDelete(user.id)}>Eliminar</button>
                </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className='container'>
      <h2>No tiene permisos</h2>
    </div>
  );
}

export default Usuarios;
