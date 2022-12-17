import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { ProfileState } from 'src/stories/pages/DocumentList/documentList.slice'
import { Button } from '../../atoms/Button'
import { Icon } from '../../atoms/Icon'
import './profileSocial.scss'

interface ProfileSocialProps {
  onClick: () => void
}

export const ProfileSocial = React.forwardRef<HTMLDivElement, ProfileSocialProps>(
  ({ onClick }: ProfileSocialProps, ref) => {
    const profile = useSelector((state: RootState) => state.document.resume.profile)
    return (
      <div
        className="profile-social"
        ref={ref}
        onClick={onClick}
        onKeyDown={onClick}
        role={'button'}
        tabIndex={0}
      >
        <div className="profile-social-container">
          {Object.keys(profile).map((key: string) => {
            const _key = key as keyof ProfileState
            if (profile[_key] && key !== '_id' && key !== '__v') {
              return (
                <Button
                  key={key}
                  icon={<Icon iconType={key} isSocialIcon={true} />}
                  text={profile[_key]}
                />
              )
            }
          })}
        </div>
      </div>
    )
  }
)
