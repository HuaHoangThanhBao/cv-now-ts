import AvatarImg from '../../assets/avatar.png';
import './avatar.scss';

export const Avatar = () => {
  return (
    <div className="avatar">
      <div className="avatar-container">
        <img className="avatar-img" src={AvatarImg} alt="" />
      </div>
    </div>
  );
};
