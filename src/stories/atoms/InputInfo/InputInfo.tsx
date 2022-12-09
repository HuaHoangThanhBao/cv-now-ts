import { useState, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

interface InputInfoProps {
  inputKey?: string;
  placeHolder: string;
  onInputChange?: (inputKey: string, placeHolder: string) => void;
}

export const InputInfo = (props: InputInfoProps) => {
  const { inputKey, placeHolder, onInputChange } = props;
  const [html, setHTML] = useState(placeHolder);

  useEffect(() => {
    setHTML(placeHolder);
  }, [placeHolder]);

  const handleChange = (evt: ContentEditableEvent) => {
    const value = evt.target.value;
    if (onInputChange) onInputChange(inputKey || '', value);
    setHTML(value);
  };

  return <ContentEditable className={'field-input'} html={html} onChange={handleChange} />;
};
