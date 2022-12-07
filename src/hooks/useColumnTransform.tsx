import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onMovingBlock } from '../stories/organisms/Block/block.slice';
import { updateDragPages } from '../stories/organisms/Drag/drag.slice';
import { moveChildBlockToParentBlock } from '../utils';
import { useTransformPages } from './useTransformPages';

export const useColumnTransform = (): [() => void] => {
  const blockState = useSelector((state: RootState) => state.block);
  const [callTransformPages] = useTransformPages({
    isOneColumn: blockState.isOneColumn || false,
    pagesOneColumn: blockState.pagesOneColumn,
    pagesTwoColumn: blockState.pagesTwoColumn,
  });
  const dispatch = useDispatch();

  const onChangeColumnTransform = () => {
    const status = !blockState.isOneColumn;
    let newPagesTransform: string[][][] = [];
    if (status) {
      newPagesTransform = blockState.pagesOneColumn;
    } else {
      newPagesTransform = blockState.pagesTwoColumn;
    }
    /*Move child to parent*/
    newPagesTransform = newPagesTransform.map((page: string[][]) =>
      page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
    );
    newPagesTransform = moveChildBlockToParentBlock(newPagesTransform, blockState);
    /**/
    callTransformPages(newPagesTransform, newPagesTransform, status);
    dispatch(onMovingBlock(true));
    dispatch(updateDragPages({ pages: newPagesTransform }));
  };

  return [onChangeColumnTransform];
};
