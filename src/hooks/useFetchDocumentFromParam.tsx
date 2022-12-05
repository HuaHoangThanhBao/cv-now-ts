import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../store';
import { getResume } from '../stories/pages/DocumentList/documentList.slice';
import { useEffectOnce } from './useEffectOnce';
import { useTransformPages } from './useTransformPages';

export const useFetchDocumentFromParam = () => {
  const documentSelectId = useSelector((state: RootState) => state.document.documentSelectedId);
  const resume = useSelector((state: RootState) => state.document.resume);
  const [callTransformPages] = useTransformPages({
    isOneColumn: false,
    pagesOneColumn: [],
    pagesTwoColumn: [],
  });
  const dispatch = useAppDispatch();
  const params = useParams();
  const { documentId } = params;
  const isUpdated = useRef<boolean>(false);

  useEffectOnce(() => {
    const conA = !documentSelectId || documentSelectId === '' || documentSelectId === '-1';
    const conB = documentId && documentId !== '-1';
    let promise = conA && conB ? dispatch(getResume({ documentId: documentId })) : null;
    return () => {
      promise?.abort();
    };
  });

  useEffect(() => {
    if (resume._id !== '-1' && !isUpdated.current) {
      callTransformPages(resume.pagesOneColumn, resume.pagesTwoColumn, resume.isOneColumn);
      isUpdated.current = true;
    }
  }, [resume, callTransformPages]);
};
