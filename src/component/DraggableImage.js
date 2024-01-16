// DraggableImage.js
import React from 'react';
import useDragDrop from '../utils/userDragDrop';

function DraggableImage({ id, src, name, index, moveImage, handleMouseEnter, handleMouseLeave }) {
  const dragDropRef = useDragDrop(id, index, moveImage);

  return (
    <div 
      ref={dragDropRef}
      onMouseEnter={(e) => handleMouseEnter(e, name)}
      onMouseLeave={handleMouseLeave} 
      className="draggable-item">
      <img src={src} alt={name} />
    </div>
  );
}

export default DraggableImage;
