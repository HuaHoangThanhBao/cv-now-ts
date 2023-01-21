import { all } from 'redux-saga/effects'
import { blockSaga } from 'src/features/block.saga'
import { documentSaga } from 'src/features/document.saga'

export default function* rootSaga() {
  yield all([blockSaga(), documentSaga()])
}
