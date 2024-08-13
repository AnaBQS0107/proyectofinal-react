import React from 'react';
import '../css/CustomModal.css'; // Asegúrate de que la ruta sea correcta

const CustomModal = ({ isVisible, onClose, imageSrc }) => {
    if (!isVisible) return null;

    return (
        <div className="custom-modal">
            <button className="custom-modal-close" onClick={onClose}>×</button>
            <div className="custom-modal-content">
                {imageSrc && <img src={imageSrc} alt="Vista Previa" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
            </div>
        </div>
    );
};

export default CustomModal;
