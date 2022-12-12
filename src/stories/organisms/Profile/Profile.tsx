import React from 'react';
import { Avatar } from '../../atoms/Avatar';
import { ProfileInfo } from '../../molecules/ProfileInfo';
import { ProfileSocial } from '../../molecules/ProfileSocial';

export const Profile = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="profile" ref={ref}>
      <div className="profile-content">
        <Avatar />
        <ProfileInfo />
      </div>
      <ProfileSocial />
    </div>
  );
});
