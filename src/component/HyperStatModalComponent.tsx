import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import './css/HyperStatModalComponent.css?after';
import { HyperStatModalProps } from './types';
import { closeModal } from '../features/myModalSlice.ts';
import PositionTooltip from './PositionTooltip.tsx'; // Tooltip 컴포넌트 경로에 맞게 조정
import { showTooltip, hideTooltip } from '../features/myApi/tooltipSlice.ts';
import { RootState } from '../app/store.ts'; // 경로는 실제 구조에 맞게 조정

// 스탯 표시 컴포넌트
const HyperStatDisplay = ({ stat }) => {
  const dispatch = useDispatch();
  const tooltip = useSelector((state: RootState) => state.tooltip);

  // HyperStatDisplay 컴포넌트 내의 handleClick 함수
  const handleClick = (event) => {
    if (!stat.stat_increase) {
      // stat.stat_increase가 유효하지 않으면 툴팁을 숨김
      dispatch(hideTooltip());
      return; // 함수 종료
    }
  
    const { pageX, pageY } = event;
    if (tooltip.isVisible && tooltip.content === stat.stat_increase) {
      // Tooltip이 이미 보이는 상태이고, 같은 내용을 클릭한 경우
      dispatch(hideTooltip());
    } else {
      // 다른 내용을 클릭했거나 Tooltip이 보이지 않는 경우
      dispatch(showTooltip({
        x: pageX,
        y: pageY,
        content: stat.stat_increase
      }));
    }
  };
  

  return (
    <div>
      <div onClick={handleClick}>{stat.stat_type}</div>
      <div>{stat.stat_level}</div>
      {stat.stat_increase && (
        <PositionTooltip
          x={tooltip.x}
          y={tooltip.y}
          visible={tooltip.isVisible} // 수정: tooltip.visible -> tooltip.isVisible
          onHide={hideTooltip}
        >
          <div className='stat_increase_box'>
            <div className='stat_increase'>{tooltip.content}</div>
          </div>
        </PositionTooltip>
      )}
    </div>
  );
};

// 하이퍼스탯 모달 컴포넌트
export function HyperStatModal({ data }: HyperStatModalProps) {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    dispatch(closeModal({modalName: 'hyperstatmodal'}));
  };

  const [selectedPreset, setSelectedPreset] = useState('hyper_stat_preset_1');
  const desiredHyperStatName = ["STR","DEX","INT","LUK","HP","MP","DF/TF/PP","크리티컬 확률",
                                "크리티컬 데미지","방어율 무시","데미지","보스 몬스터 공격 시 데미지 증가",
                                "상태 이상 내성","공격력/마력","획득 경험치","아케인 포스","일반 몬스터 공격 시 데미지 증가"];

  useEffect(() => {
    // 모달 영역 밖 클릭을 감지하는 함수
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        dispatch(hideTooltip());
      }
    }

    // 전역 클릭 이벤트 리스너 등록
    document.addEventListener('click', handleClickOutside);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dispatch]); // dispatch를 의존성 배열에 추가
                              
  return (
    <div className="hyperstat-modal" ref={modalRef}>
      <div className="hyperstat-header">
        <div className="hyperstatmodaltext-info">Hyper Stat</div>
        <div><button onClick={handleClose}>X</button></div>
      </div>
      <div className='hyperstat-container'>
        {
          desiredHyperStatName
            .map(statName => data?.[selectedPreset].find(stat => stat.stat_type === statName))
            .map((stat, index) => {
              if (stat) {
                return <HyperStatDisplay key={index} stat={stat} />;
              }
              return null;
            })
        }
      </div>
      <div className='tabs'>
        <button onClick={() => setSelectedPreset('hyper_stat_preset_1')}>1</button>
        <button onClick={() => setSelectedPreset('hyper_stat_preset_2')}>2</button>
        <button onClick={() => setSelectedPreset('hyper_stat_preset_3')}>3</button>
      </div>
    </div>
  );
}
