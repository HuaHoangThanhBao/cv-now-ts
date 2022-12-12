import React from 'react';
import AvatarImg from '../../assets/avatar.png';
import './avatar.scss';

export const Avatar = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="avatar" ref={ref}>
      <div className="avatar-container">
        <img className="avatar-img" src={AvatarImg} alt="" />
      </div>
    </div>
  );
});
