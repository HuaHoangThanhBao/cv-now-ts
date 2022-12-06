import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pagesTwoColumn } from '../../../contants/ColumnFormat';
import { http } from '../../../utils';
import { PageTransformState } from '../Block/block.slice';

export interface DragState {
  pages: string[][][];
}
export interface NoNeedState {
  noNeeds: string[];
}

export type NoNeedRequestState = NoNeedState & PageTransformState;

interface DragRequestState {
  loading: boolean;
  currentRequestId: undefined | string;
}

const initialState: DragState & NoNeedState & DragRequestState = {
  loading: false,
  currentRequestId: '-1',
  pages: pagesTwoColumn,
  noNeeds: [],
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export const sendUpdateNoNeeds = createAsyncThunk(
  'drag/sendUpdateNoNeeds',
  async ({ id, body }: { id: string; body: NoNeedRequestState }, thunkAPI) => {
    const response = await http.put<NoNeedRequestState>(`documents/${id}`, body, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    updateDragPages: (state, action: PayloadAction<DragState>) => {
      const pages = action.payload.pages;
      state.pages = pages;
    },
    updateNoNeeds: (state, action: PayloadAction<NoNeedState>) => {
      const noNeeds = action.payload.noNeeds;
      state.noNeeds = noNeeds;
    },
    addNewItem: (state, action: PayloadAction<string>) => {
      const block = action.payload;
      const noNeeds = state.noNeeds;
      const isExisted = noNeeds.find((n) => n === block);
      console.log('isExisted:', isExisted);
      if (!isExisted) {
        noNeeds.push(block);
        console.log('no needs update:', JSON.parse(JSON.stringify(noNeeds)));
      }
      state.noNeeds = noNeeds;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const block = action.payload;
      const noNeeds = state.noNeeds;
      const foundIndex = noNeeds.findIndex((n) => n === block);
      if (foundIndex !== -1) {
        noNeeds.splice(foundIndex, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      )
      .addDefaultCase((state, action) => {
        // console.log(`action type: ${action.type}`, current(state))
      });
  },
});

export const { updateDragPages, updateNoNeeds, addNewItem, removeItem } = dragSlice.actions;
const dragReducer = dragSlice.reducer;

export default dragReducer;
