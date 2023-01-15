import { useRef } from 'react'
import { useOnClickOutside } from 'src/hooks'
import { BlockChildren } from 'src/types/Block'
import { Selection } from 'src/types/Selection'
import './modal.scss'

interface ModalProps extends Pick<Selection<unknown>, 'action'>, BlockChildren {
  isOpen: boolean
}

export const Modal = ({ isOpen, action, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, action ? action : () => undefined)
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
