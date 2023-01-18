import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from 'src/hooks'
import { RootState, useAppDispatch } from 'src/store'
import { FontSize } from 'src/types/Font'
import { Selection } from 'src/types/Selection'
import { FontState, sendUpdateCurrentFont } from './font.slice'
import classNames from 'classnames'
import './font.scss'

export const Font = ({ data, setOption }: Selection<string>) => {
  const ref = useRef(null)
  const font = useSelector((state: RootState) => state.font)
  const dispatch = useAppDispatch()

  useOnClickOutside(ref, () => {
    setOption('')
  })

  const updateFont = (fontUpdated: FontState) => {
    dispatch(sendUpdateCurrentFont({ id: font._id, body: fontUpdated }))
  }

  const onChooseFontFamily = (family: string) => {
    const fontUpdated: FontState = { ...font, currentFontFamily: family }
    updateFont(fontUpdated)
  }

  const onChooseFontSize = (size: string) => {
    const fontUpdated: FontState = { ...font, currentFontSize: size }
    updateFont(fontUpdated)
  }

  return (
    <div className="font" ref={ref}>
      <p className="font-title">Fonts</p>
      <div className="font-families">
        {data.map((family) => (
          <div
            key={family}
            onClick={() => onChooseFontFamily(family)}
            onKeyDown={() => onChooseFontFamily(family)}
            role={'button'}
            tabIndex={0}
            className={classNames({
              active: family === font.currentFontFamily
            })}
          >
            {family}
          </div>
        ))}
      </div>
      <hr />
      <div className="font-sizes">
        {Object.keys(FontSize).length !== 0 &&
          Object.keys(FontSize).map((size) => (
            <div className="font-sizes-item" key={size}>
              <input
                type="radio"
                name="font-size"
                checked={size === font.currentFontSize}
                onChange={() => onChooseFontSize(size)}
              />
              <span>{size}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
