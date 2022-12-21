import { useState } from 'react'
import { Header } from '../../molecules/Header'
import { Drag } from '../../organisms/Drag'
import { Template } from '../../organisms/Template'
import './menu.scss'

interface MenuProps {
  generatePDF: () => void
}

export const Menu = ({ generatePDF }: MenuProps) => {
  const [option, setOption] = useState('')
  return (
    <div className="menu">
      <Header setOption={setOption} generatePDF={generatePDF} />
      <div className="menu-panel">
        {option === 'layout' && <Drag setOption={setOption} />}
        {option === 'template' && <Template setOption={setOption} />}
      </div>
    </div>
  )
}
