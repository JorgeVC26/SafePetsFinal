import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import crypto from 'crypto';
import Navbar from '../Auth/NavbarHome';
import '../../css/login.css';

function Login() {
  const authToken = localStorage.getItem('authToken');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Obtener los datos del formulario
    const enteredEmail = email;
    const enteredPassword = password;

    // Obtener los datos de los usuarios almacenados en localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    if (storedUsers) {
      // Buscar al usuario con el correo electrónico proporcionado
      const user = storedUsers.find((user) => user.email === enteredEmail);

      if (user) {
        // Verificar si la contraseña coincide
        if (enteredPassword === user.password) {
          const secretKey = 'tu_clave_secreta'; // Reemplaza con tu clave secreta
          const header = {
            alg: 'HS256',
            typ: 'JWT',
          };
          const payload = {
            sub: enteredEmail,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // Caducidad del token en segundos
          };
          

          const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
          const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');

          const signature = crypto.createHmac('sha256', secretKey).update(encodedHeader + '.' + encodedPayload).digest('base64');

          const token = `${encodedHeader}.${encodedPayload}.${signature}`;

          localStorage.setItem('authToken', token);
          // Guardar el usuario activo en un array
          const usuarioActivo = [{ id: user.id,name:user.name, email: enteredEmail, role: user.role }];
          localStorage.setItem('UsuarioActivo', JSON.stringify(usuarioActivo));

          window.location.reload();
        } else {
          setError('Contraseña incorrecta');
        }
      } else {
        setError('Usuario no encontrado');
      }
    } else {
      setError('No hay usuarios registrados');
    }
  };

  return (
    <div>
      <Navbar authToken={authToken} />
      <div className="FormLogin">
        <h2>Iniciar Sesión</h2>
        <form>
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
          <button onClick={handleLogin}>Iniciar Sesión</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
