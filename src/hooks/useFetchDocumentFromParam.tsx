import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCurrentFont } from 'src/stories/organisms/Font/font.slice'
import { updateCurrentSetting } from 'src/stories/organisms/Setting/setting.slice'
import { updateCurrentTemplate } from 'src/stories/organisms/Template/template.slice'
import { updateCurrentTheme } from 'src/stories/organisms/Theme/theme.slice'
import { HttpStatus } from 'src/types/HttpStatus'
import { RootState, useAppDispatch } from '../store'
import { resetBlockState, updateState } from '../stories/organisms/Block/block.slice'
import { updateNoNeeds } from '../stories/organisms/Drag/drag.slice'
import { getResume, resetResume } from '../stories/pages/DocumentList/documentList.slice'
import { useDevice } from './useDevice'
import { useEffectOnce } from './useEffectOnce'

export const useFetchDocumentFromParam = () => {
  const params = useParams()
  const { documentId } = params
  const [isUpdated, setIsUpdated] = useState(false)
  const resume = useSelector((state: RootState) => state.document.resume)
  const { device } = useDevice()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffectOnce(() => {
    const promise = dispatch(getResume({ documentId: documentId || '-1' }))
    alert(`get resume !!!: ${documentId}`)
    promise.unwrap().catch((error) => {
      if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
        if (device !== 'mobile') {
          navigate('/')
        }
      }
    })
    return () => {
      alert('abort')
      dispatch(resetResume())
      dispatch(resetBlockState())
      promise.abort()
    }
  })

  useEffect(() => {
    alert(`resume 0: ${JSON.stringify(resume)}`)
    if (resume && resume._id !== '-1') {
      alert(`fetch resume successfully`)
      setIsUpdated(false)
      dispatch(updateState(resume))
      dispatch(updateCurrentTemplate(resume.template.currentTemplate))
      dispatch(updateCurrentTheme(resume.theme))
      dispatch(updateCurrentFont(resume.font))
      dispatch(updateCurrentSetting(resume.setting))
      dispatch(
        updateNoNeeds({
          noNeedsOneColumn: resume.noNeedsOneColumn,
          noNeedsTwoColumn: resume.noNeedsTwoColumn
        })
      )
      setIsUpdated(true)
    }
  }, [resume, dispatch])

  return { isUpdated }
}
