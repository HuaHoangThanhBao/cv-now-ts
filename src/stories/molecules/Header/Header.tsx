import './header.scss'
import { ReactComponent as FontIcon } from '../../assets/font.svg'
import { Button } from '../../atoms/Button'
import { ReactComponent as ThemeIcon } from '../../assets/theme.svg'
import { ReactComponent as TemplateIcon } from '../../assets/template-switch.svg'
import { ReactComponent as LayoutIcon } from '../../assets/layout.svg'
import { ReactComponent as SettingIcon } from '../../assets/settings.svg'
import { ReactComponent as DownloadIcon } from '../../assets/download.svg'
import { Selection } from 'src/types/Selection'

export const Header = <T,>({ setOption, action }: Omit<Selection<T>, 'data'>) => {
  return (
    <header>
      <Button text="Font" icon={<FontIcon />} onClick={() => setOption('font')} />
      <Button text="Theme" icon={<ThemeIcon />} onClick={() => setOption('theme')} />
      <Button text="Template" icon={<TemplateIcon />} onClick={() => setOption('template')} />
      <Button text="Layout" icon={<LayoutIcon />} onClick={() => setOption('layout')} />
      <Button text="Setting" icon={<SettingIcon />} />
      <Button text="Download" className={'download'} icon={<DownloadIcon />} onClick={action} />
    </header>
  )
}
