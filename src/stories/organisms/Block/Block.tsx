import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Icon } from '../../atoms/Icon/Icon';
import { BlockProvider } from './BlockProvider';

interface BlockProps {
  data: any;
  blockChildIndex: number;
}

export const Block = React.memo((props: BlockProps) => {
  const { data, blockChildIndex } = props;
  const currentSelectedBlock = useSelector((state: RootState) => state.block.selectedBlock);
  const selectedBlockChild = useSelector((state: RootState) => state.block.selectedBlockChild);
  // console.log(data);
  return (
    <BlockProvider>
      <BlockProvider.Header>
        {data?.uid}
        <BlockProvider.Input
          type="header"
          data={data}
          blockChildIndex={blockChildIndex}
          title={<Icon iconType={data.id} />}
        />
      </BlockProvider.Header>
      <BlockProvider.Input type="title" data={data} blockChildIndex={blockChildIndex} />
      <BlockProvider.Content
        isUnActive={data.id !== currentSelectedBlock || blockChildIndex !== selectedBlockChild}
      >
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
      </BlockProvider.Content>
      <BlockProvider.Bottom>
        <Icon iconType={'add'} />
        <div className="block-bottom-box line">
          <div className="block-bottom-line"></div>
        </div>
        <div className="block-bottom-box circle">
          <div className="block-bottom-small-circle"></div>
        </div>
      </BlockProvider.Bottom>
      <BlockProvider.Bar
        isUnActive={data.id !== currentSelectedBlock || blockChildIndex !== selectedBlockChild}
      ></BlockProvider.Bar>
    </BlockProvider>
  );
});
