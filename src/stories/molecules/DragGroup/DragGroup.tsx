import { DragColumnPosition } from '../../../types/Drag'
import { useDrag } from '../../organisms/Drag/DragProvider'
import './dragGroup.scss'

export interface DragGroupProps extends DragColumnPosition {
  className?: string
  page: string[][]
  pageI: number
  children?: JSX.Element | JSX.Element[]
}

export const DragGroup = ({ children, page, pageI, className }: DragGroupProps) => {
  const { dragging, handleDragEnter } = useDrag()
  return (
    <div
      className={`drag-group ${className || ''}`}
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
