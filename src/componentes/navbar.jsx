import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate(); 

  return (
    <div className="navbar">
      <Button 
        icon="pi pi-bars" 
        onClick={() => setVisible(true)} 
        className="p-button-text p-button-plain" 
        style={{ fontSize: '2em' }} 
      />

      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <Button 
          label="Inicio" 
          onClick={() => {
            navigate('/'); 
            setVisible(false); 
          }} 
          className="p-button-text" 
          style={{ width: '100%' }} 
        />
      </Sidebar>
    </div>
  );
}

export default Navbar;
