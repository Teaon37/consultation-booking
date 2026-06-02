import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import type { LoanType } from '../types/loanType'
import { LOAN_OPTIONS } from '../constants/loanOptions'
import '../styles/loan-type.css'

type NextStepPageProps = {
  selectedLoanType: LoanType
}

/**
 * 4페이지 연결 전 임시 화면 (nextStep)
 */
export function NextStepPage({ selectedLoanType }: NextStepPageProps) {
  const label = LOAN_OPTIONS.find((o) => o.id === selectedLoanType)?.title ?? ''

  return (
    <PhoneFrame>
      <div className="next-step-page">
        <StatusBar />
        <p className="next-step-placeholder" aria-live="polite">
          다음 단계 준비 중
          <span className="next-step-selection">{label}</span>
        </p>
      </div>
    </PhoneFrame>
  )
}
