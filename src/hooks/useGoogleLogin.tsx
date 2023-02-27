import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { useEffectOnce } from './useEffectOnce'
import { useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch } from 'src/store'
import { getUser, sendLogin, sendToUpdateRefreshToken, UserState } from 'src/user.slice'
import { TokenType } from 'src/types/Token'
import { UserGoogle } from 'src/types/UserGoogle'
import { HttpStatus } from 'src/types/HttpStatus'
import { useSelector } from 'react-redux'

export const useGoogleLogin = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const storeToLocalStorage = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(TokenType.ACCESS_TOKEN, accessToken)
    localStorage.setItem(TokenType.REFRESH_TOKEN, refreshToken)
  }

  const goToMyDocumentPage = (userId: string) => {
    if (!userId) return
    console.log('userId:', userId)
    navigate(`/my-documents/${userId}`)
  }

  const callbackAfterLogin = (userId: string, accessToken: string, refreshToken: string) => {
    storeToLocalStorage(accessToken, refreshToken)
    goToMyDocumentPage(userId)
  }

  const handleFailure = (result: unknown) => {
    console.log(result)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleSucsess = (googleData: any) => {
    const { credential } = googleData
    const decodedToken: UserGoogle = jwt_decode(credential)
    const { email, name, family_name, given_name } = decodedToken
    const userData: Pick<UserState, "email" | "name" | "familyName" | "givenName"> = {
      email,
      name,
      familyName: family_name,
      givenName: given_name
    }
    dispatch(sendLogin({ body: { userData, credential }, callback: callbackAfterLogin }))
  }

  const googleLoginButton = (externalClassName: string, text: string) => {
    if (!isLoggedIn()) {
      return (
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
            handleSucsess(credentialResponse)
          }}
          onError={() => {
            console.log('Login Failed');
            handleFailure('')
          }}
        />
      )
    } else {
      return (
        <button
          className={`${externalClassName} btn-lp highlight-btn`}
          onClick={() => goToMyDocumentPage(user.userId)}
        >
          {text.toLowerCase() === 'login' ? 'My documents' : text}
        </button>
      )
    }
  }

  const isLoggedIn = () => {
    const accessToken = localStorage.getItem(TokenType.ACCESS_TOKEN) || ''
    const refreshToken = localStorage.getItem(TokenType.REFRESH_TOKEN) || ''
    return !!accessToken && !!refreshToken
  }

  useEffectOnce(() => {
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
    const promiseUser = dispatch(getUser())
    return () => {
      promise.abort()
      promiseUser.abort()
    }
  })

  return { googleLoginButton }
}
