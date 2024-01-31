import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './css/InfoModalComponent.css?after';
import { closeModal } from '../features/myModalSlice.ts';
import Draggable from 'react-draggable';
import { RootState,InfoModalComponentProps  } from './types';
import { DetailModal } from './DetailModalComponent.tsx'

const ModalComponent: React.FC<InfoModalComponentProps> =({ocid}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal({modalName: 'infomodal'}));
  };
  // showDetail 상태와 상태를 설정하는 함수 setShowDetail을 추가합니다.
  const [showDetail, setShowDetail] = useState(false);
  const handleDetailClick = () => {
    setShowDetail(!showDetail); // 디테일 버튼 클릭 시 상태를 true로 변경하여 모달을 표시
  };

  const { data, setItem } = useSelector((state: RootState) => state.myApi);
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
              <div className="character-level-box">Lv.<strong>{data?.character_level}</strong></div>
              <div>{data?.character_image && <img src={data.character_image} alt="Character" />}</div>
              <div className="character-name-box">{data?.character_name}</div>
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

export default ModalComponent;
