import React, { useState } from 'react'; // useState를 React에서 임포트
import { useSelector, useDispatch } from 'react-redux'; // useSelector와 useDispatch를 react-redux에서 임포트
import { fetchCharacterData } from '../features/myApi/myApiSlice.tsx'; // fetchCharacter를 해당 위치에서 임포트
import './css/MyComponent.css'; // CSS 파일을 임포트
import ModalComponent from './ModalComponent.tsx';
import InfoModalComponent from './InfoModalComponent.tsx';
import { openModal } from '../features/myModalSlice.js'; // openModal을 임포트
import { fetchItemData,fetchItemSet_EffectData } from '../features/myApi/myApiSlice.tsx';
import {RootState} from './types';
import { AppDispatch } from '../app/store.ts';

function MyComponent() {
  // useDispatch, useSelector 사용
  const dispatch = useDispatch<AppDispatch>(); // AppDispatch 타입을 사용
  const { data, loading, error, item: itemData, ocid } = useSelector((state: RootState) => state.myApi);
  const { modals: { modal: isModalOpen, infomodal: isInfoModalOpen } } = useSelector((state: RootState) => state.myModal);
  const [characterName, setCharacterName] = useState('');
  const isLoading = useSelector((state: RootState) => state.myApi.loading); // RootState 타입을 사용

  const handleOpenModal = () => {
    dispatch(openModal({modalName: 'modal'}));
    if (ocid) {
      dispatch(fetchItemData());
    }
  };
  const handleOpenInfoModal = () => {
    dispatch(openModal({ modalName: 'infomodal' }));
    if (ocid) {
      // 필요한 경우 다른 액션을 디스패치
      dispatch(fetchItemSet_EffectData());
    }
  };
  const handleInputChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (characterName) {
      // 문자열 인자를 직접 전달
      dispatch(fetchCharacterData(characterName)); 
    }
  };

  if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={characterName}
          onChange={handleInputChange}
          placeholder="Enter character name"
        />
        <button type="submit">Fetch Character</button>
      </form>
      
      {error && <p>Error: {error}</p>} {/* 에러 메시지 조건부 렌더링 */}

      {data && (
        <div>
          <h3>Character Information</h3>
          {/* <div><strong>Date:</strong> {data.date}</div> */}
          <div><strong>Name:</strong> {data.character_name}<button type="button" onClick={handleOpenInfoModal}>캐릭터 정보
            </button>{isInfoModalOpen && <InfoModalComponent ocid={ocid}/>}
                    {isInfoModalOpen && isLoading && <div>로딩 중...</div>}
          </div>
          <div><strong>World:</strong> {data.world_name}<button type="button" onClick={handleOpenModal}>아이템 창
            </button>{isModalOpen && <ModalComponent itemData={itemData}/>}
                    {isModalOpen && isLoading && <div>로딩 중...</div>}
          </div>
          {/* <div><strong>Gender:</strong> {data.character_gender}</div> */}
          <div><strong>Class:</strong> {data.character_class} (Class_Level: {data.character_class_level})</div>
          <div><strong>Level:</strong> {data.character_level}</div>
          <div><strong>Exdiverience:</strong> {data.character_exp} (Rate: {data.character_exp_rate}%)</div>
          <div><strong>Guild:</strong> {data.character_guild_name}</div>
          {data.character_image && <img src={data.character_image} alt="Character" />}
        </div>
      )}
    </div>
  );
}

export default MyComponent;
