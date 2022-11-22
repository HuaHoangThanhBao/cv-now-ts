import { useDrag } from '../../organisms/Drag/DragProvider';
import './dragItem.scss';

export interface DragItemProps {
  page: any;
  pageI: any;
  column: any;
  columnI: any;
  block: any;
  blockI: any;
}

export const DragItem = ({ page, pageI, column, columnI, block, blockI }: DragItemProps) => {
  const { dragging, handleDragStart, handleDragEnter, getStyles } = useDrag();
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, { page, pageI, column, columnI, block, blockI })}
      onDragEnter={
        dragging
          ? (e) => {
              handleDragEnter(e, { page, pageI, column, columnI, block, blockI });
            }
          : () => {}
      }
      className={dragging ? getStyles({ pageI, columnI, blockI }) : 'drag-item'}
    >
      {block}
    </div>
  );
};
