import { useState } from 'react';
import { Header } from '../../molecules/Header';
import { Drag } from '../../organisms/Drag/Drag';
import { Template } from '../../organisms/Template';
import './menu.scss';

export const Menu = () => {
  const [option, setOption] = useState('');
  return (
    <div className="menu">
      <Header setOption={setOption} />
      <div className="menu-panel">
        {option === 'layout' && <Drag setOption={setOption} />}
        {option === 'template' && <Template setOption={setOption} />}
      </div>
    </div>
  );
};
