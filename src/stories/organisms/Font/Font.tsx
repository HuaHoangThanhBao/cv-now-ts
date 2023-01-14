import { useRef } from 'react'
import { font_sizes } from 'src/contants/font'
import { useOnClickOutside } from 'src/hooks'
import { Selection } from 'src/types/Selection'
import './font.scss'

export const Font = ({ data, setOption }: Selection<string>) => {
  const ref = useRef(null)
  useOnClickOutside(ref, () => {
    setOption('')
  })
  return (
    <div className="font" ref={ref}>
      <p className="font-title">Fonts</p>
      <div className="font-families">
        {data.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      <hr />
      <div className="font-sizes">
        {Object.keys(font_sizes).length !== 0 &&
          Object.keys(font_sizes).map((size) => (
            <div className="font-sizes-item" key={size}>
              <input type="radio" name="font-size" checked={false} onChange={() => undefined} />
              <span>{size}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
