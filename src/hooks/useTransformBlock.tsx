import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HttpStatus } from 'src/types/HttpStatus'
import { RootState, useAppDispatch } from '../store'
import {
  BlockInitialState,
  blockRootData,
  doneCreateBlock,
  onMovingBlock,
  PageState,
  PageTransformState
} from '../stories/organisms/Block/block.slice'
import { updateDragPages } from '../stories/organisms/Drag/drag.slice'
import { sendUpdatePages } from '../stories/pages/DocumentList/documentList.slice'
import { GlobalIterator } from '../types/Block'
import { TemplateType } from '../types/Template'
import { useCompareBlock } from './useCompareBlock'
import { useDevice } from './useDevice'
import { useEffectOnce } from './useEffectOnce'
import { useMoveChild } from './useMoveChild'
import { useTransformPages } from './useTransformPages'

interface TransformBlockProps extends PageState {
  state: BlockInitialState
  isOneColumn: boolean
  pagesOneColumn: string[][][]
  pagesTwoColumn: string[][][]
  blocksRef: React.RefObject<HTMLDivElement[]>
  profileAvatarRef: React.RefObject<HTMLDivElement>
  profileInfoRef: React.RefObject<HTMLDivElement>
  profileSocialRef: React.RefObject<HTMLDivElement>
  profileContainerRef: React.RefObject<HTMLDivElement>
  isOnPreview?: boolean
}

