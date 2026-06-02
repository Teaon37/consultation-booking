export type LoanType = 'mortgage' | 'credit' | 'business'

export type LoanOption = {
  id: LoanType
  title: string
  description: string
  iconSrc: string
}
