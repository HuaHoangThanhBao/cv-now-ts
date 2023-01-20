import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './app/rootSaga.saga'
import blockReducer from './stories/organisms/Block/block.slice'
import dragReducer from './stories/organisms/Drag/drag.slice'
import fontReducer from './stories/organisms/Font/font.slice'
import settingReducer from './stories/organisms/Setting/setting.slice'
import templateReducer from './stories/organisms/Template/template.slice'
import themeReducer from './stories/organisms/Theme/theme.slice'
import documentReducer from './stories/pages/DocumentList/documentList.slice'
import userReducer from './user.slice'

export const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    block: blockReducer,
    drag: dragReducer,
    document: documentReducer,
    template: templateReducer,
    user: userReducer,
    theme: themeReducer,
    font: fontReducer,
    setting: settingReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

/*Set up for uni test*/
const rootReducer = combineReducers({
  block: blockReducer,
  drag: dragReducer,
  document: documentReducer,
  template: templateReducer,
  user: userReducer,
  theme: themeReducer,
  font: fontReducer,
  setting: settingReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    preloadedState
  })
}
/*Set up for uni test*/

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof setupStore>
export const useAppDispatch = () => useDispatch<AppDispatch>()
