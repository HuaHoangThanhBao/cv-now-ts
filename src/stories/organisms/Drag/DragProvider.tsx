import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMoveChild } from '../../../hooks';
import { RootState } from '../../../store';
import { DragColumnPosition, DragPosition } from '../../../types/Drag';
import { DragItem } from '../../atoms/DragItem';
import { DragItemProps } from '../../atoms/DragItem/DragItem';
import { DragGroup, DragGroupProps } from '../../molecules/DragGroup/DragGroup';
import { addNewItem, removeItem, updateDragPages } from './drag.slice';
import './drag.scss';

interface IDragContext {
  dragging: boolean;
  draggingNoNeed: boolean;
  dragItem: any;
  dragItemNode: any;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, item: DragPosition) => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>, targetItem: any) => void;
  handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  getStyles: (item: DragColumnPosition) => string;
  getNoNeedStyles: (item: DragColumnPosition) => string;
}

interface DragComposition {
  Item?: React.FC<DragItemProps>;
  Group?: React.FC<DragGroupProps>;
  children?: JSX.Element | JSX.Element[] | JSX.Element[][];
}

const DragContext = createContext<IDragContext>({
  dragging: false,
  draggingNoNeed: false,
  dragItem: null,
  dragItemNode: null,
  handleDragStart: () => {},
  handleDragEnter: () => {},
  handleDragEnd: () => {},
  getStyles: () => '',
  getNoNeedStyles: () => '',
});

const DragProvider = (props: DragComposition) => {
  const blockState = useSelector((state: RootState) => state.block);
  const pages = useSelector((state: RootState) => state.drag.pages);
  const noNeedsOneColumn = useSelector((state: RootState) => state.drag.noNeedsOneColumn);
  const noNeedsTwoColumn = useSelector((state: RootState) => state.drag.noNeedsTwoColumn);
  const noNeeds = !blockState.isOneColumn ? noNeedsTwoColumn : noNeedsOneColumn;
  console.log('noNeedsTwoColumn:', noNeedsTwoColumn);
  console.log('noNeedsOneColumn:', noNeedsOneColumn);
  console.log('noNeeds:', noNeeds);

  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const isFinishDrag = useRef(false);
  const dragItem = useRef<any>();
  const dragItemNode = useRef<any>();
  const currentDragItem = useRef<any>();
  //
  const [draggingNoNeed, setDraggingNoNeed] = useState(false);
  const noNeedItem = useRef<any>();
  const noNeedItemNode = useRef<any>();
  const currentNoNeedItem = useRef<any>();

  const [moveChildBefore] = useMoveChild({ pages, state: blockState });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: DragPosition) => {
    // console.log('item', item);
    // console.log('Starting to drag', item);

    isFinishDrag.current = false;
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener('dragend', handleDragEnd);
    currentDragItem.current = item;
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const dragNoNeedStart = (e: React.DragEvent<HTMLDivElement>, item: string) => {
    isFinishDrag.current = false;
    noNeedItemNode.current = e.target;
    noNeedItemNode.current.addEventListener('dragend', handleDragNoNeedEnd);
    currentNoNeedItem.current = item;
    noNeedItem.current = item;

    setTimeout(() => {
      setDraggingNoNeed(true);
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    isFinishDrag.current = true;
    dragItemNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragItemNode.current = null;
  };

  const handleDragNoNeedEnd = () => {
    setDraggingNoNeed(false);
    isFinishDrag.current = true;
    noNeedItemNode.current.removeEventListener('dragend', handleDragNoNeedEnd);
    noNeedItem.current = null;
    noNeedItemNode.current = null;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetItem: any) => {
    if (dragging) {
      if (currentDragItem.current) {
        console.log('remove on leave');
        const { block } = currentDragItem.current;
        dispatch(removeItem({ noNeedItem: block, isOneColumn: blockState.isOneColumn || false }));
      }

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
    } else if (draggingNoNeed) {
      console.log('targetItem:', targetItem);
      //insert from no need list into pages
      console.log('currentNoNeedItem:', currentNoNeedItem);
      let _pages = JSON.parse(JSON.stringify(pages));
      const block = currentNoNeedItem.current;
      _pages = _pages.map((page: string[][]) =>
        page.map((column: string[]) => column.filter((b: string) => b !== block))
      );
      _pages[targetItem.pageI][targetItem.columnI].splice(targetItem.blockI, 0, block);
      dispatch(updateDragPages({ pages: [..._pages] }));
      dispatch(removeItem({ noNeedItem: block, isOneColumn: blockState.isOneColumn || false }));
    }
  };

  const dragToNoNeed = () => {
    if (currentDragItem.current) {
      console.log('drag pages:', pages);
      console.log('drag into no need:', currentDragItem.current);
      const { block } = currentDragItem.current;
      dispatch(addNewItem({ noNeedItem: block, isOneColumn: blockState.isOneColumn || false }));
    }
    if (currentNoNeedItem.current) {
      console.log('noNeeds:', noNeeds);
      console.log('drag pages 1:', pages);
      console.log('drag over no need:', currentNoNeedItem.current);
      const block = currentNoNeedItem.current;
      dispatch(addNewItem({ noNeedItem: block, isOneColumn: blockState.isOneColumn || false }));
    }
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

  const getNoNeedStyles = (item: DragColumnPosition) => {
    if (item.block === currentNoNeedItem.current) return 'drag-item current';
    return '';
  };

  useEffect(() => {
    if (isFinishDrag.current) {
      console.log('finsh drag');
      moveChildBefore();
      isFinishDrag.current = false;
      currentDragItem.current = null;
      currentNoNeedItem.current = null;
    }
  }, [isFinishDrag, dispatch, moveChildBefore]);

  const value = {
    dragItem,
    dragItemNode,
    dragging,
    draggingNoNeed,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    getStyles,
    getNoNeedStyles,
  };

  return (
    <DragContext.Provider value={value} {...props}>
      <div className="drag">
        <div className={`drag-n-drop ${blockState.isOneColumn ? 'one-column' : ''}`}>
          {props.children}
        </div>
        <div onDragEnter={dragToNoNeed} className="no-need">
          {noNeeds &&
            noNeeds.map((noNeed) => (
              <div
                draggable
                onDragStart={(e) => dragNoNeedStart(e, noNeed)}
                className="drag-item"
                key={noNeed}
              >
                {noNeed}
              </div>
            ))}
        </div>
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
