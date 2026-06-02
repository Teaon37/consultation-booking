import type { LoanOption } from '../../types/loanType'

type LoanOptionCardProps = {
  option: LoanOption
  selected: boolean
  onSelect: () => void
}

export function LoanOptionCard({ option, selected, onSelect }: LoanOptionCardProps) {
  return (
    <button
      type="button"
      className={`loan-option-card${selected ? ' loan-option-card--selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="loan-option-icon-wrap">
        <img src={option.iconSrc} alt="" className="loan-option-icon" />
      </span>
      <span className="loan-option-text">
        <span className="loan-option-title">{option.title}</span>
        <span className="loan-option-desc">{option.description}</span>
      </span>
      <svg
        className="loan-option-chevron"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 6L15 12L9 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
