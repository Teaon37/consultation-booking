import { useCallback, useMemo, useState } from 'react'
import { CUSTOMER_QUESTIONS, FEEDBACK_QUESTIONS } from '../questions'
import {
  answersToJson,
  getNextStep,
  getPreviousStep,
  getProgressPercent,
  isAnswerValid,
  validateFeedbackForSubmit,
} from '../survey-flow'
import { saveSurveyResponse, toSaveErrorMessage } from '../supabase'
import type {
  Answer,
  CustomerAnswers,
  FeedbackAnswers,
  StepId,
  SurveyFlowOptions,
} from '../types'
import { SurveyProgressBar } from './SurveyProgressBar'
import { SurveyQuestionStep } from './SurveyQuestionStep'
import { SurveyToast } from './SurveyToast'

type SurveyFlowProps = {
  initialStep?: StepId
  flowOptions?: SurveyFlowOptions
  onBack?: () => void
  onComplete: () => void
}

const INITIAL_CUSTOMER: CustomerAnswers = {}
const INITIAL_FEEDBACK: FeedbackAnswers = {}

export function SurveyFlow({
  initialStep = 'b1',
  flowOptions = { embedded: true },
  onBack,
  onComplete,
}: SurveyFlowProps) {
  const [step, setStep] = useState<StepId>(initialStep)
  const [customerAnswers, setCustomerAnswers] = useState<CustomerAnswers>(INITIAL_CUSTOMER)
  const [feedbackAnswers, setFeedbackAnswers] = useState<FeedbackAnswers>(INITIAL_FEEDBACK)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('응답이 저장되었습니다.')

  const progress = useMemo(
    () => getProgressPercent(step, customerAnswers, feedbackAnswers, flowOptions),
    [step, customerAnswers, feedbackAnswers, flowOptions],
  )

  const currentQuestion = useMemo(() => {
    return (
      CUSTOMER_QUESTIONS.find((q) => q.id === step) ??
      FEEDBACK_QUESTIONS.find((q) => q.id === step)
    )
  }, [step])

  const currentAnswer = useMemo(() => {
    if (!currentQuestion) return undefined
    if (currentQuestion.section === 'customer') {
      return customerAnswers[currentQuestion.id]
    }
    return feedbackAnswers[currentQuestion.id]
  }, [currentQuestion, customerAnswers, feedbackAnswers])

  const canProceed = useMemo(() => {
    if (!currentQuestion) return true
    return isAnswerValid(currentAnswer, currentQuestion.id)
  }, [currentQuestion, currentAnswer])

  const showProgress = step !== 'early-exit' && step !== 'complete'

  const handleAnswerChange = useCallback(
    (answer: Answer) => {
      if (!currentQuestion) return

      if (currentQuestion.section === 'customer') {
        setCustomerAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
        return
      }

      setFeedbackAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))
    },
    [currentQuestion],
  )

  const submitSurvey = useCallback(async () => {
    const validationError = validateFeedbackForSubmit(feedbackAnswers)

    if (validationError) {
      setSaveError(validationError)
      return
    }

    setIsSaving(true)
    setSaveError(null)

    try {
      const result = await saveSurveyResponse(
        answersToJson(customerAnswers),
        answersToJson(feedbackAnswers),
      )

      setToastMessage(
        result.savedTo === 'supabase'
          ? '응답이 저장되었습니다.'
          : '응답이 로컬에 임시 저장되었습니다. Supabase URL 설정 후 다시 제출해주세요.',
      )
      setToastVisible(true)
      setStep('complete')
    } catch (error) {
      setSaveError(toSaveErrorMessage(error))
    } finally {
      setIsSaving(false)
    }
  }, [customerAnswers, feedbackAnswers])

  const handleNext = useCallback(async () => {
    const next = getNextStep(step, customerAnswers, feedbackAnswers, flowOptions)

    if (next === 'early-exit') {
      setStep('early-exit')
      return
    }

    if (next === 'complete') {
      await submitSurvey()
      return
    }

    setStep(next)
  }, [step, customerAnswers, feedbackAnswers, flowOptions, submitSurvey])

  const handleBack = useCallback(() => {
    const prev = getPreviousStep(step, customerAnswers, feedbackAnswers, flowOptions)
    if (prev) {
      setSaveError(null)
      setStep(prev)
      return
    }

    onBack?.()
  }, [step, customerAnswers, feedbackAnswers, flowOptions, onBack])

  const nextLabel = useMemo(() => {
    const next = getNextStep(step, customerAnswers, feedbackAnswers, flowOptions)
    if (next === 'complete') return '제출하기'
    if (next === 'early-exit') return '다음'
    return '다음'
  }, [step, customerAnswers, feedbackAnswers, flowOptions])

  const previousAvailable =
    getPreviousStep(step, customerAnswers, feedbackAnswers, flowOptions) !== null ||
    Boolean(onBack)

  if (step === 'early-exit') {
    return (
      <div className="survey-end">
        <div className="survey-end-icon" aria-hidden="true">
          🙏
        </div>
        <h2 className="survey-end-title">설문에 참여해주셔서 감사합니다.</h2>
        <p className="survey-end-desc">
          본 설문은 실제 대출 경험이 있는 분들을 대상으로 진행되고 있습니다.
        </p>
        <button type="button" className="survey-btn survey-btn--secondary" onClick={onComplete}>
          처음으로 돌아가기
        </button>
      </div>
    )
  }

  if (step === 'complete') {
    return (
      <>
        <div className="survey-end">
          <div className="survey-end-icon survey-end-icon--success" aria-hidden="true">
            ✓
          </div>
          <h2 className="survey-end-title">설문에 참여해주셔서 감사합니다.</h2>
          <p className="survey-end-desc">
            소중한 의견은 서비스 개선에 적극 반영하겠습니다.
          </p>
          <button type="button" className="survey-btn survey-btn--secondary" onClick={onComplete}>
            처음으로 돌아가기
          </button>
        </div>
        <SurveyToast
          message={toastMessage}
          visible={toastVisible}
          onHide={() => setToastVisible(false)}
        />
      </>
    )
  }

  return (
    <>
      {showProgress && (
        <div className="survey-progress-wrap">
          <SurveyProgressBar percent={progress} />
        </div>
      )}

      <div className="survey-card">
        {currentQuestion && (
          <SurveyQuestionStep
            question={currentQuestion}
            answer={currentAnswer}
            onChange={handleAnswerChange}
          />
        )}

        {saveError && <p className="survey-error">{saveError}</p>}

        <div className="survey-actions">
          {previousAvailable && (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSaving}
              className="survey-btn survey-btn--secondary"
            >
              이전
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || isSaving}
            className="survey-btn survey-btn--primary"
          >
            {isSaving ? (
              <span className="survey-loading">
                <span className="survey-spinner" aria-hidden="true" />
                저장 중...
              </span>
            ) : (
              nextLabel
            )}
          </button>
        </div>
      </div>

      <SurveyToast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </>
  )
}
