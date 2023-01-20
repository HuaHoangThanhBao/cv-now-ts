import { Icon } from '../../atoms/Icon'
import { useBlock } from '../../organisms/Block/BlockProvider'
import { useDispatch, useSelector } from 'react-redux'
import {
  BlockMoveType,
  movingBlock,
  movingBlockContentDown,
  movingBlockContentUp
} from '../../organisms/Block/block.slice'
import { convert } from '../../../utils'
import { RootState } from '../../../store'
import { Common } from '../../../types/Block'
import './blockBar.scss'

export interface BlockBarProps {
  block: string
  blockId: string
  blockChildIndex: number
}

export const BlockBar = ({ block, blockId, blockChildIndex }: BlockBarProps) => {
  const {
    showBlockContentBar,
    showBlockHeaderBar,
    handleDisableBlockHeaderBar,
    handleDisableBlockContentBar,
    selectedBlock,
    handleCreateBlock,
    handleRemoveBlock
  } = useBlock()
  const blockState = useSelector((state: RootState) => state.block)
  const dispatch = useDispatch()
  const blocks: Common[] = convert(blockId, blockState)

  const moveBlockUp = () => {
    handleDisableBlockHeaderBar()
    handleDisableBlockContentBar()
    dispatch(movingBlock({ blockMovingId: blockId, blockMoveType: BlockMoveType.UP }))
  }

  const moveBlockDown = () => {
    handleDisableBlockHeaderBar()
    handleDisableBlockContentBar()
    dispatch(movingBlock({ blockMovingId: blockId, blockMoveType: BlockMoveType.DOWN }))
  }

  const moveContentUp = () => {
    handleDisableBlockContentBar()
    dispatch(movingBlockContentUp(block))
  }

  const moveContentDown = () => {
    handleDisableBlockContentBar()
    dispatch(movingBlockContentDown(block))
  }

  const createBlock = () => {
    handleCreateBlock(blockId)
  }

  const removeBlock = () => {
    handleRemoveBlock()
  }

  if (
    blockId !== selectedBlock.selectedBlock.blockId ||
    blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
  )
    return null
  if (showBlockContentBar) {
    return (
      <div className="block-bar">
        <Icon iconType={'add'} className={'block-bar-icon'} onClick={createBlock} />
        <Icon iconType={'bold'} className={'block-bar-icon'} />
        <Icon iconType={'italic'} className={'block-bar-icon'} />
        <Icon iconType={'underline'} className={'block-bar-icon'} />
        {blockChildIndex !== 0 && (
          <Icon iconType={'move-up'} className={'block-bar-icon'} onClick={moveContentUp} />
        )}
        {blockChildIndex < blocks.length - 1 && (
          <Icon iconType={'move-down'} className={'block-bar-icon'} onClick={moveContentDown} />
        )}
        {blockChildIndex !== 0 && (
          <Icon iconType={'trash'} className={'block-bar-icon'} onClick={removeBlock} />
        )}
      </div>
    )
  } else if (showBlockHeaderBar) {
    return (
      <div className="block-bar">
        <Icon iconType={'bold'} className={'block-bar-icon'} />
        <Icon iconType={'italic'} className={'block-bar-icon'} />
        <Icon iconType={'underline'} className={'block-bar-icon'} />
        <Icon iconType={'move-up'} className={'block-bar-icon'} onClick={moveBlockUp} />
        <Icon iconType={'move-down'} className={'block-bar-icon'} onClick={moveBlockDown} />
        {blockChildIndex !== 0 && (
          <Icon iconType={'trash'} className={'block-bar-icon'} onClick={removeBlock} />
        )}
      </div>
    )
  }
  return null
}
