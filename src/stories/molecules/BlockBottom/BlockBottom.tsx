import React from 'react';
import './blockBottom.scss';

export interface BlockBottomProps {
  children?: JSX.Element | JSX.Element[];
}

export const BlockBottom = ({ children, ...props }: BlockBottomProps) => {
  return <div className="block-bottom">{children}</div>;
};
