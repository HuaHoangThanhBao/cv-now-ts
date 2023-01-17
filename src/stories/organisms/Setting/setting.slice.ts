import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IdObjectMongoose } from 'src/types/Block'
import { http } from 'src/utils'

export interface SettingState extends IdObjectMongoose {
  isShowAvatar: boolean
  isShowCreationDate: boolean
  isShowPageNumbers: boolean
  isShowIcons: boolean
}

const initialState: SettingState = {
  _id: '',
  isShowAvatar: true,
  isShowCreationDate: true,
  isShowPageNumbers: true,
  isShowIcons: false
}

export const sendUpdateCurrentSetting = createAsyncThunk(
  'settings/updateSetting',
  async ({ id, body }: { id: string; body: SettingState }, thunkAPI) => {
    const response = await http.put<SettingState>(`settings/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateCurrentSetting: (state, action: PayloadAction<SettingState>) => {
      state._id = action.payload._id
      state.isShowAvatar = action.payload.isShowAvatar
      state.isShowCreationDate = action.payload.isShowCreationDate
      state.isShowPageNumbers = action.payload.isShowPageNumbers
      state.isShowIcons = action.payload.isShowIcons
    }
  },
  extraReducers(builder) {
    builder.addCase(sendUpdateCurrentSetting.fulfilled, (state, action) => {
      state._id = action.payload._id
      state.isShowAvatar = action.payload.isShowAvatar
      state.isShowCreationDate = action.payload.isShowCreationDate
      state.isShowPageNumbers = action.payload.isShowPageNumbers
      state.isShowIcons = action.payload.isShowIcons
    })
  }
})

export const { updateCurrentSetting } = settingSlice.actions
const settingReducer = settingSlice.reducer
export default settingReducer
