import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { DragItem } from '../../atoms/DragItem';
import { DragItemProps } from '../../atoms/DragItem/DragItem';
import { DragGroup, DragGroupProps } from '../../molecules/DragGroup/DragGroup';
import { BlockMoveType, movingBlock, onMovingBlock } from '../Block/block.slice';
import './drag.scss';
import { updateDragPages } from './drag.slice';

interface IDragContext {
  dragging: boolean;
  dragItem: any;
  dragItemNode: any;
  handleDragStart: (e: any, item: any) => void;
  handleDragEnter: (e: any, targetItem: any) => void;
  handleDragEnd: (e: any) => void;
  getStyles: (item: any) => string;
}

interface DragComposition {
  Item?: React.FC<DragItemProps>;
  Group?: React.FC<DragGroupProps>;
  children?: JSX.Element | JSX.Element[];
}

const DragContext = createContext<IDragContext>({
  dragging: false,
  dragItem: null,
  dragItemNode: null,
  handleDragStart: () => {},
  handleDragEnter: () => {},
  handleDragEnd: () => {},
  getStyles: () => '',
});

const DragProvider = (props: DragComposition) => {
  const pages = useSelector((state: RootState) => state.drag.pages);
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const [isFinishDrag, setIsFinishDrag] = useState(false);
  const dragItem = useRef<any>();
  const dragItemNode = useRef<any>();
  const currentDragItem = useRef<any>();

  const handleDragStart = (e: any, item: any) => {
    // console.log('item', item);
    // console.log('Starting to drag', item);

    setIsFinishDrag(false);
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    currentDragItem.current = item;
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e: any, targetItem: any) => {
    const _pages = JSON.parse(JSON.stringify(pages));
    // console.log('Entering a drag target', targetItem);
    if (dragItemNode.current !== e.target) {
      // console.log('Target is NOT the same as dragged item');
      _pages[targetItem.pageI][targetItem.columnI].splice(
        targetItem.blockI,
        0,
        _pages[dragItem.current.pageI][dragItem.current.columnI].splice(
          dragItem.current.blockI,
          1
        )[0]
      );
      dragItem.current = targetItem;
      dispatch(updateDragPages({ pages: [..._pages] }));
    }
  };

  const handleDragEnd = (e: any) => {
    setDragging(false);
    setIsFinishDrag(true);
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
  };

  const getStyles = (item: any) => {
    if (
      dragItem.current.pageI === item.pageI &&
      dragItem.current.columnI === item.columnI &&
      dragItem.current.blockI === item.blockI
    ) {
      return 'drag-item current';
    }
    return 'drag-item';
  };

  useEffect(() => {
    if (isFinishDrag) {
      dispatch(
        movingBlock({
          blockMovingId: currentDragItem.current.block,
          blockMoveType: BlockMoveType.drag,
          targetItem: dragItem.current,
        })
      );
      dispatch(onMovingBlock(true));
      dragItem.current = null;
      dragItemNode.current = null;
    }
  }, [isFinishDrag]);

  const value = {
    dragItem,
    dragItemNode,
    dragging,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    getStyles,
  };

  return (
    <DragContext.Provider value={value} {...props}>
      <div className={`drag-n-drop ${pages[0].length === 1 ? 'one-column' : ''}`}>
        {props.children}
      </div>
    </DragContext.Provider>
  );
};

const useDrag = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDrag must be used within Drag');
  }
  return context;
};

DragProvider.Group = DragGroup;
DragProvider.Item = DragItem;

export { useDrag, DragProvider };
