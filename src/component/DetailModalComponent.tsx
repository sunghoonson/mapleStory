import React, { useState } from 'react';
import './css/DetailModalComponent.css?after';
import { DetailModalProps } from './types';

// 디테일 모달 컴포넌트
export function DetailModal({ data }: DetailModalProps) {
  // 현재 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: number) => { //탭 클릭 핸들러
    setActiveTab(tabNumber);
  };

  const addCommas = (number?: number): string => {
    if (number === undefined) return ""; // 또는 적절한 기본값 반환
    // 숫자를 문자열로 변환
    const numStr = number.toString();
    // 소수점 분리
    const parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

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
            <div>
              <div>{data?.detail.final_stat[20].stat_name}</div>
              <div>{data?.detail.final_stat[20].stat_value}</div>
            </div>
            <div>
              <div>{data?.detail.final_stat[21].stat_name}</div>
              <div>{data?.detail.final_stat[21].stat_value}</div>
            </div>
            <div>
              <div>{data?.detail.final_stat[16].stat_name}</div>
              <div>{data?.detail.final_stat[16].stat_value}</div>
            </div>
            <div>
              <div>{data?.detail.final_stat[17].stat_name}</div>
              <div>{data?.detail.final_stat[17].stat_value}</div>
            </div>
            <div>
              <div>{data?.detail.final_stat[18].stat_name}</div>
              <div>{data?.detail.final_stat[18].stat_value}</div>
            </div>
            <div>
              <div>{data?.detail.final_stat[19].stat_name}</div>
              <div>{data?.detail.final_stat[19].stat_value}</div>
            </div>
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

