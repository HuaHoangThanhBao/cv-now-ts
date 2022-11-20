import { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, InputProps } from '../../atoms/Input/Input';
import { BlockBar } from '../../molecules/BlockBar';
import { BlockBarProps } from '../../molecules/BlockBar/BlockBar';
import { BlockBottom, BlockBottomProps } from '../../molecules/BlockBottom/BlockBottom';
import { BlockContent, BlockContentProps } from '../../molecules/BlockContent/BlockContent';
import { BlockHeader } from '../../molecules/BlockHeader';
import { BlockHeaderProps } from '../../molecules/BlockHeader/BlockHeader';
import './block.scss';
import { updateSelectedBlock } from './block.slice';

interface IBlockContext {
  showBlockContentBar: boolean;
  showBlockHeaderBar: boolean;
  handleShowBlockContentBar: (blockId: number) => void;
  handleDisableBlockContentBar: () => void;
  handleShowBlockHeaderBar: (blockId: number) => void;
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
  handleShowBlockContentBar: () => {},
  handleDisableBlockContentBar: () => {},
  handleShowBlockHeaderBar: () => {},
  handleDisableBlockHeaderBar: () => {},
});

const BlockProvider = (props: BlockComposition) => {
  const dispatch = useDispatch();
  const [showBlockContentBar, setShowBlockContentBar] = useState(false);
  const [showBlockHeaderBar, setShowBlockHeaderBar] = useState(false);
  const handleShowBlockContentBar = (blockId: number) => {
    dispatch(updateSelectedBlock(blockId));
    setShowBlockHeaderBar(false);
    setShowBlockContentBar(true);
  };
  const handleDisableBlockContentBar = () => {
    setShowBlockContentBar(false);
  };
  const handleShowBlockHeaderBar = (blockId: number) => {
    dispatch(updateSelectedBlock(blockId));
    setShowBlockHeaderBar(true);
    setShowBlockContentBar(false);
  };
  const handleDisableBlockHeaderBar = () => {
    setShowBlockHeaderBar(false);
  };
  const value = {
    showBlockContentBar,
    showBlockHeaderBar,
    handleShowBlockContentBar,
    handleDisableBlockContentBar,
    handleShowBlockHeaderBar,
    handleDisableBlockHeaderBar,
  };

  return (
    <BlockContext.Provider value={value} {...props}>
      <div className="block">{props.children}</div>
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
