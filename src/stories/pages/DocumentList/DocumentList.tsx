import { Resume } from '../../templates/Resume';
import './documentList.scss';
import { useEffect } from 'react';
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResumeList, DocumentRes, getSelectedDocument } from './documentList.slice';
import { useTransformPages } from '../../../hooks';

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
    navigate(`/resume/${document._id}`);
  };

  useEffect(() => {
    const promise = dispatch(getResumeList());
    return () => {
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
