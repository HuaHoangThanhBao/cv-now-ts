import { useState } from 'react';
import { Header } from '../../molecules/Header';
import { Drag } from '../../organisms/Drag/Drag';
import './menu.scss';

export const Menu = () => {
  const [option, setOption] = useState('');
  return (
    <div className="menu">
      <Header setOption={setOption} />
      <div className="menu-panel">
        <Drag option={option} setOption={setOption} />
      </div>
    </div>
  );
};
