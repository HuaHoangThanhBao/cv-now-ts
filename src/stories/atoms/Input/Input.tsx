import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { InputType } from '../../../types/Input'
import { useBlock } from '../../organisms/Block/BlockProvider'
import {
  BlockContentControlType,
  BlockUpdateState,
  controlBlockBullet,
  updateBlock
} from '../../organisms/Block/block.slice'
import { Common, DetailDetail } from '../../../types/Block'
import { KeyEvent } from '../../../types/KeyEvent'
import { RootState } from '../../../store'
import { FontSize } from 'src/types/Font'
import './input.scss'

export interface InputProps {
  className?: string
  type: string
  data: Common | DetailDetail
  parentData?: Common
  title?: JSX.Element
  blockChildIndex: number
}

export const Input = ({
  className,
  type,
  title,
  data,
  parentData,
  blockChildIndex
}: InputProps) => {
  const uid = data.uid
  const parentUid = parentData?.uid || '-1' //use only for content bullet
  const id = data.id.split('/')[0]
  const textVal = type !== InputType.CONTENT_BULLET ? data[type].text : data.text
  const placeHolderVal =
    type !== InputType.CONTENT_BULLET ? data[type].placeHolder : data.placeHolder

  const ref = useRef<HTMLDivElement>(null)
  const html = useRef(textVal)
  const placeHolder = useRef(placeHolderVal)
  const { handleShowBlockContentBar, handleShowBlockHeaderBar, selectedBlock } = useBlock()
  const block = useSelector((state: RootState) => state.block)
  const fontSize = useSelector((state: RootState) => state.font.currentFontSize)
  const dispatch = useDispatch()

  useEffect(() => {
    if (block.selectedBulletBlock.blockBulletUid === uid) {
      if (ref.current) {
        ref.current.focus()
      }
    }
  }, [ref, block.selectedBulletBlock.blockBulletUid, uid])

  const handleChange = (evt: ContentEditableEvent) => {
    const value = evt.target.value
    const clone: BlockUpdateState = {
      data,
      type,
      value
    }
    dispatch(updateBlock(clone))
    html.current = value
  }

  const onFocus = () => {
    if (type === InputType.HEADER) handleShowBlockHeaderBar(type, id, uid, blockChildIndex)
    else if (type !== InputType.CONTENT_BULLET) {
      handleShowBlockContentBar(type, id, uid, blockChildIndex)
    } else {
      handleShowBlockContentBar(type, id, parentUid, blockChildIndex)
    }
  }

  const onKeyDown = (evt: React.KeyboardEvent) => {
    if (type !== InputType.CONTENT_BULLET) return
    if (evt.key === KeyEvent.ENTER) {
      evt.preventDefault()
      dispatch(
        controlBlockBullet({
          blockCreateId: id,
          blockBulletUid: uid || '',
          blockBulletStatus: BlockContentControlType.CREATE
        })
      )
    } else if (evt.key === KeyEvent.DELETE) {
      if (html.current.length === 0) {
        dispatch(
          controlBlockBullet({
            blockCreateId: id,
            blockBulletUid: uid || '',
            blockBulletStatus: BlockContentControlType.DELETE
          })
        )
      }
    }
  }

  const getFieldStatus = () => {
    if (textVal === '') {
      if (
        id !== selectedBlock.selectedBlock.blockId ||
        blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
      ) {
        return ' disable'
      }
    }
    return ''
  }

  const getFontSize = () => {
    let fontS = ''
    switch (fontSize) {
      case FontSize.small:
        fontS = '1rem'
        break
      case FontSize.large:
        fontS = '1.4rem'
        break
      case FontSize.medium:
      default:
        fontS = '1.2rem'
        break
    }
    return fontS
  }

  return (
    <div
      className={`field${title ? ' title' : ''}${getFieldStatus()}`}
      style={{ fontSize: getFontSize() }}
      onFocus={onFocus}
    >
      {title && title}
      {type === InputType.CONTENT_BULLET && <span className="field-bullet"></span>}
      <ContentEditable
        className={`field-input ${type}${className ? ` ${className}` : ''}${
          type === InputType.CONTENT_BULLET ? ` detail` : ''
        }`}
        aria-label="field-input"
        innerRef={ref}
        html={html.current}
        placeholder={placeHolder.current}
        onChange={handleChange}
        onClick={onFocus}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
