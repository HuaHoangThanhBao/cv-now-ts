import React, { useState } from 'react'
import Cropper, { Point, Area } from 'react-easy-crop'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/store'
import { DocumentRes, sendUpdateAvatar } from 'src/stories/pages/DocumentList/documentList.slice'
import { HttpStatus } from 'src/types/HttpStatus'
import getCroppedImg from 'src/utils/cropImage'
import AvatarImg from '../stories/assets/avatar.png'

export const useUploadAvatar = ({ avatar }: Pick<DocumentRes, 'avatar'>) => {
  const [avatarSrc, setAvatarSrc] = useState('')
  const [croppedImage, setCroppedImage] = useState('')

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: -1,
    y: -1,
    width: 0,
    height: 0
  })
  const [isShowImageCrop, setIsShowImageCrop] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setAvatarSrc(reader?.result?.toString() || '')
        setIsShowImageCrop(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const disableShowImageCrop = () => {
    setIsShowImageCrop(false)
  }

  const cropImgCallback = (base64: string) => {
    dispatch(
      sendUpdateAvatar({
        id: avatar._id || '-1',
        body: {
          ...avatar,
          url: base64
        }
      })
    )
      .unwrap()
      .catch((error) => {
        if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
          navigate('/')
        }
      })
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        avatarSrc,
        croppedAreaPixels,
        rotation,
        cropImgCallback
      )
      if (croppedImage) {
        setCroppedImage(croppedImage)
        setAvatarSrc(croppedImage)
        setIsShowImageCrop(false)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const bindingImage = () => {
    if (!isShowImageCrop) {
      if (croppedImage) {
        return croppedImage
      }
    } else {
      if (croppedImage) {
        return croppedImage
      }
    }
    return avatar.url || AvatarImg
  }

  const renderProfileCropForm = () => {
    return (
      <>
        <div className="modal-option">
          <p className="modal-option-title">Crop Image</p>
          <button className="modal-btn-save" onClick={showCroppedImage}>
            Save
          </button>
        </div>
        <div className="modal-container">
          <div style={{ position: 'relative', height: '350px', background: '#ffffff' }}>
            <Cropper
              image={avatarSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid={true}
            />
          </div>
        </div>
      </>
    )
  }

  return {
    avatarSrc,
    isShowImageCrop,
    bindingImage,
    disableShowImageCrop,
    renderProfileCropForm,
    onSelectFile
  }
}
