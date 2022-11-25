import './blockBar.scss';
import { Icon } from '../../atoms/Icon/Icon';
import { useBlock } from '../../organisms/Block/BlockProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { moveBlock, updatePages } from '../../organisms/Block/block.slice';
import {
  insertChildsToAfterParent,
  moveChildToParent,
  movingBlockDown,
  movingBlockUp,
} from '../../../utils';

export interface BlockBarProps {
  blockId: string;
  blockChildIndex?: number;
}

export const BlockBar = ({ blockId, blockChildIndex }: BlockBarProps) => {
  const { showBlockContentBar, showBlockHeaderBar, handleDisableBlockContentBar, selectedBlock } =
    useBlock();
  const pages = useSelector((state: RootState) => state.block.pages);
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

  if (
    blockId !== selectedBlock.selectedBlock.blockId ||
    blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
  )
    return null;
  if (showBlockContentBar) {
    return (
      <div className="block-bar">
        <Icon iconType={'add'} className={'block-bar-icon'} />
        <Icon iconType={'bold'} className={'block-bar-icon'} />
        <Icon iconType={'italic'} className={'block-bar-icon'} />
        <Icon iconType={'underline'} className={'block-bar-icon'} />
        <Icon iconType={'move-up'} className={'block-bar-icon'} />
        <Icon iconType={'move-down'} className={'block-bar-icon'} />
        <Icon iconType={'trash'} className={'block-bar-icon'} />
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
