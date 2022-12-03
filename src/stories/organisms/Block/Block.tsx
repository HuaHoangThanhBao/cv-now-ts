import React from 'react';
import { Common, DetailDetail } from '../../../types/Block';
import { InputType } from '../../../types/Input';
import { Icon } from '../../atoms/Icon/Icon';
import { BlockProvider } from './BlockProvider';

interface BlockProps {
  data: Common;
  className?: string;
  blockChildIndex: number;
}

export const Block = React.memo(
  React.forwardRef((props: BlockProps, blocksRef: any) => {
    const { className, data, blockChildIndex } = props;
    const block = data.id;
    const blockId = block.split('/')[0];
    const update = (el: HTMLDivElement) => {
      blocksRef.current[blockId] = {
        ...blocksRef.current[blockId],
        [data.uid as string]: { id: block, el: el },
      };
    };
    console.log('render block');
    return (
      <BlockProvider blockRootData={data}>
        <div
          className={`block ${className || ''} ${blockChildIndex > 0 ? 'is-child' : ''}`}
          ref={(el: HTMLDivElement) => update(el)}
        >
          <BlockProvider.Header>
            <>{data?.uid}</>
            <BlockProvider.Input
              type={InputType.HEADER}
              data={data}
              blockChildIndex={blockChildIndex}
              title={<Icon iconType={blockId} />}
            />
          </BlockProvider.Header>
          <>{data?.uid}</>
          <BlockProvider.Input
            type={InputType.TITLE}
            data={data}
            blockChildIndex={blockChildIndex}
          />
          {data.desc && (
            <BlockProvider.Input
              type={InputType.DESC}
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed && (
            <BlockProvider.Input
              type={InputType.OPTIONAL_DASHED}
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed2 && (
            <BlockProvider.Input
              type={InputType.OPTIONAL_DASHED2}
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed3 && (
            <BlockProvider.Input
              type={InputType.OPTIONAL_DASHED3}
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed4 && (
            <BlockProvider.Input
              type={InputType.OPTIONAL_DASHED4}
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.optional_dashed5 && (
            <BlockProvider.Input
              type={InputType.OPTIONAL_DASHED5}
              data={data}
              blockChildIndex={blockChildIndex}
            />
          )}
          {data.content_bullet && (
            <div className="block-content-detail">
              {data.content_bullet.child.map((child: DetailDetail) => (
                <BlockProvider.Input
                  key={child.uid}
                  type={InputType.CONTENT_BULLET}
                  data={child}
                  parentData={data}
                  blockChildIndex={blockChildIndex}
                />
              ))}
            </div>
          )}
          {data.contact && (
            <>
              <BlockProvider.Input
                type={InputType.CONTACT}
                data={data}
                blockChildIndex={blockChildIndex}
              />
              <BlockProvider.Input
                type={InputType.CONTACT_PERSON}
                data={data}
                blockChildIndex={blockChildIndex}
              />
              <BlockProvider.Input
                type={InputType.CONTACT_INFO}
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
