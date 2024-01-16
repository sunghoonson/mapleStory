// Tooltip.js
import React from 'react';

function Tooltip({ tooltip, posX, posY }) {
  return (
    <div
      className="tooltip"
      style={{
        left: posX + 'px',
        top: (posY + 15) + 'px'
      }}
    >
      <p>{tooltip.item_name}</p>
      {/* 추가 정보를 여기에 표시 */}
    </div>
  );
}

export default Tooltip;
