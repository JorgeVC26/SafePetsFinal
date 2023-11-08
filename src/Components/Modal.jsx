import {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'
import '../Style/style.css';

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarServicio,
    servicioEditar,
    setServicioEditar,
}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')
    const [estado, setEstado] = useState('Pendiente');
    const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
    const usuarioActivoName = usuarioActivo[0].name;

    // FALTA AGREGAR NUMERO DE TELEFONO AL EDITAR
    useEffect(() => {
        if(Object.keys(servicioEditar).length > 0) {
            setNombre(servicioEditar.nombre)
            setPrecio(servicioEditar.precio)
            setUbicacion(servicioEditar.ubicacion)
            setCategoria(servicioEditar.categoria)
            setId(servicioEditar.id)
            setFecha(servicioEditar.fecha)
          }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setServicioEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if([nombre, precio, ubicacion, categoria].includes('')) {
            setMensaje('Todos los Campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }

        //FALTA TELEFONO
        guardarServicio({nombre, precio, ubicacion, categoria, id, fecha, estado, usuarioActivoName})

        
    }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
        src={CerrarBtn} 
        lt="cerrar modal" 
        onClick={ocultarModal}
        />
      </div>
      
      <form 
      onSubmit={handleSubmit}
      className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
        <legend>{servicioEditar.nombre ? 'Editar Servicio' : 'Nuevo Servicio'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className='campo'>
            <label htmlFor="nombre">Nombre Colaborador</label>

            <input 
            id="nombre"
            type="text"
            placeholder="Añade el nombre del colaborador"
            value={nombre}
            onChange={ e => setNombre(e.target.value)}
            />
        </div>

        <div className='campo'>
            <label htmlFor="precio">Precio</label>

            <input 
            id="precio"
            type="number"
            placeholder="Indica el precio por hora"
            value={precio}
            onChange={ e => setPrecio(Number(e.target.value))}
            />
        </div>

        <div className='campo'>
            <label htmlFor="ubicacion">Ubicación</label>

            <input 
            id="ubicacion"
            type="text"
            placeholder="Zona donde ofrece el servicio"
            value={ubicacion}
            onChange={ e => setUbicacion(e.target.value)}
            />
        </div>

        <div className='campo'>
            <label htmlFor="categoria">Tipo de Servicio</label>

            <select 
            name="" 
            id="categoria"
            value={categoria}
            onChange={ e => setCategoria(e.target.value)}
            >
                <option value="">-- Seleccione --</option>
                <option value="paseo">Paseo</option>
                <option value="higiene">Higiene y Estética</option>
                <option value="cuido">Cuidado completo</option>
                <option value="restaurante">Restaurante</option>
            </select>

            <input style={{borderRadius: '1rem'}}
            type="submit"
            value={servicioEditar.nombre ? 'Guardar Cambios' : 'Agregar Servicio'}
            />

           
        </div>
      </form>
    </div>
  )
}

export default Modal
