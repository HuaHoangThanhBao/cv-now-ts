import { useEffect } from 'react'

export const useEffectOnce = (cb: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, [])
}
