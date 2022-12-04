import React from 'react';
import { Transform } from '../../templates/Transform';
import { Document } from '../../templates/Document';
import './myDocument.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const MyDocument: React.FC = () => {
  const rootBlockState = useSelector((state: RootState) => state.block);
  return (
    <>
      <Transform />
      <Document
        pages={rootBlockState.pages}
        state={rootBlockState}
        isOneColumn={rootBlockState.isOneColumn || false}
        pagesOneColumn={rootBlockState.pagesOneColumn}
        pagesTwoColumn={rootBlockState.pagesTwoColumn}
      />
    </>
  );
};
