import summaryRibbon from '../../assets/comparison-summary-ribbon.svg'

type SummaryCardProps = {
  visible: boolean
}

export function SummaryCard({ visible }: SummaryCardProps) {
  return (
    <section
      className={`comparison-summary-card${visible ? ' comparison-summary-card--visible' : ''}`}
      aria-label="비교 완료 요약"
    >
      <div className="comparison-summary-content">
        <p className="comparison-summary-headline">
          총 <span className="comparison-summary-count">12</span>곳이
          <br />
          비교 완료되었습니다.
        </p>
        <p className="comparison-summary-desc">
          신용/소득 정보까지 반영한 예상 조건입니다.
        </p>
        <p className="comparison-summary-desc-sub">
          정확한 조건은 상담 후 확정됩니다.
        </p>
      </div>
      <img src={summaryRibbon} alt="" className="comparison-summary-ribbon" width={120} height={100} />
    </section>
  )
}
