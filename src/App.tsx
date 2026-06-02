import { useCallback, useState } from 'react'
import { LOAN_AMOUNT_DEFAULT } from './constants/loanAmount'
import { DEFAULT_LOAN_TYPE } from './constants/loanOptions'
import { ConsultationBookingPage } from './pages/ConsultationBookingPage'
import { ConsultationCompletePage } from './pages/ConsultationCompletePage'
import { CounselorConnectPage } from './pages/CounselorConnectPage'
import { IntroPage } from './pages/IntroPage'
import { LoanAmountPage } from './pages/LoanAmountPage'
import { LoanTypePage } from './pages/LoanTypePage'
import { PropertySearchPage } from './pages/PropertySearchPage'
import { ProviderComparisonPage } from './pages/ProviderComparisonPage'
import { RegistryAnalysisPage } from './pages/RegistryAnalysisPage'
import { SurveyFeedbackPage } from './pages/SurveyFeedbackPage'
import { SplashPage } from './pages/SplashPage'
import type { LoanType } from './types/loanType'
import type { FinanceProvider } from './types/providerComparison'

type AppScreen =
  | 'splash'
  | 'intro'
  | 'loanType'
  | 'propertySearch'
  | 'loanAmount'
  | 'registryAnalysis'
  | 'providerComparison'
  | 'counselorConnect'
  | 'consultationBooking'
  | 'consultationComplete'
  | 'surveyFeedback'

function App() {
  const [screen, setScreen] = useState<AppScreen>('splash')
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType>(DEFAULT_LOAN_TYPE)
  const [loanAmount, setLoanAmount] = useState(LOAN_AMOUNT_DEFAULT)
  const [, setSelectedProvider] = useState<string | null>(null)

  const showIntro = useCallback(() => {
    setScreen('intro')
  }, [])

  const showLoanType = useCallback(() => {
    setScreen('loanType')
  }, [])

  const showPropertySearch = useCallback(() => {
    setScreen('propertySearch')
  }, [])

  const showLoanAmount = useCallback(() => {
    setScreen('loanAmount')
  }, [])

  const showRegistryAnalysis = useCallback(() => {
    setScreen('registryAnalysis')
  }, [])

  const showProviderComparison = useCallback(() => {
    setScreen('providerComparison')
  }, [])

  const showCounselorConnect = useCallback(() => {
    setScreen('counselorConnect')
  }, [])

  const showConsultationBooking = useCallback(() => {
    setScreen('consultationBooking')
  }, [])

  const showSurveyFeedback = useCallback(() => {
    setScreen('surveyFeedback')
  }, [])

  const showConsultationComplete = useCallback(() => {
    setScreen('consultationComplete')
  }, [])

  const goBackToIntro = useCallback(() => {
    setScreen('intro')
  }, [])

  const goBackToLoanType = useCallback(() => {
    setScreen('loanType')
  }, [])

  const goBackToPropertySearch = useCallback(() => {
    setScreen('propertySearch')
  }, [])

  const goBackToLoanAmount = useCallback(() => {
    setScreen('loanAmount')
  }, [])

  const goBackToRegistryAnalysis = useCallback(() => {
    setScreen('registryAnalysis')
  }, [])

  const goBackToProviderComparison = useCallback(() => {
    setScreen('providerComparison')
  }, [])

  const goBackToCounselorConnect = useCallback(() => {
    setScreen('counselorConnect')
  }, [])

  const goBackToConsultationBooking = useCallback(() => {
    setScreen('consultationBooking')
  }, [])

  const goBackToConsultationComplete = useCallback(() => {
    setScreen('consultationComplete')
  }, [])

  const handleProviderSelect = useCallback((provider: FinanceProvider) => {
    setSelectedProvider(provider.name)
    showCounselorConnect()
  }, [showCounselorConnect])

  if (screen === 'splash') {
    return <SplashPage onComplete={showIntro} />
  }

  if (screen === 'intro') {
    return <IntroPage onNext={showLoanType} />
  }

  if (screen === 'loanType') {
    return (
      <LoanTypePage
        selectedLoanType={selectedLoanType}
        onSelectLoanType={setSelectedLoanType}
        onBack={goBackToIntro}
        onNext={showPropertySearch}
      />
    )
  }

  if (screen === 'propertySearch') {
    return (
      <PropertySearchPage onBack={goBackToLoanType} onNext={showLoanAmount} />
    )
  }

  if (screen === 'loanAmount') {
    return (
      <LoanAmountPage
        loanAmount={loanAmount}
        onLoanAmountChange={setLoanAmount}
        onBack={goBackToPropertySearch}
        onNext={showRegistryAnalysis}
      />
    )
  }

  if (screen === 'registryAnalysis') {
    return (
      <RegistryAnalysisPage
        onBack={goBackToLoanAmount}
        onNext={showProviderComparison}
      />
    )
  }

  if (screen === 'providerComparison') {
    return (
      <ProviderComparisonPage
        onBack={goBackToRegistryAnalysis}
        onSelectProvider={handleProviderSelect}
      />
    )
  }

  if (screen === 'counselorConnect') {
    return (
      <CounselorConnectPage
        onBack={goBackToProviderComparison}
        onBook={showConsultationBooking}
      />
    )
  }

  if (screen === 'consultationBooking') {
    return (
      <ConsultationBookingPage
        onBack={goBackToCounselorConnect}
        onSubmit={showConsultationComplete}
      />
    )
  }

  if (screen === 'consultationComplete') {
    return (
      <ConsultationCompletePage
        onBack={goBackToConsultationBooking}
        onConfirm={showSurveyFeedback}
      />
    )
  }

  if (screen === 'surveyFeedback') {
    return (
      <SurveyFeedbackPage
        onBack={goBackToConsultationComplete}
        onComplete={() => setScreen('splash')}
      />
    )
  }

  return (
    <CounselorConnectPage
      onBack={goBackToProviderComparison}
      onBook={showConsultationBooking}
    />
  )
}

export default App
