import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { InputType } from '../../../types/Input';
import { useBlock } from '../../organisms/Block/BlockProvider';
import './input.scss';
import {
  BlockContentControlType,
  BlockUpdateState,
  controlBlockBullet,
  updateBlock,
} from '../../organisms/Block/block.slice';
import { Common, DetailDetail } from '../../../types/Block';
import { KeyEvent } from '../../../types/KeyEvent';
import { RootState } from '../../../store';

export interface InputProps {
  className?: string;
  type: string;
  data: Common | DetailDetail;
  title?: JSX.Element;
  blockChildIndex: number;
}

export const Input = ({ className, type, title, data, blockChildIndex }: InputProps) => {
  const uid = data.uid;
  const id = data.id.split('/')[0];
  const textVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].text;
    else return data.text;
  }, [data, type]);

  const placeHolderVal = useMemo(() => {
    if (type !== InputType.contentBullet) return data[type].placeHolder;
    else return data.placeHolder;
  }, [data, type]);

  const ref = useRef<HTMLDivElement>(null);
  const html = useRef('');
  const [placeHolder, setPlaceHolder] = useState('');
  const { handleShowBlockContentBar, handleShowBlockHeaderBar, selectedBlock } = useBlock();
  const block = useSelector((state: RootState) => state.block);
  const dispatch = useDispatch();

  useEffect(() => {
    setPlaceHolder(placeHolderVal);
  }, [placeHolderVal]);

  useEffect(() => {
    html.current = textVal;
  }, [textVal]);

  useEffect(() => {
    if (block.selectedBulletBlock.blockBulletUid === uid) {
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, [ref, block.selectedBulletBlock.blockBulletUid, uid]);

  const handleChange = (evt: ContentEditableEvent) => {
    const value = evt.target.value;
    const clone: BlockUpdateState = {
      data,
      type,
      value,
    };
    dispatch(updateBlock(clone));
    html.current = value;
  };

  const onFocus = () => {
    if (type === InputType.header) handleShowBlockHeaderBar(type, id, blockChildIndex);
    else {
      handleShowBlockContentBar(type, id, blockChildIndex);
    }
  };

  const onKeyDown = (evt: React.KeyboardEvent) => {
    if (type !== InputType.contentBullet) return;
    if (evt.key === KeyEvent.ENTER) {
      evt.preventDefault();
      dispatch(
        controlBlockBullet({
          blockCreateId: id,
          blockBulletUid: uid || '',
          blockBulletStatus: BlockContentControlType.CREATE,
        })
      );
    } else if (evt.key === KeyEvent.DELETE) {
      if (html.current.length === 0) {
        dispatch(
          controlBlockBullet({
            blockCreateId: id,
            blockBulletUid: uid || '',
            blockBulletStatus: BlockContentControlType.DELETE,
          })
        );
      }
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
        innerRef={ref}
        html={html.current}
        placeholder={placeHolder}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
