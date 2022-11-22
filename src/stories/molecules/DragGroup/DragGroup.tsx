import { useDrag } from '../../organisms/Drag/DragProvider';
import './dragGroup.scss';

export interface DragGroupProps {
  page: any;
  pageI: any;
  children?: JSX.Element | JSX.Element[];
}

export const DragGroup = ({ children, page, pageI }: DragGroupProps) => {
  const { dragging, handleDragEnter } = useDrag();
  return (
    <div
      className="drag-group"
      onDragEnter={
        dragging && !page.length ? (e) => handleDragEnter(e, { page, pageI, itemI: 0 }) : () => {}
      }
    >
      {children}
    </div>
  );
};
