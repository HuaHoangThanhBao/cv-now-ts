import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Block } from './stories/organisms/Block/Block';
import { Document } from './stories/templates/Document';
import { oneColumnFormat } from './contants/ColumnFormat';
import { RootState } from './store';
import { createBlock, updateSelectedElement } from './stories/organisms/Block/block.slice';
import { convert } from './utils';
import { Common } from './types/Block';

function App() {
  const [columnFormat, setcolumnFormat] = useState(oneColumnFormat);
  const rootBlockState = useSelector((state: RootState) => state.block);
  const dispatch = useDispatch();
  const renderBlocks = () => {
    return columnFormat.map((column: number) => {
      const blocks: Common[] = convert(column, rootBlockState);
      return blocks.map((item, index) => (
        <Block key={item.uid + index.toString()} data={item} blockChildIndex={index} />
      ));
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 13) {
        dispatch(createBlock());
      }
      if (e.keyCode === 27) {
        setcolumnFormat([17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
      }
    });
    window.addEventListener('mousedown', (e: any) => {
      e.stopPropagation();
      const element = e.target;
      const parentElement = e.target.parentElement;
      const parentParentElement = e.target?.parentElement?.parentElement;
      if (element.tagName === 'DIV') {
        dispatch(updateSelectedElement(element?.className ? element.className : 'none'));
      } else if (
        parentElement &&
        parentElement.tagName === 'DIV' &&
        parentElement.className.includes('block', 'block-bar', 'block-bar-icon')
      ) {
        dispatch(updateSelectedElement(parentElement.className));
      } else if (
        parentParentElement &&
        parentParentElement.tagName === 'DIV' &&
        parentParentElement?.className.includes('block-bottom')
      ) {
        dispatch(updateSelectedElement(parentParentElement.className));
      } else dispatch(updateSelectedElement('none'));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Document>{renderBlocks()}</Document>
    </div>
  );
}

export default App;
