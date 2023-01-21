import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'src/store'
import { HttpStatus } from 'src/types/HttpStatus'
import { sendUpdateCurrentSetting, SettingState } from './setting.slice'
import './setting.scss'

export const Setting = () => {
  const setting = useSelector((state: RootState) => state.setting)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const updateSetting = (updatedSetting: SettingState) => {
    dispatch(sendUpdateCurrentSetting({ id: setting._id, body: updatedSetting }))
      .unwrap()
      .catch((error) => {
        if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
          navigate('/')
        }
      })
  }

  const updateAvatarSetting = (status: boolean) => {
    const avatarUpdated: SettingState = { ...setting, isShowAvatar: status }
    updateSetting(avatarUpdated)
  }

  const updateShowCreationDateSetting = (status: boolean) => {
    const avatarUpdated: SettingState = { ...setting, isShowCreationDate: status }
    updateSetting(avatarUpdated)
  }

  const updateShowPageNumbersSetting = (status: boolean) => {
    const avatarUpdated: SettingState = { ...setting, isShowPageNumbers: status }
    updateSetting(avatarUpdated)
  }

  return (
    <div className="setting">
      <div className="setting-item">
        <input
          type="checkbox"
          className="setting-checkbox"
          defaultChecked={setting.isShowAvatar}
          onChange={() => {
            updateAvatarSetting(!setting.isShowAvatar)
          }}
        />
        <span className="setting-text">Avatar</span>
      </div>
      <div className="setting-item">
        <input
          type="checkbox"
          className="setting-checkbox"
          defaultChecked={setting.isShowCreationDate}
          onChange={() => {
            updateShowCreationDateSetting(!setting.isShowCreationDate)
          }}
        />
        <span className="setting-text">Creation Date</span>
      </div>
      <div className="setting-item">
        <input
          type="checkbox"
          className="setting-checkbox"
          defaultChecked={setting.isShowPageNumbers}
          onChange={() => {
            updateShowPageNumbersSetting(!setting.isShowPageNumbers)
          }}
        />
        <span className="setting-text">Page Numbers</span>
      </div>
      {/* <div className="setting-item">
        <input type="checkbox" className="setting-checkbox" />
        <span className="setting-text">Icons</span>
      </div> */}
    </div>
  )
}
