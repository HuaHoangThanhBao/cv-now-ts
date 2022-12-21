import { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEventListener = (eventType: string, callback: Function, element = window) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (element == null) return
    const handler = (e: Event) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}
