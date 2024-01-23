// ModalComponent.js
import React, { useState,useEffect } from 'react';
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

  const handleClick = (itemName) => {
    const item = items.find(item => item.item_name === itemName);
    setTooltip(item); // 클릭된 아이템의 정보로 툴팁 설정
  };

  const handleCloseTooltip = () => {
    setTooltip(null); // 툴팁 닫기
  };

  useEffect(() => {
    // Escape 키 이벤트 핸들러
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseTooltip();
      }
    };

    // 모달 밖 클릭 이벤트 핸들러
    const handleClickOutside = (e) => {
      if (!e.target.closest('.modal-content') && tooltip) {
        handleCloseTooltip();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    // 클린업 함수
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tooltip]); // 의존성 배열에 tooltip 추가

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
                <div key={item.id} className="item-container" style={style} onClick={() => handleClick(item.item_name)}>
                  <DraggableImage
                    id={item.id}
                    src={item.item_icon}
                    name={item.item_name}
                    index={index}
                    moveImage={moveImage}
                    handleClick={handleClick} // Make sure the prop is named correctly
                  />
                  <div className="item-label">{item.item_equipment_slot}</div> {/* 아이템 이름 라벨 추가 */}
                </div>
              )})}
              {tooltip && (
                <Tooltip
                  tooltip={tooltip}
                  // posX={tooltip.posX}
                  // posY={tooltip.posY}
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
