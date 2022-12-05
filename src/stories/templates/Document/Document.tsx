import { useRef, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Common } from '../../../types/Block';
import { Panel } from '../../organisms/Panel';
import './document.scss';
import { convert } from '../../../utils';
import { Block } from '../../organisms/Block';
import {
  BlockInitialState,
  createBlock,
  updateSelectedBlock,
} from '../../organisms/Block/block.slice';
import { useTransformBlock } from '../../../hooks';
import { useEventListener } from '../../../hooks/useEventListener';

interface DocumentProps {
  pages: string[][][];
  state: BlockInitialState;
  isOneColumn: boolean;
  pagesOneColumn: string[][][];
  pagesTwoColumn: string[][][];
}

export const Document = ({
  pages,
  state,
  isOneColumn,
  pagesOneColumn,
  pagesTwoColumn,
}: DocumentProps) => {
  const blocksRef = useRef([]);
  const dispatch = useDispatch();
  const [pagesD, callMovingBlock] = useTransformBlock({
    pages,
    state,
    isOneColumn,
    pagesOneColumn,
    pagesTwoColumn,
    blocksRef,
  });

  const renderDocuments = (_pages: string[][][]) => {
    if (_pages.length > 0) {
      return _pages.map((page: string[][], pageI: number) => (
        <Panel key={page.length + pageI} className={_pages.length > 1 ? 'two-column' : ''}>
          {renderBlocks(page)}
        </Panel>
      ));
    } else return <></>;
  };
  const renderBlocks = (_pages: string[][]) => {
    if (pagesD.length > 1) {
      const evenColumn = _pages[0];
      const oddColumn = _pages[1];
      return (
        <>
          <div className="even">
            {evenColumn.map((block: string, blockIndex: number) => {
              const blocks: Common[] = convert(evenColumn[blockIndex].split('/')[0], state);
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
                if (oddColumn[blockIndex]) {
                  const blocks: Common[] = convert(oddColumn[blockIndex].split('/')[0], state);
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
                } else return null;
              })}
          </div>
        </>
      );
    } else {
      return _pages.map((column: string[]) => {
        return column.map((block: string) => {
          const blocks: Common[] = convert(block, state);
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

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'q') {
      console.log('one');
      dispatch(createBlock({ blockCreateId: '2' }));
      callMovingBlock(true);
    }
    if (e.key === 'w') {
      dispatch(createBlock({ blockCreateId: '3' }));
      callMovingBlock(true);
    }
    if (e.key === 'e') {
      dispatch(createBlock({ blockCreateId: '1' }));
      callMovingBlock(true);
    }
    if (e.key === 'r') {
      dispatch(createBlock({ blockCreateId: '4' }));
      callMovingBlock(true);
    }
    if (e.key === 'Escape') {
      callMovingBlock(true);
    }
  });

  useEventListener('mousedown', (e: MouseEvent) => {
    e.stopPropagation();
    const element = e.target as HTMLDivElement;
    if (!element) return;
    const parentElement = element?.parentElement;
    const parentParentElement = element?.parentElement?.parentElement;
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
      parentElement.className.includes('block') &&
      parentElement.className.includes('block-bar') &&
      parentElement.className.includes('block-bar-icon')
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

  return <>{renderDocuments(pagesD)}</>;
};
