import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCompareBlock } from '../../../hooks'
import { RootState } from '../../../store'
import { Common } from '../../../types/Block'
import { Input, InputProps } from '../../atoms/Input/Input'
import { BlockBar } from '../../molecules/BlockBar'
import { BlockBarProps } from '../../molecules/BlockBar/BlockBar'
import { BlockBottom, BlockBottomProps } from '../../molecules/BlockBottom/BlockBottom'
import { BlockContent, BlockContentProps } from '../../molecules/BlockContent/BlockContent'
import { BlockHeader } from '../../molecules/BlockHeader'
import { BlockHeaderProps } from '../../molecules/BlockHeader/BlockHeader'
import './block.scss'
import { BlockSelectState, createBlock, onMovingBlock, updateSelectedBlock } from './block.slice'

interface IBlockContext {
  showBlockContentBar: boolean
  showBlockHeaderBar: boolean
  selectedBlock: BlockSelectState
  handleShowBlockContentBar: (
    type: string,
    blockId: string,
    blockUid: string,
    childIndex: number
  ) => void
  handleDisableBlockContentBar: () => void
  handleShowBlockHeaderBar: (
    type: string,
    blockId: string,
    blockUid: string,
    childIndex: number
  ) => void
  handleDisableBlockHeaderBar: () => void
  handleCreateBlock: (blockId: string) => void
}

interface BlockComposition {
  Header?: React.FC<BlockHeaderProps>
  Content?: React.FC<BlockContentProps>
  Bottom?: React.FC<BlockBottomProps>
  Bar?: React.FC<BlockBarProps>
  Input?: React.FC<InputProps>
  children?: JSX.Element | JSX.Element[]
  blockRootData: Common
}

const BlockContext = createContext<IBlockContext>({
  showBlockContentBar: false,
  showBlockHeaderBar: false,
  selectedBlock: {
    selectedBlock: {
      blockType: '',
      blockId: '-1',
      blockChildIndex: -1,
      selectedElement: ''
    }
  },
  handleShowBlockContentBar: () => undefined,
  handleDisableBlockContentBar: () => undefined,
  handleShowBlockHeaderBar: () => undefined,
  handleDisableBlockHeaderBar: () => undefined,
  handleCreateBlock: () => undefined
})

const BlockProvider = (props: BlockComposition) => {
  const dispatch = useDispatch()
  const selectedBlock = useSelector((state: RootState) => state.block.selectedBlock)
  const [showBlockContentBar, setShowBlockContentBar] = useState(false)
  const [showBlockHeaderBar, setShowBlockHeaderBar] = useState(false)
  const [blockRoot, setBlockRoot] = useState(props.blockRootData)
  const { set, compare, send } = useCompareBlock(blockRoot)

  const handleShowBlockContentBar = (
    type: string,
    blockId: string,
    blockUid: string,
    childIndex: number
  ) => {
    set(blockId, blockUid)
    dispatch(
      updateSelectedBlock({
        selectedBlock: {
          ...selectedBlock,
          blockId,
          blockUid,
          blockChildIndex: childIndex,
          blockType: type
        }
      })
    )
    setShowBlockHeaderBar(false)
    setShowBlockContentBar(true)
  }

  const handleDisableBlockContentBar = useCallback(() => {
    dispatch(
      updateSelectedBlock({
        selectedBlock: {
          blockId: '-1',
          blockType: '',
          blockUid: '-1',
          blockChildIndex: -1,
          selectedElement: ''
        }
      })
    )
    setShowBlockContentBar(false)
  }, [dispatch])

  const handleShowBlockHeaderBar = (
    type: string,
    blockId: string,
    blockUid: string,
    childIndex: number
  ) => {
    set(blockId, blockUid)
    dispatch(
      updateSelectedBlock({
        selectedBlock: {
          ...selectedBlock,
          blockId,
          blockUid,
          blockType: type,
          blockChildIndex: childIndex
        }
      })
    )
    setShowBlockHeaderBar(true)
    setShowBlockContentBar(false)
  }

  const handleDisableBlockHeaderBar = useCallback(() => {
    setShowBlockHeaderBar(false)
  }, [])

  const handleCreateBlock = (blockId: string) => {
    handleDisableBlockContentBar()
    dispatch(onMovingBlock(true))
    dispatch(createBlock({ blockCreateId: blockId }))
  }

  const value = {
    selectedBlock: {
      selectedBlock: selectedBlock
    },
    showBlockContentBar,
    showBlockHeaderBar,
    handleShowBlockContentBar,
    handleDisableBlockContentBar,
    handleShowBlockHeaderBar,
    handleDisableBlockHeaderBar,
    handleCreateBlock
  }

  //when we click outside the block
  useEffect(() => {
    const selectElement = selectedBlock.selectedElement
    if (
      selectElement &&
      !selectElement.includes('field-input') &&
      !selectElement.includes('block-bar') &&
      !selectElement.includes('block-bar-icon') &&
      !selectElement.includes('block-bottom') &&
      selectedBlock.blockUid === props.blockRootData.uid
    ) {
      const isEqual = compare()
      if (!isEqual) {
        console.log('update block because has changed')
        //when block changed, we update new data to old block
        setBlockRoot(props.blockRootData)
        dispatch(onMovingBlock(true))

        //call update api
        send()
      }
      handleDisableBlockContentBar()
      handleDisableBlockHeaderBar()
    }
  }, [
    selectedBlock.selectedElement,
    props.blockRootData,
    props.blockRootData.uid,
    selectedBlock.blockUid,
    handleDisableBlockContentBar,
    handleDisableBlockHeaderBar,
    compare,
    dispatch,
    send
  ])

  return (
    <BlockContext.Provider value={value} {...props}>
      {props.children}
    </BlockContext.Provider>
  )
}

const useBlock = () => {
  const context = useContext(BlockContext)
  if (!context) {
    throw new Error('useBlock must be used within Block')
  }
  return context
}

BlockProvider.Header = BlockHeader
BlockProvider.Content = BlockContent
BlockProvider.Bottom = BlockBottom
BlockProvider.Bar = BlockBar
BlockProvider.Input = Input

export { useBlock, BlockProvider }
