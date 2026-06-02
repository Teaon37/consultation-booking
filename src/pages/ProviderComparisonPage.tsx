import { useEffect, useState } from 'react'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { Header } from '../components/providerComparison/Header'
import { ProviderCard } from '../components/providerComparison/ProviderCard'
import { SummaryCard } from '../components/providerComparison/SummaryCard'
import { FINANCE_PROVIDERS } from '../constants/providerComparisonMock'
import type { FinanceProvider } from '../types/providerComparison'
import {
  PROVIDER_CARD_STAGGER_MS,
  SUMMARY_ANIMATION_MS,
} from '../types/providerComparison'
import '../styles/provider-comparison.css'

type ProviderComparisonPageProps = {
  onBack: () => void
  onSelectProvider: (provider: FinanceProvider) => void
}

export function ProviderComparisonPage({ onBack, onSelectProvider }: ProviderComparisonPageProps) {
  const [summaryVisible, setSummaryVisible] = useState(false)
  const [visibleProviderCount, setVisibleProviderCount] = useState(0)

  useEffect(() => {
    setSummaryVisible(true)

    const providerTimers = FINANCE_PROVIDERS.map((_, index) =>
      window.setTimeout(
        () => setVisibleProviderCount(index + 1),
        SUMMARY_ANIMATION_MS + PROVIDER_CARD_STAGGER_MS * (index + 1),
      ),
    )

    return () => {
      providerTimers.forEach(clearTimeout)
    }
  }, [])

  const handleSelect = (provider: FinanceProvider) => {
    console.log('selectedProvider:', provider.name)
    onSelectProvider(provider)
  }

  return (
    <PhoneFrame>
      <div className="comparison-page">
        <StatusBar />
        <div className="comparison-body">
          <Header onBack={onBack} />
          <SummaryCard visible={summaryVisible} />
          <div className="comparison-provider-list">
            {FINANCE_PROVIDERS.map((provider, index) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                visible={visibleProviderCount > index}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
