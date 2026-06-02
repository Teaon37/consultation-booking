import counselorImage from '../../assets/counselor.png'

export function HeroCard() {
  return (
    <section className="cb-hero-card" aria-hidden="true">
      <img src={counselorImage} alt="" className="cb-hero-image" />
    </section>
  )
}
