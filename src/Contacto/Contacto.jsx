import { useState, useRef } from 'react';
import './contacto.css'

import emailjs from "@emailjs/browser"

const Contacto = () => {
    const refForm = useRef();
    
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [motivo, setMotivo] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(refForm.current);
      // Aquí puedes realizar la lógica para enviar los datos del formulario, como una solicitud HTTP a un servidor o cualquier otra acción requerida.
      // Puedes acceder a los valores de nombre, correo, telefono y motivo utilizando las variables de estado correspondientes.
    const serviceId = "service_157jmkn";
    const templateId = "template_4e9od6d";

    const apiKey = "oIEKB1nZ_-C3IEobH";

    emailjs.sendForm(serviceId, templateId, refForm.current, apiKey)
    .then( (result) => {
        console.log (result.text);
        setNombre('');
        setCorreo('');
        setTelefono('');
        setMotivo('');
    })
    .catch(error => console.error(error))
    };
  
    return (
        <div className="contacto__container">
          <div className="contacto__info">
          <div className="linea__superior">
                Formulario de Contacto
           </div>
          </div>
          <div className="formulario-contacto">
            <form ref={refForm} action='' onSubmit={handleSubmit}>
              <div className="campo">
                <label htmlFor="nombre">Nombre Completo:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
    
              <div className="campo">
                <label htmlFor="correo">Correo:</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
    
              <div className="campo">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
    
              <div className="campo">
                <label htmlFor="motivo">Motivo:</label>
                <textarea
                  id="motivo"
                  name="motivo"
                  rows="4"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                ></textarea>
              </div>
    
              <button className='btn__send'>Enviar</button>
            </form>
          </div>
        </div>
  );
};
  
  export default Contacto;
