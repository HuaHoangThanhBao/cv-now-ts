import { useDispatch } from 'react-redux';
import { transformPages } from '../stories/organisms/Block/block.slice';

interface TransformPagesProps {
  isOneColumn: boolean;
  pagesOneColumn?: any;
  pagesTwoColumn?: any;
}

export const useTransformPages = ({
  isOneColumn,
  pagesOneColumn,
  pagesTwoColumn,
}: TransformPagesProps): [
  (_pagesOneColumn?: string[][][], _pagesTwoColumn?: string[][][], _isOneColumn?: boolean) => void
] => {
  const dispatch = useDispatch();

  const callTransformPages = (
    _pagesOneColumn?: string[][][],
    _pagesTwoColumn?: string[][][],
    _isOneColumn?: boolean
  ) => {
    dispatch(
      transformPages({
        isOneColumn: _isOneColumn ?? isOneColumn,
        pagesOneColumn: _pagesOneColumn || pagesOneColumn,
        pagesTwoColumn: _pagesTwoColumn || pagesTwoColumn,
      })
    );
  };

  return [callTransformPages];
};
