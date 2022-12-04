import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onMovingBlock } from '../stories/organisms/Block/block.slice';
import { updateDragPages } from '../stories/organisms/Drag/drag.slice';
import { GlobalIterator } from '../types/Block';
import { useEffectOnce } from './useEffectOnce';
import { useMoveChild } from './useMoveChild';
import { useTransformPages } from './useTransformPages';

interface TransformBlockProps {
  pages: any;
  state: any;
  isOneColumn: boolean;
  pagesOneColumn: any;
  pagesTwoColumn: any;
  blocksRef: any;
}

export const useTransformBlock = (props: TransformBlockProps): [any, (status: boolean) => void] => {
  const { pages, state, blocksRef, isOneColumn, pagesOneColumn, pagesTwoColumn } = props;
  const isMovingBlock = useSelector((state: RootState) => state.block.isMovingBlock);
  const [pagesD, setPagesD] = useState(pages);
  const [isMovingBlockD, setIsMovingBlockD] = useState(isMovingBlock || false);
  const [callTransformPages] = useTransformPages({ isOneColumn, pagesOneColumn, pagesTwoColumn });
  const [, moveChildAfter] = useMoveChild({ pages, state });
  const dispatch = useDispatch();

  const findBlockRef = useCallback(
    (blockId: string): number => {
      let sum = 0;
      const blockIdFormat = blockId.split('/')[0];
      const blocks: GlobalIterator = blocksRef.current[Number(blockIdFormat)];
      // console.log('blocks:', blocks);
      for (let i = 0; i < Object.keys(blocks).length; i++) {
        const block = blocks[Object.keys(blocks)[i]];
        // console.log('block:', block);
        if (block.id === blockId) {
          sum += block.el.offsetHeight;
        }
      }
      return sum;
    },
    [blocksRef]
  );

  const transformBlocks = useCallback(() => {
    const maxHeight = 1000;

    /*Move child to parent*/
    let _pages = moveChildAfter();
    /**/

    let columnFirst = 0;
    let columnSecond = 1;
    /* Move first and second column to next page*/
    for (let i = 0; i < _pages.length; i++) {
      let sumFirstCol = 0;
      let sumSecondCol = 0;
      const firstColumn = _pages[i][columnFirst];
      const secondColumn = _pages[i][columnSecond];
      for (let a = 0; a < firstColumn.length; a++) {
        // console.log('firstColumn[a]:', firstColumn[a]);
        sumFirstCol += findBlockRef(firstColumn[a]);
        if (sumFirstCol > maxHeight) {
          // console.log('over:', firstColumn[a]);
          if (i < _pages.length - 1) {
            const nextFirstColumn = _pages[i + 1][columnFirst];
            for (let z = firstColumn.length - 1; z >= a; z--) {
              // console.log('firstColumn[z]:', firstColumn[z]);
              nextFirstColumn.unshift(firstColumn[z]);
            }
            firstColumn.splice(a, firstColumn.length);
            break;
          } else {
            _pages.push([[], []]);
            const nextFirstColumn = _pages[i + 1][columnFirst];
            for (let z = firstColumn.length - 1; z >= a; z--) {
              nextFirstColumn.unshift(firstColumn[z]);
            }
            firstColumn.splice(a, firstColumn.length);
            break;
          }
        }
      }
      if (_pages[0].length > 1) {
        if (secondColumn) {
          for (let a = 0; a < secondColumn.length; a++) {
            sumSecondCol += findBlockRef(secondColumn[a]);
            if (sumSecondCol > maxHeight) {
              if (i < _pages.length - 1) {
                const nextSecondColumn = _pages[i + 1][columnSecond];
                for (let z = secondColumn.length - 1; z >= a; z--) {
                  nextSecondColumn.unshift(secondColumn[z]);
                }
                secondColumn.splice(a, secondColumn.length);
                break;
              } else {
                _pages.push([[], []]);
                const nextSecondColumn = _pages[i + 1][columnSecond];
                for (let z = secondColumn.length - 1; z >= a; z--) {
                  nextSecondColumn.unshift(secondColumn[z]);
                }
                secondColumn.splice(a, secondColumn.length);
                break;
              }
            }
          }
        }
      }
    }
    /* End Move first and second column to next page*/

    console.log('--------------------------');

    /* Move first and second column to previous page*/
    for (let i = 0; i < _pages.length; i++) {
      let sumFirstCol = 0;
      let sumSecondCol = 0;
      const firstColumnDelete = [];
      const secondColumnDelete = [];
      const firstColumn = _pages[i][columnFirst];
      const secondColumn = _pages[i][columnSecond];
      for (let a = 0; a < firstColumn.length; a++) {
        sumFirstCol += findBlockRef(firstColumn[a]);
      }
      if (secondColumn) {
        for (let a = 0; a < secondColumn.length; a++) {
          sumSecondCol += findBlockRef(secondColumn[a]);
        }
      }
      if (sumFirstCol < maxHeight) {
        if (i < _pages.length - 1) {
          const nextFirstColumn = _pages[i + 1][columnFirst];
          for (let z = 0; z < nextFirstColumn.length; z++) {
            sumFirstCol += findBlockRef(nextFirstColumn[z]);
            if (sumFirstCol < maxHeight) {
              firstColumn.push(nextFirstColumn[z]);
              firstColumnDelete.push(nextFirstColumn[z]);
            } else {
              break;
            }
          }
          //remove deleted element
          for (let z = 0; z < firstColumnDelete.length; z++) {
            nextFirstColumn.shift();
          }
        }
      }
      if (_pages[0].length > 1) {
        if (sumSecondCol < maxHeight) {
          if (i < _pages.length - 1) {
            const nextSecondColumn = _pages[i + 1][columnSecond];
            for (let z = 0; z < nextSecondColumn.length; z++) {
              sumSecondCol += findBlockRef(nextSecondColumn[z]);
              if (sumSecondCol < maxHeight) {
                secondColumn.push(nextSecondColumn[z]);
                secondColumnDelete.push(nextSecondColumn[z]);
              } else {
                break;
              }
            }
            //remove deleted element
            for (let z = 0; z < secondColumnDelete.length; z++) {
              nextSecondColumn.shift();
            }
          }
        }
      }
    }
    /* End Move first and second column to previous page*/

    /* Remove empty pages */
    if (_pages[0].length > 1) {
      for (let i = _pages.length - 1; i >= 0; i--) {
        if (_pages[i][0].length === 0 && _pages[i][1].length === 0) {
          _pages.pop();
        }
      }
    } else {
      for (let i = _pages.length - 1; i >= 0; i--) {
        if (_pages[i][0].length === 0) {
          _pages.pop();
        }
      }
    }
    console.log('pages result:', _pages);
    // dispatch(updatePages({ pages: [..._pages] }));
    setPagesD(_pages);
  }, [findBlockRef, moveChildAfter]);

  const callMovingBlock = (status: boolean) => {
    setIsMovingBlockD(status);
  };

  useEffectOnce(() => {
    callMovingBlock(true);
    dispatch(onMovingBlock(true));
    callTransformPages();
  });

  useEffect(() => {
    if (isMovingBlockD) {
      transformBlocks();
      callMovingBlock(false);
      dispatch(onMovingBlock(false));
    }
  }, [dispatch, isMovingBlockD, transformBlocks]);

  useEffect(() => {
    if (isMovingBlock) {
      callMovingBlock(isMovingBlock);
    }
  }, [isMovingBlock]);

  useEffect(() => {
    setPagesD([...pages]);
    const filtered = pages.map((page: string[][]) =>
      page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
    );
    dispatch(updateDragPages({ pages: filtered }));
  }, [dispatch, pages]);

  return [pagesD, callMovingBlock];
};
