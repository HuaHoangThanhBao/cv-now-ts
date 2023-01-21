import { PayloadAction } from '@reduxjs/toolkit'
import { takeLatest, put, take, call, select } from 'redux-saga/effects'
import blockApi from 'src/api/blockApi'
import {
  BlockCreateState,
  createBlock,
  doneCreateBlock,
  movingBlock,
  movingBlockContentDown,
  movingBlockContentUp,
  onMovingBlock,
  removeBlock,
  selectBlock,
  selectedBlockInitialState,
  sendUpdateBlock,
  transformPages,
  updatePages,
  updateSelectedBlock,
  BlockState,
  doneRemoveBlock
} from 'src/stories/organisms/Block/block.slice'
import { DocumentRes, selectResume } from 'src/stories/pages/DocumentList/documentList.slice'

function* handleSendUpdateBlock() {
  const block: BlockState = yield select(selectBlock)
  const resume: DocumentRes = yield select(selectResume)
  yield call(blockApi.put, { id: resume.block._id || '-1', body: block })
}

function* handleCreateBlock(action: PayloadAction<BlockCreateState>) {
  yield* handleSendUpdateBlock()
  if (action.payload.blockCreateId !== '-1') {
    yield put(doneCreateBlock())
  }
  yield* handleMovingBlock()
}

function* handleRemoveBlock() {
  yield* handleSendUpdateBlock()
  yield put(doneRemoveBlock())
  yield* handleMovingBlock()
}

function* handleMovingBlock() {
  yield put(onMovingBlock(true))
  yield put(
    updateSelectedBlock({
      selectedBlock: selectedBlockInitialState
    })
  )
}

export function* blockSaga() {
  console.log('watch create block...')
  yield takeLatest(createBlock.toString(), handleCreateBlock)

  console.log('watch remove block...')
  yield takeLatest(removeBlock.toString(), handleRemoveBlock)

  console.log('watch update page...')
  yield takeLatest(updatePages.toString(), handleMovingBlock)

  console.log('watch moving block...')
  yield takeLatest(movingBlock.toString(), handleMovingBlock)

  console.log('watch moving block content up...')
  yield takeLatest(movingBlockContentUp.toString(), handleMovingBlock)

  console.log('watch moving block content down...')
  yield takeLatest(movingBlockContentDown.toString(), handleMovingBlock)

  console.log('watch transform pages...')
  yield takeLatest(transformPages.toString(), handleMovingBlock)

  while (true) {
    console.log('watch sendUpdateBlock...')
    yield take(sendUpdateBlock.fulfilled)
    yield call(handleMovingBlock)
  }
}
