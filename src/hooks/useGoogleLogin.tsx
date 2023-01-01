import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useEffectOnce } from './useEffectOnce'
import { useNavigate } from 'react-router-dom'
import { googleClientId } from 'src/contants/url'
import { useAppDispatch } from 'src/store'
import { sendLogin, sendToUpdateRefreshToken } from 'src/user.slice'
import { TokenType } from 'src/types/Token'
import { HttpStatus } from 'src/types/HttpStatus'

export const useGoogleLogin = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const storeToLocalStorage = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(TokenType.ACCESS_TOKEN, accessToken)
    localStorage.setItem(TokenType.REFRESH_TOKEN, refreshToken)
  }

  const callbackAfterLogin = (userId: string, accessToken: string, refreshToken: string) => {
    storeToLocalStorage(accessToken, refreshToken)
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
    dispatch(sendLogin({ body: { email, tokenId }, callback: callbackAfterLogin }))
  }

  const googleLoginButton = (externalClassName: string, text: string) => {
    if (!isLoggedIn()) {
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
    } else {
      return (
        <button
          className={`${externalClassName} btn-lp highlight-btn`}
          onClick={() => navigate('/my-documents')}
        >
          {text.toLowerCase() === 'login' ? 'My documents' : text}
        </button>
      )
    }
  }

  const initGoogleClient = () => {
    gapi.client.init({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: ''
    })
  }

  const isLoggedIn = () => {
    const accessToken = localStorage.getItem(TokenType.ACCESS_TOKEN) || ''
    const refreshToken = localStorage.getItem(TokenType.REFRESH_TOKEN) || ''
    return !!accessToken && !!refreshToken
  }

  useEffectOnce(() => {
    if (!isLoggedIn()) gapi.load('client:auth2', initGoogleClient)
    const promise = dispatch(
      sendToUpdateRefreshToken({
        body: { refreshToken: localStorage.getItem(TokenType.REFRESH_TOKEN) || '' }
      })
    )
    promise.unwrap().catch((error) => {
      if (error.message.includes(HttpStatus.UNAUTHORIZED)) {
        navigate('/')
      }
    })
    return () => {
      promise.abort()
    }
  })

  return { googleLoginButton }
}
