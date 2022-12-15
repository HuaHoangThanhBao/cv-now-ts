import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState, Store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { setupStore, store } from '../store'
import type { AppStore, RootState } from '../store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}
interface ReduxProviderProps {
  children?: React.ReactNode
  reduxStore?: Store
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const ReduxProvider = ({ children, reduxStore }: ReduxProviderProps) => (
  <Provider store={reduxStore || store}>{children}</Provider>
)

export const Wrapper = ({ children }: ReduxProviderProps) => (
  <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
)
