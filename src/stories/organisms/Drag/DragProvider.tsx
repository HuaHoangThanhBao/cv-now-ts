import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { DragColumnPosition, DragPosition } from '../../../types/Drag';
import { moveChildBlockToParentBlock } from '../../../utils';
import { DragItem } from '../../atoms/DragItem';
import { DragItemProps } from '../../atoms/DragItem/DragItem';
import { DragGroup, DragGroupProps } from '../../molecules/DragGroup/DragGroup';
import { onMovingBlock, transformPages, updatePages } from '../Block/block.slice';
import './drag.scss';
import { updateDragPages } from './drag.slice';

interface IDragContext {
  dragging: boolean;
  dragItem: any;
  dragItemNode: any;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: DragPosition) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetItem: any) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  getStyles: (item: DragColumnPosition) => string;
}

interface DragComposition {
  Item?: React.FC<DragItemProps>;
  Group?: React.FC<DragGroupProps>;
  children?: JSX.Element | JSX.Element[] | JSX.Element[][];
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
  const rootBlockState = useSelector((state: RootState) => state.block);
  const pages = useSelector((state: RootState) => state.drag.pages);
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const [isFinishDrag, setIsFinishDrag] = useState(false);
  const dragItem = useRef<any>();
  const dragItemNode = useRef<any>();
  const currentDragItem = useRef<any>();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DragPosition) => {
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
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetItem: any) => {
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
      dispatch(updateDragPages({ pages: _pages }));
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    setIsFinishDrag(true);
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
  };

  const getStyles = (item: DragColumnPosition) => {
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
      let _pages = JSON.parse(JSON.stringify(pages));
      dispatch(
        transformPages({
          isOneColumn: rootBlockState.isOneColumn,
          pagesOneColumn: _pages,
          pagesTwoColumn: _pages,
        })
      );
      _pages = _pages.map((page: string[][]) =>
        page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
      );
      /*Move child to parent*/
      _pages = moveChildBlockToParentBlock(_pages, rootBlockState);
      /**/
      dispatch(updatePages({ pages: _pages }));
      dispatch(onMovingBlock(true));
      dragItem.current = null;
      dragItemNode.current = null;
    }
  }, [isFinishDrag, dispatch]);

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
