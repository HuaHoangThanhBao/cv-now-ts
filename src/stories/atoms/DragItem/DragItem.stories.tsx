import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DragItem } from './DragItem';

export default {
  title: 'Atoms/DragItem',
  component: DragItem,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DragItem>;

const Template: ComponentStory<typeof DragItem> = (args) => <DragItem {...args} />;

export const Primary = Template.bind({});
