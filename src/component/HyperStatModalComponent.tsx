import React from 'react';
import { useDispatch } from 'react-redux';
import './css/HyperStatModalComponent.css?after';
import { HyperStatModalProps } from './types';
import { closeModal } from '../features/myModalSlice.ts';

// 하이퍼스탯 모달 컴포넌트
export function HyperStatModal({ data }: HyperStatModalProps) {
console.log(data)
const dispatch = useDispatch();
const handleClose = () => {
  dispatch(closeModal({modalName: 'hyperstatmodal'}));
};

const desiredHyperStatName = ["STR","DEX","INT","LUK","HP","MP","DF/TF/PP","크리티컬 확률"
                              ,"크리티컬 데미지","방어율 무시","데미지","보스 몬스터 공격 시 데미지 증가"
                              ,"상태 이상 내성","공격력/마력","획득 경험치","아케인 포스","일반 몬스터 공격 시 데미지 증가"]
// 스탯 표시 컴포넌트
const HyperStatDisplay = ({ stat }) => (
  <div>
    <div>{stat.stat_type}</div>
    <div>{stat.stat_level}</div>
  </div>
);
return (
    <div className="hyperstat-modal">
       <div className="hyperstat-header">
        <div className="hyperstatmodaltext-info">Hyper Stat</div>
        <div><button onClick={handleClose}>X</button></div>
      </div>
      <div>
        <div className='hyperstat-container'>
          {
            desiredHyperStatName
            .map(statName => 
              data?.hyper_stat_preset_1.find(stat => stat.stat_type === statName))
            .map((stat, index) => {
              if (stat) {
                return <HyperStatDisplay key={index} stat={stat} />;
              }
              return null;
            })
            }
        </div>
      </div>
    </div>
  );
}

