import { forwardRef } from 'react'
import { BlockChildren } from 'src/types/Block'
import './panel.scss'

interface PanelProps extends BlockChildren {
  pageI: number
  className?: string
  backgroundColor?: string
  color?: string
  fontFamily?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Panel = forwardRef((props: PanelProps, ref: any) => {
  const { pageI, backgroundColor, className, children, color, fontFamily } = props
  return (
    <div
      className={`panel ${className} ${fontFamily}`}
      style={{ backgroundColor, color }}
      ref={(el) => (ref.current[pageI] = el)}
    >
      {children}
    </div>
  )
})
