export const useDevice = () => {
  const device = /Android|iPhone/i.test(navigator.userAgent)
  return { device: !device ? 'browser' : 'mobile' }
}
