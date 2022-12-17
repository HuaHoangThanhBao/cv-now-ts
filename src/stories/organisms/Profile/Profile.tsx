import React from 'react'
import { Avatar } from '../../atoms/Avatar'
import { ProfileInfo } from '../../molecules/ProfileInfo'
import { ProfileSocial } from '../../molecules/ProfileSocial'

interface ProfileProps {
  onClick: () => void
}

export const Profile = React.forwardRef<HTMLDivElement, ProfileProps>(
  ({ onClick }: ProfileProps, ref) => {
    return (
      <div className="profile" ref={ref}>
        <div className="profile-content">
          <Avatar />
          <ProfileInfo />
        </div>
        <ProfileSocial onClick={onClick} />
      </div>
    )
  }
)
