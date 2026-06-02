import ribbonLogo from '../../assets/ribbon-logo.png'

export function HeroSection() {
  return (
    <section className="splash-hero" aria-label="Ribbon 브랜드">
      <div className="splash-branding">
        <img
          src={ribbonLogo}
          alt=""
          className="splash-logo-mark"
        />
        <p className="splash-brand-name">ribbon</p>
        <p className="splash-tagline">가능성과 조건을 연결하다</p>
      </div>
    </section>
  )
}
