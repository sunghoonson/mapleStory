// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import myApiReducer from '../features/myApi/myApiSlice';
import myModalReducer from '../features/myModalSlice';

export const store = configureStore({
  reducer: {
    myModal: myModalReducer,
    myApi: myApiReducer,
  },
});
