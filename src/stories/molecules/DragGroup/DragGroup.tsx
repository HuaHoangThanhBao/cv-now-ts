import { BlockChildren } from 'src/types/Block'
import { DragColumnPosition } from '../../../types/Drag'
import { useDrag } from '../../organisms/Drag/DragProvider'
import classNames from 'classnames'
import './dragGroup.scss'

export interface DragGroupProps extends DragColumnPosition, BlockChildren {
  className?: string
  page: string[][]
  pageI: number
}

export const DragGroup = ({ children, page, pageI, className }: DragGroupProps) => {
  const { dragging, handleDragEnter } = useDrag()
  return (
    <div
      className={classNames('drag-group', `${className || ''}`)}
      onDragEnter={
        dragging && !page.length
          ? (e) => handleDragEnter(e, { page, pageI, itemI: 0 })
          : () => undefined
      }
    >
      {children}
    </div>
  )
}
