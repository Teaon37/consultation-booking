import { isOtherOption } from '../survey-flow'
import type { Answer, QuestionConfig } from '../types'

type SurveyQuestionStepProps = {
  question: QuestionConfig
  answer: Answer | undefined
  onChange: (answer: Answer) => void
}

export function SurveyQuestionStep({
  question,
  answer,
  onChange,
}: SurveyQuestionStepProps) {
  const isMulti = question.type === 'multi'
  const selectedSingle = answer?.type === 'single' ? answer.value : ''
  const selectedMulti = answer?.type === 'multi' ? answer.values : []
  const otherText = answer?.other ?? ''

  const handleSingleSelect = (option: string) => {
    onChange({
      type: 'single',
      value: option,
      other: isOtherOption(option) ? otherText : undefined,
    })
  }

  const handleMultiToggle = (option: string) => {
    const currentValues = answer?.type === 'multi' ? answer.values : []
    const isSelected = currentValues.includes(option)

    let nextValues: string[]
    if (isSelected) {
      nextValues = currentValues.filter((value) => value !== option)
    } else {
      if (question.maxSelections && currentValues.length >= question.maxSelections) {
        return
      }
      nextValues = [...currentValues, option]
    }

    const other =
      nextValues.some(isOtherOption) && answer?.type === 'multi' ? answer.other : undefined

    onChange({
      type: 'multi',
      values: nextValues,
      other,
    })
  }

  const handleOtherChange = (text: string) => {
    if (answer?.type === 'single') {
      onChange({ ...answer, other: text })
      return
    }

    if (answer?.type === 'multi') {
      onChange({ ...answer, other: text })
    }
  }

  const showOtherInput =
    (answer?.type === 'single' && isOtherOption(selectedSingle)) ||
    (answer?.type === 'multi' && selectedMulti.some(isOtherOption))

  return (
    <div className="survey-question">
      <div className="survey-question-header">
        <h2 className="survey-question-title">{question.title}</h2>
        {question.description && (
          <p className="survey-question-desc">{question.description}</p>
        )}
        {question.maxSelections && (
          <p className="survey-question-meta">
            {selectedMulti.length}/{question.maxSelections}개 선택됨
          </p>
        )}
      </div>

      <div className="survey-options">
        {question.options.map((option) => {
          const isSelected = isMulti
            ? selectedMulti.includes(option)
            : selectedSingle === option

          return (
            <button
              key={option}
              type="button"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                if (isMulti) {
                  handleMultiToggle(option)
                } else {
                  handleSingleSelect(option)
                }
              }}
              className={`survey-option ${isSelected ? 'survey-option--selected' : ''}`}
              aria-pressed={isSelected}
            >
              <span className={`survey-option-indicator ${isMulti ? 'survey-option-indicator--multi' : ''}`}>
                {isMulti && isSelected ? '✓' : !isMulti && isSelected ? '●' : ''}
              </span>
              <span className="survey-option-label">{option}</span>
            </button>
          )
        })}
      </div>

      {showOtherInput && (
        <label className="survey-other-field">
          <span className="survey-other-label">
            {question.otherLabel ?? '기타 내용을 입력해주세요'}
          </span>
          <textarea
            value={otherText}
            onChange={(event) => handleOtherChange(event.target.value)}
            placeholder="내용을 입력해주세요"
            rows={3}
            className="survey-other-input"
          />
        </label>
      )}
    </div>
  )
}
