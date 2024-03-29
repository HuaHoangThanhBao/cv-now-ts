import { BlockChildren } from 'src/types/Block'
import { Icon } from '../../atoms/Icon'
import { useBlock } from '../../organisms/Block/BlockProvider'
import './blockBottom.scss'

export interface BlockBottomProps extends BlockChildren {
  blockId: string
  blockChildIndex: number
}

export const BlockBottom = ({ children, ...props }: BlockBottomProps) => {
  const { blockId, blockChildIndex } = props
  const { showBlockContentBar, selectedBlock, handleCreateBlock } = useBlock()

  const onCreateBlock = () => {
    handleCreateBlock(blockId)
  }

  if (
    blockId !== selectedBlock.selectedBlock.blockId ||
    blockChildIndex !== selectedBlock.selectedBlock.blockChildIndex
  )
    return null
  else if (showBlockContentBar) {
    return (
      <div className="block-bottom">
        <Icon iconType={'add'} onClick={onCreateBlock} />
        <div className="block-bottom-box line">
          <div className="block-bottom-line"></div>
        </div>
        <div className="block-bottom-box circle">
          <div className="block-bottom-small-circle"></div>
        </div>
        {children}
      </div>
    )
  } else return null
}
