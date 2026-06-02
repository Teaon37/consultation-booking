import { type CSSProperties } from 'react'
import {
  LOAN_AMOUNT_MAX,
  LOAN_AMOUNT_MIN,
  LOAN_AMOUNT_SCALE_LABELS,
  LOAN_AMOUNT_STEP,
} from '../../constants/loanAmount'

type AmountSliderProps = {
  loanAmount: number
  onChange: (value: number) => void
}

export function AmountSlider({ loanAmount, onChange }: AmountSliderProps) {
  const fillPercent =
    ((loanAmount - LOAN_AMOUNT_MIN) / (LOAN_AMOUNT_MAX - LOAN_AMOUNT_MIN)) * 100

  return (
    <section className="loan-amount-slider-section" aria-label="필요 금액 선택">
      <input
        type="range"
        className="loan-amount-slider"
        min={LOAN_AMOUNT_MIN}
        max={LOAN_AMOUNT_MAX}
        step={LOAN_AMOUNT_STEP}
        value={loanAmount}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--slider-fill': `${fillPercent}%` } as CSSProperties}
        aria-valuemin={LOAN_AMOUNT_MIN}
        aria-valuemax={LOAN_AMOUNT_MAX}
        aria-valuenow={loanAmount}
      />
      <div className="loan-amount-scale">
        {LOAN_AMOUNT_SCALE_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </section>
  )
}
