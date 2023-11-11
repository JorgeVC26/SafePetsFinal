import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Usuarios from './Components/Usuarios/Usuarios';
import CrearUsuario from './Components/Usuarios/CrearUsuario';
import EditarUsuario from './Components/Usuarios/EditarUsuario';
import Home from './Home';
import Service from "./Service";
import Historia from "./Historia/Historia.jsx";
import Informacion from "./Informacion";
import MenuAdministrador from './Components/MenuAdministrador';
import ListarSerivicios from './Components/Servicios/ListarServicios';
import ListarSeriviciosPublicos from './Components/serviciosPublicos.jsx';
import DetalleServicio from './detalleServicio/detalleServicio.jsx';
function App() {

  // Verificar si ya existe un usuario de super admin en localStorage
  const existingSuperAdmin = JSON.parse(localStorage.getItem('users'));
  // Si no existe, crear un nuevo usuario de super admin
  if (!existingSuperAdmin) {
    const superAdminUser = {
      id: 1,
      name: 'SuperAdmin',
      role: 'superadmin',
      email: 'superadmin@gmail.com',
      password: '12345',
    };

    // Almacenar el usuario en localStorage como un array
    localStorage.setItem('users', JSON.stringify([superAdminUser]));
  }
  const authToken = localStorage.getItem('authToken');
  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;


  const isAuthorized = (requiredRoles) => {
 if(requiredRoles.includes("superadmin") || requiredRoles.includes("admin")) {
      // El usuario tiene un rol permitido para otras rutas
      return true;
    } else {
      // El usuario no tiene permiso para otras rutas
      return false;
    }
  };
  

  return (
    <Router>
      {authToken && <Dashboard />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/serviciosDisponibles" element={<ListarSeriviciosPublicos />} />
        <Route path="Service" element={<Service />} />
        <Route path="Historia" element={<Historia />} />
        <Route path="Informacion" element={<Informacion />} />
        <Route path="/detalleServicio" element={<DetalleServicio />} />

        <Route
          path="/login"
          element={!authToken ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!authToken ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/usuarios"
          element={
            authToken && isAuthorized(["admin", "superadmin"]) ? (
              <Usuarios />
            ) : (
              <Navigate to="/" /> // Redirige al usuario a la ruta "/"
            )
          }
        />
        <Route
          path="/listarServicios"
          element={
            authToken && isAuthorized(["superadmin"]) ? (
              <ListarSerivicios />
            ) : (
              <Navigate to="/" /> // Redirige al usuario a la ruta "/"
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            authToken && isAuthorized(["admin", "superadmin"]) ? (
              <Dashboard />
            ) : (
              <Navigate to="/" /> // Redirige al usuario a la ruta "/"
            )
          }
        />
        <Route
          path="/Administrar"
          element={
            authToken && isAuthorized(["superadmin"]) ? (
              <MenuAdministrador />
            ) : (
              <Navigate to="/administrar" /> // Redirige al usuario a la ruta "/"
            )
          }
        />

        <Route
          path="/CrearUsuario"
          element={
            authToken && isAuthorized(["admin", "superadmin"]) ? (
              <CrearUsuario />
            ) : (
              <Navigate to="/usuarios" /> // Redirige al usuario a la ruta "/"
            )
          }
        />

        <Route
          path="/editarUsuario/:id"
          element={
            authToken && isAuthorized(["superadmin", "admin"]) ? (
              <EditarUsuario />
            ) : (
              <Navigate to="/usuarios" /> // Redirige al usuario a la ruta "/"
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
