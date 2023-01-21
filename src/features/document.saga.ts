import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, take } from 'redux-saga/effects'
import { updateState } from 'src/stories/organisms/Block/block.slice'
import { updateNoNeeds } from 'src/stories/organisms/Drag/drag.slice'
import { updateCurrentFont } from 'src/stories/organisms/Font/font.slice'
import { updateCurrentSetting } from 'src/stories/organisms/Setting/setting.slice'
import { updateCurrentTemplate } from 'src/stories/organisms/Template/template.slice'
import { updateCurrentTheme } from 'src/stories/organisms/Theme/theme.slice'
import { DocumentRes, getResume } from 'src/stories/pages/DocumentList/documentList.slice'

function* handleGetResume(resume: DocumentRes) {
  if (resume._id !== '-1') {
    yield put(updateState(resume))
    yield put(updateCurrentTemplate(resume.template.currentTemplate))
    yield put(updateCurrentTheme(resume.theme))
    yield put(updateCurrentFont(resume.font))
    yield put(updateCurrentSetting(resume.setting))
    yield put(
      updateNoNeeds({
        noNeedsOneColumn: resume.noNeedsOneColumn,
        noNeedsTwoColumn: resume.noNeedsTwoColumn
      })
    )
  }
}

export function* documentSaga() {
  while (true) {
    console.log('watching get resume...')
    const action: PayloadAction<DocumentRes> = yield take(getResume.fulfilled)
    yield call(handleGetResume, action.payload)
  }
}
