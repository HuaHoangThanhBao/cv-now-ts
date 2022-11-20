import React from 'react';
import './blockBar.scss';
import { Icon } from '../../atoms/Icon/Icon';
import { useBlock } from '../../organisms/Block/BlockProvider';

export interface BlockBarProps {
  isUnActive?: boolean;
}

export const BlockBar = ({ isUnActive }: BlockBarProps) => {
  const { showBlockContentBar, showBlockHeaderBar } = useBlock();
  if (isUnActive) return null;
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
