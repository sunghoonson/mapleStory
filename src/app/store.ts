// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import myApiReducer from '../features/myApi/myApiSlice.tsx';
import myModalReducer from '../features/myModalSlice.ts';
import hyperStatSlice from '../features/myApi/hyperStatSlice.ts'
import tooltipReducer from '../features/myApi/positiontooltipSlice.ts';

export const store = configureStore({
  reducer: {
    myModal: myModalReducer,
    myApi: myApiReducer,
    hyperStat: hyperStatSlice,
    tooltip: tooltipReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
// 스토어의 상태 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export default store;