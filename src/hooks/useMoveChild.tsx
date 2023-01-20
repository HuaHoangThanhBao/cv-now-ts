import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HttpStatus } from 'src/types/HttpStatus'
import { RootState, useAppDispatch } from '../store'
import { BlockInitialState, PageState, updatePages } from '../stories/organisms/Block/block.slice'
import { NoNeedRequestState, sendUpdateNoNeeds } from '../stories/organisms/Drag/drag.slice'
import { moveChildBlockToParentBlock } from '../utils'
import { useTransformPages } from './useTransformPages'

interface MoveChild extends PageState {
  state: BlockInitialState
}

export const useMoveChild = ({
  pages,
  state
}: MoveChild): [() => string[][][], () => string[][][]] => {
  const blockState = useSelector((state: RootState) => state.block)
  const noNeedsOneColumn = useSelector((state: RootState) => state.drag.noNeedsOneColumn)
  const noNeedsTwoColumn = useSelector((state: RootState) => state.drag.noNeedsTwoColumn)
  const noNeeds = !blockState.isOneColumn ? noNeedsTwoColumn : noNeedsOneColumn

  const navigate = useNavigate()
  const params = useParams()
  const { documentId } = params
  const { callTransformPages } = useTransformPages({
    isOneColumn: state.isOneColumn || false,
    pagesOneColumn: [],
    pagesTwoColumn: []
  })
  const dispatch = useAppDispatch()

  const moveChildBefore = () => {
    let _pages = JSON.parse(JSON.stringify(pages))
    noNeeds.forEach((n) => {
      console.log(n)
      _pages = _pages.map((page: string[][]) =>
        page.map((column: string[]) => column.filter((block: string) => block !== n))
      )
    })

    _pages = _pages.map((page: string[][]) =>
      page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
    )
    /*Move child to parent*/
    _pages = moveChildBlockToParentBlock(_pages, state)
    /**/

    callTransformPages(_pages, _pages)
    if (documentId && documentId !== '-1') {
      const request: NoNeedRequestState = {
        isOneColumn: state.isOneColumn,
        noNeedsOneColumn: state.isOneColumn ? noNeeds : noNeedsOneColumn,
        noNeedsTwoColumn: !state.isOneColumn ? noNeeds : noNeedsTwoColumn,
        pagesOneColumn: state.isOneColumn ? _pages : state.pagesOneColumn,
        pagesTwoColumn: !state.isOneColumn ? _pages : state.pagesTwoColumn
      }
      // console.log('request:', request);
      dispatch(sendUpdateNoNeeds({ id: documentId, body: request }))
        .unwrap()
        .catch((error) => {
          if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
            navigate('/')
          }
        })
    }

    dispatch(updatePages({ pages: [..._pages] }))
    return _pages
  }

  const moveChildAfter = () => {
    let _pages = JSON.parse(JSON.stringify(pages))
    _pages = _pages.map((page: string[][]) =>
      page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
    )
    /*Move child to parent*/
    _pages = moveChildBlockToParentBlock(_pages, state)
    /**/
    return _pages
  }

  return [moveChildBefore, moveChildAfter]
}
