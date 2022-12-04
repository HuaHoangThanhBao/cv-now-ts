import React from 'react';
import { Common } from '../../../types/Block';
import { useBlock } from '../../organisms/Block/BlockProvider';

export interface BlockContentProps {
  data?: Common;
  blockChildIndex: number;
  children?: JSX.Element | JSX.Element[];
}

export const BlockContent = ({ children, ...props }: BlockContentProps) => {
  const { data, blockChildIndex } = props;
  const { showBlockContentBar, selectedBlock } = useBlock();
  if (
    data?.id !== selectedBlock.selectedBlock.blockId ||
    blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
  ) {
    return null;
  } else if (showBlockContentBar) return <div className="block-content">{children}</div>;
  else return null;
};
