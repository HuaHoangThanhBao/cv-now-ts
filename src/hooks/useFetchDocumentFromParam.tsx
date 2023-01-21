import { useNavigate, useParams } from 'react-router-dom'
import { HttpStatus } from 'src/types/HttpStatus'
import { useAppDispatch } from '../store'
import { resetBlockState } from '../stories/organisms/Block/block.slice'
import { getResume, resetResume } from '../stories/pages/DocumentList/documentList.slice'
import { useEffectOnce } from './useEffectOnce'

export const useFetchDocumentFromParam = () => {
  const params = useParams()
  const { documentId } = params
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
}
