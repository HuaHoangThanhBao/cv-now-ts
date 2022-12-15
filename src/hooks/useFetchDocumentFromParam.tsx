import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../store';
import { resetBlockState, updateState } from '../stories/organisms/Block/block.slice';
import { updateNoNeeds } from '../stories/organisms/Drag/drag.slice';
import { getResume, resetResume } from '../stories/pages/DocumentList/documentList.slice';
import { useEffectOnce } from './useEffectOnce';

export const useFetchDocumentFromParam = () => {
  const params = useParams();
  const { documentId } = params;
  const [isUpdated, setIsUpdated] = useState(false);
  const resume = useSelector((state: RootState) => state.document.resume);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    const promise = dispatch(getResume({ documentId: documentId || '-1' }));
    return () => {
      dispatch(resetResume());
      dispatch(resetBlockState());
      promise.abort();
    };
  });

  useEffect(() => {
    if (resume && resume._id !== '-1') {
      setIsUpdated(false);
      dispatch(updateState(resume));
      dispatch(
        updateNoNeeds({
          noNeedsOneColumn: resume.noNeedsOneColumn,
          noNeedsTwoColumn: resume.noNeedsTwoColumn,
        })
      );
      setIsUpdated(true);
    }
  }, [resume, dispatch]);

  return { isUpdated };
};
