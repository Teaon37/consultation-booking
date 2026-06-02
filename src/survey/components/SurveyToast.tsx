import { useEffect } from 'react'

type SurveyToastProps = {
  message: string
  visible: boolean
  onHide: () => void
}

export function SurveyToast({ message, visible, onHide }: SurveyToastProps) {
  useEffect(() => {
    if (!visible) return

    const timer = window.setTimeout(onHide, 3000)
    return () => window.clearTimeout(timer)
  }, [visible, onHide])

  if (!visible) return null

  return (
    <div className="survey-toast" role="status" aria-live="polite">
      {message}
    </div>
  )
}
