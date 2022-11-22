import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Block } from './stories/organisms/Block/Block';
import { Document } from './stories/templates/Document';
import { pagesColumn } from './contants/ColumnFormat';
import { RootState } from './store';
import { createBlock, updateSelectedBlock } from './stories/organisms/Block/block.slice';
import { convert } from './utils';
import { Common } from './types/Block';
import { Drag } from './stories/organisms/Drag/Drag';

function App() {
  const [pages, setPages] = useState(pagesColumn);
  const rootBlockState = useSelector((state: RootState) => state.block);
  const dispatch = useDispatch();
  const renderDocuments = (_pages: any) => {
    if (_pages.length > 0) {
      return _pages.map((page: any) => (
        <Document key={page} className={pages.length > 1 ? 'two-column' : ''}>
          {renderBlocks(page)}
        </Document>
      ));
    }
  };
  const renderBlocks = (_pages: any) => {
    if (pages.length > 1) {
      const evenColumn = _pages[0];
      const oddColumn = _pages[1];
      return (
        <>
          <div className="even">
            {evenColumn.map((block: number, blockIndex: number) => {
              const blocks: Common[] = convert(evenColumn[blockIndex], rootBlockState);
              return blocks.map((blockChild, blockChildIndex) => (
                <Block
                  key={blockChild.uid + blockIndex.toString()}
                  data={blockChild}
                  className={`${block}`}
                  blockChildIndex={blockChildIndex}
                />
              ));
            })}
          </div>
          <div className="odd">
            {oddColumn.map((block: number, blockIndex: number) => {
              const blocks: Common[] = convert(oddColumn[blockIndex], rootBlockState);
              return blocks.map((blockChild, blockChildIndex) => (
                <Block
                  key={blockChild.uid + blockIndex.toString()}
                  data={blockChild}
                  className={`${block}`}
                  blockChildIndex={blockChildIndex}
                />
              ));
            })}
          </div>
        </>
      );
    } else {
      return _pages.map((column: any, columnIndex: number) => {
        return column.map((block: number) => {
          const blocks: Common[] = convert(block, rootBlockState);
          return blocks.map((item, index) => (
            <Block key={item.uid + index.toString()} data={item} blockChildIndex={index} />
          ));
        });
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 13) {
        dispatch(createBlock());
      }
      if (e.keyCode === 27) {
        // setcolumnFormat([17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
      }
    });
    window.addEventListener('mousedown', (e: any) => {
      e.stopPropagation();
      const element = e.target;
      const parentElement = e.target.parentElement;
      const parentParentElement = e.target?.parentElement?.parentElement;
      if (element.tagName === 'DIV') {
        dispatch(
          updateSelectedBlock({
            selectedBlock: {
              selectedElement: element?.className ? element.className : 'none',
            },
          })
        );
      } else if (
        parentElement &&
        parentElement.tagName === 'DIV' &&
        parentElement.className.includes('block', 'block-bar', 'block-bar-icon')
      ) {
        dispatch(
          updateSelectedBlock({
            selectedBlock: { selectedElement: parentElement.className },
          })
        );
      } else if (
        parentParentElement &&
        parentParentElement.tagName === 'DIV' &&
        parentParentElement?.className.includes('block-bottom')
      ) {
        dispatch(
          updateSelectedBlock({
            selectedBlock: { selectedElement: parentParentElement.className },
          })
        );
      } else dispatch(updateSelectedBlock({ selectedBlock: { selectedElement: 'none' } }));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Drag data={pages} setData={setPages} />
      {renderDocuments(pages)}
    </div>
  );
}

export default App;
