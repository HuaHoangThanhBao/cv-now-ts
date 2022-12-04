import { useDispatch } from 'react-redux';
import {
  BlockInitialState,
  onMovingBlock,
  updatePages,
} from '../stories/organisms/Block/block.slice';
import { moveChildBlockToParentBlock } from '../utils';
import { useTransformPages } from './useTransformPages';

interface MoveChild {
  pages: string[][][];
  state: BlockInitialState;
}

export const useMoveChild = ({
  pages,
  state,
}: MoveChild): [() => string[][][], () => string[][][]] => {
  const [callTransformPages] = useTransformPages({
    isOneColumn: state.isOneColumn || false,
    pagesOneColumn: [],
    pagesTwoColumn: [],
  });
  const dispatch = useDispatch();

  const moveChildBefore = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    callTransformPages(_pages, _pages);
    _pages = _pages.map((page: string[][]) =>
      page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
    );
    /*Move child to parent*/
    _pages = moveChildBlockToParentBlock(_pages, state);
    /**/
    dispatch(updatePages({ pages: [..._pages] }));
    dispatch(onMovingBlock(true));
    return _pages;
  };

  const moveChildAfter = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    _pages = _pages.map((page: string[][]) =>
      page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
    );
    /*Move child to parent*/
    _pages = moveChildBlockToParentBlock(_pages, state);
    /**/
    return _pages;
  };

  return [moveChildBefore, moveChildAfter];
};
