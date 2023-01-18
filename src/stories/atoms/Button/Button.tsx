import React from 'react'
import { BlockChildren } from 'src/types/Block'
import classNames from 'classnames'
import './button.scss'

interface ButtonProps extends BlockChildren {
  icon?: React.ReactNode
  className?: string
  backgroundColor?: string
  text?: string
  onClick?: () => void
}

export const Button = ({
  icon,
  className = '',
  backgroundColor,
  text = '',
  children,
  onClick
}: ButtonProps) => {
  return (
    <button
      className={classNames('btn', `${className || ''}`)}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {icon && icon}
      <div className="btn-text">{text}</div>
      {children}
    </button>
  )
}
