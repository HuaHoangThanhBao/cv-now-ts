import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Input, InputProps } from '../../atoms/Input/Input';
import { BlockBar } from '../../molecules/BlockBar';
import { BlockBarProps } from '../../molecules/BlockBar/BlockBar';
import { BlockBottom, BlockBottomProps } from '../../molecules/BlockBottom/BlockBottom';
import { BlockContent, BlockContentProps } from '../../molecules/BlockContent/BlockContent';
import { BlockHeader } from '../../molecules/BlockHeader';
import { BlockHeaderProps } from '../../molecules/BlockHeader/BlockHeader';
import './block.scss';
import { BlockSelectState, updateSelectedBlock } from './block.slice';

interface IBlockContext {
  showBlockContentBar: boolean;
  showBlockHeaderBar: boolean;
  selectedBlock: BlockSelectState;
  handleShowBlockContentBar: (type: string, blockId: number, childIndex: number) => void;
  handleDisableBlockContentBar: () => void;
  handleShowBlockHeaderBar: (type: string, blockId: number, childIndex: number) => void;
  handleDisableBlockHeaderBar: () => void;
}

interface BlockComposition {
  Header?: React.FC<BlockHeaderProps>;
  Content?: React.FC<BlockContentProps>;
  Bottom?: React.FC<BlockBottomProps>;
  Bar?: React.FC<BlockBarProps>;
  Input?: React.FC<InputProps>;
  children?: JSX.Element | JSX.Element[];
}

const BlockContext = createContext<IBlockContext>({
  showBlockContentBar: false,
  showBlockHeaderBar: false,
  selectedBlock: {
    selectedBlock: {
      blockType: '',
      blockId: -1,
      blockChildIndex: -1,
      selectedElement: '',
    },
  },
  handleShowBlockContentBar: () => {},
  handleDisableBlockContentBar: () => {},
  handleShowBlockHeaderBar: () => {},
  handleDisableBlockHeaderBar: () => {},
});

const BlockProvider = (props: BlockComposition) => {
  const dispatch = useDispatch();
  const selectedBlock = useSelector((state: RootState) => state.block.selectedBlock);
  const [showBlockContentBar, setShowBlockContentBar] = useState(false);
  const [showBlockHeaderBar, setShowBlockHeaderBar] = useState(false);
  const handleShowBlockContentBar = (type: string, blockId: number, childIndex: number) => {
    dispatch(
      updateSelectedBlock({
        selectedBlock: { ...selectedBlock, blockId, blockChildIndex: childIndex, blockType: type },
      })
    );
    setShowBlockHeaderBar(false);
    setShowBlockContentBar(true);
  };

  const handleDisableBlockContentBar = useCallback(() => {
    dispatch(
      updateSelectedBlock({
        selectedBlock: { blockId: -1, blockType: '', blockChildIndex: -1, selectedElement: '' },
      })
    );
    setShowBlockContentBar(false);
  }, [dispatch]);

  const handleShowBlockHeaderBar = (type: string, blockId: number, childIndex: number) => {
    dispatch(
      updateSelectedBlock({
        selectedBlock: { ...selectedBlock, blockId, blockType: type, blockChildIndex: childIndex },
      })
    );
    setShowBlockHeaderBar(true);
    setShowBlockContentBar(false);
  };

  const handleDisableBlockHeaderBar = useCallback(() => {
    setShowBlockHeaderBar(false);
  }, []);

  const value = {
    selectedBlock: {
      selectedBlock: selectedBlock,
    },
    showBlockContentBar,
    showBlockHeaderBar,
    handleShowBlockContentBar,
    handleDisableBlockContentBar,
    handleShowBlockHeaderBar,
    handleDisableBlockHeaderBar,
  };

  useEffect(() => {
    const selectElement = selectedBlock.selectedElement;
    if (
      !selectElement.includes('field-input') &&
      !selectElement.includes('block-bar') &&
      !selectElement.includes('block-bar-icon') &&
      !selectElement.includes('block-bottom')
    ) {
      handleDisableBlockContentBar();
      handleDisableBlockHeaderBar();
    }
  }, [selectedBlock.selectedElement, handleDisableBlockContentBar, handleDisableBlockHeaderBar]);

  return (
    <BlockContext.Provider value={value} {...props}>
      {props.children}
    </BlockContext.Provider>
  );
};

const useBlock = () => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error('useBlock must be used within Block');
  }
  return context;
};

BlockProvider.Header = BlockHeader;
BlockProvider.Content = BlockContent;
BlockProvider.Bottom = BlockBottom;
BlockProvider.Bar = BlockBar;
BlockProvider.Input = Input;

export { useBlock, BlockProvider };
