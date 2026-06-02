import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { BookingSummarySection } from '../components/consultationComplete/BookingSummarySection'
import { CompleteMessage } from '../components/consultationComplete/CompleteMessage'
import { Header } from '../components/consultationComplete/Header'
import { NoticeBox } from '../components/consultationComplete/NoticeBox'
import { RibbonHero } from '../components/consultationComplete/RibbonHero'
import { MOCK_CONSULTATION_BOOKING_SUMMARY } from '../constants/consultationCompleteMock'
import type { ConsultationBookingSummary } from '../types/consultationComplete'
import '../styles/consultation-complete.css'

type ConsultationCompletePageProps = {
  /** 9페이지에서 전달받을 예약 정보. 미전달 시 MVP Mock 사용 */
  bookingSummary?: ConsultationBookingSummary
  onBack: () => void
  onConfirm: () => void
}

export function ConsultationCompletePage({
  bookingSummary = MOCK_CONSULTATION_BOOKING_SUMMARY,
  onBack,
  onConfirm,
}: ConsultationCompletePageProps) {
  const handleConfirm = () => {
    console.log('complete')
    onConfirm()
  }

  return (
    <PhoneFrame>
      <div className="cc-page">
        <StatusBar />
        <Header onBack={onBack} />
        <div className="cc-body">
          <article className="cc-card" aria-label="상담 예약 완료">
            <RibbonHero />
            <CompleteMessage />
            <div className="cc-divider" aria-hidden="true" />
            <BookingSummarySection summary={bookingSummary} />
            <NoticeBox />
            <button type="button" className="cc-confirm-btn" onClick={handleConfirm}>
              확인
            </button>
          </article>
        </div>
      </div>
    </PhoneFrame>
  )
}
