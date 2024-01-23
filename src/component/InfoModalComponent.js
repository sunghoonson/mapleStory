import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './css/InfoModalComponent.css?after';
import './css/DetailModalComponent.css?after';
import { closeModal } from '../features/myModalSlice';
import Draggable from 'react-draggable';

function ModalComponent() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal({modalName: 'infomodal'}));
  };
  // showDetail 상태와 상태를 설정하는 함수 setShowDetail을 추가합니다.
  const [showDetail, setShowDetail] = useState(false);
  const handleDetailClick = () => {
    setShowDetail(!showDetail); // 디테일 버튼 클릭 시 상태를 true로 변경하여 모달을 표시
  };

  const { data,setItem} = useSelector((state) => state.myApi);
  console.log(setItem)
  return (
    
    <Draggable handle=".infomodal-header">
      <div className="infomodal">
        <div className="infomodal-inner">
          <div className="infomodal-header">
            <div className="infomodalcharacter-info">Character Info</div>
            <div><button onClick={handleClose}>X</button></div>
          </div>
          <div className="infomodal-content">
            <div className="infogrid-item1">
              {/* 첫 번째 영역의 내용 */}
            </div>
            <div className="infogrid-item2">
              {/* 두 번째 영역의 내용 */}
              <div className="character-level-box">Lv.<strong>{data.character_level}</strong></div>
              <div>{data.character_image && <img src={data.character_image} alt="Character" />}</div>
              <div className="character-name-box">{data.character_name}</div>
            </div>
            <div className="infogrid-item3">
              {/* 세 번째 영역의 내용 */}
            </div>
            <div>
              <div className="infomodal-detail-button" onClick={handleDetailClick}>DETAIL</div>
            </div>
          </div>
          {showDetail && <DetailModal data={setItem}/>}
        </div>
      </div>
    </Draggable>
  );
}

// 디테일 모달 컴포넌트
function DetailModal({ data }) {
  // 현재 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState(1);

  // 탭 클릭 핸들러
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  
  function addCommas(number) {
    // 숫자를 문자열로 변환
    const numStr = number.toString();
    
    // 소수점 분리 (정수 부분과 소수점 부분으로)
    const parts = numStr.split('.');

    // 정규 표현식을 사용하여 콤마 추가
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 정수 부분과 소수점 부분을 다시 합침
    return parts.join('.');
}

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
            <div className="flex-item">{data.detail.final_stat[42].stat_name}</div>
            <div className="flex-item">{addCommas(data.detail.final_stat[42].stat_value)}</div>
            <div className="flex-item">?</div>
          </div>
          <div className='stat-container'>
            <div>
              <div>{data.detail.final_stat[20].stat_name}</div>
              <div>{data.detail.final_stat[20].stat_value}</div>
            </div>
            <div>
              <div>{data.detail.final_stat[21].stat_name}</div>
              <div>{data.detail.final_stat[21].stat_value}</div>
            </div>
            <div>
              <div>{data.detail.final_stat[16].stat_name}</div>
              <div>{data.detail.final_stat[16].stat_value}</div>
            </div>
            <div>
              <div>{data.detail.final_stat[17].stat_name}</div>
              <div>{data.detail.final_stat[17].stat_value}</div>
            </div>
            <div>
              <div>{data.detail.final_stat[18].stat_name}</div>
              <div>{data.detail.final_stat[18].stat_value}</div>
            </div>
            <div>
              <div>{data.detail.final_stat[19].stat_name}</div>
              <div>{data.detail.final_stat[19].stat_value}</div>
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

export default ModalComponent;
