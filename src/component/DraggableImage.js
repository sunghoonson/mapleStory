// DraggableImage.js
import React from 'react';
import useDragDrop from '../utils/userDragDrop';

function DraggableImage({ id, src, name, index, moveImage,handleClick }) {
  const dragDropRef = useDragDrop(id, index, moveImage);

  return (
    <div 
      ref={dragDropRef}
      onClick={() => handleClick(name)} // 마우스 이벤트 대신 클릭 이벤트 사용
      className="draggable-item">
      <img src={src} alt={name} />
    </div>
  );
}

export default DraggableImage;
