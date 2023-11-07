import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../App.css';
import '../../css/estilo.css';

// Componente del Footer
function Footer() {
  return (
    <footer>
      {/* <p>Tu pie de página aquí</p> */}
    </footer>
  );
}

// Componente principal
function App() {

  return (

    <div>
      {/* <Sidebar /> */}
      <div>
        {/* <Navbar authToken={authToken} /> */}
        <div className="dashboard">
          <Outlet /> {/* Área para el contenido dinámico */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
