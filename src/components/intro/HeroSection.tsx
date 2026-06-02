import introHouseHero from '../../assets/intro-house-hero.png'

export function HeroSection() {
  return (
    <section className="intro-hero" aria-labelledby="intro-headline">
      <h1 id="intro-headline" className="intro-headline">
        내 집으로
        <br />
        얼마까지 가능할까요?
      </h1>
      <p className="intro-subcopy">
        주소만 입력하면
        <br />
        가능한 조건을 확인할 수 있어요.
      </p>
      <div className="intro-illustration">
        <img
          src={introHouseHero}
          alt=""
          className="intro-hero-image"
        />
      </div>
    </section>
  )
}
