import { useEffect } from 'react'

export const useKey = (
  keyCode: string,
  action: (e: KeyboardEvent) => void,
  enabled: boolean
) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === keyCode) {
        e.preventDefault()
        action(e)
      }
    }
    if (enabled) {
      document.addEventListener('keydown', handler)
    }
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [keyCode, action, enabled])
}
