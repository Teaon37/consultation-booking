import { MOCK_PROPERTY_RESULT } from '../../constants/propertyMockData'

export function ResultCard() {
  const rows = [
    { label: '부동산 유형', value: MOCK_PROPERTY_RESULT.propertyType },
    { label: '전용면적', value: MOCK_PROPERTY_RESULT.area },
    { label: 'KB 시세(예상)', value: MOCK_PROPERTY_RESULT.kbPrice },
    { label: '최근 거래액', value: MOCK_PROPERTY_RESULT.recentPrice },
  ]

  return (
    <section className="property-search-card property-search-card--result">
      <div className="property-search-result-top">
        <div>
          <p className="property-search-result-status">검색 완료</p>
          <p className="property-search-result-address">{MOCK_PROPERTY_RESULT.address}</p>
        </div>
        <span className="property-search-match-badge">매칭 {MOCK_PROPERTY_RESULT.matchRate}</span>
      </div>
      <dl className="property-search-result-list">
        {rows.map((row) => (
          <div key={row.label} className="property-search-result-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
