import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기 상태를 여러 모달을 관리할 수 있도록 확장
interface ModalState {
  modal: boolean;
  infomodal: boolean;
  // 추가 모달 상태...
  hyperstatmodal: boolean;
}

interface MyModalState {
  modals: ModalState;
}

const initialState: MyModalState = {
  modals: {
    modal: false,
    infomodal: false,
    hyperstatmodal: false,
    // 추가 모달 상태...
  },
};

const myModalSlice = createSlice({
  name: 'myModal',
  initialState,
  reducers: {
    // 특정 모달을 열기
    openModal: (state, action: PayloadAction<{ modalName: keyof ModalState }>) => {
      const { modalName } = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = true;
      }
    },
    // 특정 모달을 닫기
    closeModal: (state, action: PayloadAction<{ modalName: keyof ModalState }>) => {
      const { modalName } = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = false;
      }
    },
    toggleModal:(state, action: PayloadAction<{ modalName: keyof ModalState }>) => {
      const { modalName } = action.payload;
      if (state.modals[modalName] !== undefined) {
        state.modals[modalName] = !state.modals[modalName];
      }
    },
  },
});

export const { openModal, closeModal,toggleModal } = myModalSlice.actions;
export default myModalSlice.reducer;
