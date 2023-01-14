import { useDispatch } from 'react-redux'
import { PageTransformState, transformPages } from '../stories/organisms/Block/block.slice'

export const useTransformPages = ({
  isOneColumn,
  pagesOneColumn,
  pagesTwoColumn
}: Required<PageTransformState>) => {
  const dispatch = useDispatch()

  const callTransformPages = (
    _pagesOneColumn?: string[][][],
    _pagesTwoColumn?: string[][][],
    _isOneColumn?: boolean
  ) => {
    dispatch(
      transformPages({
        isOneColumn: _isOneColumn ?? isOneColumn,
        pagesOneColumn: _pagesOneColumn || pagesOneColumn,
        pagesTwoColumn: _pagesTwoColumn || pagesTwoColumn
      })
    )
  }

  return { callTransformPages }
}
