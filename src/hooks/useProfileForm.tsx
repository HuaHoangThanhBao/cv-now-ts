import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'src/store'
import { sendUpdateProfile } from 'src/stories/pages/DocumentList/documentList.slice'
import { HttpStatus } from 'src/types/HttpStatus'
import { Selection } from 'src/types/Selection'
import { useDevice } from './useDevice'

export const useProfileForm = ({ action }: Pick<Selection<unknown>, 'action'>) => {
  const profile = useSelector((state: RootState) => state.document.resume.profile)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { ...profile }
  })
  const { device } = useDevice()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSave = handleSubmit((data) => {
    if (device !== 'mobile') {
      dispatch(sendUpdateProfile({ id: profile._id || '-1', body: data }))
        .unwrap()
        .catch((error) => {
          if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
            navigate('/')
          }
        })
    }
    if (action) action()
  })

  const renderProfileForm = () => {
    return (
      <form onSubmit={onSave}>
        <div className="modal-option">
          <p className="modal-option-title">Profile Information</p>
          <button className="modal-btn-save" type="submit" onClick={onSave}>
            Save
          </button>
        </div>
        <div className="modal-container">
          <div className="modal-heading">Personal</div>
          <div className="modal-group">
            <div className="modal-item">
              <span>Email:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Email"
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <span className="error">
                  {errors.email?.type === 'required' && 'Email is required'}
                  {errors.email?.type === 'pattern' && 'Invalid email address'}
                </span>
              )}
            </div>
            <div className="modal-item">
              <span>Address:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Address"
                {...register('address')}
              />
            </div>
            <div className="modal-item">
              <span>Phone:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Phone Number"
                {...register('phone')}
              />
            </div>
          </div>
          <div className="modal-heading">General/Social Media</div>
          <div className="modal-group">
            <div className="modal-item">
              <span>Website:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Website"
                {...register('website')}
              />
            </div>
            <div className="modal-item">
              <span>LinkedIn:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="LinkedIn"
                {...register('linkedIn')}
              />
            </div>
            <div className="modal-item">
              <span>Twitter:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Twitter"
                {...register('twitter')}
              />
            </div>
            <div className="modal-item">
              <span>Skype:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Skype"
                {...register('skype')}
              />
            </div>
            <div className="modal-item">
              <span>Facebook:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Facebook"
                {...register('facebook')}
              />
            </div>
          </div>
          <div className="modal-heading">Coding</div>
          <div className="modal-group">
            <div className="modal-item">
              <span>Github:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Github"
                {...register('gitHub')}
              />
            </div>
            <div className="modal-item">
              <span>StackOverFlow:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Stack Overflow"
                {...register('stackOverflow')}
              />
            </div>
          </div>
          <div className="modal-heading">Creative Platforms</div>
          <div className="modal-group">
            <div className="modal-item">
              <span>Medium:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Medium"
                {...register('medium')}
              />
            </div>
            <div className="modal-item">
              <span>Instagram:</span>
              <input
                type="text"
                className="modal-input"
                placeholder="Instagram"
                {...register('instagram')}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
  return { renderProfileForm }
}
