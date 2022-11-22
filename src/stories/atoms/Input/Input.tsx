import { createRef, useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { InputType } from '../../../types/Input';
import { useBlock } from '../../organisms/Block/BlockProvider';
import './input.scss';
import { BlockUpdateState, updateBlock } from '../../organisms/Block/block.slice';

export interface InputProps {
  className?: string;
  detailChild?: any;
  type: string;
  data?: any;
  title?: any;
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
  const textVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].text;
    else return detailChild.text;
  }, [data, detailChild, type]);
  const placeHolderVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].placeHolder;
    else return detailChild.placeHolder;
  }, [data, detailChild, type]);

  const contentEditable = createRef<any>();
  const [html, setHTML] = useState(textVal);
  const [placeHolder, setPlaceHolder] = useState('');
  const { handleShowBlockContentBar, handleShowBlockHeaderBar } = useBlock();

  const dispatch = useDispatch();

  useEffect(() => {
    setPlaceHolder(placeHolderVal);
  }, [placeHolderVal]);

  const handleChange = (evt: any) => {
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
    if (type === InputType.header) handleShowBlockHeaderBar(type, data.id, blockChildIndex);
    else {
      handleShowBlockContentBar(type, data.id, blockChildIndex);
    }
  };

  return (
    <div className={`field${title ? ' title' : ''}`}>
      {title && title}
      {detailChild && <span className="field-bullet"></span>}
      <ContentEditable
        className={`field-input ${type}${className ? ` ${className}` : ''}${
          detailChild ? ` detail` : ''
        }`}
        innerRef={contentEditable}
        html={html}
        placeholder={placeHolder}
        onChange={handleChange}
        onFocus={onFocus}
      />
    </div>
  );
};
