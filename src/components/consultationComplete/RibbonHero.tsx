import summaryRibbon from '../../assets/comparison-summary-ribbon.svg'

export function RibbonHero() {
  return (
    <div className="cc-ribbon-hero cc-popup" aria-hidden="true">
      <div className="cc-ribbon-glow">
        <span className="cc-sparkle cc-sparkle--1" />
        <span className="cc-sparkle cc-sparkle--2" />
        <span className="cc-sparkle cc-sparkle--3" />
        <img src={summaryRibbon} alt="" className="cc-ribbon-image" width={88} height={72} />
      </div>
    </div>
  )
}
