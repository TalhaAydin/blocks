import { useEffect } from 'react'

export const useKey = (
  keyCode: string,
  action: () => void,
  enabled: boolean
) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === keyCode) {
        e.preventDefault()
        action()
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
