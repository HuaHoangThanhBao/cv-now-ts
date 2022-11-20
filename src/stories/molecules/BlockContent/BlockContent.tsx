import React from 'react';
import { useBlock } from '../../organisms/Block/BlockProvider';

export interface BlockContentProps {
  isUnActive?: boolean;
  children?: JSX.Element | JSX.Element[];
}

export const BlockContent = ({ children, ...props }: BlockContentProps) => {
  const { isUnActive } = props;
  const { showBlockContentBar } = useBlock();
  if (isUnActive) return null;
  else if (showBlockContentBar) return <div className="block-content">{children}</div>;
  else return null;
};
