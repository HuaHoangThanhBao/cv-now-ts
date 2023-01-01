import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from 'src/utils'
import { DocumentState } from './stories/pages/DocumentList/documentList.slice'

export interface UserState
  extends Omit<DocumentState, 'documentSelectedId' | 'resume' | 'loading' | 'currentRequestId'> {
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
  tokenId: '',
  documents: []
}

export const sendLogin = createAsyncThunk(
  'user/login',
  async (
    {
      body,
      callback
    }: {
      body: Partial<UserState>
      callback: (userId: string, accessToken: string, refreshToken: string) => void
    },
    thunkAPI
  ) => {
    const response = await http.post<UserState>(`users/login`, body, {
      signal: thunkAPI.signal
    })
    const { userId, accessToken, refreshToken } = response.data
    callback(userId, accessToken, refreshToken)
    return response.data
  }
)

export const sendToUpdateRefreshToken = createAsyncThunk(
  'user/refreshToken',
  async ({ body }: { body: Partial<UserState> }, thunkAPI) => {
    const response = await http.post<UserState>(`users/refresh-token`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const getUser = createAsyncThunk('user/getUserById', async (_, thunkAPI) => {
  const response = await http.get<UserState>(`users`, {
    signal: thunkAPI.signal
  })
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateTokens: (state, action: PayloadAction<Partial<UserState>>) => {
      state.accessToken = action.payload.accessToken || ''
      state.refreshToken = action.payload.refreshToken || ''
    }
  },
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
    builder.addCase(sendToUpdateRefreshToken.fulfilled, (state, action) => {
      state.refreshToken = action.payload.refreshToken
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log('documents:', action.payload.documents)
      state.documents = action.payload.documents
    })
  }
})

export const { updateTokens } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
