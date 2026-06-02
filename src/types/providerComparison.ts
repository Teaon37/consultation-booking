export type FinanceProvider = {
  id: string
  badge: string
  name: string
  limit: string
  rate: string
  tags: string[]
  repaymentPeriod: string
  prepaymentFee: string
  loanMethod: string
  feature: string
  badgeColor: string
}

export const COMPARISON_TOTAL_COUNT = 12
export const PROVIDER_CARD_STAGGER_MS = 100
export const SUMMARY_ANIMATION_MS = 500
