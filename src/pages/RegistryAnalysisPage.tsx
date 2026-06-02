import { useEffect, useState } from 'react'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { AnalysisResultCard } from '../components/registryAnalysis/AnalysisResultCard'
import { FooterButton } from '../components/registryAnalysis/FooterButton'
import { Header } from '../components/registryAnalysis/Header'
import { ProgressCard } from '../components/registryAnalysis/ProgressCard'
import { ANALYSIS_CARDS, getCardAppearanceDelay } from '../constants/registryAnalysis'
import '../styles/registry-analysis.css'

type RegistryAnalysisPageProps = {
  onBack: () => void
  onNext: () => void
}

export function RegistryAnalysisPage({ onBack, onNext }: RegistryAnalysisPageProps) {
  const [visibleCards, setVisibleCards] = useState(0)

  const progress = (visibleCards / ANALYSIS_CARDS.length) * 100
  const isAnalysisComplete = visibleCards >= ANALYSIS_CARDS.length

  useEffect(() => {
    const cardTimers = ANALYSIS_CARDS.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCards(index + 1)
      }, getCardAppearanceDelay(index, ANALYSIS_CARDS.length)),
    )

    return () => {
      cardTimers.forEach(clearTimeout)
    }
  }, [])

  const handleNext = () => {
    if (!isAnalysisComplete) return
    console.log('다음 페이지로 이동')
    onNext()
  }

  return (
    <PhoneFrame>
      <div className="registry-analysis-page">
        <StatusBar />
        <div className="registry-analysis-body">
          <Header onBack={onBack} />
          <ProgressCard progress={progress} />
          <div className="registry-result-list">
            {ANALYSIS_CARDS.map((card, index) => (
              <AnalysisResultCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                content={card.content}
                visible={visibleCards > index}
              />
            ))}
          </div>
        </div>
        <FooterButton disabled={!isAnalysisComplete} onClick={handleNext} />
      </div>
    </PhoneFrame>
  )
}
