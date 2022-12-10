import { Avatar } from '../../atoms/Avatar';
import { ProfileInfo } from '../../molecules/ProfileInfo';
import { ProfileSocial } from '../../molecules/ProfileSocial';

export const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-content">
        <Avatar />
        <ProfileInfo />
      </div>
      <ProfileSocial />
    </div>
  );
};
