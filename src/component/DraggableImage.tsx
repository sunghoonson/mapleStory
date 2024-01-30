import React from 'react';
import useDragDrop from '../utils/userDragDrop';
import { DraggableImageProps } from './types';

//const DraggableImage = ({ id, src, name, index, moveImage, handleClick }: DraggableImageProps) => {
  const DraggableImage = ({ id, src, name, index, handleClick }: DraggableImageProps) => {
  const dragDropRef = useDragDrop(id, index);

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
