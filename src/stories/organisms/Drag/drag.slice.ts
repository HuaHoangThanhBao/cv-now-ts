import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DragState {
  finishingDrag: boolean;
}

const initialState: DragState = {
  finishingDrag: false,
};

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    finishingDrag: (state, action: PayloadAction<boolean>) => {
      state.finishingDrag = action.payload;
    },
  },
});

export const { finishingDrag } = dragSlice.actions;
const dragReducer = dragSlice.reducer;

export default dragReducer;
