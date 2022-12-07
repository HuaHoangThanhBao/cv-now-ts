import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Resume } from './Resume';

export default {
  title: 'Templates/Resume',
  component: Resume,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Resume>;

const Template: ComponentStory<typeof Resume> = (args) => <Resume {...args} />;

export const Primary = Template.bind({});
