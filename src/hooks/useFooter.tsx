import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { Month } from 'src/types/Date'

type FooterProps = {
  isOneColumn: boolean
}

export const useFooter = ({ isOneColumn }: FooterProps) => {
  const setting = useSelector((state: RootState) => state.setting)
  const getToday = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return `${day} ${Month[month]}, ${year}`
  }
  const renderFooter = (pageI: number, totalPage: number) => {
    return (
      <div className={`panel-footer ${isOneColumn ? 'one-column' : 'two-column'}`}>
        {setting.isShowCreationDate && <div className="panel-footer-col">{getToday()}</div>}
        {setting.isShowPageNumbers && (
          <div className="panel-footer-col">
            Page {pageI + 1} of {totalPage}
          </div>
        )}
      </div>
    )
  }
  return { renderFooter }
}
