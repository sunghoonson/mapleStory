import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './css/InfoModalComponent.css';
import { closeModal } from '../features/myModalSlice';
import Draggable from 'react-draggable';

function ModalComponent() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal({modalName: 'infomodal'}));
  };

  return (
    
    <Draggable handle=".infomodal-header">
      <div className="infomodal">
        <div className="infomodal-inner">
          <div className="infomodal-header">
            <div className="infomodalcharacter-info">Character Info</div>
            <div><button onClick={handleClose}>X</button></div>
          </div>
          <div className="infomodal-content">
          <div className="infogrid-item1">
            {/* 첫 번째 영역의 내용 */}
          </div>
          <div className="infogrid-item2">
            {/* 두 번째 영역의 내용 */}
          </div>
          <div className="infogrid-item3">
            {/* 세 번째 영역의 내용 */}
          </div>
          </div>
        </div>
      </div>
    </Draggable>
    
  );
}

export default ModalComponent;
