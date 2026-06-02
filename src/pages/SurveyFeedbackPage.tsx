import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { SurveyFlow } from '../survey/components/SurveyFlow'
import '../styles/survey-feedback.css'

type SurveyFeedbackPageProps = {
  onBack: () => void
  onComplete: () => void
}

export function SurveyFeedbackPage({ onBack, onComplete }: SurveyFeedbackPageProps) {
  return (
    <PhoneFrame variant="white">
      <div className="survey-page">
        <StatusBar />
        <header className="survey-header">
          <button type="button" className="survey-back-btn" onClick={onBack} aria-label="이전">
            ←
          </button>
          <div className="survey-header-text">
            <p className="survey-header-logo">ribbon</p>
            <p className="survey-header-sub">피드백 설문</p>
          </div>
        </header>
        <div className="survey-body">
          <SurveyFlow onBack={onBack} onComplete={onComplete} />
        </div>
      </div>
    </PhoneFrame>
  )
}
