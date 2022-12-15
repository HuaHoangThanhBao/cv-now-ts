import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FulfilledAction, PendingAction, RejectedAction } from 'src/types/AsyncThunk'
import { pagesTwoColumn } from '../../../contants/ColumnFormat'
import { http } from '../../../utils'
import { PageTransformState } from '../Block/block.slice'

export interface DragState {
  pages: string[][][]
}

export interface NoNeedState {
  noNeedsOneColumn: string[]
  noNeedsTwoColumn: string[]
}

export interface NoNeedUpdateState {
  isOneColumn: boolean
  noNeedItem: string
}

export type NoNeedRequestState = NoNeedState & PageTransformState

interface DragRequestState {
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: DragState & NoNeedState & NoNeedUpdateState & DragRequestState = {
  loading: false,
  currentRequestId: '-1',
  isOneColumn: false,
  noNeedItem: '',
  pages: pagesTwoColumn,
  noNeedsOneColumn: [],
  noNeedsTwoColumn: []
}

export const sendUpdateNoNeeds = createAsyncThunk(
  'drag/sendUpdateNoNeeds',
  async ({ id, body }: { id: string; body: NoNeedRequestState }, thunkAPI) => {
    const response = await http.put<NoNeedRequestState>(`documents/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

const dragSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    updateDragPages: (state, action: PayloadAction<DragState>) => {
      const pages = action.payload.pages
      state.pages = pages
    },
    updateNoNeeds: (state, action: PayloadAction<NoNeedState>) => {
      const noNeedsTwoColumn = action.payload.noNeedsTwoColumn
      const noNeedsOneColumn = action.payload.noNeedsOneColumn
      state.noNeedsOneColumn = noNeedsOneColumn
      state.noNeedsTwoColumn = noNeedsTwoColumn
    },
    addNewItem: (state, action: PayloadAction<NoNeedUpdateState>) => {
      const { noNeedItem, isOneColumn } = action.payload
      const noNeeds = !isOneColumn ? state.noNeedsTwoColumn : state.noNeedsOneColumn
      const isExisted = noNeeds.find((n) => n === noNeedItem)
      console.log('isExisted:', isExisted)
      if (!isExisted) {
        noNeeds.push(noNeedItem)
        console.log('no needs update:', JSON.parse(JSON.stringify(noNeeds)))
      }
      if (!isOneColumn) {
        state.noNeedsTwoColumn = noNeeds
      } else {
        state.noNeedsOneColumn = noNeeds
      }
    },
    removeItem: (state, action: PayloadAction<NoNeedUpdateState>) => {
      const { noNeedItem, isOneColumn } = action.payload
      const noNeeds = !isOneColumn ? state.noNeedsTwoColumn : state.noNeedsOneColumn
      const foundIndex = noNeeds.findIndex((n) => n === noNeedItem)
      if (foundIndex !== -1) {
        noNeeds.splice(foundIndex, 1)
      }
    }
  },
  extraReducers(builder) {
    builder
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

export const { updateDragPages, updateNoNeeds, addNewItem, removeItem } = dragSlice.actions
const dragReducer = dragSlice.reducer

export default dragReducer
