import { takeLatest, put, take, call } from 'redux-saga/effects'
import {
  createBlock,
  movingBlock,
  movingBlockContentDown,
  movingBlockContentUp,
  onMovingBlock,
  removeBlock,
  selectedBlockInitialState,
  sendUpdateBlock,
  transformPages,
  updatePages,
  updateSelectedBlock
} from 'src/stories/organisms/Block/block.slice'

function* handleCreateBlock() {
  yield put(onMovingBlock(true))
  yield put(
    updateSelectedBlock({
      selectedBlock: selectedBlockInitialState
    })
  )
}

function* handleMovingBlock() {
  yield put(onMovingBlock(true))
}

export function* blockSaga() {
  console.log('watch create block...')
  yield takeLatest(createBlock.toString(), handleCreateBlock)

  console.log('watch remove block...')
  yield takeLatest(removeBlock.toString(), handleMovingBlock)

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
