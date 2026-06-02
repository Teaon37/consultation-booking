export const SEARCH_STEPS = [
  '주소 표준화',
  'KB 시세 조회',
  '최근 거래 탐색',
] as const

export const MOCK_PROPERTY_RESULT = {
  address: '서울시 강남구 테헤란로 123',
  matchRate: '98%',
  propertyType: '아파트',
  area: '84.5㎡',
  kbPrice: '12.5억원',
  recentPrice: '12.1억원',
} as const

/** Mock chart points — x: 0..12, y scaled to viewBox height */
export const MOCK_CHART = {
  labels: ['08', '09', '12', '15', '18', '21', '24'],
  redLine: [92, 95, 91, 96, 99, 94, 100, 102, 98, 104, 101, 105, 106],
  blueLine: [82, 88, 95, 102, 110, 118, 128, 138, 150, 162, 170, 176, 180],
} as const

export const SEARCH_TRIGGER_KEYWORD = '서울시'

export const SEARCH_COMPLETE_MS = 3000
export const SEARCH_STEP_INTERVAL_MS = 700
