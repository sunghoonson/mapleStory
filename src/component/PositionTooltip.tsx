import React from 'react';
import ReactDOM from 'react-dom';

const PositionTooltip = ({ children, x, y, visible, onHide }: {
  children: React.ReactNode,
  x: number,
  y: number,
  visible: boolean,
  onHide: () => void
}) => {
  if (!visible) return null;

  const style: React.CSSProperties = {
    position: 'fixed',
    top: y,
    left: x,
    zIndex: 1000,
    backgroundColor: 'white', // 배경색 추가
    border: '1px solid #ddd', // 테두리 추가
    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)', // 그림자 추가
    padding: '8px 12px', // 내부 패딩 추가
    borderRadius: '4px', // 모서리 둥글게
    color: 'black', // 텍스트 색상
    maxWidth: '200px', // 최대 너비 설정
    wordWrap: 'break-word', // 긴 텍스트 처리
  };

  const tooltipElement = (
    <div style={style} onClick={onHide}>
      {children}
    </div>
  );

  return ReactDOM.createPortal(
    tooltipElement, 
    document.getElementById('portal-root') as Element // null 체크를 우회
  );
};

export default PositionTooltip;
