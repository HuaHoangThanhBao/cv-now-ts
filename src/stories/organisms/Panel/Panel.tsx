import { forwardRef, ReactNode } from 'react'
import './panel.scss'

interface PanelProps {
  pageI: number
  className?: string
  backgroundColor?: string
  children?: JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Panel = forwardRef((props: PanelProps, ref: any) => {
  const { pageI, backgroundColor, className, children } = props
  return (
    <div
      className={`panel ${className}`}
      style={{ backgroundColor }}
      ref={(el) => (ref.current[pageI] = el)}
    >
      {children}
    </div>
  )
})
