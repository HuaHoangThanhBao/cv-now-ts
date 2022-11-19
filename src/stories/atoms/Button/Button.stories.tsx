import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactComponent as FontIcon } from '../../assets/font.svg';
import { ReactComponent as ThemeIcon } from '../../assets/theme.svg';
import { ReactComponent as TemplateIcon } from '../../assets/template-switch.svg';
import { ReactComponent as LayoutIcon } from '../../assets/layout.svg';
import { ReactComponent as SettingIcon } from '../../assets/settings.svg';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download.svg';
import { Button } from './Button';

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
  icon: <FontIcon />,
};

export const Themes = Template.bind({});
Themes.args = {
  icon: <ThemeIcon />,
  text: 'Theme',
};

export const Templates = Template.bind({});
Templates.args = {
  icon: <TemplateIcon />,
  text: 'Template',
};

export const Layouts = Template.bind({});
Layouts.args = {
  icon: <LayoutIcon />,
  text: 'Layout',
};

export const Settings = Template.bind({});
Settings.args = {
  icon: <SettingIcon />,
  text: 'Setting',
};

export const Add = Template.bind({});
Add.args = {
  icon: <AddIcon />,
  className: 'add',
};

export const Download = Template.bind({});
Download.args = {
  icon: <DownloadIcon />,
  text: 'Download',
  className: 'download',
};
