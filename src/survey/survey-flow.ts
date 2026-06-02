import { CUSTOMER_QUESTIONS, FEEDBACK_QUESTIONS } from './questions'
import type {
  Answer,
  CustomerAnswers,
  FeedbackAnswers,
  StepId,
  SurveyFlowOptions,
} from './types'

export function validateFeedbackForSubmit(
  feedbackAnswers: FeedbackAnswers,
): string | null {
  for (const question of FEEDBACK_QUESTIONS) {
    if (!isAnswerValid(feedbackAnswers[question.id], question.id)) {
      return `${question.title}에 대한 응답을 완료해주세요.`
    }
  }

  return null
}

export function getNextStep(
  current: StepId,
  customerAnswers: CustomerAnswers,
  _feedbackAnswers: FeedbackAnswers,
  options: SurveyFlowOptions = {},
): StepId {
  if (current === 'start') return 'b1'

  if (current === 'b1') {
    const b1 = customerAnswers.b1
    if (b1?.type === 'single' && b1.value === '없음') {
      return 'early-exit'
    }
    return 'b2'
  }

  const customerIndex = CUSTOMER_QUESTIONS.findIndex((q) => q.id === current)
  if (customerIndex >= 0 && customerIndex < CUSTOMER_QUESTIONS.length - 1) {
    return CUSTOMER_QUESTIONS[customerIndex + 1].id
  }

  if (current === 'b9') {
    return options.embedded ? 'q1' : 'mvp-intro'
  }

  if (current === 'mvp-intro') return 'q1'

  if (current === 'q9') return 'q10'

  const feedbackIndex = FEEDBACK_QUESTIONS.findIndex((q) => q.id === current)
  if (feedbackIndex >= 0 && feedbackIndex < FEEDBACK_QUESTIONS.length - 1) {
    return FEEDBACK_QUESTIONS[feedbackIndex + 1].id
  }

  if (current === 'q10') return 'complete'

  return current
}

export function getPreviousStep(
  current: StepId,
  _customerAnswers: CustomerAnswers,
  _feedbackAnswers: FeedbackAnswers,
  options: SurveyFlowOptions = {},
): StepId | null {
  if (current === 'b1') {
    return options.embedded ? null : 'start'
  }

  if (current === 'b2') return 'b1'
  if (current === 'mvp-intro') return 'b9'

  if (current === 'q1') {
    if (options.feedbackOnly) return null
    return options.embedded ? 'b9' : 'mvp-intro'
  }

  if (current === 'q10') return 'q9'

  const customerIndex = CUSTOMER_QUESTIONS.findIndex((q) => q.id === current)
  if (customerIndex > 0) {
    return CUSTOMER_QUESTIONS[customerIndex - 1].id
  }

  const feedbackIndex = FEEDBACK_QUESTIONS.findIndex((q) => q.id === current)
  if (feedbackIndex > 0) {
    return FEEDBACK_QUESTIONS[feedbackIndex - 1].id
  }

  return null
}

export function getProgressSteps(
  customerAnswers: CustomerAnswers,
  _feedbackAnswers: FeedbackAnswers,
  options: SurveyFlowOptions = {},
): StepId[] {
  const b1 = customerAnswers.b1
  if (b1?.type === 'single' && b1.value === '없음') {
    return options.embedded ? ['b1'] : ['start', 'b1']
  }

  const steps: StepId[] = options.feedbackOnly
    ? []
    : options.embedded
      ? [...CUSTOMER_QUESTIONS.map((q) => q.id)]
      : ['start', ...CUSTOMER_QUESTIONS.map((q) => q.id), 'mvp-intro']

  steps.push(...FEEDBACK_QUESTIONS.map((q) => q.id))

  steps.push('complete')
  return steps
}

export function getProgressPercent(
  current: StepId,
  customerAnswers: CustomerAnswers,
  feedbackAnswers: FeedbackAnswers,
  options: SurveyFlowOptions = {},
): number {
  const steps = getProgressSteps(customerAnswers, feedbackAnswers, options)
  const index = steps.indexOf(current)
  if (index < 0) return 0
  if (current === 'complete' || current === 'early-exit') return 100
  return Math.round((index / (steps.length - 1)) * 100)
}

export function isOtherOption(option: string): boolean {
  return option === '기타' || option.startsWith('기타(')
}

export function isAnswerValid(answer: Answer | undefined, questionId: StepId): boolean {
  if (!answer) return false

  const allQuestions = [...CUSTOMER_QUESTIONS, ...FEEDBACK_QUESTIONS]
  const question = allQuestions.find((q) => q.id === questionId)
  if (!question) return true

  if (answer.type === 'single') {
    if (!answer.value) return false
    if (isOtherOption(answer.value) && question.allowOther) {
      return Boolean(answer.other?.trim())
    }
    return true
  }

  if (answer.type === 'multi') {
    if (answer.values.length === 0) return false

    if (question.maxSelections && answer.values.length > question.maxSelections) {
      return false
    }

    const hasOtherSelected = answer.values.some(isOtherOption)
    if (hasOtherSelected && question.allowOther && !answer.other?.trim()) {
      return false
    }

    return true
  }

  return false
}

export function answersToJson(answers: CustomerAnswers | FeedbackAnswers) {
  return Object.fromEntries(
    Object.entries(answers).map(([key, answer]) => {
      if (answer.type === 'single') {
        return [
          key,
          answer.other ? { value: answer.value, other: answer.other } : answer.value,
        ]
      }

      if (answer.type === 'multi') {
        return [
          key,
          answer.other ? { values: answer.values, other: answer.other } : answer.values,
        ]
      }

      return [key, answer]
    }),
  )
}
