import { useRef } from 'react'
import { useOnClickOutside } from 'src/hooks'
import { Selection } from 'src/types/Selection'
import { Color } from '../Color'
import './theme.scss'

export const Theme = ({ data, setOption }: Selection<string>) => {
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    setOption('')
  })
  return (
    <div className="theme" ref={ref}>
      <div className="theme-color">
        <Color title={'Color'} />
      </div>
      <div className="theme-background">
        <p className="theme-title">Backgrounds</p>
        <div className="theme-list">
          {data.map((item, index) => (
            <div key={index} className={`theme-item ${item}`}></div>
          ))}
        </div>
      </div>
    </div>
  )
}
