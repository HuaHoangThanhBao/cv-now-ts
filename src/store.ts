import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import blockReducer from './stories/organisms/Block/block.slice'
import dragReducer from './stories/organisms/Drag/drag.slice'
import templateReducer from './stories/organisms/Template/template.slice'
import documentReducer from './stories/pages/DocumentList/documentList.slice'
import userReducer from './user.slice'

export const store = configureStore({
  reducer: {
    block: blockReducer,
    drag: dragReducer,
    document: documentReducer,
    template: templateReducer,
    user: userReducer
  }
})

/*Set up for uni test*/
const rootReducer = combineReducers({
  block: blockReducer,
  drag: dragReducer,
  document: documentReducer,
  template: templateReducer,
  user: userReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
/*Set up for uni test*/

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof setupStore>
export const useAppDispatch = () => useDispatch<AppDispatch>()
