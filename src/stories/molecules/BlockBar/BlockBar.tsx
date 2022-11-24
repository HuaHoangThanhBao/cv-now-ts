import React from 'react';
import './blockBar.scss';
import { Icon } from '../../atoms/Icon/Icon';
import { useBlock } from '../../organisms/Block/BlockProvider';

export interface BlockBarProps {
  blockId: string;
  blockChildIndex?: number;
}

export const BlockBar = ({ blockId, blockChildIndex }: BlockBarProps) => {
  const { showBlockContentBar, showBlockHeaderBar, selectedBlock } = useBlock();
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
        <Icon iconType={'move-up'} className={'block-bar-icon'} />
        <Icon iconType={'move-down'} className={'block-bar-icon'} />
        <Icon iconType={'trash'} className={'block-bar-icon'} />
      </div>
    );
  }
  return null;
};
