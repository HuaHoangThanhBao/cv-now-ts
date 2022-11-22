import { DragProvider } from './DragProvider';

interface DragProps {
  data?: any;
  setData: any;
}

export const Drag = (props: DragProps) => {
  const { data, setData } = props;

  const renderDragGroup = () => {
    if (data.length > 1) {
      const evenColumn = data[0][0];
      const oddColumn = data[0][1];
      const evenColumn1 = data[1][0];
      const oddColumn1 = data[1][1];
      return (
        <>
          <DragProvider.Group page={data[0]} pageI={0}>
            {evenColumn.map((block: any, blockI: any) => (
              <DragProvider.Item
                key={block}
                page={data[0]}
                pageI={0}
                column={evenColumn}
                columnI={0}
                block={block}
                blockI={blockI}
              />
            ))}
            {evenColumn1.map((block: any, blockI: any) => (
              <DragProvider.Item
                key={block}
                page={data[1]}
                pageI={1}
                column={evenColumn}
                columnI={0}
                block={block}
                blockI={blockI}
              />
            ))}
          </DragProvider.Group>
          <DragProvider.Group page={data[1]} pageI={1}>
            {oddColumn.map((block: any, blockI: any) => (
              <DragProvider.Item
                key={block}
                page={data[0]}
                pageI={0}
                column={oddColumn}
                columnI={1}
                block={block}
                blockI={blockI}
              />
            ))}
            {oddColumn1.map((block: any, blockI: any) => (
              <DragProvider.Item
                key={block}
                page={data[1]}
                pageI={1}
                column={oddColumn}
                columnI={1}
                block={block}
                blockI={blockI}
              />
            ))}
          </DragProvider.Group>
        </>
      );
    } else {
      return data.map((page: any, pageI: number) =>
        page.map((column: any, columnI: number) => (
          <DragProvider.Group key={column} page={page} pageI={pageI}>
            {column.map((block: any, blockI: any) => (
              <DragProvider.Item
                key={block}
                page={page}
                pageI={pageI}
                column={column}
                columnI={columnI}
                block={block}
                blockI={blockI}
              />
            ))}
          </DragProvider.Group>
        ))
      );
    }
  };

  if (data) {
    return (
      <DragProvider data={data} setData={setData}>
        {renderDragGroup()}
      </DragProvider>
    );
  } else return null;
};
