
import './Style/style.css';

function MensajeLogout({ onConfirm, onCancel }) {
    return (
      <div className="confirmation-popup">
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        <div className="button-container">
          <button className="confirm-button" onClick={onConfirm}>Confirmar</button>
          <button className="cancel-button" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    );
  }

export default MensajeLogout;