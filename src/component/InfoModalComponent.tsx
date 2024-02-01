import React, { useState,useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './css/InfoModalComponent.css?after';
import { closeModal } from '../features/myModalSlice.ts';
import Draggable from 'react-draggable';
import { RootState,InfoModalComponentProps  } from './types';
import DetailModal from './DetailModalComponent.tsx'
import { HyperStatModal } from './HyperStatModalComponent.tsx';
import { fetchHyperStatData } from '../features/myApi/hyperStatSlice.ts'; // fetchHyperStatData 해당 위치에서 임포트
import { AppDispatch } from '../app/store.ts';

const ModalComponent: React.FC<InfoModalComponentProps> =() => {
  const dispatch = useDispatch();
  const dispatchType = useDispatch<AppDispatch>(); // AppDispatch 타입을 사용

  const draggableRef = useRef(null);
  const handleClose = () => {
    dispatch(closeModal({modalName: 'infomodal'}));
  };
  // showDetail 상태와 상태를 설정하는 함수 setShowDetail을 추가합니다.
  const [showDetail, setShowDetail] = useState(false);
  const [showHyperStat, setShowHyperStat] = useState(false);

  const handleHyperStatClick = () => {
    // `fetchHyperStatData`가 promise를 반환하도록 가정
    dispatchType(fetchHyperStatData()).then(() => {
      // 데이터 로딩이 완료된 후 상태 업데이트
      setShowHyperStat(!showHyperStat);
    }).catch((error) => {
      // 오류 처리 (필요한 경우)
      console.error("Failed to fetch hyper stat data:", error);
    });
  };

  function handleDetailClick() {
    setShowDetail(!showDetail); // 디테일 버튼 클릭 시 상태를 true로 변경하여 모달을 표시
  }

  const { data, setItem } = useSelector((state: RootState) => state.myApi);
  const { setHyperStat } = useSelector((state: RootState) => state.hyperStat);
  console.log(setItem)

  return (
    <Draggable handle=".infomodal-header" cancel='button' nodeRef={draggableRef}>
      <div className="infomodal" ref={draggableRef}>
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
          {showDetail && <DetailModal data={setItem} onHyperStatClick={handleHyperStatClick}/>}
          {showHyperStat && <HyperStatModal data={setHyperStat}/>}
        </div>
      </div>
    </Draggable>
  );
}

export default ModalComponent;
