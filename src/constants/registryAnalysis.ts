export type AnalysisCardIcon = 'building' | 'owner' | 'mortgage' | 'rights' | 'check'

export type AnalysisCard = {
  id: number
  title: string
  content: string | null
  icon: AnalysisCardIcon
}

export const ANALYSIS_CARDS: AnalysisCard[] = [
  {
    id: 1,
    title: '등기부등본을 불러왔어요.',
    content: '주소와 지번 정보를 대조해서 분석할 등기 데이터를 찾았습니다.',
    icon: 'building',
  },
  {
    id: 2,
    title: '소유자 정보를 확인했어요.',
    content: '현재 등기상 소유자는 본인 단독 소유로 확인됩니다.',
    icon: 'owner',
  },
  {
    id: 3,
    title: '근저당권 이력을 분석 중이에요.',
    content: '1순위 근저당권 3.2억원이 설정되어 있어 담보여력 계산에 반영합니다.',
    icon: 'mortgage',
  },
  {
    id: 4,
    title: '권리 관계를 점검했어요.',
    content: '가압류와 가처분은 발견되지 않았고, 분석 신뢰도는 94%로 산정됩니다.',
    icon: 'rights',
  },
  {
    id: 5,
    title: '요약 화면으로 이동합니다.',
    content: null,
    icon: 'check',
  },
]

export const ANALYSIS_CARD_INTERVAL_MS = 800
export const ANALYSIS_SUMMARY_EXTRA_DELAY_MS = 500

export function getCardAppearanceDelay(index: number, totalCards: number): number {
  const baseDelay = ANALYSIS_CARD_INTERVAL_MS * (index + 1)
  if (index === totalCards - 1) {
    return baseDelay + ANALYSIS_SUMMARY_EXTRA_DELAY_MS
  }
  return baseDelay
}
