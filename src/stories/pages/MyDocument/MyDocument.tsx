import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { Resume } from '../../templates/Resume/Resume'
import { useFetchDocumentFromParam } from '../../../hooks'
import { Menu } from '../../templates/Menu'
import './myDocument.scss'
import { useDownloadResume } from '../../../hooks/useDownloadResume'

export const MyDocument: React.FC = () => {
  const rootBlockState = useSelector((state: RootState) => state.block)
  const template = useSelector((state: RootState) => state.template.currentTemplate)
  const { isUpdated } = useFetchDocumentFromParam()
  const downloadRef = useRef<HTMLDivElement[]>(null)
  const { generatePDF } = useDownloadResume({ panelRefs: downloadRef })

  return (
    <>
      <Menu generatePDF={generatePDF} />
      {isUpdated && (
        <Resume
          pages={rootBlockState.pages}
          state={rootBlockState}
          isOneColumn={rootBlockState.isOneColumn || false}
          pagesOneColumn={rootBlockState.pagesOneColumn}
          pagesTwoColumn={rootBlockState.pagesTwoColumn}
          template={template}
          ref={downloadRef}
        />
      )}
    </>
  )
}
