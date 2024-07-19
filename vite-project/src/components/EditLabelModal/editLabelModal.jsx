import React, { useState } from 'react';
import '../EditLabelModal/modal.scss'
import { Button } from '@mui/material';

const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
<path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>

function EditLabelModal( {openModal ,setOpenModal, x , y, type} ) {
  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');

  const handleSaveChanges = () => {
    // Logic to save changes
    // console.log('Changes saved', { labelText, xPosition, yPosition, fontSize, fontWeight });

    handleCloseModal();
  };

  const handleCloseModal = () =>{ 
    setOpenModal(!openModal);
    console.log('modal status => ' +  openModal);
  }


  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Edit Label</h2>
        <Button onClick={handleCloseModal}> {crossIcon} </Button>
      </div>
      <div className="modal-content">
        <div className='input-div'>
          <p>Text</p>
          <input value={type} readOnly />
        </div>
        <div className='input-div'>
          <p>X</p>
          <input type="text" value={x}  readOnly/>
        </div>
        <div className='input-div'>
          <p>Y</p>
          <input type="text" value={y} readOnly/>
        </div>
        <div className='input-div'>
          <p>Font Size</p>
          <input type="text" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
        </div>
        <div className='input-div'>
          <p>Font Weight</p>
          <input type="text" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} />
        </div>
      </div>
      <button className='save-btn' onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}

export default EditLabelModal;
