import type { ConsultationBookingSummary } from '../../types/consultationComplete'

type BookingSummarySectionProps = {
  summary: ConsultationBookingSummary
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function HeadsetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 14V11C4 7.134 7.134 4 11 4H13C16.866 4 20 7.134 20 11V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="2" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function BookingSummarySection({ summary }: BookingSummarySectionProps) {
  return (
    <section className="cc-summary" aria-label="예약 정보">
      <div className="cc-summary-row">
        <span className="cc-summary-icon">
          <CalendarIcon />
        </span>
        <div className="cc-summary-content">
          <span className="cc-summary-label">상담 희망 날짜/시간</span>
          <span className="cc-summary-value">{summary.dateTimeLabel}</span>
        </div>
      </div>
      <div className="cc-summary-row">
        <span className="cc-summary-icon">
          <HeadsetIcon />
        </span>
        <div className="cc-summary-content">
          <span className="cc-summary-label">상담 유형</span>
          <span className="cc-summary-value">{summary.consultationType}</span>
        </div>
      </div>
    </section>
  )
}
