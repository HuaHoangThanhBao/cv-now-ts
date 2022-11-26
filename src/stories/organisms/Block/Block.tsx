import React from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { BlockProvider } from './BlockProvider';

interface BlockProps {
  data: any;
  className?: string;
  blockChildIndex: number;
}

export const Block = React.memo(
  React.forwardRef((props: BlockProps, blocksRef: any) => {
    const { className, data, blockChildIndex } = props;
    const block = data.id;
    const blockId = block.split('/')[0];
    const update = (el: any) => {
      blocksRef.current[blockId] = {
        ...blocksRef.current[blockId],
        [data.uid]: { id: block, el: el },
      };
    };
    console.log('render block');
    return (
      <BlockProvider>
        <div
          className={`block ${className || ''} ${blockChildIndex > 0 ? 'is-child' : ''}`}
          ref={(el) => update(el)}
        >
          <BlockProvider.Header>
            {data?.uid}
            <BlockProvider.Input
              type="header"
              data={data}
              blockChildIndex={blockChildIndex}
              title={<Icon iconType={blockId} />}
            />
          </BlockProvider.Header>
          <BlockProvider.Input type="title" data={data} blockChildIndex={blockChildIndex} />
          {data.desc && (
            <BlockProvider.Input type="desc" data={data} blockChildIndex={blockChildIndex} />
          )}
          {data.optional_dashed && (
            <BlockProvider.Input
              type="optional_dashed"
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed2 && (
            <BlockProvider.Input
              type="optional_dashed2"
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed3 && (
            <BlockProvider.Input
              type="optional_dashed3"
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed4 && (
            <BlockProvider.Input
              type="optional_dashed4"
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed5 && (
            <BlockProvider.Input
              type="optional_dashed5"
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.content_bullet && (
            <div className="block-content-detail">
              {data.content_bullet.child.map((child: any) => (
                <BlockProvider.Input
                  key={child}
                  type="content_bullet"
                  detailChild={child}
                  data={data}
                  blockChildIndex={blockChildIndex}
                />
              ))}
            </div>
          )}
          {data.contact && (
            <>
              <BlockProvider.Input type="contact" data={data} blockChildIndex={blockChildIndex} />
              <BlockProvider.Input
                type="contact_person"
                data={data}
                blockChildIndex={blockChildIndex}
              />
              <BlockProvider.Input
                type="contact_info"
                data={data}
                blockChildIndex={blockChildIndex}
              />
            </>
          )}
          <BlockProvider.Bottom blockChildIndex={blockChildIndex} blockId={blockId} />
          <BlockProvider.Bar
            blockChildIndex={blockChildIndex}
            blockId={blockId}
            block={block}
          ></BlockProvider.Bar>
        </div>
      </BlockProvider>
    );
  })
);
