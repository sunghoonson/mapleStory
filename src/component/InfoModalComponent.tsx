import React, { useState,useRef } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './css/InfoModalComponent.css?after';
//import { openModal,closeModal,toggleModal } from '../features/myModalSlice.ts';
import { openModal,closeModal } from '../features/myModalSlice.ts';
import Draggable from 'react-draggable';
import { RootState,InfoModalComponentProps } from './types';
import DetailModal from './DetailModalComponent.tsx'
import { HyperStatModal } from './HyperStatModalComponent.tsx';
import { fetchHyperStatData } from '../features/myApi/hyperStatSlice.ts'; // fetchHyperStatData 해당 위치에서 임포트
import { AppDispatch } from '../app/store.ts';

const ModalComponent: React.FC<InfoModalComponentProps> =() => {
  const dispatch = useDispatch();
  const dispatchType = useDispatch<AppDispatch>(); // AppDispatch 타입을 사용
  const { modals: { hyperstatmodal: hyperstatmodalisLoding } } = useSelector((state: RootState) => state.myModal);

  const draggableRef = useRef(null);

  // showDetail 상태와 상태를 설정하는 함수 setShowDetail을 추가합니다.
  const [showDetail, setShowDetail] = useState(false);
  
  const handleClose = () => {
    dispatch(closeModal({modalName: 'infomodal'}));
    dispatch(closeModal({modalName: 'hyperstatmodal'}));
  };

  const handleHyperStatClick = () => {
    if (hyperstatmodalisLoding) {
      dispatch(closeModal({ modalName: 'hyperstatmodal' }));
    } else {
      dispatch(openModal({ modalName: 'hyperstatmodal' }));
      dispatchType(fetchHyperStatData()).then(() => {
        // 데이터 로딩이 완료된 후 추가적인 상태 업데이트가 필요 없습니다.
      }).catch((error) => {
        console.error("Failed to fetch hyper stat data:", error);
      });
    }
  };
  
  function handleDetailClick() {
    setShowDetail(!showDetail); // 디테일 버튼 클릭 시 상태를 true로 변경하여 모달을 표시
    dispatch(closeModal({modalName: 'hyperstatmodal'}));
  }

  const { data, setItem } = useSelector((state: RootState) => state.myApi);
  const { setHyperStat } = useSelector((state: RootState) => state.hyperStat);
  //console.log(setItem)

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
          <div className='addmodal-container'>
            {hyperstatmodalisLoding  && <HyperStatModal data={setHyperStat}/>}
            {showDetail && <DetailModal data={setItem} onHyperStatClick={handleHyperStatClick}/>}
          </div>
        </div>
      </div>
      
    </Draggable>
  );
}

export default ModalComponent;
