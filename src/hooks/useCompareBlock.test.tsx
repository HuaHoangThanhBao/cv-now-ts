import { renderHook, act, cleanup } from '@testing-library/react'
import { Wrapper } from 'src/utils/test-utils'
import { useCompareBlock } from './useCompareBlock'
import { store } from 'src/store'
import { convert } from 'src/utils'

afterEach(cleanup)

describe('useCompareBlock', () => {
  test('should render rook', () => {
    const { result } = renderHook(useCompareBlock, { wrapper: Wrapper })
    expect(result).toBeDefined()
  })
  test('test if block data has changes', () => {
    const blockId = '1'
    const blocks = store.getState().block
    const blockArr = convert(blockId, blocks)
    const blockRoot = JSON.parse(JSON.stringify(blockArr[0]))
    blockRoot.header.text = 'new test'
    const { result } = renderHook(useCompareBlock, {
      initialProps: {
        ...blockRoot
      },
      wrapper: Wrapper
    })
    act(() => {
      result.current.set(blockId, blockRoot.uid)
      const isEqual = result.current.compare()
      expect(isEqual).toBe(false)
    })
  })
  test('test if block data has not changes', () => {
    const blockId = '1'
    const blocks = store.getState().block
    const blockArr = convert(blockId, blocks)
    const blockRoot = blockArr[0]
    const { result } = renderHook(useCompareBlock, {
      initialProps: {
        ...blockRoot
      },
      wrapper: Wrapper
    })
    result.current.set(blockId, blockRoot.uid)

    const isEqual = result.current.compare()
    expect(isEqual).toBe(true)
  })
  test('test if no block uid found', () => {
    const blockId = '1'
    const blocks = store.getState().block
    const blockArr = convert(blockId, blocks)
    const blockRoot = blockArr[0]
    const { result } = renderHook(useCompareBlock, {
      initialProps: {
        ...blockRoot
      },
      wrapper: Wrapper
    })

    const isEqual = result.current.compare()
    expect(isEqual).toBe(true)
  })
  test('test call update block api', async () => {
    const blocks = store.getState().block
    const { result } = renderHook(useCompareBlock, {
      wrapper: Wrapper
    })
    const updatedBlock = await act(() => result.current.send())
    expect(updatedBlock.education).toEqual(blocks.education)
    expect(updatedBlock.workExperience).toEqual(blocks.workExperience)
    expect(updatedBlock.organization).toEqual(blocks.organization)
    expect(updatedBlock.certificate).toEqual(blocks.certificate)
    expect(updatedBlock.personalProject).toEqual(blocks.personalProject)
    expect(updatedBlock.achievement).toEqual(blocks.achievement)
    expect(updatedBlock.conference).toEqual(blocks.conference)
    expect(updatedBlock.award).toEqual(blocks.award)
    expect(updatedBlock.teachingExperience).toEqual(blocks.teachingExperience)
    expect(updatedBlock.volunteer).toEqual(blocks.volunteer)
    expect(updatedBlock.support).toEqual(blocks.support)
    expect(updatedBlock.language).toEqual(blocks.language)
    expect(updatedBlock.publication).toEqual(blocks.publication)
    expect(updatedBlock.skill).toEqual(blocks.skill)
    expect(updatedBlock.interest).toEqual(blocks.interest)
    expect(updatedBlock.softSkill).toEqual(blocks.softSkill)
    expect(updatedBlock.reference).toEqual(blocks.reference)
  })
})
