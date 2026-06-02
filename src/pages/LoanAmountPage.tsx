import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { AmountDisplay } from '../components/loanAmount/AmountDisplay'
import { AmountSlider } from '../components/loanAmount/AmountSlider'
import { FooterButton } from '../components/loanAmount/FooterButton'
import { Header } from '../components/loanAmount/Header'
import '../styles/loan-amount.css'

type LoanAmountPageProps = {
  loanAmount: number
  onLoanAmountChange: (value: number) => void
  onBack: () => void
  onNext: () => void
}

export function LoanAmountPage({
  loanAmount,
  onLoanAmountChange,
  onBack,
  onNext,
}: LoanAmountPageProps) {
  const handleNext = () => {
    console.log('다음 페이지로 이동', { loanAmount })
    onNext()
  }

  return (
    <PhoneFrame>
      <div className="loan-amount-page">
        <StatusBar />
        <div className="loan-amount-body">
          <Header onBack={onBack} />
          <AmountDisplay loanAmount={loanAmount} />
          <AmountSlider loanAmount={loanAmount} onChange={onLoanAmountChange} />
        </div>
        <FooterButton onClick={handleNext} />
      </div>
    </PhoneFrame>
  )
}
