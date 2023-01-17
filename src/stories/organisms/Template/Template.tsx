import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { HttpStatus } from 'src/types/HttpStatus'
import { useOnClickOutside } from '../../../hooks'
import { RootState, useAppDispatch } from '../../../store'
import { Resume } from '../../templates/Resume'
import { onMovingBlock } from '../Block/block.slice'
import { sendUpdateCurrentTemplate, TemplateState, updateCurrentTemplate } from './template.slice'
import { Selection } from 'src/types/Selection'
import './template.scss'

export const Template = ({ data, setOption }: Selection<string>) => {
  const ref = useRef(null)
  const blockState = useSelector((state: RootState) => state.block)
  const resume = useSelector((state: RootState) => state.document.resume)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
      .unwrap()
      .catch((error) => {
        if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
          navigate('/')
        }
      })
    dispatch(onMovingBlock(true))
  }

  return (
    <div className="template" ref={ref}>
      {data.map((template: string) => (
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
                profile={resume.profile}
                avatar={resume.avatar}
                theme={resume.theme}
                font={resume.font}
              />
            </div>
            <div className="preview-overlay"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
