import { Document } from '../../templates/Document';
import { testColumns, testData, testPages } from '../../../contants/test';
import './documentList.scss';

export const DocumentList = () => {
  return (
    <>
      {testData.map((t: any, i: number) => (
        <div className="preview" key={i}>
          <div className="preview-box">
            <div className="preview-box-inner">
              <Document
                pages={testPages[i]}
                state={t}
                isOneColumn={testColumns[i].isOneColumn}
                pagesOneColumn={testColumns[i].pagesOneColumn}
                pagesTwoColumn={testColumns[i].pagesTwoColumn}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
