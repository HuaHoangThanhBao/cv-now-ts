import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IdObjectMongoose } from 'src/types/Block'
import { FontSize, FontStyle } from 'src/types/Font'
import { http } from 'src/utils'

export interface FontState extends IdObjectMongoose {
  currentFontFamily: string
  currentFontSize: string
}

const initialState: FontState = {
  _id: '',
  currentFontFamily: FontStyle.roboto,
  currentFontSize: FontSize.medium
}

export const sendUpdateCurrentFont = createAsyncThunk(
  'fonts/updateFont',
  async ({ id, body }: { id: string; body: FontState }, thunkAPI) => {
    const response = await http.put<FontState>(`fonts/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    updateCurrentFont: (state, action: PayloadAction<FontState>) => {
      state._id = action.payload._id
      state.currentFontFamily = action.payload.currentFontFamily
      state.currentFontSize = action.payload.currentFontSize
    }
  },
  extraReducers(builder) {
    builder.addCase(sendUpdateCurrentFont.fulfilled, (state, action) => {
      console.log('theme updated:', action.payload)
      state._id = action.payload._id
      state.currentFontFamily = action.payload.currentFontFamily
      state.currentFontSize = action.payload.currentFontSize
    })
  }
})

export const { updateCurrentFont } = fontSlice.actions
const fontReducer = fontSlice.reducer
export default fontReducer
