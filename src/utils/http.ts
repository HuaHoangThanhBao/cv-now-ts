import axios, { AxiosInstance } from 'axios'
import { TokenErrorType, TokenType } from 'src/types/Token'
import { baseURL } from '../contants'

class Http {
  instance: AxiosInstance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refreshTokenRequest: any
  constructor() {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000
    })
    this.refreshTokenRequest = null
    this.instance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(TokenType.ACCESS_TOKEN) || ''
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    })
    this.instance.interceptors.response.use(
      (config) => {
        return config.data//
      },
      (error) => {
        const { status } = error.response.data.error
        const { name } = error.response.data.error.error
        if (status === 401 && name === TokenErrorType.EXPIRED_ACCESS_TOKEN) {
          this.refreshTokenRequest = this.refreshTokenRequest
            ? this.refreshTokenRequest
            : refreshToken().finally(() => {
                this.refreshTokenRequest = null
              })
          //because access token is expired so we need to provide new access token to config when recall
          return this.refreshTokenRequest
            .then((accessToken: string) => {
              error.response.config.Authorization = accessToken
              //call previous request again
              return this.instance(error.response.config)
            })
            .catch((refreshTokenErr: unknown) => {
              throw refreshTokenErr
            })
        } else if (status === 401 && name === TokenErrorType.EXPIRED_REFRESH_TOKEN) {
          //When refresh token expired we do logout
          localStorage.clear()
        }
        return Promise.reject(error)
      }
    )
  }
}

const refreshToken = async () => {
  const refreshToken = localStorage.getItem(TokenType.REFRESH_TOKEN)
  try {
    const res = await http.post('users/refresh-token', {
      refreshToken
    })
    const { accessToken } = res.data
    localStorage.setItem(TokenType.ACCESS_TOKEN, accessToken)
    return accessToken
  } catch (err: unknown) {
    return Promise.reject(err)
  }
}

export const http = new Http().instance
