import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useEffectOnce } from './useEffectOnce'
import { useNavigate } from 'react-router-dom'
import { googleClientId } from 'src/contants/url'
import { useAppDispatch } from 'src/store'
import { sendLogin } from 'src/user.slice'

export const useGoogleLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const navigateToMyDocumentPage = (userId: string) => {
    navigate(`/my-documents/${userId}`)
  }

  const handleFailure = (result: unknown) => {
    console.log(result)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleSucsess = (googleData: any) => {
    console.log(googleData)
    const { tokenId, profileObj } = googleData
    const { email } = profileObj
    dispatch(sendLogin({ body: { email, tokenId }, callback: navigateToMyDocumentPage }))
  }

  const googleLoginButton = (externalClassName: string, text: string) => {
    return (
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={handleSucsess}
        onFailure={handleFailure}
        buttonText="Login"
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <button
            className={`${externalClassName} btn-lp highlight-btn`}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            {text}
          </button>
        )}
      />
    )
  }

  const initGoogleClient = () => {
    gapi.client.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: ''
    })
  }

  useEffectOnce(() => {
    gapi.load('client:auth2', initGoogleClient)
  })

  return { googleLoginButton }
}
