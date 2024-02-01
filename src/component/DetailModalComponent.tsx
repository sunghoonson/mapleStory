import React, { useState} from 'react';
import './css/DetailModalComponent.css?after';
import { DetailModalProps } from './types';

// DetailModal 컴포넌트 정의
// `DetailModalProps & { onHyperStatClick: () => void }`는 props의 타입을 정의합니다.
// 이 타입은 DetailModalProps 타입에 onHyperStatClick 함수를 추가한 것입니다.
const DetailModal: React.FC<DetailModalProps & { onHyperStatClick: () => void }> = ({ data, onHyperStatClick }) => {
  const [activeTab, setActiveTab] = useState(1);
  
  // 탭 클릭 핸들러
  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  // 숫자에 콤마 추가하는 함수
  const addCommas = (number?: number): string => {
    if (number === undefined) return "";
    const numStr = number.toString();
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  // 스탯 표시 컴포넌트
  const StatDisplay = ({ stat }) => (
    <div>
      <div>{stat.stat_name}</div>
      <div>{stat.stat_value}</div>
    </div>
  );

  // 원하는 스탯 이름 배열
  const desiredStatName = ["HP","MP","STR","DEX","INT","LUK"]
  const desiredStatMiddleName = ["최대 스탯공격력","데미지","최종 데미지","보스 몬스터 데미지","방어율 무시","일반 몬스터 데미지",
                                "공격력","크리티컬 확률","마력","크리티컬 데미지","재사용 대기시간 감소","버프 지속 시간","재사용 대기시간 미적용"
                                ,"속성 내성 무시","상태이상 추가 데미지","무기 숙련도"]
  const desiredStatLowName = ["메소 획득량","스타포스","아이템 드롭률","아케인포스","추가 경험치 획득","어센틱포스"]

return (
    <div className="detail-modal">
      <div className="tabs">
        <button onClick={() => handleTabClick(1)}>Tab 1</button>
        <button onClick={() => handleTabClick(2)}>Tab 2</button>
        <button onClick={() => handleTabClick(3)}>Tab 3</button>
        <button onClick={() => handleTabClick(4)}>Tab 4</button>
        <button onClick={() => handleTabClick(5)}>Tab 5</button>
      </div>
      <div className="tab-content">
        {activeTab === 1 && 
        <div>
          <div className="flex-container">
            <div className="flex-item">{data?.detail.final_stat[42].stat_name}</div>
            <div className="flex-item">{addCommas(data?.detail.final_stat[42].stat_value)}</div>
            <div className="flex-item">?</div>
          </div>
          <div className='stat-container'>
            {
             desiredStatName
             .map(statName => 
               data?.detail.final_stat.find(stat => stat.stat_name === statName))
             .map((stat, index) => {
               if (stat) {
                 return <StatDisplay key={index} stat={stat} />;
               }
               return null;
             })
            }
          </div>
          <div className='stat-middle-container'>
          {
             desiredStatMiddleName
             .map(statName => 
               data?.detail.final_stat.find(stat => stat.stat_name === statName))
             .map((stat, index) => {
               if (stat) {
                 return <StatDisplay key={index} stat={stat} />;
               }
               return null;
             })
            }
          </div>
          <div className='stat-low-container'>
          {
             desiredStatLowName
             .map(statName => 
               data?.detail.final_stat.find(stat => stat.stat_name === statName))
             .map((stat, index) => {
               if (stat) {
                 return <StatDisplay key={index} stat={stat} />;
               }
               return null;
             })
            }
          </div>
          <div>
            <button onClick={onHyperStatClick}>하이퍼 스텟</button>
            <button onClick={() => handleTabClick(1)}>어빌리티</button>
          </div>
        </div>}
        {activeTab === 2 && <div>Content for Tab 2</div>}
        {activeTab === 3 && <div>Content for Tab 3</div>}
        {activeTab === 4 && <div>Content for Tab 4</div>}
        {activeTab === 5 && <div>Content for Tab 5</div>}
      </div>
    </div>
    
  );
}

export default DetailModal;