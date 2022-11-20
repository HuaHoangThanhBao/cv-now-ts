import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BlockBar } from './BlockBar';

export default {
  title: 'Molecules/BlockBar',
  component: BlockBar,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BlockBar>;

const Template: ComponentStory<typeof BlockBar> = (args) => <BlockBar />;

export const Menu = Template.bind({});
