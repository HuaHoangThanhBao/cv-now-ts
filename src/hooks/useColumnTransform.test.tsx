import { act, renderHook, cleanup } from '@testing-library/react'
import { useColumnTransform } from './useColumnTransform'
import { store } from '../store'
import { Wrapper } from '../utils/test-utils'

afterEach(cleanup)

describe('useColumnTransform', () => {
  test('should render hook', () => {
    const { result } = renderHook(useColumnTransform, { wrapper: Wrapper })
    expect(result).toBeDefined()
  })
  test('render from two column to one column and back', () => {
    const { result } = renderHook(useColumnTransform, { wrapper: Wrapper })
    act(() => {
      const newPagesTransform = result.current.onChangeColumnTransform()
      const newColumnState = store.getState().block.isOneColumn
      const blockStateOneColumn = store.getState().block.pagesOneColumn
      expect(newColumnState).toBe(true)
      expect(newPagesTransform[0].length).toEqual(1)
      expect(newPagesTransform).toEqual(blockStateOneColumn)
    })
    act(() => {
      const newPagesTransform = result.current.onChangeColumnTransform()
      const newColumnState = store.getState().block.isOneColumn
      const blockStateTwoColumns = store.getState().block.pagesTwoColumn
      expect(newColumnState).toBe(false)
      expect(newPagesTransform[0].length).toEqual(2)
      expect(newPagesTransform).toEqual(blockStateTwoColumns)
    })
  })
})
