import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Common } from '../types/Block';
import { InputType } from '../types/Input';
import { convert } from '../utils';

export const useCompareBlock = (
  blockRoot: Common
): [(blockId: string, blockUid: string) => void, () => boolean] => {
  const currentBlock = useRef<{ blockId: string; blockUid: string }>({
    blockId: '-1',
    blockUid: '-1',
  });
  const blockState = useSelector((state: RootState) => state.block);

  const set = (blockId: string, blockUid: string) => {
    currentBlock.current = { blockId, blockUid };
  };

  //true => isEqual, false: isDifference
  const compare = (): boolean => {
    const { blockId, blockUid } = currentBlock.current;
    const blocks = convert(blockId, blockState);
    const block = blocks.find((b) => b.uid === blockUid);
    let isEqual = true;
    if (block) {
      for (let i = 0; i < Object.keys(blockRoot).length; i++) {
        const rootItem = blockRoot[Object.keys(blockRoot)[i]];
        const item = block[Object.keys(blockRoot)[i]];
        if (Object.keys(blockRoot)[i] !== InputType.CONTENT_BULLET) {
          if (rootItem.text !== item.text) {
            isEqual = false;
            break;
          }
        } else {
          for (let j = 0; j < rootItem.child.length; j++) {
            const rootChild = rootItem.child[j];
            const child = item.child[j];
            if (rootChild.text !== child.text) {
              isEqual = false;
              break;
            }
          }
        }
      }
    }
    // console.log('currentBlock:', currentBlock);
    // console.log('blocks:', blocks);
    // console.log('blockRoot:', blockRoot);
    return isEqual;
  };

  return [set, compare];
};
