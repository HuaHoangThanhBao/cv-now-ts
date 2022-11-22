import React, { ReactNode } from 'react';
import './document.scss';

interface DocumentProps {
  className?: string;
  backgroundColor?: string;
  children?: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
}

export const Document = ({ backgroundColor, className, children }: DocumentProps) => {
  return (
    <div className={`document ${className}`} style={{ backgroundColor }}>
      {children}
    </div>
  );
};
