import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IdObjectMongoose } from 'src/types/Block'
import { http } from 'src/utils'
import { TemplateType } from '../../../types/Template'

export interface TemplateState extends IdObjectMongoose {
  currentTemplate: string
}

const initialState: TemplateState = {
  _id: '',
  currentTemplate: TemplateType.skilled_based
}

export const sendUpdateCurrentTemplate = createAsyncThunk(
  'template/updateTemplate',
  async ({ id, body }: { id: string; body: TemplateState }, thunkAPI) => {
    const response = await http.put<TemplateState>(`templates/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    updateCurrentTemplate: (state, action: PayloadAction<string>) => {
      state.currentTemplate = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(sendUpdateCurrentTemplate.fulfilled, (state, action) => {
      console.log('template updated:', action.payload.currentTemplate)
      state.currentTemplate = action.payload.currentTemplate
    })
  }
})

export const { updateCurrentTemplate } = templateSlice.actions
const templateReducer = templateSlice.reducer
export default templateReducer
