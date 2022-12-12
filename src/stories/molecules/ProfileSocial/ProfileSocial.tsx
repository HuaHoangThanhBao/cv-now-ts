import React from 'react';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon/Icon';
import './profileSocial.scss';

export const ProfileSocial = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="profile-social" ref={ref}>
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
});
