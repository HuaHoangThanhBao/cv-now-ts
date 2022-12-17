import { ReactNode, useRef } from 'react'
import { useOnClickOutside } from 'src/hooks'
import './modal.scss'

interface ModalProps {
  isOpen: boolean
  children?: ReactNode
  onClick: () => void
}

export const Modal = ({ isOpen, onClick, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, onClick)
  if (isOpen)
    return (
      <div className="modal">
        <div className="modal-wrapper" ref={ref}>
          {children}
        </div>
      </div>
    )
  return null
}
