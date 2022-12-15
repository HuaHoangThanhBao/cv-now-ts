import { useRef, useImperativeHandle, forwardRef, KeyboardEvent } from 'react'
import { useDispatch } from 'react-redux'
import { Common, GlobalIterator } from '../../../types/Block'
import { Panel } from '../../organisms/Panel'
import { convert } from '../../../utils'
import { Block } from '../../organisms/Block'
import {
  BlockInitialState,
  createBlock,
  updateSelectedBlock
} from '../../organisms/Block/block.slice'
import { useTransformBlock, useEventListener, useTransformProfile } from '../../../hooks'
import './resume.scss'
import { TemplateType } from '../../../types/Template'
import { maxHeight } from '../../../contants'

interface ResumeProps {
  pages: string[][][]
  state: BlockInitialState
  isOneColumn: boolean
  pagesOneColumn: string[][][]
  pagesTwoColumn: string[][][]
  isOnPreview?: boolean
  template: string
}
type ForwardRefProps = GlobalIterator

export const Resume = forwardRef<ForwardRefProps, ResumeProps>((props: ResumeProps, ref) => {
  const { pages, state, isOneColumn, pagesOneColumn, pagesTwoColumn, isOnPreview, template } = props
  const panelsRef = useRef<HTMLDivElement[]>([])
  const blocksRef = useRef([])
  const profileAvatarRef = useRef<HTMLDivElement>(null)
  const profileInfoRef = useRef<HTMLDivElement>(null)
  const profileSocialRef = useRef<HTMLDivElement>(null)
  const profileContainerRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const [pagesD, callMovingBlock] = useTransformBlock({
    pages,
    state,
    isOneColumn,
    pagesOneColumn,
    pagesTwoColumn,
    blocksRef,
    profileAvatarRef,
    profileInfoRef,
    profileSocialRef,
    profileContainerRef,
    isOnPreview
  })
  const [renderProfileAvatar, renderProfileInfo, renderProfileSocial, renderProfile] =
    useTransformProfile({
      template,
      profileAvatarRef,
      profileInfoRef,
      profileSocialRef,
      profileContainerRef
    })

  useImperativeHandle(ref, () => panelsRef)

  const techHeightTemplateStyle = (pageI: number) => {
    if ((template === TemplateType.tech || template === TemplateType.it) && pageI === 0) {
      return maxHeight - (profileContainerRef.current?.offsetHeight || 0) - 16 + 'px'
    } else if (pageI !== 0 && (template === TemplateType.tech || template === TemplateType.it)) {
      return `${maxHeight - 16 * 2}px`
    }
    return ''
  }

  const techMarginTopStyle = (pageI: number) => {
    return (template === TemplateType.tech || template === TemplateType.it) && pageI !== 0
      ? '16px'
      : 0
  }

  const renderDocuments = (_pages: string[][][]) => {
    if (_pages.length > 0) {
      return _pages.map((page: string[][], pageI: number) => (
        <Panel
          pageI={pageI}
          key={page.length + pageI}
          className={`${template}` + (!isOneColumn ? ' two-column' : ' one-column')}
          ref={panelsRef}
        >
          {renderProfile(pageI)}
          {renderBlocks(page, pageI)}
        </Panel>
      ))
    } else return <></>
  }
  const renderBlocks = (_pages: string[][], pageI: number) => {
    if (pagesD.length > 1) {
      const evenColumn = _pages[0]
      const oddColumn = _pages[1]
      return (
        <>
          <div className="even">
            {renderProfileAvatar(pageI, 0)}
            {renderProfileSocial(pageI, 0)}
            {evenColumn.map((block: string, blockIndex: number) => {
              const blocks: Common[] = convert(evenColumn[blockIndex].split('/')[0], state)
              return blocks.map((blockChild, blockChildIndex) => {
                if (blockChild.id === block) {
                  return (
                    <Block
                      key={blockChild.uid}
                      data={blockChild}
                      blockChildIndex={blockChildIndex}
                      ref={blocksRef}
                    />
                  )
                } else return null
              })
            })}
          </div>
          {!isOneColumn && (
            <div
              className="odd"
              style={{
                minHeight: techHeightTemplateStyle(pageI),
                marginTop: techMarginTopStyle(pageI)
              }}
            >
              {renderProfileInfo(pageI, 1)}
              {renderProfileSocial(pageI, 1)}
              {oddColumn &&
                oddColumn.map((block: string, blockIndex: number) => {
                  if (oddColumn[blockIndex]) {
                    const blocks: Common[] = convert(oddColumn[blockIndex].split('/')[0], state)
                    return blocks.map((blockChild, blockChildIndex) => {
                      if (blockChild.id === block) {
                        return (
                          <Block
                            key={blockChild.uid}
                            data={blockChild}
                            blockChildIndex={blockChildIndex}
                            ref={blocksRef}
                          />
                        )
                      } else return null
                    })
                  } else return null
                })}
            </div>
          )}
        </>
      )
    } else {
      return _pages.map((column: string[]) => {
        return column.map((block: string) => {
          const blocks: Common[] = convert(block, state)
          return blocks.map((item, index) => (
            <Block
              key={item.uid + index.toString()}
              data={item}
              blockChildIndex={index}
              ref={blocksRef}
            />
          ))
        })
      })
    }
  }

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (isOnPreview) return
    if (e.key === 'q') {
      console.log('one')
      dispatch(createBlock({ blockCreateId: '2' }))
      callMovingBlock(true)
    }
    if (e.key === 'w') {
      dispatch(createBlock({ blockCreateId: '3' }))
      callMovingBlock(true)
    }
    if (e.key === 'e') {
      dispatch(createBlock({ blockCreateId: '1' }))
      callMovingBlock(true)
    }
    if (e.key === 'r') {
      dispatch(createBlock({ blockCreateId: '4' }))
      callMovingBlock(true)
    }
    if (e.key === 'Escape') {
      callMovingBlock(true)
    }
  })

  useEventListener('mousedown', (e: MouseEvent) => {
    if (isOnPreview) return
    e.stopPropagation()
    const element = e.target as HTMLDivElement
    if (!element) return
    const parentElement = element?.parentElement
    const parentParentElement = element?.parentElement?.parentElement
    if (element.tagName === 'DIV') {
      dispatch(
        updateSelectedBlock({
          selectedBlock: {
            selectedElement: element?.className ? element.className : 'none'
          }
        })
      )
    } else if (
      parentElement &&
      parentElement.tagName === 'DIV' &&
      parentElement.className.includes('block') &&
      parentElement.className.includes('block-bar') &&
      parentElement.className.includes('block-bar-icon')
    ) {
      dispatch(
        updateSelectedBlock({
          selectedBlock: { selectedElement: parentElement.className }
        })
      )
    } else if (
      parentParentElement &&
      parentParentElement.tagName === 'DIV' &&
      parentParentElement?.className.includes('block-bottom')
    ) {
      dispatch(
        updateSelectedBlock({
          selectedBlock: { selectedElement: parentParentElement.className }
        })
      )
    } else dispatch(updateSelectedBlock({ selectedBlock: { selectedElement: 'none' } }))
  })

  return <>{renderDocuments(pagesD)}</>
})
