import iconBusiness from '../assets/loan-type/icon-business.png'
import iconCredit from '../assets/loan-type/icon-credit.png'
import iconMortgage from '../assets/loan-type/icon-mortgage.png'
import type { LoanOption } from '../types/loanType'

export const LOAN_OPTIONS: LoanOption[] = [
  {
    id: 'mortgage',
    title: '주택담보대출',
    description: '집을 담보로 대출을 받고 싶어요',
    iconSrc: iconMortgage,
  },
  {
    id: 'credit',
    title: '신용대출',
    description: '내 신용을 기반으로 대출을 받고 싶어요',
    iconSrc: iconCredit,
  },
  {
    id: 'business',
    title: '사업자대출',
    description: '사업자금을 마련하고 싶어요',
    iconSrc: iconBusiness,
  },
]

export const DEFAULT_LOAN_TYPE = LOAN_OPTIONS[0].id
