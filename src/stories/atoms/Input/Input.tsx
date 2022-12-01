import React, { createRef, useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { InputType } from '../../../types/Input';
import { useBlock } from '../../organisms/Block/BlockProvider';
import './input.scss';
import { BlockUpdateState, updateBlock } from '../../organisms/Block/block.slice';
import { Common, DetailDetail, Education, Publication, WorkExperience } from '../../../types/Block';

export interface InputProps {
  className?: string;
  detailChild?: DetailDetail;
  type: string;
  data: Common;
  title?: JSX.Element;
  blockChildIndex: number;
}

export const Input = ({
  className,
  detailChild,
  type,
  title,
  data,
  blockChildIndex,
}: InputProps) => {
  const id = data.id.split('/')[0];
  const textVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].text;
    else return detailChild?.text;
  }, [data, detailChild, type]);
  const placeHolderVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].placeHolder;
    else return detailChild?.placeHolder;
  }, [data, detailChild, type]);

  // const contentEditable = createRef<any>();
  const [html, setHTML] = useState(textVal);
  const [placeHolder, setPlaceHolder] = useState('');
  const { handleShowBlockContentBar, handleShowBlockHeaderBar, selectedBlock } = useBlock();
  const dispatch = useDispatch();

  useEffect(() => {
    setPlaceHolder(placeHolderVal);
  }, [placeHolderVal]);

  const handleChange = (evt: ContentEditableEvent) => {
    const value = evt.target.value;
    const clone: BlockUpdateState = {
      data,
      type,
      value,
      child: detailChild,
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
      {detailChild && <span className="field-bullet"></span>}
      <ContentEditable
        className={`field-input ${type}${className ? ` ${className}` : ''}${
          detailChild ? ` detail` : ''
        }`}
        // innerRef={contentEditable}
        html={html}
        placeholder={placeHolder}
        onChange={handleChange}
      />
    </div>
  );
};
