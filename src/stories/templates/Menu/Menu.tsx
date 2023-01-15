import { useState } from 'react'
import { Font } from 'src/stories/organisms/Font'
import { Theme } from 'src/stories/organisms/Theme'
import { Header } from '../../molecules/Header'
import { Drag } from '../../organisms/Drag'
import { Template } from '../../organisms/Template'
import { templates } from '../../../contants'
import { themes } from 'src/contants/themes'
import { fonts } from 'src/contants/font'
import { Selection } from 'src/types/Selection'
import './menu.scss'

export const Menu = ({ action }: Omit<Selection<unknown>, 'setOption' | 'data'>) => {
  const [option, setOption] = useState('')
  return (
    <div className="menu">
      <Header setOption={setOption} action={action} />
      <div className="menu-panel">
        {option === 'layout' && <Drag setOption={setOption} />}
        {option === 'template' && <Template data={Object.keys(templates)} setOption={setOption} />}
        {option === 'theme' && <Theme data={Object.keys(themes)} setOption={setOption} />}
        {option === 'font' && <Font data={Object.keys(fonts)} setOption={setOption} />}
      </div>
    </div>
  )
}
