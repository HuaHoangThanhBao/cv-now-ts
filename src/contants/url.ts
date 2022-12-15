export const applicationMode = process.env.REACT_APP_MODE || 'development'
export const localHost = process.env.REACT_APP_LOCAL_HOST
export const remoteHost = process.env.REACT_APP_REMOTE_HOST
export const baseURL = applicationMode === 'development' ? localHost : remoteHost
