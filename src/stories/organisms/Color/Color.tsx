import { ChromePicker } from 'react-color'
import './color.scss'

interface ColorProps<T> {
  title?: string
  color: T
  action: (color: { hex: T }) => void
}

export const Color = ({ title, color, action }: ColorProps<string>) => {
  return (
    <div className="color">
      {title && <p className="color-title">{title}</p>}
      <ChromePicker color={color} onChange={action} />
    </div>
  )
}
