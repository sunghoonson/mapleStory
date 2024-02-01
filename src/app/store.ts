// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import myApiReducer from '../features/myApi/myApiSlice.tsx';
import myModalReducer from '../features/myModalSlice.ts';
import hyperStatSlice from '../features/myApi/hyperStatSlice.ts'

export const store = configureStore({
  reducer: {
    myModal: myModalReducer,
    myApi: myApiReducer,
    hyperStat: hyperStatSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;