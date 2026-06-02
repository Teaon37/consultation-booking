import counselorImage from '../../assets/counselor.png'

type CounselorCardProps = {
  progress: number
  cardVisible: boolean
}

export function CounselorCard({ progress, cardVisible }: CounselorCardProps) {
  return (
    <section
      className={`counselor-connect-card${cardVisible ? ' counselor-connect-card--visible' : ''}`}
      aria-label="상담사 연결"
    >
      <div className="counselor-connect-card-inner">
        <div className="counselor-connect-illustration">
          <img src={counselorImage} alt="" className="counselor-connect-image" />
        </div>
        <p className="counselor-connect-status">전담 상담사 배정 중...</p>
        <p className="counselor-connect-wait">평균 1분 내 연결</p>
        <div
          className="counselor-connect-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span className="counselor-connect-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  )
}
