import { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { InputType } from '../../../types/Input';
import { useBlock } from '../../organisms/Block/BlockProvider';
import './input.scss';
import { BlockUpdateState, updateBlock } from '../../organisms/Block/block.slice';
import { Common, DetailDetail } from '../../../types/Block';

export interface InputProps {
  className?: string;
  type: string;
  data: Common | DetailDetail;
  title?: JSX.Element;
  blockChildIndex: number;
}

export const Input = ({ className, type, title, data, blockChildIndex }: InputProps) => {
  const id = data.id.split('/')[0];
  const textVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].text;
    else return data.text;
  }, [data, type]);

  const placeHolderVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].placeHolder;
    else return data.placeHolder;
  }, [data, type]);

  const [html, setHTML] = useState('');
  const [placeHolder, setPlaceHolder] = useState('');
  const { handleShowBlockContentBar, handleShowBlockHeaderBar, selectedBlock } = useBlock();
  const dispatch = useDispatch();

  useEffect(() => {
    setPlaceHolder(placeHolderVal);
  }, [placeHolderVal]);

  useEffect(() => {
    setHTML(textVal);
  }, [textVal]);

  const handleChange = (evt: ContentEditableEvent) => {
    const value = evt.target.value;
    const clone: BlockUpdateState = {
      data,
      type,
      value,
    };
    dispatch(updateBlock(clone));
    setHTML(value);
  };

  const onFocus = () => {
    if (type === InputType.header) handleShowBlockHeaderBar(type, id, blockChildIndex);
    else {
      handleShowBlockContentBar(type, id, blockChildIndex);
    }
  };

  const getFieldStatus = () => {
    if (textVal === '') {
      if (
        id !== selectedBlock.selectedBlock.blockId ||
        blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
      ) {
        return ' disable';
      }
    }
    return '';
  };

  return (
    <div className={`field${title ? ' title' : ''}${getFieldStatus()}`} onFocus={onFocus}>
      {title && title}
      {type === InputType.contentBullet && <span className="field-bullet"></span>}
      <ContentEditable
        className={`field-input ${type}${className ? ` ${className}` : ''}${
          type === InputType.contentBullet ? ` detail` : ''
        }`}
        html={html}
        placeholder={placeHolder}
        onChange={handleChange}
      />
    </div>
  );
};
