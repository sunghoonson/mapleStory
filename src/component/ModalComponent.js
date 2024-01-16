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
    dispatch(closeModal());
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, dragItem);
    setItems(newItems);
  };
  
  const handleMouseEnter = (e, itemName) => {
    const item = items.find(item => item.item_name === itemName);
    console.log(item)
    setTooltip({
      ...item,
      posX: e.clientX,
      posY: e.clientY
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
               // 격자 번호를 아이템 데이터에 추가해야 합니다.
              // 예를 들면, item.gridArea = '1 / 3 / 1 / 4'와 같이 설정할 수 있습니다.
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
