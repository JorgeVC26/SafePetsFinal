import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EditarUsuario() {
    const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;
  
    const { id } = useParams(); // Obtén el ID del usuario desde los parámetros de la URL
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
    const [newRole, setNewRole] = useState(''); // Estado para el nuevo rol
    const [newEmail, setNewEmail] = useState(''); // Estado para el nuevo email
    const [newName, setNewName] = useState(''); // Estado para el nuevo nombre
    const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
    const navigate = useNavigate();

    useEffect(() => {
        // Obtén los datos del usuario desde el Local Storage
        const users = JSON.parse(localStorage.getItem('users'));

        // Busca el usuario con el ID correspondiente
        const userToEdit = users.find(user => user.id === parseInt(id, 10));
        console.log(userToEdit.role);
        if(userToEdit.role === "superadmin" && rol === "admin"){
            alert('No tienes permisos para editar un superamin.');
            navigate('/usuarios');

        }else if(userToEdit.role === "superadmin" && rol === "superadmin"){
            setUser(userToEdit);
            setNewEmail(userToEdit.email); // Establece el email actual como valor inicial
            setNewName(userToEdit.name); // Establece el nombre actual como valor inicial
        }
        if (userToEdit) {
            setUser(userToEdit);
            setNewEmail(userToEdit.email); // Establece el email actual como valor inicial
            setNewName(userToEdit.name); // Establece el nombre actual como valor inicial
        }
    }, [id]);

    const handleReturn = () => {
        navigate('/usuarios');
    };

    const handleSave = () => {
        // Obtén los datos del usuario actualizados
        const updatedUser = user;

        // Actualiza el rol si se ha seleccionado uno nuevo
        if (newRole) {
            updatedUser.role = newRole;
        }

        // Actualiza el correo si se ha ingresado uno nuevo
        if (newEmail) {
            updatedUser.email = newEmail;
        }

        // Actualiza el nombre si se ha ingresado uno nuevo
        if (newName) {
            updatedUser.name = newName;
        }

        // Actualiza la contraseña si se ha ingresado una nueva
        if (newPassword) {
            updatedUser.password = newPassword;
        }

        // Obtén la lista de usuarios desde el Local Storage
        const users = JSON.parse(localStorage.getItem('users'));

        // Encuentra y actualiza al usuario en la lista
        const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));

        // Guarda la lista actualizada en el Local Storage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Redirige a la página de lista de usuarios o a donde desees
        navigate('/usuarios');
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
        <div className='container_add'>

            <div className="card">
                <div className="card-header">
                    <h2>Editar Usuario</h2>
                </div>
                <div className="card-content">
                    {user ? (
                        <form>
                            <label>Nombre:</label>
                            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            <label>Email:</label>
                            <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                            <label>Rol:</label>
                            <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                                <option value="">No Cambiar Rol</option>
                                <option value="superadmin">Super Admin</option>
                                <option value="admin">Administrador</option>
                                <option value="usuario">Usuario</option>
                            </select>
                            <label>Contraseña:</label>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <button onClick={handleSave} className="green-button">Actualizar</button>
                            <button onClick={handleReturn} className="green-button">Regresar</button>
                        </form>
                    ) : (
                        <p>Usuario no encontrado</p>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default EditarUsuario;
