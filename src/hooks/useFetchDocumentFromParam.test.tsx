import { renderHook, waitFor } from '@testing-library/react'
import { store } from '../store'
import { useFetchDocumentFromParam } from './useFetchDocumentFromParam'
import mockAxios from 'jest-mock-axios'
import { blockInitialState } from '../stories/organisms/Block/block.slice'
import { Wrapper } from '../utils/test-utils'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    documentId: '6391eb9a1573fb0aa1c47749'
  })
}))

describe('useFetchDocumentFromParam', () => {
  test('should render hook', () => {
    const { result } = renderHook(useFetchDocumentFromParam, { wrapper: Wrapper })
    expect(result).toBeDefined()
  })
  test('should call reset state when unmount hook', () => {
    const { unmount } = renderHook(useFetchDocumentFromParam, { wrapper: Wrapper })
    unmount()
    const documentState = store.getState().document
    const blockState = store.getState().block
    expect(documentState.resume._id).toEqual('-1')
    expect(documentState.documentSelectedId).toEqual('-1')
    expect(blockState.blockMovingId).toEqual('-1')
    expect(blockState.blockCreateId).toEqual('-1')
    expect(blockState.blockBulletUid).toEqual('-1')
    expect(blockState.selectedBlock.blockId).toEqual('-1')
  })
  test('not update resume if there is no param value', () => {
    const { result } = renderHook(useFetchDocumentFromParam, { wrapper: Wrapper })
    const documentState = store.getState().document
    expect(documentState.resume._id).toEqual('-1')
    // expect(result.current.isUpdated).toEqual(false)
  })
  test('should update block & drag state when receive resume data from api', async () => {
    const resume = {
      _id: '6391eb9a1573fb0aa1c47749',
      block: blockInitialState,
      isOneColumn: false,
      pagesOneColumn: [['1']],
      pagesTwoColumn: [
        ['5', '6'],
        ['7', '8']
      ],
      pages: [['2']],
      noNeedsOneColumn: [['2']],
      noNeedsTwoColumn: [
        [['4'], ['2', '5', '6', '7']],
        [['9', '10', '11', '13'], []],
        [['8', '16'], ['14']],
        [['12'], []]
      ]
    }
    mockAxios.get.mockResolvedValue({ data: resume })
    const { result } = renderHook(useFetchDocumentFromParam, { wrapper: Wrapper })
    expect(result).not.toBe(null)

    //wait for api response, because if api response is fullfilled, it will call update no need state
    // await waitFor(() => expect(result.current.isUpdated).toBe(true))
    const noNeedsOneColumn = store.getState().drag.noNeedsOneColumn
    expect(noNeedsOneColumn).toEqual(resume.noNeedsOneColumn)

    const noNeedsTwoColumn = store.getState().drag.noNeedsTwoColumn
    expect(noNeedsTwoColumn).toEqual(resume.noNeedsTwoColumn)

    const pages = store.getState().block.pages
    expect(pages).toEqual(resume.pagesTwoColumn)
  })
})
