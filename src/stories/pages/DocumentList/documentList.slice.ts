import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { http } from '../../../utils';
import {
  blockInitialState,
  BlockInitialState,
  BlockState,
  PageState,
  PageTransformState,
} from '../../organisms/Block/block.slice';

export interface DocumentRes extends PageState {
  _id: string;
  block: BlockInitialState;
  isOneColumn: boolean;
  noNeedsOneColumn: string[];
  noNeedsTwoColumn: string[];
  pagesOneColumn: string[][][];
  pagesTwoColumn: string[][][];
}

export interface DocumentCreateReq {
  blocks: BlockState;
  pagesOneColumn: string[][][];
  pagesTwoColumn: string[][][];
  isOneColumn: boolean;
  noNeedsOneColumn: [];
  noNeedsTwoColumn: [];
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

const resumeInitialData = {
  _id: '-1',
  block: blockInitialState,
  isOneColumn: false,
  pagesOneColumn: [],
  pagesTwoColumn: [],
  pages: [],
  noNeedsOneColumn: [],
  noNeedsTwoColumn: [],
};

const initialState: DocumentListState & DocumentSelect = {
  documentList: [],
  resume: resumeInitialData,
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
export const sendUpdatePages = createAsyncThunk(
  'document/sendUpdatePages',
  async ({ id, body }: { id: string; body: PageTransformState }, thunkAPI) => {
    const response = await http.put<PageTransformState>(`documents/${id}`, body, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);
export const createNewResume = createAsyncThunk(
  'document/createNewResume',
  async (
    { body, callback }: { body: PageTransformState; callback: (documentId: string) => void },
    thunkAPI
  ) => {
    const response = await http.post<DocumentRes>(`documents`, body, {
      signal: thunkAPI.signal,
    });
    console.log('callback');
    callback(response.data._id);
    return response.data;
  }
);
export const deleteResume = createAsyncThunk(
  'document/deleteResume',
  async ({ id }: { id: string }, thunkAPI) => {
    const response = await http.delete<DocumentRes>(`documents/${id}`, {
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
    resetDocumentList: (state) => {
      state.documentSelectedId = '-1';
      state.documentList = [];
    },
    resetResume: (state) => {
      state.resume = resumeInitialData;
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
      .addCase(createNewResume.fulfilled, (state, action) => {
        state.documentList.push(action.payload);
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        const documentId = action.payload._id;
        const deleteDocumentIndex = state.documentList.findIndex((doc) => doc._id === documentId);
        if (deleteDocumentIndex !== -1) {
          state.documentList.splice(deleteDocumentIndex, 1);
        }
        state.documentSelectedId = '-1';
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

export const { getSelectedDocument, resetResume, resetDocumentList } = documentSlice.actions;
const documentReducer = documentSlice.reducer;

export default documentReducer;
