import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'src/stories/organisms/Modal'
import { AvatarState, ProfileState } from 'src/stories/pages/DocumentList/documentList.slice'
import { RootState } from '../store'
import { Avatar } from '../stories/atoms/Avatar/Avatar'
import { ProfileInfo } from '../stories/molecules/ProfileInfo'
import { ProfileSocial } from '../stories/molecules/ProfileSocial'
import { Profile } from '../stories/organisms/Profile'
import { TemplateType } from '../types/Template'
import { useProfileForm } from './useProfileForm'
import { useUploadAvatar } from './useUploadAvatar'

interface TransformProfileProps {
  profile: ProfileState
  avatar: AvatarState
  template: string
  profileAvatarRef: React.RefObject<HTMLDivElement>
  profileInfoRef: React.RefObject<HTMLDivElement>
  profileSocialRef: React.RefObject<HTMLDivElement>
  profileContainerRef: React.RefObject<HTMLDivElement>
}

export const useTransformProfile = ({
  profile,
  avatar,
  template,
  profileAvatarRef,
  profileInfoRef,
  profileSocialRef,
  profileContainerRef
}: TransformProfileProps) => {
  const isOneColumn = useSelector((state: RootState) => state.block.isOneColumn)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    isShowImageCrop,
    disableShowImageCrop,
    renderProfileCropForm,
    bindingImage,
    onSelectFile
  } = useUploadAvatar({ avatar })

  const showModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const renderProfileAvatar = (pageI: number) => {
    if (pageI > 0) return null
    if (
      (template !== TemplateType.skilled_based &&
        template !== TemplateType.functional &&
        template !== TemplateType.minimalist) ||
      isOneColumn
    )
      return null
    return <Avatar ref={profileAvatarRef} onSelectFile={onSelectFile} bindingImage={bindingImage} />
  }

  const renderProfileInfo = (pageI: number) => {
    if (pageI > 0) return null
    if (isOneColumn) return null
    else if (
      template === TemplateType.minimalist ||
      template === TemplateType.skilled_based ||
      template === TemplateType.functional
    )
      return <ProfileInfo ref={profileInfoRef} />
  }

  const renderProfileSocial = (pageI: number, columnI: number) => {
    if (pageI > 0) return null
    if (isOneColumn) return null
    if (
      (template === TemplateType.functional && columnI === 0) ||
      ((template === TemplateType.minimalist || template === TemplateType.skilled_based) &&
        columnI === 1)
    )
      return <ProfileSocial ref={profileSocialRef} onClick={showModal} profile={profile} />
    return null
  }

  const renderProfile = (pageI: number) => {
    if (pageI > 0) return null
    if (
      (template !== TemplateType.skilled_based &&
        template !== TemplateType.functional &&
        template !== TemplateType.minimalist) ||
      isOneColumn
    )
      return (
        <Profile
          ref={profileContainerRef}
          profile={profile}
          onClick={showModal}
          onSelectFile={onSelectFile}
          bindingImage={bindingImage}
        />
      )
    return null
  }

  const renderModal = () => {
    return (
      <Modal isOpen={isModalOpen} onClick={showModal}>
        {renderProfileForm()}
      </Modal>
    )
  }

  const renderImageCropModal = () => {
    return (
      <Modal isOpen={isShowImageCrop} onClick={disableShowImageCrop}>
        {renderProfileCropForm()}
      </Modal>
    )
  }

  const { renderProfileForm } = useProfileForm({ closeForm: showModal })
  return {
    renderProfileAvatar,
    renderProfileInfo,
    renderProfileSocial,
    renderProfile,
    renderModal,
    renderImageCropModal
  }
}
