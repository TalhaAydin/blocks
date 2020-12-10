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
        if (enabled) {
          action(e)
        }
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [keyCode, action, enabled])
}
