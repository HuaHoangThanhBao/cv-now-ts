import { ChromePicker } from 'react-color'
import './color.scss'

interface ColorProps {
  title?: string
}

export const Color = ({ title }: ColorProps) => {
  return (
    <div className="color">
      {title && <p className="color-title">{title}</p>}
      <ChromePicker />
    </div>
  )
}
