import React from 'react';

export interface BlockHeaderProps {
  children?: JSX.Element | JSX.Element[];
}

export const BlockHeader = ({ children, ...props }: BlockHeaderProps) => {
  return <div className="block-header">{children}</div>;
};
