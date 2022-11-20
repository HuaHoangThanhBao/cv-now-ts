import React, { ReactNode } from 'react';
import './document.scss';

interface DocumentProps {
  backgroundColor?: string;
  children?: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
}

export const Document = ({ backgroundColor, children }: DocumentProps) => {
  return (
    <div className="document" style={{ backgroundColor }}>
      {children}
    </div>
  );
};
