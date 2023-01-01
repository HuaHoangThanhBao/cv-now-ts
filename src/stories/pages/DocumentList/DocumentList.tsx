import { useState } from 'react'
import { RootState, useAppDispatch } from '../../../store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  DocumentRes,
  getSelectedDocument,
  createNewResume,
  DocumentCreateReq,
  deleteResume,
  resetResume
} from './documentList.slice'
import { useEffectOnce, useGoogleLogin, useTransformPages } from '../../../hooks'
import { Resume } from '../../templates/Resume/Resume'
import './documentList.scss'
import { updateNoNeeds } from '../../organisms/Drag/drag.slice'
import { Button } from '../../atoms/Button'
import { blockInitialState } from '../../organisms/Block/block.slice'
import { pagesOneColumn, pagesTwoColumn } from '../../../contants/ColumnFormat'
import { getUser } from 'src/user.slice'
import { HttpStatus } from 'src/types/HttpStatus'

export const DocumentList = () => {
  const [isOnCreating, setIsOnCreating] = useState(false)
  const documents = useSelector((state: RootState) => state.user.documents)
  const { callTransformPages } = useTransformPages({
    isOneColumn: false,
    pagesOneColumn: [],
    pagesTwoColumn: []
  })
  useGoogleLogin()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const doNavigate = (documentId: string) => {
    dispatch(resetResume())
    navigate(`/resume/${documentId}`)
  }

  const navigateToMyDocument = (document: DocumentRes) => {
    callTransformPages(document.pagesOneColumn, document.pagesTwoColumn, document.isOneColumn)
    dispatch(getSelectedDocument(document._id))
    dispatch(
      updateNoNeeds({
        noNeedsOneColumn: document.noNeedsOneColumn,
        noNeedsTwoColumn: document.noNeedsTwoColumn
      })
    )
    doNavigate(document._id)
  }

  const createNewDocument = () => {
    const newResume: DocumentCreateReq = {
      blocks: blockInitialState,
      isOneColumn: false,
      pagesOneColumn: pagesOneColumn,
      pagesTwoColumn: pagesTwoColumn,
      noNeedsOneColumn: [],
      noNeedsTwoColumn: []
    }
    setIsOnCreating(true)
    dispatch(createNewResume({ body: newResume, callback: doNavigate }))
      .unwrap()
      .catch((error) => {
        console.log(error)
        if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
          navigate('/')
        }
      })
  }

  const refetchUser = () => {
    const p = dispatch(getUser())
    p.unwrap().catch((error) => {
      if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
        navigate('/')
      }
    })
    return p
  }

  const deleteDocument = (document: DocumentRes) => {
    dispatch(deleteResume({ id: document._id, callback: refetchUser }))
      .unwrap()
      .catch((error) => {
        if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
          navigate('/')
        }
      })
  }

  return (
    <div className="document-list">
      <Button text="Create new resume" className="primary" onClick={createNewDocument} />
      <div className="document-list-container">
        {documents.map((document: DocumentRes, i: number) => (
          <div className="preview" key={i}>
            <Button text="Delete" className="remove" onClick={() => deleteDocument(document)} />
            <div
              className="preview-box"
              onClick={() => navigateToMyDocument(document)}
              onKeyDown={() => navigateToMyDocument(document)}
              role={'button'}
              tabIndex={0}
            >
              <div className="preview-box-inner">
                {!isOnCreating && (
                  <Resume
                    pages={document.isOneColumn ? document.pagesOneColumn : document.pagesTwoColumn}
                    state={document.block}
                    isOneColumn={document.isOneColumn}
                    pagesOneColumn={document.pagesOneColumn}
                    pagesTwoColumn={document.pagesTwoColumn}
                    template={document.template.currentTemplate}
                    profile={document.profile}
                    avatar={document.avatar}
                  />
                )}
              </div>
              <div className="preview-overlay"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
