import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { FooterButton } from '../components/intro/FooterButton'
import { Header } from '../components/intro/Header'
import { HeroSection } from '../components/intro/HeroSection'
import '../styles/intro.css'

type IntroPageProps = {
  onNext: () => void
}

export function IntroPage({ onNext }: IntroPageProps) {
  return (
    <PhoneFrame variant="white">
      <div className="intro-page">
        <StatusBar />
        <Header />
        <HeroSection />
        <FooterButton onClick={onNext} />
      </div>
    </PhoneFrame>
  )
}
