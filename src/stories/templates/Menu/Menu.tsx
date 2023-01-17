import { useState } from 'react'
import { Font } from 'src/stories/organisms/Font'
import { Theme } from 'src/stories/organisms/Theme'
import { Header } from '../../molecules/Header'
import { Drag } from '../../organisms/Drag'
import { Template } from '../../organisms/Template'
import { templates } from '../../../contants'
import { Selection } from 'src/types/Selection'
import { ThemeType } from 'src/types/Theme'
import { FontStyle } from 'src/types/Font'
import { Setting } from 'src/stories/organisms/Setting'
import './menu.scss'

export const Menu = ({ action }: Omit<Selection<unknown>, 'setOption' | 'data'>) => {
  const [option, setOption] = useState('')
  return (
    <div className="menu">
      <Header setOption={setOption} action={action} />
      <div className="menu-panel">
        {option === 'layout' && <Drag setOption={setOption} />}
        {option === 'template' && <Template data={Object.keys(templates)} setOption={setOption} />}
        {option === 'theme' && <Theme data={Object.keys(ThemeType)} setOption={setOption} />}
        {option === 'font' && <Font data={Object.keys(FontStyle)} setOption={setOption} />}
        {option === 'setting' && <Setting />}
      </div>
    </div>
  )
}
