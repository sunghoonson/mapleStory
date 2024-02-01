// features/hyperStat/hyperStatSlice.js
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchHyperStat } from './mapleStoryApi.ts';
import { RootState , MyApiState } from '../../component/types.ts';
import { getYesterdayDate } from '../../utils/util.ts'

export const fetchHyperStatData = createAsyncThunk<any, void>(
    'myApi/fetchHyperStatData',
    async (_, { getState }) => {
      try {
        const state = getState() as RootState; // RootState 타입 적용;
        const ocid: string = state.myApi.ocid;
        const data = await fetchHyperStat(ocid, getYesterdayDate());
        
        return data
      } catch (error) {
        throw error;
      }
    }
  );

const initialState  = {
    data: null,
    item: null, // 아이템 데이터 상태 추가
    setItem: null,
    setHyperStat: null,
    ocid: "", // ocid 상태 추가
    loading: false,
    error: null,
} as MyApiState

export const hyperStatSlice = createSlice({
  name: 'hyperStat',
  initialState ,
  reducers: {
    setOcid: (state, action: PayloadAction<string>) => { // ocid를 설정하는 reducer 추가
    state.ocid = action.payload;
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHyperStatData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHyperStatData.fulfilled, (state, action) => {        
        state.loading = false;
        state.setHyperStat = action.payload;
      })
      .addCase(fetchHyperStatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});
//export const { setOcid } = hyperStatSlice.actions; // 액션 생성자 내보내기
export default hyperStatSlice.reducer;
