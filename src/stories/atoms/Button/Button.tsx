import React, { ReactComponentElement } from 'react';
import './button.scss';

interface ButtonProps {
  icon?: ReactComponentElement<any>;
  className?: string;
  backgroundColor?: string;
  text: string;
  onClick?: () => void;
}

export const Button = ({
  icon,
  className = '',
  backgroundColor,
  text = '',
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`btn ${className ? className : ''}`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {icon && icon}
      {text}
    </button>
  );
};
