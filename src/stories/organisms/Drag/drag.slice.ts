import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pagesTwoColumn } from '../../../contants/ColumnFormat';

export interface DragState {
  pages: string[][][];
}

const initialState: DragState = {
  pages: pagesTwoColumn,
};

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    updateDragPages: (state, action: PayloadAction<DragState>) => {
      const pages = action.payload.pages;
      state.pages = pages;
    },
  },
});

export const { updateDragPages } = dragSlice.actions;
const dragReducer = dragSlice.reducer;

export default dragReducer;
