type ProgressCardProps = {
  progress: number
}

export function ProgressCard({ progress }: ProgressCardProps) {
  return (
    <section className="registry-progress-card" aria-label="등기 분석 진행">
      <div className="registry-progress-head">
        <span className="registry-progress-icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" rx="2" fill="#fff4d1" stroke="#f2b705" strokeWidth="1.5" />
            <path d="M8 8H16M8 12H14" stroke="#f2b705" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="17" cy="17" r="4.5" fill="#fff" stroke="#f2b705" strokeWidth="1.5" />
            <path d="M15.5 17L16.5 18L18.5 15.5" stroke="#f2b705" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="registry-progress-title">등기 분석 세션</p>
          <p className="registry-progress-desc">소유권 · 근저당 · 권리관계 자동 점검</p>
        </div>
      </div>
      <div
        className="registry-progress-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <span className="registry-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </section>
  )
}
