// features/myApi/myApiSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharacterId, fetchCharacterData as fetchCharacterDetails,fetchItemData as fetchItemApi, fetchItemSet_EffectData as fetchItemSetEffectData, fetchCharacterStat } from './mapleStoryApi.js';

//어제 날짜 가져오기
const getYesterdayDate = () => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1); // 하루를 빼줌

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
  const day = String(yesterday.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
// 이 함수를 사용하여 어제 날짜를 얻고 API 요청에 사용
const yesterdayDate = getYesterdayDate();

export const fetchCharacterData = createAsyncThunk(
  'myApi/fetchCharacterData',
  async (characterName, { dispatch }) => {
    try {
      const data1 = await fetchCharacterId(characterName);
      console.log("First Response:", data1);

      if (data1 && data1.ocid) {
        dispatch(setOcid(data1.ocid));

        const data2 = await fetchCharacterDetails(data1.ocid, yesterdayDate);
        console.log("Second Response:", data2);  
        return data2;
      } else {
        throw new Error("Invalid ocid or no ocid in first response");
      }
    } catch (error) {
      throw error;
    }
  }
);

export const fetchItemSet_EffectData = createAsyncThunk(
  'myApi/fetchItemSet_EffectData',
  async (_, { getState }) => {
    try {
      const state = getState();
      const ocid = state.myApi.ocid;
      const data = await fetchItemSetEffectData(ocid, getYesterdayDate());
      const data2 = await fetchCharacterStat(ocid, getYesterdayDate());
      // 객체를 사용하여 데이터를 묶습니다.
      const mergeData = {
        set: data,    // 'set' 키에 data 할당
        detail: data2 // 'detail' 키에 data2 할당
      };
      if (mergeData) {
        console.log(mergeData)
        return mergeData;
      } else {
        throw new Error("Invalid ocid or no ocid in first response");
      }
    } catch (error) {
      throw error;
    }
  }
);

function calculateGridArea(itemSlot) {
  const gridAreaMap = {
    '반지4': "1 / 1 / 1 / 2",
    '반지3': "2 / 1 / 2 / 2",
    '반지2': "3 / 1 / 3 / 2",
    '반지1': "4 / 1 / 4 / 2",
    '포켓 아이템': "5 / 1 / 5 / 2",

    '펜던트2': "2 / 2 / 2 / 2",
    '펜던트': "3 / 2 / 3 / 2",
    '무기': "4 / 2/ 4 / 2",
    '벨트': "5 / 2 / 5 / 2",

    '모자': "1 / 3 / 1 / 3",
    '얼굴장식': "2 / 3 / 2 / 3",
    '눈장식': "3 / 3 / 3 / 3",
    '상의': "4 / 3 / 4 / 3",
    '하의': "5 / 3 / 5 / 3",
    '신발': "6 / 3 / 6 / 3",
    
    //'훈장': "1 / 4 / 1 / 4",
    '귀고리': "3 / 4 / 3 / 4",
    '어깨장식': "4 / 4 / 4 / 4",
    '장갑': "5 / 4 / 5 / 4",
    //'귀고리': "6 / 4 / 6 / 4",

    '엠블렘': "1 / 5 / 1 / 5",
    '뱃지': "2 / 5 / 2 / 5",
    '훈장': "3 / 5 / 3 / 5",
    '보조무기': "4 / 5 / 4 / 5",
    '망토': "5 / 5 / 5 / 5",
    '기계 심장': "6 / 5 / 6 / 5",
    // 여기에 다른 매핑 추가
  };

  return gridAreaMap[itemSlot] || "기본값"; // 기본값 설정
}

export const fetchItemData = createAsyncThunk(
  'myApi/fetchItem',
  async (_, { getState }) => {
    try {
      const state = getState();
      const ocid = state.myApi.ocid;
      const data = await fetchItemApi(ocid, getYesterdayDate());
      
      if (data && data.item_equipment) {
        for (let i = 0; i < data.item_equipment.length; i++) {
          data.item_equipment[i].gridArea = calculateGridArea(data.item_equipment[i].item_equipment_slot);
        }
      }
      return data;
    } catch (error) {
      throw error; // 에러 핸들링
    }
  }
);


// 슬라이스 정의...
export const myApiSlice = createSlice({
    name: 'myApi',
    initialState: {
      data: null,
      item: null, // 아이템 데이터 상태 추가
      setItem: null,
      ocid: null, // ocid 상태 추가
      loading: false,
      error: null,
    },
    reducers: {
      setOcid: (state, action) => { // ocid를 설정하는 reducer 추가
        state.ocid = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchCharacterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCharacterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.data = null; // 에러 발생 시 데이터 초기화
      })
      .addCase(fetchItemData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemData.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload; // 아이템 데이터 저장
      })
      .addCase(fetchItemData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchItemSet_EffectData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemSet_EffectData.fulfilled, (state, action) => {
        state.loading = false;
        state.setItem = action.payload; // 아이템 세트 효과 데이터 저장
      })
      .addCase(fetchItemSet_EffectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    },
  });
  export const { setOcid } = myApiSlice.actions; // 액션 생성자 내보내기
  export default myApiSlice.reducer;
  