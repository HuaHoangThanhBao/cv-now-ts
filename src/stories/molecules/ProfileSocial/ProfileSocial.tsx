import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon/Icon';
import './profileSocial.scss';

export const ProfileSocial = () => {
  return (
    <div className="profile-social">
      <div className="profile-social-container">
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
        <Button icon={<Icon iconType="education" />} text="bao@gmail.com" />
      </div>
    </div>
  );
};
