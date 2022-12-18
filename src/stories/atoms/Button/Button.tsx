import React from 'react'
import './button.scss'

interface ButtonProps {
  icon?: React.ReactNode
  className?: string
  backgroundColor?: string
  text?: string
  children?: React.ReactNode
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
      className={`btn ${className ? className : ''}`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {icon && icon}
      <div className="btn-text">{text}</div>
      {children}
    </button>
  )
}
