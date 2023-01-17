import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateCurrentFont } from 'src/stories/organisms/Font/font.slice'
import { updateCurrentTemplate } from 'src/stories/organisms/Template/template.slice'
import { updateCurrentTheme } from 'src/stories/organisms/Theme/theme.slice'
import { HttpStatus } from 'src/types/HttpStatus'
import { RootState, useAppDispatch } from '../store'
import { resetBlockState, updateState } from '../stories/organisms/Block/block.slice'
import { updateNoNeeds } from '../stories/organisms/Drag/drag.slice'
import { getResume, resetResume } from '../stories/pages/DocumentList/documentList.slice'
import { useEffectOnce } from './useEffectOnce'

export const useFetchDocumentFromParam = () => {
  const params = useParams()
  const { documentId } = params
  const [isUpdated, setIsUpdated] = useState(false)
  const resume = useSelector((state: RootState) => state.document.resume)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffectOnce(() => {
    const promise = dispatch(getResume({ documentId: documentId || '-1' }))
    promise.unwrap().catch((error) => {
      if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
        navigate('/')
      }
    })
    return () => {
      dispatch(resetResume())
      dispatch(resetBlockState())
      promise.abort()
    }
  })

  useEffect(() => {
    if (resume && resume._id !== '-1') {
      setIsUpdated(false)
      dispatch(updateState(resume))
      dispatch(updateCurrentTemplate(resume.template.currentTemplate))
      dispatch(updateCurrentTheme(resume.theme))
      dispatch(updateCurrentFont(resume.font))
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
