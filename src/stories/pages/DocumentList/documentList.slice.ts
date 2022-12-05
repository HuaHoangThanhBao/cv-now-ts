import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { http } from '../../../utils';
import { blockInitialState, BlockInitialState, PageState } from '../../organisms/Block/block.slice';

export interface DocumentRes extends PageState {
  _id: string;
  block: BlockInitialState;
  isOneColumn: boolean;
  pagesOneColumn: string[][][];
  pagesTwoColumn: string[][][];
}

interface DocumentListState {
  documentList: DocumentRes[];
  loading: boolean;
  currentRequestId: undefined | string;
}

interface DocumentSelect {
  documentSelectedId: string;
  resume: DocumentRes;
}

const initialState: DocumentListState & DocumentSelect = {
  documentList: [],
  resume: {
    _id: '-1',
    block: blockInitialState,
    isOneColumn: false,
    pagesOneColumn: [],
    pagesTwoColumn: [],
    pages: [],
  },
  documentSelectedId: '-1',
  loading: false,
  currentRequestId: undefined,
};

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export const getResumeList = createAsyncThunk('document/getResumeList', async (_, thunkAPI) => {
  const response = await http.get<DocumentRes[]>('documents', {
    signal: thunkAPI.signal,
  });
  return response.data;
});

export const getResume = createAsyncThunk(
  'document/getResume',
  async ({ documentId }: { documentId: string }, thunkAPI) => {
    const response = await http.get<DocumentRes>(`documents/${documentId}`, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    getSelectedDocument: (state, action: PayloadAction<string>) => {
      state.documentSelectedId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getResumeList.fulfilled, (state, action) => {
        console.log('document list:', action.payload);
        state.documentList = action.payload;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        console.log('document by id:', action.payload);
        state.resume = action.payload;
      })
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

export const { getSelectedDocument } = documentSlice.actions;
const documentReducer = documentSlice.reducer;

export default documentReducer;