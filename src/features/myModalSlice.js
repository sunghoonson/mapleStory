// features/myModalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const myModalSlice = createSlice({
  name: 'myModal',
  initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = myModalSlice.actions;
export default myModalSlice.reducer;
