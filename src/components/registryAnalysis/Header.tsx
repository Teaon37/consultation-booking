type HeaderProps = {
  onBack: () => void
}

export function Header({ onBack }: HeaderProps) {
  return (
    <header className="registry-analysis-header">
      <button type="button" className="registry-analysis-back-btn" onClick={onBack} aria-label="뒤로 가기">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="registry-analysis-title">AI가 등기를 분석하고 있어요</h1>
    </header>
  )
}
