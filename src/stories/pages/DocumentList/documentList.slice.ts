import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TemplateType } from 'src/types/Template'
import { http } from '../../../utils'
import {
  blockInitialState,
  BlockInitialState,
  BlockState,
  PageState,
  PageTransformState
} from '../../organisms/Block/block.slice'
import { TemplateState } from '../../organisms/Template/template.slice'

export interface DocumentRes extends PageState {
  _id: string
  block: BlockInitialState
  isOneColumn: boolean
  noNeedsOneColumn: string[]
  noNeedsTwoColumn: string[]
  pagesOneColumn: string[][][]
  pagesTwoColumn: string[][][]
  template: TemplateState
  profile: ProfileState
  avatar: AvatarState
}

export interface DocumentCreateReq {
  blocks: BlockState
  pagesOneColumn: string[][][]
  pagesTwoColumn: string[][][]
  isOneColumn: boolean
  noNeedsOneColumn: []
  noNeedsTwoColumn: []
}

export interface DocumentState {
  documentSelectedId: string
  resume: DocumentRes
  documents: DocumentRes[]
}

export interface ProfileState {
  _id?: string
  email: string
  address: string
  phone: string
  website: string
  linkedIn: string
  twitter: string
  skype: string
  facebook: string
  gitHub: string
  stackOverflow: string
  medium: string
  instagram: string
}

export interface AvatarState {
  _id?: string
  url: string
}

export const profileInitialState = {
  email: '',
  address: '',
  phone: '',
  website: '',
  linkedIn: '',
  twitter: '',
  skype: '',
  facebook: '',
  gitHub: '',
  stackOverflow: '',
  medium: '',
  instagram: ''
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
  template: {
    currentTemplate: TemplateType.skilled_based
  },
  profile: { ...profileInitialState },
  avatar: {
    url: ''
  }
}

const initialState: DocumentState = {
  documents: [],
  resume: resumeInitialData,
  documentSelectedId: '-1'
}

// export const getResumeList = createAsyncThunk('document/getResumeList', async (_, thunkAPI) => {
//   const response = await http.get<DocumentRes[]>('documents', {
//     signal: thunkAPI.signal
//   })
//   return response.data
// })

export const getResume = createAsyncThunk(
  'document/getResume',
  async ({ documentId }: { documentId: string }, thunkAPI) => {
    const response = await http.get<DocumentRes>(`documents/${documentId}`, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const sendUpdatePages = createAsyncThunk(
  'document/sendUpdatePages',
  async ({ id, body }: { id: string; body: PageTransformState }, thunkAPI) => {
    const response = await http.put<PageTransformState>(`documents/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const sendUpdateProfile = createAsyncThunk(
  'document/updateProfile',
  async ({ id, body }: { id: string; body: ProfileState }, thunkAPI) => {
    const response = await http.put<ProfileState>(`profiles/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const sendUpdateAvatar = createAsyncThunk(
  'document/updateAvatar',
  async ({ id, body }: { id: string; body: AvatarState }, thunkAPI) => {
    const response = await http.put<AvatarState>(`avatars/${id}`, body, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const createNewResume = createAsyncThunk(
  'document/createNewResume',
  async (
    { body, callback }: { body: PageTransformState; callback: (documentId: string) => void },
    thunkAPI
  ) => {
    const response = await http.post<DocumentRes>(`documents`, body, {
      signal: thunkAPI.signal
    })
    callback(response.data._id)
    return response.data
  }
)

export const deleteResume = createAsyncThunk(
  'document/deleteResume',
  async ({ id }: { id: string }, thunkAPI) => {
    const response = await http.delete<DocumentRes>(`documents/${id}`, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    getSelectedDocument: (state, action: PayloadAction<string>) => {
      state.documentSelectedId = action.payload
    },
    resetDocumentList: (state) => {
      state.documents = []
    },
    resetResume: (state) => {
      state.documentSelectedId = '-1'
      state.resume = resumeInitialData
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getResume.fulfilled, (state, action) => {
        console.log('document by id:', action.payload)
        state.resume = action.payload
      })
      .addCase(createNewResume.fulfilled, (state, action) => {
        state.documents.push(action.payload)
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        const documentId = action.payload._id
        const deleteDocumentIndex = state.documents.findIndex((doc) => doc._id === documentId)
        if (deleteDocumentIndex !== -1) {
          state.documents.splice(deleteDocumentIndex, 1)
        }
        state.documentSelectedId = '-1'
      })
      .addCase(sendUpdateProfile.fulfilled, (state, action) => {
        console.log('profile updated:', action.payload)
        state.resume.profile = action.payload
      })
      .addCase(sendUpdateAvatar.fulfilled, (state, action) => {
        console.log('avatar updated:', action.payload)
        state.resume.avatar = action.payload
      })
  }
})

export const { getSelectedDocument, resetResume, resetDocumentList } = documentSlice.actions
const documentReducer = documentSlice.reducer

export default documentReducer
