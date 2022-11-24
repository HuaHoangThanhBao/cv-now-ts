import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { useBlock } from '../../organisms/Block/BlockProvider';
import './blockBottom.scss';

export interface BlockBottomProps {
  blockId: string;
  blockChildIndex: number;
  children?: JSX.Element | JSX.Element[];
}

export const BlockBottom = ({ children, ...props }: BlockBottomProps) => {
  const { blockId, blockChildIndex } = props;
  const { showBlockContentBar, selectedBlock } = useBlock();
  if (
    blockId !== selectedBlock.selectedBlock.blockId ||
    blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
  )
    return null;
  else if (showBlockContentBar) {
    return (
      <div className="block-bottom">
        <Icon iconType={'add'} />
        <div className="block-bottom-box line">
          <div className="block-bottom-line"></div>
        </div>
        <div className="block-bottom-box circle">
          <div className="block-bottom-small-circle"></div>
        </div>
        {children}
      </div>
    );
  } else return null;
};
