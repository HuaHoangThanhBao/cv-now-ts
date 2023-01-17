import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IdObjectMongoose } from 'src/types/Block'
import { ThemeType } from 'src/types/Theme'
import { http } from 'src/utils'

export interface ThemeState extends IdObjectMongoose {
  currentTheme: string
  color: string
  iconColor: string
}

const initialState: ThemeState = {
  _id: '',
  currentTheme: ThemeType.basic_theme,
  color: '',
  iconColor: ''
}

export const sendUpdateCurrentTheme = createAsyncThunk(
  'themes/updateTheme',
  async ({ id, body }: { id: string; body: ThemeState }, thunkAPI) => {
    const response = await http.put<ThemeState>(`themes/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateCurrentTheme: (state, action: PayloadAction<ThemeState>) => {
      state._id = action.payload._id
      state.currentTheme = action.payload.currentTheme
      state.color = action.payload.color
      state.iconColor = action.payload.iconColor
    }
  },
  extraReducers(builder) {
    builder.addCase(sendUpdateCurrentTheme.fulfilled, (state, action) => {
      console.log('theme updated:', action.payload)
      state._id = action.payload._id
      state.currentTheme = action.payload.currentTheme
      state.color = action.payload.color
      state.iconColor = action.payload.iconColor
    })
  }
})

export const { updateCurrentTheme } = themeSlice.actions
const themeReducer = themeSlice.reducer
export default themeReducer
