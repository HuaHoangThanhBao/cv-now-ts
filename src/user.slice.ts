import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { http } from 'src/utils'

export interface UserState {
  userId: string
  email: string
  familyName: string
  givenName: string
  name: string
  accessToken: string
  refreshToken: string
  tokenId: string
}

const initialState: UserState = {
  userId: '',
  email: '',
  familyName: '',
  givenName: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  tokenId: ''
}

export const sendLogin = createAsyncThunk(
  'user/login',
  async (
    { body, callback }: { body: Partial<UserState>; callback: (userId: string) => void },
    thunkAPI
  ) => {
    const response = await http.post<UserState>(`users/login`, body, {
      signal: thunkAPI.signal
    })
    callback(response.data.userId)
    return response.data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendLogin.fulfilled, (state, action) => {
      console.log('user:', action.payload)
      state.email = action.payload.email
      state.familyName = action.payload.email
      state.givenName = action.payload.email
      state.name = action.payload.email
      state.accessToken = action.payload.email
      state.refreshToken = action.payload.email
      state.tokenId = action.payload.email
    })
  }
})

// export const { updateCurrentTemplate } = templateSlice.actions
const userReducer = userSlice.reducer
export default userReducer
