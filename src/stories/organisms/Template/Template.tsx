import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { templates } from '../../../contants'
import { useOnClickOutside } from '../../../hooks'
import { RootState, useAppDispatch } from '../../../store'
import { Resume } from '../../templates/Resume'
import { onMovingBlock } from '../Block/block.slice'
import './template.scss'
import { sendUpdateCurrentTemplate, TemplateState, updateCurrentTemplate } from './template.slice'

interface TemplateProps {
  setOption: (option: string) => void
}

export const Template = ({ setOption }: TemplateProps) => {
  const ref = useRef(null)
  const blockState = useSelector((state: RootState) => state.block)
  const resume = useSelector((state: RootState) => state.document.resume)
  const dispatch = useAppDispatch()

  useOnClickOutside(ref, () => {
    setOption('')
  })

  const onChangeTemplate = (template: string) => {
    const updateTemplate: TemplateState = {
      ...resume.template,
      currentTemplate: template
    }
    dispatch(updateCurrentTemplate(template))
    dispatch(sendUpdateCurrentTemplate({ id: resume.template._id || '-1', body: updateTemplate }))
    dispatch(onMovingBlock(true))
  }

  return (
    <div className="template" ref={ref}>
      {Object.keys(templates).map((template: string) => (
        <div
          className="preview"
          key={template}
          onClick={() => onChangeTemplate(template)}
          onKeyDown={() => onChangeTemplate(template)}
          role={'button'}
          tabIndex={0}
        >
          <div className="preview-title">{template}</div>
          <div className="preview-box">
            <div className="preview-box-inner">
              <Resume
                pages={
                  blockState.isOneColumn ? blockState.pagesOneColumn : blockState.pagesTwoColumn
                }
                state={blockState}
                isOneColumn={blockState.isOneColumn || false}
                pagesOneColumn={blockState.pagesOneColumn}
                pagesTwoColumn={blockState.pagesTwoColumn}
                isOnPreview={true}
                template={template}
              />
            </div>
            <div className="preview-overlay"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
