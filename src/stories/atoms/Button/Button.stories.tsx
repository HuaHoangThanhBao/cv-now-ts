import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import { Icon } from '../Icon/Icon';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Fonts = Template.bind({});
Fonts.args = {
  text: 'Font',
  icon: <Icon iconType={'font'} />,
};

export const Themes = Template.bind({});
Themes.args = {
  icon: <Icon iconType={'theme'} />,
  text: 'Theme',
};

export const Templates = Template.bind({});
Templates.args = {
  icon: <Icon iconType={'template'} />,
  text: 'Template',
};

export const Layouts = Template.bind({});
Layouts.args = {
  icon: <Icon iconType={'layout'} />,
  text: 'Layout',
};

export const Settings = Template.bind({});
Settings.args = {
  icon: <Icon iconType={'setting'} />,
  text: 'Setting',
};

export const Add = Template.bind({});
Add.args = {
  icon: <Icon iconType={'add'} />,
  className: 'add',
};

export const Download = Template.bind({});
Download.args = {
  icon: <Icon iconType={'download'} />,
  text: 'Download',
  className: 'download',
};
