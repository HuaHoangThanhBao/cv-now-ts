import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { Block } from './stories/organisms/Block/Block';
import { Document } from './stories/templates/Document';
import { RootState } from './store';
import {
  createBlock,
  updatePages,
  updateSelectedBlock,
} from './stories/organisms/Block/block.slice';
import { convert } from './utils';
import { Common } from './types/Block';
import { Drag } from './stories/organisms/Drag/Drag';
import { finishingDrag } from './stories/organisms/Drag/drag.slice';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const rootBlockState = useSelector((state: RootState) => state.block);
  const rootDragState = useSelector((state: RootState) => state.drag);
  const blocksRef = useRef([]);
  const dispatch = useDispatch();
  const renderDocuments = (_pages: any) => {
    if (_pages.length > 0) {
      return _pages.map((page: any) => (
        <Document key={page} className={_pages.length > 1 ? 'two-column' : ''}>
          {renderBlocks(page)}
        </Document>
      ));
    }
  };
  const renderBlocks = (_pages: any) => {
    if (rootBlockState.pages.length > 1) {
      const evenColumn = _pages[0];
      const oddColumn = _pages[1];
      // console.log('evenColumn:', evenColumn);
      return (
        <>
          <div className="even">
            {evenColumn.map((block: string, blockIndex: number) => {
              const blocks: Common[] = convert(
                evenColumn[blockIndex].split('/')[0],
                rootBlockState
              );
              return blocks.map((blockChild, blockChildIndex) => {
                if (blockChild.id === block) {
                  return (
                    <Block
                      key={blockChild.uid}
                      data={blockChild}
                      blockChildIndex={blockChildIndex}
                      ref={blocksRef}
                    />
                  );
                } else return null;
              });
            })}
          </div>
          <div className="odd">
            {oddColumn &&
              oddColumn.map((block: string, blockIndex: number) => {
                const blocks: Common[] = convert(
                  oddColumn[blockIndex].split('/')[0],
                  rootBlockState
                );
                return blocks.map((blockChild, blockChildIndex) => {
                  if (blockChild.id === block) {
                    return (
                      <Block
                        key={blockChild.uid}
                        data={blockChild}
                        blockChildIndex={blockChildIndex}
                        ref={blocksRef}
                      />
                    );
                  } else return null;
                });
              })}
          </div>
        </>
      );
    } else {
      return _pages.map((column: any, columnIndex: number) => {
        return column.map((block: string) => {
          const blocks: Common[] = convert(block, rootBlockState);
          return blocks.map((item, index) => (
            <Block
              key={item.uid + index.toString()}
              data={item}
              blockChildIndex={index}
              ref={blocksRef}
            />
          ));
        });
      });
    }
  };

  const findBlockRef = (blockId: string): any => {
    let sum = 0;
    const blockIdFormat = blockId.split('/')[0];
    const blocks: any = blocksRef.current[Number(blockIdFormat)];
    for (let i = 0; i < Object.keys(blocks).length; i++) {
      const block = blocks[Object.keys(blocks)[i]];
      if (block.id === blockId) {
        sum += blocks[Object.keys(blocks)[i]].el.offsetHeight;
      }
    }
    return sum;
  };

  const getChildWithId = (_pages: any, block: any): any => {
    for (let a = 0; a < _pages.length; a++) {
      for (let b = 0; b < _pages[a].length; b++) {
        for (let c = 0; c < _pages[a][b].length; c++) {
          if (_pages[a][b][c] === block && !_pages[a][b][c].includes('/')) {
            return { a, b, c };
          }
        }
      }
    }
  };

  const transformBlocks = useCallback(() => {
    console.log(blocksRef.current);
    let _pages = JSON.parse(JSON.stringify(rootBlockState.pages));
    const maxHeight = 1000;

    /* Move child to parent*/
    if (_pages.length > 1) {
      let childs: any = [];
      _pages.forEach((page: any) =>
        page.forEach((column: any) =>
          column.forEach((block: any) => {
            if (block.includes('/')) {
              childs.push({ uid: uuidv4(), block: block });
            }
          })
        )
      );
      // console.log('childs:', childs);
      _pages = _pages.map((page: any) =>
        page.map((column: any) =>
          column.filter((block: any) => {
            return !block.includes('/');
          })
        )
      );

      const group: any = {};
      for (let i = 0; i < childs.length; i++) {
        const child = childs[i];
        const block = childs[i].block;
        const blockId = block.split('/')[0];
        group[blockId] = {
          ...group[blockId],
          [child.uid]: block,
        };
      }
      for (let i = 0; i < Object.keys(group).length; i++) {
        const g = Object.keys(group)[i];
        const { a, b, c } = getChildWithId(_pages, g);
        _pages[a][b].splice(c + 1, 0, ...Object.values(group[g]));
      }
      console.log('page after move child to parent:', _pages);
    }
    /* End Move child to parent*/

    let columnFirst = 0;
    let columnSecond = 1;
    /* Move first and second column to next page*/
    for (let i = 0; i < _pages.length; i++) {
      let sumFirstCol = 0;
      let sumSecondCol = 0;
      const firstColumn = _pages[i][columnFirst];
      const secondColumn = _pages[i][columnSecond];
      for (let a = 0; a < firstColumn.length; a++) {
        sumFirstCol += findBlockRef(firstColumn[a]);
        if (sumFirstCol > maxHeight) {
          if (i < _pages.length - 1) {
            const nextFirstColumn = _pages[i + 1][columnFirst];
            for (let z = firstColumn.length - 1; z >= a; z--) {
              nextFirstColumn.unshift(firstColumn[z]);
            }
            firstColumn.splice(a, firstColumn.length);
            break;
          } else {
            _pages.push([[], []]);
            const nextFirstColumn = _pages[i + 1][columnFirst];
            for (let z = firstColumn.length - 1; z >= a; z--) {
              nextFirstColumn.unshift(firstColumn[z]);
            }
            firstColumn.splice(a, firstColumn.length);
            break;
          }
        }
      }
      if (secondColumn) {
        for (let a = 0; a < secondColumn.length; a++) {
          sumSecondCol += findBlockRef(secondColumn[a]);
          if (sumSecondCol > maxHeight) {
            if (i < _pages.length - 1) {
              const nextSecondColumn = _pages[i + 1][columnSecond];
              for (let z = secondColumn.length - 1; z >= a; z--) {
                nextSecondColumn.unshift(secondColumn[z]);
              }
              secondColumn.splice(a, secondColumn.length);
              break;
            } else {
              _pages.push([[], []]);
              const nextSecondColumn = _pages[i + 1][columnSecond];
              for (let z = secondColumn.length - 1; z >= a; z--) {
                nextSecondColumn.unshift(secondColumn[z]);
              }
              secondColumn.splice(a, secondColumn.length);
              break;
            }
          }
        }
      }
    }
    /* End Move first and second column to next page*/

    console.log('--------------------------');

    /* Move first and second column to previous page*/
    for (let i = 0; i < _pages.length; i++) {
      let sumFirstCol = 0;
      let sumSecondCol = 0;
      const firstColumnDelete = [];
      const secondColumnDelete = [];
      const firstColumn = _pages[i][columnFirst];
      const secondColumn = _pages[i][columnSecond];
      for (let a = 0; a < firstColumn.length; a++) {
        sumFirstCol += findBlockRef(firstColumn[a]);
      }
      if (secondColumn) {
        for (let a = 0; a < secondColumn.length; a++) {
          sumSecondCol += findBlockRef(secondColumn[a]);
        }
      }
      if (sumFirstCol < maxHeight) {
        if (i < _pages.length - 1) {
          const nextFirstColumn = _pages[i + 1][columnFirst];
          for (let z = 0; z < nextFirstColumn.length; z++) {
            sumFirstCol += findBlockRef(nextFirstColumn[z]);
            if (sumFirstCol < maxHeight) {
              firstColumn.push(nextFirstColumn[z]);
              firstColumnDelete.push(nextFirstColumn[z]);
            } else {
              break;
            }
          }
          //remove deleted element
          for (let z = 0; z < firstColumnDelete.length; z++) {
            nextFirstColumn.shift();
          }
        }
      }
      if (sumSecondCol < maxHeight) {
        if (i < _pages.length - 1) {
          const nextSecondColumn = _pages[i + 1][columnSecond];
          for (let z = 0; z < nextSecondColumn.length; z++) {
            sumSecondCol += findBlockRef(nextSecondColumn[z]);
            if (sumSecondCol < maxHeight) {
              secondColumn.push(nextSecondColumn[z]);
              secondColumnDelete.push(nextSecondColumn[z]);
            } else {
              break;
            }
          }
          //remove deleted element
          for (let z = 0; z < secondColumnDelete.length; z++) {
            nextSecondColumn.shift();
          }
        }
      }
    }
    /* End Move first and second column to previous page*/

    /* Remove empty pages */
    for (let i = _pages.length - 1; i >= 0; i--) {
      if (_pages[i][0].length === 0 && _pages[i][1].length === 0) {
        _pages.pop();
      }
    }

    console.log('pages:', _pages);
    dispatch(updatePages({ pages: [..._pages] }));
  }, [rootBlockState.pages, dispatch]);

  // console.log(blocksRef.current);

  useEffect(() => {
    dispatch(finishingDrag(true));
  }, [dispatch]);

  useEffect(() => {
    if (rootDragState.finishingDrag) {
      transformBlocks();
      dispatch(finishingDrag(false));
    }
  }, [rootDragState.finishingDrag, dispatch, transformBlocks]);

  useEffect(() => {
    window.addEventListener('keydown', (e: any) => {
      if (e.keyCode === 113) {
        dispatch(createBlock({ blockCreateId: '2' }));
        dispatch(finishingDrag(true));
      }
      if (e.keyCode === 27) {
        dispatch(finishingDrag(true));
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
      <Drag />
      {renderDocuments(rootBlockState.pages)}
    </div>
  );
}

export default App;
