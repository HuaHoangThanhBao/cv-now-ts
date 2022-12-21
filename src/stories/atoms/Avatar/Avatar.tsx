import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'src/hooks'
import { Button } from '../Button'
import { Icon } from '../Icon'
import './avatar.scss'

interface AvatarProps {
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  bindingImage: () => string
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ onSelectFile, bindingImage }, ref) => {
    const [showUpload, setShowUpload] = useState(false)
    const innerRef = useRef<HTMLDivElement>(null)

    const handleShowUpload = () => {
      setShowUpload(true)
    }

    const handleDisbaleUpload = () => {
      setShowUpload(false)
    }

    //This function help we select the same image after first selection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSelectFileClick = (event: any) => {
      event.target.value = ''
    }

    useOnClickOutside(innerRef, handleDisbaleUpload)

    return (
      <div className="avatar" ref={ref}>
        <div
          className="avatar-container"
          onClick={handleShowUpload}
          onKeyDown={handleShowUpload}
          role={'button'}
          tabIndex={0}
          ref={innerRef}
        >
          <img className="avatar-img" src={bindingImage()} alt="" />
          <Button
            className={`btn avatar-upload ${showUpload ? 'active' : ''}`}
            text={'Upload Photo'}
            icon={<Icon iconType={'upload'} />}
          >
            <input
              className="avatar-upload-file"
              type="file"
              name="file"
              accept="image/*"
              onClick={onSelectFileClick}
              onChange={onSelectFile}
            />
          </Button>
        </div>
      </div>
    )
  }
)
