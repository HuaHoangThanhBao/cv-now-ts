import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { DragPosition } from '../../../types/Drag'
import { DragProvider } from './DragProvider'
import { v4 as uuidv4 } from 'uuid'
import { useOnClickOutside } from '../../../hooks'

interface DragProps {
  setOption: (option: string) => void
}

export const Drag = ({ setOption }: DragProps) => {
  const pages = useSelector((state: RootState) => state.drag.pages)
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    setOption('')
  })

  const getFirstColumn = () => {
    const res: DragPosition[] = []
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        for (let z = 0; z < pages[i][j].length; z++) {
          if (j === 0 && pages[i][j][z] && !pages[i][j][z].includes('/')) {
            res.push({
              page: pages[i],
              pageI: i,
              column: pages[i][j],
              columnI: j,
              block: pages[i][j][z],
              blockI: z
            })
          }
        }
      }
    }
    return res
  }
  const getSecondColumn = () => {
    const res: DragPosition[] = []
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        for (let z = 0; z < pages[i][j].length; z++) {
          if (j === 1 && pages[i][j][z] && !pages[i][j][z].includes('/')) {
            res.push({
              page: pages[i],
              pageI: i,
              column: pages[i][j],
              columnI: j,
              block: pages[i][j][z],
              blockI: z
            })
          }
        }
      }
    }
    return res
  }

  const renderDragGroup = () => {
    if (pages[0].length <= 1) {
      return pages.map((page: string[][], pageI: number) =>
        page.map((column: string[], columnI: number) => {
          if (!column.every((item: string) => item.includes('/'))) {
            return (
              <DragProvider.Group
                key={column.length + columnI}
                page={page}
                pageI={pageI}
                className={columnI % 2 === 0 ? 'even' : 'odd'}
              >
                {column.map((block: string, blockI: number) => {
                  if (!block.includes('/'))
                    return (
                      <DragProvider.Item
                        key={block}
                        page={page}
                        pageI={pageI}
                        column={column}
                        columnI={columnI}
                        block={block}
                        blockI={blockI}
                      />
                    )
                  else return <React.Fragment key={uuidv4()} />
                })}
              </DragProvider.Group>
            )
          } else return <React.Fragment key={uuidv4()} />
        })
      )
    } else {
      const firstColumn: DragPosition[] = getFirstColumn()
      const secondColumn: DragPosition[] = getSecondColumn()
      return (
        <>
          <DragProvider.Group page={firstColumn[0].page} pageI={0}>
            {firstColumn.map((item: DragPosition) => (
              <DragProvider.Item
                key={item.block}
                page={item.page}
                pageI={item.pageI}
                column={item.column}
                columnI={item.columnI}
                block={item.block}
                blockI={item.blockI}
              />
            ))}
          </DragProvider.Group>
          <DragProvider.Group page={secondColumn[0].page} pageI={1}>
            {secondColumn.map((item: DragPosition) => (
              <DragProvider.Item
                key={item.block}
                page={item.page}
                pageI={item.pageI}
                column={item.column}
                columnI={item.columnI}
                block={item.block}
                blockI={item.blockI}
              />
            ))}
          </DragProvider.Group>
        </>
      )
    }
  }

  if (pages) {
    return (
      <div ref={ref}>
        <DragProvider>{renderDragGroup()}</DragProvider>
      </div>
    )
  } else return null
}
