import { useEffect, useState } from 'react'
import { PhoneFrame } from '../components/PhoneFrame'
import { StatusBar } from '../components/StatusBar'
import { AddressInput } from '../components/propertySearch/AddressInput'
import { FooterButton } from '../components/propertySearch/FooterButton'
import { Header } from '../components/propertySearch/Header'
import { MarketChartCard } from '../components/propertySearch/MarketChartCard'
import { ResultCard } from '../components/propertySearch/ResultCard'
import { SearchingCard } from '../components/propertySearch/SearchingCard'
import {
  SEARCH_COMPLETE_MS,
  SEARCH_STEP_INTERVAL_MS,
  SEARCH_STEPS,
  SEARCH_TRIGGER_KEYWORD,
} from '../constants/propertyMockData'
import '../styles/property-search.css'

type PropertySearchPageProps = {
  onBack: () => void
  onNext: () => void
}

function shouldStartSearch(address: string): boolean {
  const trimmed = address.trim()
  return (
    trimmed.includes(SEARCH_TRIGGER_KEYWORD) ||
    trimmed === '서울시 강남구 테헤란로 123'
  )
}

export function PropertySearchPage({ onBack, onNext }: PropertySearchPageProps) {
  const [address, setAddress] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchStep, setSearchStep] = useState(0)
  const [isSearchComplete, setIsSearchComplete] = useState(false)

  useEffect(() => {
    if (!shouldStartSearch(address)) {
      setIsSearching(false)
      setSearchStep(0)
      setIsSearchComplete(false)
      return
    }

    let cancelled = false
    setIsSearching(true)
    setSearchStep(0)
    setIsSearchComplete(false)

    const stepTimers = SEARCH_STEPS.map((_, index) =>
      window.setTimeout(() => {
        if (!cancelled) setSearchStep(index + 1)
      }, SEARCH_STEP_INTERVAL_MS * (index + 1)),
    )

    const completeTimer = window.setTimeout(() => {
      if (!cancelled) {
        setIsSearching(false)
        setIsSearchComplete(true)
      }
    }, SEARCH_COMPLETE_MS)

    return () => {
      cancelled = true
      stepTimers.forEach(clearTimeout)
      clearTimeout(completeTimer)
    }
  }, [address])

  const handleNext = () => {
    if (!isSearchComplete) return
    console.log('다음 페이지로 이동', { address })
    onNext()
  }

  return (
    <PhoneFrame>
      <div className="property-search-page">
        <StatusBar />
        <div className="property-search-body">
          <Header onBack={onBack} />
          <AddressInput value={address} onChange={setAddress} />
          {isSearching && <SearchingCard searchStep={searchStep} />}
          {isSearchComplete && (
            <>
              <ResultCard />
              <MarketChartCard animate={isSearchComplete} />
            </>
          )}
        </div>
        <FooterButton disabled={!isSearchComplete} onClick={handleNext} />
      </div>
    </PhoneFrame>
  )
}
