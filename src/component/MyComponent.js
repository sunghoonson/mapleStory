import React, { useState } from 'react'; // useState를 React에서 임포트
import { useSelector, useDispatch } from 'react-redux'; // useSelector와 useDispatch를 react-redux에서 임포트
import { fetchCharacterData } from '../features/myApi/myApiSlice'; // fetchCharacter를 해당 위치에서 임포트
import './css/MyComponent.css'; // CSS 파일을 임포트
import ModalComponent from './ModalComponent';
import { openModal } from '../features/myModalSlice'; // openModal을 임포트
import { fetchItemData } from '../features/myApi/myApiSlice';

function MyComponent() {

  const isModalOpen = useSelector(state => state.myModal.isOpen);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.myApi);
  const [characterName, setCharacterName] = useState('');
  const ocid = useSelector(state => state.myApi.ocid);
  const itemData = useSelector(state => state.myApi.item); // API를 통해 가져온 데이터
  const isLoading = useSelector(state => state.myApi.loading); // 로딩 상태 확인

  const handleOpenModal = () => {
    dispatch(openModal());
    if (ocid) {
      dispatch(fetchItemData());
    }
  };

  const handleInputChange = (e) => {
    setCharacterName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // HTML의 submit 관련 고유 동작 중단시키기
    if (characterName) {
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
          <div><strong>Date:</strong> {data.date}</div>
          <div><strong>Name:</strong> {data.character_name}</div>
          <div><strong>World:</strong> {data.world_name}<button type="button" onClick={handleOpenModal}>아이템 창
            </button>{isModalOpen && <ModalComponent itemData={itemData}/>}
                    {isModalOpen && isLoading && <div>로딩 중...</div>}
          </div>
          <div><strong>Gender:</strong> {data.character_gender}</div>
          <div><strong>Class:</strong> {data.character_class} (Level: {data.character_class_level})</div>
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
