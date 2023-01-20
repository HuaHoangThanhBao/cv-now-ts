import { all } from 'redux-saga/effects'
import { blockSaga } from 'src/features/block.saga'

export default function* rootSaga() {
  yield all([blockSaga()])
}
