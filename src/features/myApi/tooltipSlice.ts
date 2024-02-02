// ../features/myApi/tooltipSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 타입 정의
interface PositionTooltipState {
  isVisible: boolean;
  x: number;
  y: number;
  content: string;
}

// 초기 상태 정의
const initialState: PositionTooltipState = {
  isVisible: false,
  x: 0,
  y: 0,
  content: ''
};

const positionTooltipSlice = createSlice({
  name: 'tooltip',
  initialState,
  reducers: {
    showTooltip: (state, action: PayloadAction<{x: number, y: number, content: string}>) => {
      const { x, y, content } = action.payload;
      state.isVisible = true;
      state.x = x;
      state.y = y;
      state.content = content;
    },
    hideTooltip: (state) => {
      state.isVisible = false;
    }
  }
});

// 액션 크리에이터 및 리듀서 export
export const { showTooltip, hideTooltip } = positionTooltipSlice.actions;
export default positionTooltipSlice.reducer;
