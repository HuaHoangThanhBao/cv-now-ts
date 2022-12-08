import { useState } from 'react';
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getResumeList,
  DocumentRes,
  getSelectedDocument,
  resetDocumentList,
  createNewResume,
  DocumentCreateReq,
  deleteResume,
} from './documentList.slice';
import { useEffectOnce, useTransformPages } from '../../../hooks';
import { Resume } from '../../templates/Resume/Resume';
import './documentList.scss';
import { updateNoNeeds } from '../../organisms/Drag/drag.slice';
import { Button } from '../../atoms/Button';
import { blockInitialState } from '../../organisms/Block/block.slice';
import { pagesOneColumn, pagesTwoColumn } from '../../../contants/ColumnFormat';

export const DocumentList = () => {
  const [isOnCreating, setIsOnCreating] = useState(false);
  const documentList = useSelector((state: RootState) => state.document.documentList);
  const [callTransformPages] = useTransformPages({
    isOneColumn: false,
    pagesOneColumn: [],
    pagesTwoColumn: [],
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const doNavigate = (documentId: string) => {
    navigate(`/resume/${documentId}`);
  };

  const navigateToMyDocument = (document: DocumentRes) => {
    callTransformPages(document.pagesOneColumn, document.pagesTwoColumn, document.isOneColumn);
    dispatch(getSelectedDocument(document._id));
    dispatch(
      updateNoNeeds({
        noNeedsOneColumn: document.noNeedsOneColumn,
        noNeedsTwoColumn: document.noNeedsTwoColumn,
      })
    );
    doNavigate(document._id);
  };

  const createNewDocument = () => {
    const newResume: DocumentCreateReq = {
      blocks: blockInitialState,
      isOneColumn: false,
      pagesOneColumn: pagesOneColumn,
      pagesTwoColumn: pagesTwoColumn,
      noNeedsOneColumn: [],
      noNeedsTwoColumn: [],
    };
    setIsOnCreating(true);
    dispatch(createNewResume({ body: newResume, callback: doNavigate }));
  };

  const deleteDocument = (document: DocumentRes) => {
    dispatch(deleteResume({ id: document._id }));
  };

  useEffectOnce(() => {
    const promise = dispatch(getResumeList());
    return () => {
      dispatch(resetDocumentList());
      promise.abort();
    };
  });

  return (
    <div className="document-list">
      <Button text="Create new resume" className="primary" onClick={createNewDocument} />
      {documentList.map((document: DocumentRes, i: number) => (
        <div className="preview" key={i}>
          <Button text="Delete" className="remove" onClick={() => deleteDocument(document)} />
          <div className="preview-box" onClick={() => navigateToMyDocument(document)}>
            <div className="preview-box-inner">
              {!isOnCreating && (
                <Resume
                  pages={document.isOneColumn ? document.pagesOneColumn : document.pagesTwoColumn}
                  state={document.block}
                  isOneColumn={document.isOneColumn}
                  pagesOneColumn={document.pagesOneColumn}
                  pagesTwoColumn={document.pagesTwoColumn}
                />
              )}
            </div>
            <div className="preview-overlay"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
