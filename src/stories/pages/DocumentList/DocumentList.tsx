import { useEffect } from 'react';
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getResumeList,
  DocumentRes,
  getSelectedDocument,
  resetDocumentList,
} from './documentList.slice';
import { useTransformPages } from '../../../hooks';
import { Resume } from '../../templates/Resume/Resume';
import './documentList.scss';
import { updateNoNeeds } from '../../organisms/Drag/drag.slice';

export const DocumentList = () => {
  const documentList = useSelector((state: RootState) => state.document.documentList);
  const [callTransformPages] = useTransformPages({
    isOneColumn: false,
    pagesOneColumn: [],
    pagesTwoColumn: [],
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToMyDocument = (document: DocumentRes) => {
    callTransformPages(document.pagesOneColumn, document.pagesTwoColumn, document.isOneColumn);
    dispatch(getSelectedDocument(document._id));
    dispatch(
      updateNoNeeds({
        noNeedsOneColumn: document.noNeedsOneColumn,
        noNeedsTwoColumn: document.noNeedsTwoColumn,
      })
    );
    navigate(`/resume/${document._id}`);
  };

  useEffect(() => {
    const promise = dispatch(getResumeList());
    return () => {
      dispatch(resetDocumentList());
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      {documentList.map((document: DocumentRes, i: number) => (
        <div className="preview" key={i} onClick={() => navigateToMyDocument(document)}>
          <div className="preview-box">
            <div className="preview-box-inner">
              <Resume
                pages={document.isOneColumn ? document.pagesOneColumn : document.pagesTwoColumn}
                state={document.block}
                isOneColumn={document.isOneColumn}
                pagesOneColumn={document.pagesOneColumn}
                pagesTwoColumn={document.pagesTwoColumn}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
