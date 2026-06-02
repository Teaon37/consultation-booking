type SurveyProgressBarProps = {
  percent: number
}

export function SurveyProgressBar({ percent }: SurveyProgressBarProps) {
  return (
    <div className="survey-progress">
      <div className="survey-progress-labels">
        <span>진행률</span>
        <span>{percent}%</span>
      </div>
      <div className="survey-progress-track">
        <div
          className="survey-progress-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
