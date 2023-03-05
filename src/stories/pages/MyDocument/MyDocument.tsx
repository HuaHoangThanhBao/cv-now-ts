import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Resume } from '../../templates/Resume/Resume'
import { useFetchDocumentFromParam, useGoogleLogin } from '../../../hooks'
import { Menu } from '../../templates/Menu'
import { useDownloadResume } from '../../../hooks/useDownloadResume'
import './myDocument.scss'

export const MyDocument: React.FC = () => {
  const rootBlockState = useSelector((state: RootState) => state.block)
  const profile = useSelector((state: RootState) => state.document.resume.profile)
  const avatar = useSelector((state: RootState) => state.document.resume.avatar)
  const template = useSelector((state: RootState) => state.template.currentTemplate)
  const theme = useSelector((state: RootState) => state.theme)
  const font = useSelector((state: RootState) => state.font)
  const { isUpdated } = useFetchDocumentFromParam()
  const downloadRef = useRef<HTMLDivElement[]>(null)
  const { generatePDF } = useDownloadResume()
  useGoogleLogin()

  useEffect(() => {
    alert(`isUpdated in mydocument: ${isUpdated}`)
  }, [isUpdated])

  return (
    <>
      <Menu action={generatePDF} />
      {isUpdated && (
        <Resume
          pages={rootBlockState.pages}
          state={rootBlockState}
          isOneColumn={rootBlockState.isOneColumn || false}
          pagesOneColumn={rootBlockState.pagesOneColumn}
          pagesTwoColumn={rootBlockState.pagesTwoColumn}
          template={template}
          ref={downloadRef}
          profile={profile}
          avatar={avatar}
          theme={theme}
          font={font}
        />
      )}
    </>
  )
}
