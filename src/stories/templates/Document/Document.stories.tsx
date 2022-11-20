import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Document } from './Document';

export default {
  title: 'Templates/Document',
  component: Document,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Document>;

const Template: ComponentStory<typeof Document> = (args) => <Document {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: '',
};
