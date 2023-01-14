import { DragPosition } from 'src/types/Drag'
import { useDrag } from '../../organisms/Drag/DragProvider'
import './dragItem.scss'

export const DragItem = ({ page, pageI, column, columnI, block, blockI }: DragPosition) => {
  const { dragging, draggingNoNeed, handleDragStart, handleDragEnter, getStyles, getNoNeedStyles } =
    useDrag()
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, { page, pageI, column, columnI, block, blockI })}
      onDragEnter={
        dragging || draggingNoNeed
          ? (e) => {
              handleDragEnter(e, { page, pageI, column, columnI, block, blockI })
            }
          : () => undefined
      }
      className={
        dragging
          ? getStyles({ pageI, columnI, blockI, block })
          : `drag-item ${getNoNeedStyles({ pageI, columnI, blockI, block })}`
      }
    >
      {block}
    </div>
  )
}
