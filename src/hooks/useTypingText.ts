import { useEffect, useState } from 'react'

export function useTypingText(text: string, active: boolean, speedMs = 35): string {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      return
    }

    setDisplayed('')
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(timer)
      }
    }, speedMs)

    return () => window.clearInterval(timer)
  }, [text, active, speedMs])

  return displayed
}
