import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FontState } from 'src/stories/organisms/Font/font.slice'
import { SettingState } from 'src/stories/organisms/Setting/setting.slice'
import { ThemeState } from 'src/stories/organisms/Theme/theme.slice'
import { IdObjectMongoose } from 'src/types/Block'
import { FontSize, FontStyle } from 'src/types/Font'
import { TemplateType } from 'src/types/Template'
import { ThemeType } from 'src/types/Theme'
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
  theme: ThemeState
  font: FontState
  setting: SettingState
}

export type DocumentCreateReq = Pick<
  DocumentRes,
  'pagesOneColumn' | 'pagesTwoColumn' | 'isOneColumn' | 'noNeedsOneColumn' | 'noNeedsTwoColumn'
> & { blocks: BlockState }

export interface DocumentState {
  documentSelectedId: string
  resume: DocumentRes
}

export interface ProfileState extends IdObjectMongoose {
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

export interface AvatarState extends IdObjectMongoose {
  url: string
}

export const profileInitialState: ProfileState = {
  _id: '',
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

const resumeInitialData: DocumentRes = {
  _id: '-1',
  block: blockInitialState,
  isOneColumn: false,
  pagesOneColumn: [],
  pagesTwoColumn: [],
  pages: [],
  noNeedsOneColumn: [],
  noNeedsTwoColumn: [],
  template: {
    _id: '',
    currentTemplate: TemplateType.skilled_based
  },
  profile: { ...profileInitialState },
  avatar: {
    _id: '',
    url: ''
  },
  theme: {
    _id: '',
    currentTheme: ThemeType.basic_theme,
    color: '',
    iconColor: ''
  },
  font: {
    _id: '',
    currentFontFamily: FontStyle.roboto,
    currentFontSize: FontSize.medium
  },
  setting: {
    _id: '',
    isShowAvatar: true,
    isShowCreationDate: true,
    isShowPageNumbers: true,
    isShowIcons: false
  }
}

const initialState: DocumentState = {
  resume: resumeInitialData,
  documentSelectedId: '-1'
}

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
  async ({ id, callback }: { id: string; callback: () => void }, thunkAPI) => {
    const response = await http.delete<DocumentRes>(`documents/${id}`, {
      signal: thunkAPI.signal
    })
    callback()
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
    resetResume: (state) => {
      state.documentSelectedId = '-1'
      state.resume = resumeInitialData
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getResume.fulfilled, (state, action) => {
        console.log('document by id:', action.payload)
        alert(`document by id: ${action.payload}`)
        state.resume = action.payload
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

export const { getSelectedDocument, resetResume } = documentSlice.actions
const documentReducer = documentSlice.reducer

export default documentReducer
