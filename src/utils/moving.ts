import { BlockState } from '../stories/organisms/Block/block.slice'
import { Common, GlobalIterator } from '../types/Block'
import { PositionA } from '../types/Position'
import { convert } from './block'

export const getChildWithId = (pages: string[][][], blockChildId: string): PositionA => {
  let result: PositionA = { i: -1, j: -1, z: -1 }
  for (let i = 0; i < pages.length; i++) {
    for (let j = 0; j < pages[i].length; j++) {
      for (let z = 0; z < pages[i][j].length; z++) {
        const _blockContentId = pages[i][j][z]
        if (_blockContentId === blockChildId) {
          result = { i, j, z }
        }
      }
    }
  }
  return result
}

export const countTotalChildOfColumn = (pages: string[][][], columnI: number) => {
  let count = 0
  for (let i = 0; i < pages.length; i++) {
    const column = pages[i][columnI]
    for (let z = 0; z < column.length; z++) {
      count++
    }
  }
  return count
}

//This function is to move all child blocks of each block from blocks state to right after their parents
export const moveChildBlockToParentBlock = (
  pages: string[][][],
  blockState: BlockState
): string[][][] => {
  const store: string[] = []
  pages.forEach((page: string[][]) =>
    page.forEach((column: string[]) => column.forEach((block: string) => store.push(block)))
  )
  store.forEach((s: string) => {
    const blocks: Common[] = convert(s, blockState)
    const blockGroup: GlobalIterator = {}
    blocks.forEach((block: Common) => {
      const blockIdRoot = block.id
      const blockId = block.id.split('/')[0]
      if (!blockGroup[blockId as keyof number]) {
        blockGroup[blockId] = [blockIdRoot]
      } else {
        blockGroup[blockId].push(blockIdRoot)
      }
    })
    for (const [key, block] of Object.entries(blockGroup)) {
      let found = false
      for (let a = 0; a < pages.length; a++) {
        for (let b = 0; b < pages[a].length; b++) {
          for (let c = 0; c < pages[a][b].length; c++) {
            const _block = pages[a][b][c].split('/')[0]
            if (_block === key) {
              pages[a][b].splice(c + 1, 0, ...block)
              pages[a][b].splice(c, 1)
              found = true
              break
            }
          }
          if (found) break
        }
        if (found) break
      }
    }
  })
  return pages
}
