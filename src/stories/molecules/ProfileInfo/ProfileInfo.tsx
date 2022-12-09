import { InputInfo } from '../../atoms/InputInfo';
import './profileInfo.scss';

export const ProfileInfo = () => {
  return (
    <div className="profile-info">
      <InputInfo placeHolder="Michael John" />
      <InputInfo placeHolder="Professional Title" />
      <InputInfo placeHolder="Short and engaging pitch about yourself." />
    </div>
  );
};
