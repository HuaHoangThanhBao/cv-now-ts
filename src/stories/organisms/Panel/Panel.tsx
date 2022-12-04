import { ReactNode } from 'react';
import './panel.scss';

interface PanelProps {
  className?: string;
  backgroundColor?: string;
  children?: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
}

export const Panel = ({ backgroundColor, className, children }: PanelProps) => {
  return (
    <div className={`panel ${className}`} style={{ backgroundColor }}>
      {children}
    </div>
  );
};
