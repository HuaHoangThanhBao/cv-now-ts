import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TemplateType } from '../../../types/Template';

interface TemplateState {
  currentTemplate: string;
}

const initialState: TemplateState = {
  currentTemplate: TemplateType.basic,
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    updateCurrentTemplate: (state, action: PayloadAction<string>) => {
      state.currentTemplate = action.payload;
    },
  },
});

export const { updateCurrentTemplate } = templateSlice.actions;
const templateReducer = templateSlice.reducer;
export default templateReducer;
