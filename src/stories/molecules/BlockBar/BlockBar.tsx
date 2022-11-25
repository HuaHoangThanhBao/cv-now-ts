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
  const moveContentUp = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    let found = false;
    let movingChild: any = null;
    for (let a = 0; a < _pages.length; a++) {
      for (let b = 0; b < _pages[a].length; b++) {
        for (let c = 0; c < _pages[a][b].length; c++) {
          if (_pages[a][b][c] === block) {
            console.log(a, b, c);
            movingChild = { pageI: a, columnI: b, blockI: c, block: _pages[a][b][c] };
          }
        }
        if (found) break;
      }
      if (found) break;
    }
    found = false;
    for (let a = 0; a < _pages.length; a++) {
      for (let b = 0; b < _pages[a].length; b++) {
        for (let c = 0; c < _pages[a][b].length; c++) {
          const num = Number(_pages[a][b][c].split('/')[0]);
          const numChild = Number(movingChild.block.split('/')[0]);
          if (num === numChild) {
            if (c < movingChild.blockI || a !== movingChild.pageI) {
              _pages[movingChild.pageI][movingChild.columnI].splice(movingChild.blockI, 1);
              _pages[a][b].splice(c, 0, movingChild.block);
              found = true;
              break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }
    }
    console.log('pages after move up content:', _pages);
    handleDisableBlockContentBar();
    dispatch(updatePages({ pages: [..._pages] }));
    dispatch(moveBlock({ isMovingBlock: true }));
  };
  const moveContentDown = () => {
    let _pages = JSON.parse(JSON.stringify(pages));
    let found = false;
    let movingChild: any = null;
    for (let a = 0; a < _pages.length; a++) {
      for (let b = 0; b < _pages[a].length; b++) {
        for (let c = 0; c < _pages[a][b].length; c++) {
          if (_pages[a][b][c] === block) {
            console.log(a, b, c);
            movingChild = { pageI: a, columnI: b, blockI: c, block: _pages[a][b][c] };
          }
        }
        if (found) break;
      }
      if (found) break;
    }
    found = false;
    for (let a = 0; a < _pages.length; a++) {
      for (let b = 0; b < _pages[a].length; b++) {
        for (let c = 0; c < _pages[a][b].length; c++) {
          const num = Number(_pages[a][b][c].split('/')[0]);
          const numChild = Number(movingChild.block.split('/')[0]);
          if (num === numChild) {
            if (c > movingChild.blockI || a !== movingChild.pageI) {
              _pages[a][b].splice(c + 1, 0, movingChild.block);
              _pages[movingChild.pageI][movingChild.columnI].splice(movingChild.blockI, 1);
              found = true;
              break;
            }
          }
          if (found) break;
        }
        if (found) break;
      }
    }
    console.log('pages after move down content:', _pages);
    handleDisableBlockContentBar();
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
        {blockChildIndex !== 0 && (
          <Icon iconType={'move-up'} className={'block-bar-icon'} onClick={moveContentUp} />
        )}
        {blockChildIndex !== 0 && (
          <Icon iconType={'move-down'} className={'block-bar-icon'} onClick={moveContentDown} />
        )}
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
