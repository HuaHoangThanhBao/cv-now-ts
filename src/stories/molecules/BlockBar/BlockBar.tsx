import './blockBar.scss';
import { Icon } from '../../atoms/Icon/Icon';
import { useBlock } from '../../organisms/Block/BlockProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  moveBlock,
  moveBlockContentDown,
  moveBlockContentUp,
  updatePages,
} from '../../organisms/Block/block.slice';
import {
  convert,
  insertChildsToAfterParent,
  moveChildToParent,
  movingBlockChildDown,
  movingBlockChildUp,
  movingBlockDown,
  movingBlockUp,
} from '../../../utils';
import { Common } from '../../../types/Block';

export interface BlockBarProps {
  block: string;
  blockId: string;
  blockChildIndex: number;
}

export const BlockBar = ({ block, blockId, blockChildIndex }: BlockBarProps) => {
  const {
    showBlockContentBar,
    showBlockHeaderBar,
    handleDisableBlockContentBar,
    selectedBlock,
    handleCreateBlock,
  } = useBlock();
  const rootBlockState = useSelector((state: RootState) => state.block);
  const pages = useSelector((state: RootState) => state.block.pages);
  let blocks: Common[] = convert(blockId, rootBlockState);
  const dispatch = useDispatch();
  const moveBlockUp = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    const { parents, group } = moveChildToParent(_pages);
    movingBlockUp(parents, blockId);
    insertChildsToAfterParent(parents, group);
    handleDisableBlockContentBar();
    dispatch(updatePages({ pages: [...parents] }));
    dispatch(moveBlock({ isMovingBlock: true }));
  };
  const moveBlockDown = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    const { parents, group } = moveChildToParent(_pages);
    movingBlockDown(parents, blockId);
    insertChildsToAfterParent(parents, group);
    handleDisableBlockContentBar();
    dispatch(updatePages({ pages: [...parents] }));
    dispatch(moveBlock({ isMovingBlock: true }));
  };
  const moveContentUp = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    movingBlockChildUp(_pages, block);
    console.log('pages after move up content:', _pages);
    handleDisableBlockContentBar();
    dispatch(moveBlockContentUp(block));
    dispatch(updatePages({ pages: [..._pages] }));
    dispatch(moveBlock({ isMovingBlock: true }));
  };
  const moveContentDown = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    movingBlockChildDown(_pages, block);
    console.log('pages after move down content:', _pages);
    handleDisableBlockContentBar();
    dispatch(moveBlockContentDown(block));
    dispatch(updatePages({ pages: [..._pages] }));
    dispatch(moveBlock({ isMovingBlock: true }));
  };

  const onCreateBlock = () => {
    handleCreateBlock(blockId);
  };

  if (
    blockId !== selectedBlock.selectedBlock.blockId ||
    blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
  )
    return null;
  if (showBlockContentBar) {
    return (
      <div className="block-bar">
        <Icon iconType={'add'} className={'block-bar-icon'} onClick={onCreateBlock} />
        <Icon iconType={'bold'} className={'block-bar-icon'} />
        <Icon iconType={'italic'} className={'block-bar-icon'} />
        <Icon iconType={'underline'} className={'block-bar-icon'} />
        {blockChildIndex !== 0 && blockChildIndex > 1 && (
          <Icon iconType={'move-up'} className={'block-bar-icon'} onClick={moveContentUp} />
        )}
        {blockChildIndex !== 0 && blockChildIndex < blocks.length - 1 && (
          <Icon iconType={'move-down'} className={'block-bar-icon'} onClick={moveContentDown} />
        )}
        {blockChildIndex !== 0 && <Icon iconType={'trash'} className={'block-bar-icon'} />}
      </div>
    );
  } else if (showBlockHeaderBar) {
    return (
      <div className="block-bar">
        <Icon iconType={'bold'} className={'block-bar-icon'} />
        <Icon iconType={'italic'} className={'block-bar-icon'} />
        <Icon iconType={'underline'} className={'block-bar-icon'} />
        <Icon iconType={'move-up'} className={'block-bar-icon'} onClick={moveBlockUp} />
        <Icon iconType={'move-down'} className={'block-bar-icon'} onClick={moveBlockDown} />
        <Icon iconType={'trash'} className={'block-bar-icon'} />
      </div>
    );
  }
  return null;
};
