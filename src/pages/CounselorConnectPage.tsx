import { useEffect, useState } from 'react'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { CounselorCard } from '../components/counselorConnect/CounselorCard'
import { FooterActions } from '../components/counselorConnect/FooterActions'
import { Header } from '../components/counselorConnect/Header'
import { COUNSELOR_PROGRESS_DURATION } from '../constants/counselorConnect'
import '../styles/counselor-connect.css'

type CounselorConnectPageProps = {
  onBack: () => void
  onBook: () => void
}

export function CounselorConnectPage({ onBack, onBook }: CounselorConnectPageProps) {
  const [counselorProgress, setCounselorProgress] = useState(0)
  const [isCounselorAssigned, setIsCounselorAssigned] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)

  useEffect(() => {
    setCardVisible(true)

    const start = performance.now()
    let rafId = 0

    const animate = (now: number) => {
      const elapsed = now - start
      const next = Math.min(100, (elapsed / COUNSELOR_PROGRESS_DURATION) * 100)
      setCounselorProgress(next)

      if (next >= 100) {
        setIsCounselorAssigned(true)
        return
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleBook = () => {
    console.log('상담 예약하기', { counselorProgress, isCounselorAssigned })
    onBook()
  }

  const handleSkip = () => {
    console.log('skip consultation')
  }

  return (
    <PhoneFrame>
      <div className="counselor-connect-page">
        <StatusBar />
        <div className="counselor-connect-body">
          <Header onBack={onBack} />
        <div className="counselor-connect-card-area">
          <CounselorCard progress={counselorProgress} cardVisible={cardVisible} />
        </div>
        </div>
        <FooterActions onBook={handleBook} onSkip={handleSkip} />
      </div>
    </PhoneFrame>
  )
}
