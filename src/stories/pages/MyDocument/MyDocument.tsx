import React from 'react';
import { Transform } from '../../templates/Transform';
import { Resume } from '../../templates/Resume';
import './myDocument.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const MyDocument: React.FC = () => {
  const rootBlockState = useSelector((state: RootState) => state.block);
  return (
    <>
      <Transform />
      <Resume
        pages={rootBlockState.pages}
        state={rootBlockState}
        isOneColumn={rootBlockState.isOneColumn || false}
        pagesOneColumn={rootBlockState.pagesOneColumn}
        pagesTwoColumn={rootBlockState.pagesTwoColumn}
      />
    </>
  );
};
