import { createSlice } from '@reduxjs/toolkit';

// 초기 상태를 여러 모달을 관리할 수 있도록 확장
const initialState = {
  modals: {
    modal: false,
    infomodal: false,
    // 추가 모달 상태...
  }
};

const myModalSlice = createSlice({
  name: 'myModal',
  initialState,
  reducers: {
    // 특정 모달을 열기
    openModal: (state, action) => {
      const { modalName } = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = true;
      }
    },
    // 특정 모달을 닫기
    closeModal: (state, action) => {
      const { modalName } = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = false;
      }
    },
  },
});

export const { openModal, closeModal } = myModalSlice.actions;
export default myModalSlice.reducer;
