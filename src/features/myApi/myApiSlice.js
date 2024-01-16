// features/myApi/myApiSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCharacterId, fetchCharacterData as fetchCharacterDetails,fetchItemData as fetchItemApi } from './mapleStoryApi.js';

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

export const fetchItemData = createAsyncThunk(
  'myApi/fetchItem',
  async (_, { getState }) => {
    try {
      const state = getState();
      const ocid = state.myApi.ocid;
      const data = await fetchItemApi(ocid, getYesterdayDate());
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
      });
    },
  });
  export const { setOcid } = myApiSlice.actions; // 액션 생성자 내보내기
  export default myApiSlice.reducer;
  