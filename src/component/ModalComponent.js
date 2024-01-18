// ModalComponent.js
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/myModalSlice';
import './css/ModalComponent.css';
import DraggableImage from './DraggableImage';
import Tooltip from './Tooltip';

function ModalComponent({ itemData }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState(itemData.item_equipment);
  const [tooltip, setTooltip] = useState(null);

  const handleClose = () => {
    dispatch(closeModal({modalName: 'modal'}));
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const dragItem = {...newItems[dragIndex]};
    const hoverItem = {...newItems[hoverIndex]};
  
    // gridArea 속성 교환
    const tempGridArea = dragItem.gridArea;
    dragItem.gridArea = hoverItem.gridArea;
    hoverItem.gridArea = tempGridArea;
  
    // 아이템 위치 변경
    newItems[dragIndex] = hoverItem;
    newItems[hoverIndex] = dragItem;
  
    // 상태 업데이트
    setItems(newItems);
  };
  
  
  
  const handleMouseEnter = (e, itemName) => {
    const item = items.find(item => item.item_name === itemName);
    const modal = document.querySelector('.modal'); // 모달 요소 선택
    const modalRect = modal.getBoundingClientRect(); // 모달의 위치 및 크기 정보
    console.log(item)
    setTooltip({
      ...item,
      posX: e.clientX - modalRect.left,
      posY: e.clientY - modalRect.top
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Draggable handle=".modal-header">
        <div className="modal">
          <div className="modal-inner">
            <div className="modal-header">
              <button onClick={handleClose}>Close</button>
            </div>
            <div className="modal-content">
              {items.map((item, index) => {
              const style = { gridArea: item.gridArea || 'auto' }; // gridArea가 없다면 'auto' 사용
              return (
                <div key={item.id} className="item-container" style={style}>
                  <DraggableImage
                    id={item.id}
                    src={item.item_icon}
                    name={item.item_name}
                    index={index}
                    moveImage={moveImage}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                  />
                  <div className="item-label">{item.item_equipment_slot}</div> {/* 아이템 이름 라벨 추가 */}
                </div>
              )})}
              {tooltip && (
                <Tooltip
                  tooltip={tooltip}
                  posX={tooltip.posX}
                  posY={tooltip.posY}
                />
              )}
            </div>
          </div>
        </div>
      </Draggable>
    </DndProvider>
  );
}

export default ModalComponent;
