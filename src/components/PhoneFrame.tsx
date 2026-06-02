import type { ReactNode } from 'react'
import '../styles/phone-frame.css'

type PhoneFrameProps = {
  children: ReactNode
  variant?: 'white' | 'muted'
}

export function PhoneFrame({ children, variant = 'white' }: PhoneFrameProps) {
  const frameClass =
    variant === 'muted' ? 'phone-frame phone-frame--muted' : 'phone-frame'

  return (
    <div className="app">
      <div className={frameClass}>{children}</div>
    </div>
  )
}
