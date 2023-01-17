import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from 'src/hooks'
import { RootState, useAppDispatch } from 'src/store'
import { Selection } from 'src/types/Selection'
import { Color } from '../Color'
import { sendUpdateCurrentTheme, ThemeState } from './theme.slice'
import './theme.scss'

export const Theme = ({ data, setOption }: Selection<string>) => {
  const ref = useRef(null)
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useAppDispatch()

  useOnClickOutside(ref, () => {
    setOption('')
  })

  const updateTheme = (updatedTheme: ThemeState) => {
    dispatch(sendUpdateCurrentTheme({ id: theme._id, body: updatedTheme }))
  }

  const onChooseTheme = (_theme: string) => {
    const updatedTheme: ThemeState = { ...theme, currentTheme: _theme }
    updateTheme(updatedTheme)
  }

  const onChooseColor = (_color: { hex: string }) => {
    const updatedTheme: ThemeState = { ...theme, color: _color.hex }
    updateTheme(updatedTheme)
  }

  return (
    <div className="theme" ref={ref}>
      <div className="theme-color">
        <Color title={'Color'} color={theme.color} action={onChooseColor} />
      </div>
      <div className="theme-background">
        <p className="theme-title">Backgrounds</p>
        <div className="theme-list">
          {data.map((item, index) => (
            <div
              key={index}
              className={`theme-item ${item}`}
              role={'button'}
              tabIndex={0}
              onClick={() => onChooseTheme(item)}
              onKeyDown={() => onChooseTheme(item)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
