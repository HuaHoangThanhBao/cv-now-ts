import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { DragProvider } from './DragProvider';

export const Drag = () => {
  const pages = useSelector((state: RootState) => state.drag.pages);

  const getFirstColumn = () => {
    const res = [];
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        for (let z = 0; z < pages[i][j].length; z++) {
          if (j === 0 && pages[i][j][z] && !pages[i][j][z].includes('/')) {
            res.push({
              page: pages[i],
              pageI: i,
              column: pages[i][j],
              columnI: j,
              block: pages[i][j][z],
              blockI: z,
            });
          }
        }
      }
    }
    return res;
  };
  const getSecondColumn = () => {
    const res = [];
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].length; j++) {
        for (let z = 0; z < pages[i][j].length; z++) {
          if (j === 1 && pages[i][j][z] && !pages[i][j][z].includes('/')) {
            res.push({
              page: pages[i],
              pageI: i,
              column: pages[i][j],
              columnI: j,
              block: pages[i][j][z],
              blockI: z,
            });
          }
        }
      }
    }
    return res;
  };

  const renderDragGroup = () => {
    if (pages[0].length <= 1) {
      return pages.map((page: any, pageI: number) =>
        page.map((column: any, columnI: number) => {
          if (!column.every((item: any) => item.includes('/'))) {
            return (
              <DragProvider.Group
                key={column}
                page={page}
                pageI={pageI}
                className={columnI % 2 === 0 ? 'even' : 'odd'}
              >
                {column.map((block: any, blockI: any) => {
                  if (!block.includes('/'))
                    return (
                      <DragProvider.Item
                        key={block}
                        page={page}
                        pageI={pageI}
                        column={column}
                        columnI={columnI}
                        block={block}
                        blockI={blockI}
                      />
                    );
                  else return null;
                })}
              </DragProvider.Group>
            );
          } else return null;
        })
      );
    } else {
      const firstColumn: any = getFirstColumn();
      const secondColumn: any = getSecondColumn();
      return (
        <>
          <DragProvider.Group page={firstColumn[0].page} pageI={0}>
            {firstColumn.map((item: any) => (
              <DragProvider.Item
                key={item.block}
                page={item.page}
                pageI={item.pageI}
                column={item.column}
                columnI={item.columnI}
                block={item.block}
                blockI={item.blockI}
              />
            ))}
          </DragProvider.Group>
          <DragProvider.Group page={secondColumn[0].page} pageI={1}>
            {secondColumn.map((item: any) => (
              <DragProvider.Item
                key={item.block}
                page={item.page}
                pageI={item.pageI}
                column={item.column}
                columnI={item.columnI}
                block={item.block}
                blockI={item.blockI}
              />
            ))}
          </DragProvider.Group>
        </>
      );
    }
  };

  if (pages) {
    return <DragProvider>{renderDragGroup()}</DragProvider>;
  } else return null;
};
