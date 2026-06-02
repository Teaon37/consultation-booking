import { formatLoanAmount } from '../../utils/formatLoanAmount'

type AmountDisplayProps = {
  loanAmount: number
}

export function AmountDisplay({ loanAmount }: AmountDisplayProps) {
  return (
    <section className="loan-amount-display" aria-labelledby="loan-amount-label">
      <p id="loan-amount-label" className="loan-amount-label">
        필요 금액
      </p>
      <div className="loan-amount-box">
        <p className="loan-amount-value" aria-live="polite">
          {formatLoanAmount(loanAmount)}
        </p>
      </div>
    </section>
  )
}
