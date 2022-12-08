import React from 'react';
import './header.scss';
import { ReactComponent as FontIcon } from '../../assets/font.svg';
import { Button } from '../../atoms/Button';
import { ReactComponent as ThemeIcon } from '../../assets/theme.svg';
import { ReactComponent as TemplateIcon } from '../../assets/template-switch.svg';
import { ReactComponent as LayoutIcon } from '../../assets/layout.svg';
import { ReactComponent as SettingIcon } from '../../assets/settings.svg';
import { ReactComponent as DownloadIcon } from '../../assets/download.svg';

interface HeaderProps {
  setOption: (option: string) => void;
}

export const Header = ({ setOption }: HeaderProps) => {
  return (
    <header>
      <Button text="Font" icon={<FontIcon />} />
      <Button text="Theme" icon={<ThemeIcon />} />
      <Button text="Template" icon={<TemplateIcon />} />
      <Button text="Layout" icon={<LayoutIcon />} onClick={() => setOption('layout')} />
      <Button text="Setting" icon={<SettingIcon />} />
      <Button text="Download" className={'download'} icon={<DownloadIcon />} />
    </header>
  );
};
