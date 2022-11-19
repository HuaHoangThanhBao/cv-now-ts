import React, { createRef, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import './input.scss';

interface InputProps {
  className: string;
  placeHolder: string;
}

export const Input = ({ className, placeHolder = 'Input here...' }: InputProps) => {
  const inputRef = useRef();
  const contentEditable = createRef<any>();
  const [html, setHTML] = useState('');
  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setHTML(value);
  };
  return (
    <ContentEditable
      className={`field-input ${className ? ` ${className}` : ''}`}
      innerRef={contentEditable}
      html={html}
      placeholder={placeHolder}
      onChange={handleChange}
      //   onKeyUp={handleKeyUp}
      //   onKeyDown={handleKeyDown}
      //   onMouseDown={handleMouseDown}
      //   onFocus={handleFocus}
    />
  );
};
