import React from 'react'
import { ProfileState } from 'src/stories/pages/DocumentList/documentList.slice'
import { Avatar } from '../../atoms/Avatar'
import { ProfileInfo } from '../../molecules/ProfileInfo'
import { ProfileSocial } from '../../molecules/ProfileSocial'

interface ProfileProps {
  profile: ProfileState
  onClick: () => void
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  bindingImage: () => string
}

export const Profile = React.forwardRef<HTMLDivElement, ProfileProps>(
  ({ profile, onClick, onSelectFile, bindingImage }: ProfileProps, ref) => {
    return (
      <div className="profile" ref={ref}>
        <div className="profile-content">
          <Avatar onSelectFile={onSelectFile} bindingImage={bindingImage} />
          <ProfileInfo />
        </div>
        <ProfileSocial onClick={onClick} profile={profile} />
      </div>
    )
  }
)
