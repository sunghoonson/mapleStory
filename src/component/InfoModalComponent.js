// ModalComponent.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './css/ModalComponent.css';
import { closeModal } from '../features/myModalSlice';

function ModalComponent() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal({modalName: 'infomodal'}));
  };

  return (
    
        <div className="modal">
          <div className="modal-inner">
            <div className="modal-header">
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="modal-content">
         
            </div>
          </div>
        </div>
  );
}

export default ModalComponent;
