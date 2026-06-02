import { useEffect, useRef } from 'react'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { BackgroundRibbon } from '../components/splash/BackgroundRibbon'
import { HeroSection } from '../components/splash/HeroSection'
import '../styles/splash.css'

const FADE_DURATION_MS = 1400
const HOLD_AFTER_FADE_MS = 900

type SplashPageProps = {
  onComplete: () => void
}

export function SplashPage({ onComplete }: SplashPageProps) {
  const completedRef = useRef(false)

  const goNext = () => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }

  useEffect(() => {
    const timer = window.setTimeout(goNext, FADE_DURATION_MS + HOLD_AFTER_FADE_MS)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [])

  return (
    <PhoneFrame variant="white">
      <button
        type="button"
        className="splash-screen"
        onClick={goNext}
        aria-label="다음 화면으로 이동"
      >
        <StatusBar />
        <BackgroundRibbon />
        <HeroSection />
      </button>
    </PhoneFrame>
  )
}
