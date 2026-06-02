import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { FooterButton } from '../components/loanType/FooterButton'
import { Header } from '../components/loanType/Header'
import { HeroSection } from '../components/loanType/HeroSection'
import { LoanOptionCard } from '../components/loanType/LoanOptionCard'
import { LOAN_OPTIONS } from '../constants/loanOptions'
import type { LoanType } from '../types/loanType'
import '../styles/loan-type.css'

type LoanTypePageProps = {
  selectedLoanType: LoanType
  onSelectLoanType: (type: LoanType) => void
  onBack: () => void
  onNext: () => void
}

export function LoanTypePage({
  selectedLoanType,
  onSelectLoanType,
  onBack,
  onNext,
}: LoanTypePageProps) {
  return (
    <PhoneFrame>
      <div className="loan-type-page">
        <StatusBar />
        <Header onBack={onBack} />
        <HeroSection />
        <ul className="loan-type-list">
          {LOAN_OPTIONS.map((option) => (
            <li key={option.id}>
              <LoanOptionCard
                option={option}
                selected={selectedLoanType === option.id}
                onSelect={() => onSelectLoanType(option.id)}
              />
            </li>
          ))}
        </ul>
        <FooterButton onClick={onNext} />
      </div>
    </PhoneFrame>
  )
}
