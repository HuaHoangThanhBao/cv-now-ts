import { useSelector } from 'react-redux';
import { useColumnTransform } from '../../../hooks';
import { RootState } from '../../../store';
import { Drag } from '../../organisms/Drag/Drag';

export const Transform = () => {
  const blockState = useSelector((state: RootState) => state.block);
  const [onChangeColumnTransform] = useColumnTransform();

  return (
    <>
      <Drag />
      <input type="checkbox" onChange={onChangeColumnTransform} checked={blockState.isOneColumn} />
    </>
  );
};
