import { MOCK_CHART } from '../../constants/propertyMockData'

type MarketChartCardProps = {
  animate: boolean
}

function buildPath(values: readonly number[], width: number, height: number, padding: number): string {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const stepX = (width - padding * 2) / (values.length - 1)

  return values
    .map((value, index) => {
      const x = padding + index * stepX
      const y = padding + (height - padding * 2) * (1 - (value - min) / range)
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

export function MarketChartCard({ animate }: MarketChartCardProps) {
  const chartWidth = 298
  const chartHeight = 118
  const padding = 8
  const redPath = buildPath(MOCK_CHART.redLine, chartWidth, chartHeight, padding)
  const bluePath = buildPath(MOCK_CHART.blueLine, chartWidth, chartHeight, padding)

  return (
    <section className="property-search-card property-search-card--chart">
      <div className="property-search-chart-head">
        <h2 className="property-search-chart-title">시장 지표와 최근 거래액</h2>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="#f2b705" strokeWidth="1.5" />
          <path d="M12 7V12L15 14" stroke="#f2b705" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="property-search-chart-wrap">
        <svg
          className="property-search-chart"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + ((chartHeight - padding * 2) / 4) * i}
              x2={chartWidth - padding}
              y2={padding + ((chartHeight - padding * 2) / 4) * i}
              className="property-search-chart-grid"
            />
          ))}
          <path
            d={redPath}
            className={`property-search-chart-line property-search-chart-line--red${animate ? ' property-search-chart-line--animate' : ''}`}
          />
          <path
            d={bluePath}
            className={`property-search-chart-line property-search-chart-line--blue${animate ? ' property-search-chart-line--animate' : ''}`}
          />
        </svg>
        <div className="property-search-chart-labels">
          {MOCK_CHART.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      <div className="property-search-chart-legend">
        <span className="property-search-legend-item">
          <span className="property-search-legend-line property-search-legend-line--blue" />
          실거래가
        </span>
        <span className="property-search-legend-item">
          <span className="property-search-legend-line property-search-legend-line--red" />
          거래가 추세
        </span>
      </div>
    </section>
  )
}