export const useTransformBlock = (props: TransformBlockProps) => {
  const {
    pages,
    state,
    blocksRef,
    profileAvatarRef,
    profileInfoRef,
    profileSocialRef,
    profileContainerRef,
    isOneColumn,
    pagesOneColumn,
    pagesTwoColumn,
    isOnPreview
  } = props
  const isMovingBlock = useSelector((state: RootState) => state.block.isMovingBlock)
  const blockCreateId = useSelector((state: RootState) => state.block.blockCreateId)
  const template = useSelector((state: RootState) => state.template.currentTemplate)
  const [pagesD, setPagesD] = useState(pages)
  const [isDoneTransform, setIsDoneTransform] = useState(false)
  const [isMovingBlockD, setIsMovingBlockD] = useState(isMovingBlock || false)
  const { callTransformPages } = useTransformPages({ isOneColumn, pagesOneColumn, pagesTwoColumn })
  const [, moveChildAfter] = useMoveChild({ pages: pagesD, state })
  const { send } = useCompareBlock(blockRootData.education[0])
  const { device } = useDevice()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { documentId } = params

  const findBlockRef = useCallback(
    (blockId: string): number => {
      let sum = 0
      const blockIdFormat = blockId.split('/')[0]
      if (!blocksRef.current) {
        return sum
      }
      const blocks: GlobalIterator = blocksRef.current[Number(blockIdFormat)]
      // console.log('blocks:', blocks);
      for (let i = 0; i < Object.keys(blocks).length; i++) {
        const block = blocks[Object.keys(blocks)[i]]
        // console.log('block:', block);
        if (block.id === blockId) {
          sum += block.el ? block.el.offsetHeight : 0
        }
      }
      return sum
    },
    [blocksRef]
  )

  const getInitalSum = useCallback(
    (pageI: number, isFirstColumn: boolean) => {
      const cvBottomPadding = 180
      if (pageI <= 0) {
        if (profileContainerRef.current) {
          return profileContainerRef.current.offsetHeight + cvBottomPadding
        } else if (
          template === TemplateType.minimalist ||
          template === TemplateType.skilled_based
        ) {
          if (isFirstColumn && profileAvatarRef.current) {
            return profileAvatarRef.current.offsetHeight + cvBottomPadding
          } else if (profileInfoRef.current && profileSocialRef.current) {
            return (
              profileInfoRef.current.offsetHeight +
              profileSocialRef.current.offsetHeight +
              cvBottomPadding
            )
          }
        } else if (template === TemplateType.functional) {
          if (isFirstColumn && profileAvatarRef.current && profileSocialRef.current) {
            return (
              profileAvatarRef.current.offsetHeight +
              profileSocialRef.current.offsetHeight +
              cvBottomPadding
            )
          } else if (profileInfoRef.current) {
            return profileInfoRef.current.offsetHeight + cvBottomPadding
          }
        }
      }
      return 0 + cvBottomPadding
    },
    [profileAvatarRef, profileContainerRef, profileInfoRef, profileSocialRef, template]
  )

  const transformBlocks = useCallback(() => {
    const maxHeight = 1500

    /*Move child to parent*/
    const _pages = moveChildAfter()
    /**/

    const columnFirst = 0
    const columnSecond = 1
    /* Move first and second column to next page*/
    for (let i = 0; i < _pages.length; i++) {
      let sumFirstCol = getInitalSum(i, true)
      let sumSecondCol = getInitalSum(i, false)
      // console.log('///////////////')
      // console.log('sumFirstCol:', sumFirstCol)
      const firstColumn = _pages[i][columnFirst]
      const secondColumn = _pages[i][columnSecond]
      for (let a = 0; a < firstColumn.length; a++) {
        // console.log('firstColumn[a]:', firstColumn[a]);
        sumFirstCol += findBlockRef(firstColumn[a])
        // console.log('sumFirstCol 1:', sumFirstCol)
        if (sumFirstCol > maxHeight) {
          // console.log('over:', firstColumn[a]);
          if (i < _pages.length - 1) {
            const nextFirstColumn = _pages[i + 1][columnFirst]
            for (let z = firstColumn.length - 1; z >= a; z--) {
              // console.log('firstColumn[z]:', firstColumn[z]);
              nextFirstColumn.unshift(firstColumn[z])
            }
            firstColumn.splice(a, firstColumn.length)
            break
          } else {
            _pages.push([[], []])
            const nextFirstColumn = _pages[i + 1][columnFirst]
            for (let z = firstColumn.length - 1; z >= a; z--) {
              nextFirstColumn.unshift(firstColumn[z])
            }
            firstColumn.splice(a, firstColumn.length)
            break
          }
        }
      }
      // console.log('sumFirstCol:', sumFirstCol);
      if (_pages[0].length > 1) {
        if (secondColumn) {
          for (let a = 0; a < secondColumn.length; a++) {
            sumSecondCol += findBlockRef(secondColumn[a])
            if (sumSecondCol > maxHeight) {
              if (i < _pages.length - 1) {
                const nextSecondColumn = _pages[i + 1][columnSecond]
                for (let z = secondColumn.length - 1; z >= a; z--) {
                  nextSecondColumn.unshift(secondColumn[z])
                }
                secondColumn.splice(a, secondColumn.length)
                break
              } else {
                _pages.push([[], []])
                const nextSecondColumn = _pages[i + 1][columnSecond]
                for (let z = secondColumn.length - 1; z >= a; z--) {
                  nextSecondColumn.unshift(secondColumn[z])
                }
                secondColumn.splice(a, secondColumn.length)
                break
              }
            }
          }
        }
      }
    }
    /* End Move first and second column to next page*/

    console.log('--------------------------')

    /* Move first and second column to previous page*/
    for (let i = 0; i < _pages.length; i++) {
      let sumFirstCol = getInitalSum(i, true)
      let sumSecondCol = getInitalSum(i, false)
      const firstColumnDelete = []
      const secondColumnDelete = []
      const firstColumn = _pages[i][columnFirst]
      const secondColumn = _pages[i][columnSecond]
      for (let a = 0; a < firstColumn.length; a++) {
        sumFirstCol += findBlockRef(firstColumn[a])
      }
      if (secondColumn) {
        for (let a = 0; a < secondColumn.length; a++) {
          sumSecondCol += findBlockRef(secondColumn[a])
        }
      }
      if (sumFirstCol < maxHeight) {
        if (i < _pages.length - 1) {
          const nextFirstColumn = _pages[i + 1][columnFirst]
          for (let z = 0; z < nextFirstColumn.length; z++) {
            sumFirstCol += findBlockRef(nextFirstColumn[z])
            if (sumFirstCol < maxHeight) {
              firstColumn.push(nextFirstColumn[z])
              firstColumnDelete.push(nextFirstColumn[z])
            } else {
              break
            }
          }
          //remove deleted element
          for (let z = 0; z < firstColumnDelete.length; z++) {
            nextFirstColumn.shift()
          }
        }
      }
      if (_pages[0].length > 1) {
        if (sumSecondCol < maxHeight) {
          if (i < _pages.length - 1) {
            const nextSecondColumn = _pages[i + 1][columnSecond]
            for (let z = 0; z < nextSecondColumn.length; z++) {
              sumSecondCol += findBlockRef(nextSecondColumn[z])
              if (sumSecondCol < maxHeight) {
                secondColumn.push(nextSecondColumn[z])
                secondColumnDelete.push(nextSecondColumn[z])
              } else {
                break
              }
            }
            //remove deleted element
            for (let z = 0; z < secondColumnDelete.length; z++) {
              nextSecondColumn.shift()
            }
          }
        }
      }
    }
    /* End Move first and second column to previous page*/

    /* Remove empty pages */
    if (_pages[0].length > 1) {
      for (let i = _pages.length - 1; i >= 0; i--) {
        if (_pages[i][0].length === 0 && _pages[i][1].length === 0) {
          _pages.pop()
        }
      }
    } else {
      for (let i = _pages.length - 1; i >= 0; i--) {
        if (_pages[i].length === 0 || (_pages[i][0] && _pages[i][0].length === 0)) {
          _pages.splice(i, 1)
        }
      }
    }
    console.log('pages result:', _pages)
    // dispatch(updatePages({ pages: [..._pages] }));
    setPagesD(_pages)
  }, [findBlockRef, getInitalSum, moveChildAfter])

  const callMovingBlock = (status: boolean) => {
    setIsMovingBlockD(status)
  }

  const sendUpdateDocument = useCallback(() => {
    if (documentId && documentId !== '-1') {
      const request: PageTransformState = {
        isOneColumn: state.isOneColumn,
        pagesOneColumn: state.pagesOneColumn,
        pagesTwoColumn: state.pagesTwoColumn
      }
      console.log('update document request:', request)
      setIsDoneTransform(false)
      const promise = dispatch(sendUpdatePages({ id: documentId, body: request }))
      promise.unwrap().catch((error) => {
        if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
          if (device !== 'mobile') {
            navigate('/')
          }
        }
      })
      return promise
    }
  }, [
    dispatch,
    documentId,
    state.isOneColumn,
    state.pagesOneColumn,
    state.pagesTwoColumn,
    navigate
  ])

  useEffectOnce(() => {
    if (!isOnPreview) {
      callMovingBlock(true)
      dispatch(onMovingBlock(true))
      callTransformPages()
    }
  })

  //if new block content is created, call update to api
  useEffect(() => {
    if (blockCreateId !== '-1') {
      send()
      // callMovingBlock(true);
      dispatch(doneCreateBlock())
    }
  }, [blockCreateId, send, dispatch])

  //if we done transform, we call update pages data to api
  useEffect(() => {
    const promise = isDoneTransform && !isOnPreview ? sendUpdateDocument() : null
    if (!isOnPreview) transformBlocks()
    return () => {
      promise?.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDoneTransform, sendUpdateDocument])

  useEffect(() => {
    if (isMovingBlockD && !isOnPreview) {
      transformBlocks()
      callMovingBlock(false)
      setIsDoneTransform(true)
      dispatch(onMovingBlock(false))
    }
  }, [dispatch, isMovingBlockD, isOnPreview, transformBlocks])

  useEffect(() => {
    if (isMovingBlock) {
      callMovingBlock(isMovingBlock)
    }
  }, [isMovingBlock])

  useEffect(() => {
    if (!isOnPreview) {
      setPagesD([...pages])
      callMovingBlock(true)
      const filtered = pages.map((page: string[][]) =>
        page.map((column: string[]) => column.filter((block: string) => !block.includes('/')))
      )
      dispatch(updateDragPages({ pages: filtered }))
    }
  }, [dispatch, isOnPreview, pages])

  return { pagesD, callMovingBlock }
}
